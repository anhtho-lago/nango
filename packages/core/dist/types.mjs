//////////////////////
// Nango Config (nango-config.yaml)
//////////////////////
export var NangoIntegrationAuthModes;
(function (NangoIntegrationAuthModes) {
    NangoIntegrationAuthModes[NangoIntegrationAuthModes["BASIC_AUTH"] = 0] = "BASIC_AUTH";
    NangoIntegrationAuthModes[NangoIntegrationAuthModes["OAUTH"] = 1] = "OAUTH";
})(NangoIntegrationAuthModes || (NangoIntegrationAuthModes = {}));
export var NangoCallAuthModes;
(function (NangoCallAuthModes) {
    NangoCallAuthModes["AUTH_HEADER_TOKEN"] = "AUTH_HEADER_TOKEN";
})(NangoCallAuthModes || (NangoCallAuthModes = {}));
//////////////////////
// Client <-> Server Messages
//////////////////////
export var NangoMessageAction;
(function (NangoMessageAction) {
    NangoMessageAction["REGISTER_CONNECTION"] = "REGISTER_CONNECTION";
    NangoMessageAction["TRIGGER_ACTION"] = "TRIGGER_ACTION";
})(NangoMessageAction || (NangoMessageAction = {}));
export var HTTPMethods;
(function (HTTPMethods) {
    HTTPMethods["POST"] = "POST";
    HTTPMethods["GET"] = "GET";
    HTTPMethods["PUT"] = "PUT";
    HTTPMethods["DELETE"] = "DELETE";
    HTTPMethods["HEAD"] = "HEAD";
    HTTPMethods["PATCH"] = "PATCH";
    HTTPMethods["TRACE"] = "TRACE";
    HTTPMethods["CONNECT"] = "CONNECT";
    HTTPMethods["OPTIONS"] = "OPTIONS";
})(HTTPMethods || (HTTPMethods = {}));
//# sourceMappingURL=types.mjs.map