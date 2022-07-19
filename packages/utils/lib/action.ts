import type {
  HttpHeader,
  HttpParams,
  NangoConfig,
  NangoConnection,
  NangoIntegrationConfig
} from '@nangohq/core';
import * as core from '@nangohq/core';
import type * as winston from 'winston';
import type { Axios, AxiosResponse, Method } from 'axios';
import axios from 'axios';

class NangoAction {
  private nangoConfig: NangoConfig;
  private integrationConfig: NangoIntegrationConfig;
  private userConnection: NangoConnection;
  private axiosInstance: Axios;
  private actionName: string;

  private executionStartTime: [number, number];

  protected logger!: winston.Logger;

  public constructor(
    nangoConfig: NangoConfig,
    integrationConfig: NangoIntegrationConfig,
    userConnection: NangoConnection,
    logPath: string,
    actionName: string
  ) {
    this.executionStartTime = process.hrtime();

    this.nangoConfig = nangoConfig;
    this.integrationConfig = integrationConfig;
    this.userConnection = userConnection;
    this.actionName = actionName;

    // Configure Axios
    this.axiosInstance = new axios.Axios({
      timeout: this.integrationConfig.http_request_timeout_seconds
        ? this.integrationConfig.http_request_timeout_seconds * 1000
        : this.nangoConfig.default_http_request_timeout_seconds * 1000
    });

    // Setup logging
    const log_level = this.integrationConfig?.log_level
      ? this.integrationConfig.log_level
      : this.nangoConfig.default_action_log_level;
    const logFilePath = core.getServerLogFilePath(logPath);
    const defaultMeta = {
      integration: this.userConnection.integration,
      action: this.actionName,
      userId: this.userConnection.userId,
      actionExecutionId: core.makeId(8)
    };
    this.logger = core.getLogger(
      log_level,
      core.nangoActionLogFormat,
      logFilePath,
      defaultMeta
    );
    this.logger.info(
      `Starting execution of action '${actionName}' in integration '${this.userConnection.integration}' for user_id '${this.userConnection.userId}'`
    );
  }

  // A bit hacky but found no other decent way to get this message logged
  public markExecutionComplete() {
    const elapsedMilliseconds =
      process.hrtime(this.executionStartTime)[1] / 1000000;
    this.logger.info(
      `Execution of action finished in ${elapsedMilliseconds.toFixed(3)} ms`
    );
  }

  protected getCurrentConnectionConfig() {
    return this.userConnection;
  }

  protected async httpRequest(
    endpoint: string,
    method: Method,
    params?: HttpParams,
    body?: any,
    headers?: HttpHeader
  ) {
    const fullURL = new URL(endpoint, this.integrationConfig.base_url).href;

    let finalHeaders: HttpHeader = {};
    if (headers !== undefined) {
      finalHeaders = headers;
    }

    let finalParams: HttpParams = {};
    if (params !== undefined) {
      finalParams = params;
    }

    if (
      this.integrationConfig.call_auth.mode ===
      core.NangoCallAuthModes.AUTH_HEADER_TOKEN
    ) {
      finalHeaders[
        'Authorization'
      ] = `Bearer ${this.userConnection.oAuthAccessToken}`;
    }

    let serializedBody: string;
    if (typeof body === 'object') {
      serializedBody = JSON.stringify(body);
      finalHeaders['Content-Type'] = 'application/json';
    } else {
      serializedBody = body;
    }

    const promise = new Promise<AxiosResponse<any, any>>((resolve, reject) => {
      const requestId = core.makeId(8);
      this.logger.debug(
        `HTTP request #${requestId} - REQUEST\nURL: ${fullURL}\nHeaders:\n${JSON.stringify(
          finalHeaders,
          null,
          4
        )}\nBody:\n${serializedBody}`
      );

      this.axiosInstance
        .request({
          url: fullURL,
          method: method,

          params: finalParams,
          headers: finalHeaders,

          data: serializedBody
        })
        .then((response) => {
          // TODO: This currently assumes the response.data is JSON, but it could be other data types (which would require other serialization for logging)
          this.logger.debug(
            `HTTP request #${requestId} - RESPONSE\nStatus: ${
              response.status
            } - ${response.statusText}\nHeaders:\n${JSON.stringify(
              response.headers,
              null,
              4
            )}\nBody:\n${JSON.stringify(JSON.parse(response.data), null, 4)}`
          );

          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  }

  public async executeAction(input: any): Promise<any> {
    console.log(
      `Default NangoAction - executeAction has been called. This is probably not what you intended. Passed input:\n${JSON.stringify(
        input
      )}`
    );
    return;
  }
}

export { NangoAction };