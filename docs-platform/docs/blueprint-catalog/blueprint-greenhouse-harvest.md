---
sidebar_label: 'Greenhouse - Harvest API'
---

# Blueprint: Greenhouse Harvest API

This blueprint of Nango for the Greenhouse API makes it very easy to work with the Greenhouse Harvest API and automates common tasks such as OAuth 2 authentication, requests authorization, logging, rate-limit handling, error handling and automatic retries.

[Greenhouse Harvest API Docs](https://developers.greenhouse.io/harvest.html)  |  [API gotchas & learnings](#gotchas)

Last updated: 12.08.2022

## Pick the right Greenhouse API
Greenhouse has multiple APIs and because they use different authentication mechanisms there are also different Blueprints for them in Nango. Check the [Greenhouse API Overview](https://developers.greenhouse.io/) for a full list, currently Nango has Blueprints for the following:

- Greenhouse Harvest API (this blueprint, used to manage candidates, settings etc.)
- [Greenhouse Ingestion API](blueprint-catalog/blueprint-greenhouse-ingestion.md) (used to send new candidates into Greenhouse from sourcing tools)

## How to use it
To create your own integration based on the Greenhouse blueprint add this to your `integrations.yaml` file:

```yaml title=integrations.yaml
    greenhouse-harvest:
        extends_blueprint: greenhouse-harvest:v0

```
The Greenhouse Harvest API uses [Basic Auth for authorization](https://developers.greenhouse.io/harvest.html#authentication) but only uses the "username" part which should be set to an API key of the user. The API key can be generated by your user in Greenhouse and should then be supplied to your frontend. Once you have it you can register the user's Connection in Nango with a call to [`registerConnection`](reference/SDKs/node.md#registerConnection) like this:

```js title="In your backend, using the Nango SDK"

let credentials = {
    username: '<Greenhouse API Key from your frontend/user>',
    password: '' // Password must be empty, but you need to specify the key
};

await nango.registerConnection('greenhouse', '<user-id>', credentials);
// Connection registered, you can now start executing greenhouse actions for this user
```

### Coverage
Blueprint `v0` covers the Greenhouse V1 Harvest API.

The base URL for API calls is set to `https://harvest.greenhouse.io/v1/`

| Nango Feature | Supported Status | 
|---|---|
| Rate limit detection | ✅ |
| Retries on timeout | ✅ |
| Use any endpoint of the Greenhouse Harvest API | ✅ |

## Greenhouse Harvest API gotchas & learnings {#gotchas}
_These are community contributed field notes about working with this API. We hope they help you!_

- The process for the user to obtain their harvest api key is unfortunately rather cumbersome. If you Google around you can find a lot of help pages of other tools though that have written a step-by-step guide on how to get it

:::info Share your experience
Learned something about working with the Greenhouse Harvest API that you want to share with other developers? [Add it to this page](https://github.com/NangoHQ/nango/edit/main/docs/docs/blueprint-catalog/blueprint-greenhouse-harvest.md) (it is just a markdown file) and send us a pull request. Thanks so much!
:::