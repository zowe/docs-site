# Obtaining Information about API Services

## Overview

API clients can obtain obtain information about API services.

This is done for several use cases:

- Display available services to the user based on some criteria (API ID, hostname, or custom metadata)
- Locate a specific API service based on specific criteria (for example the API ID)
- Obtain information that allows routing via API gateway such as _baseUrl_ or _basePath_
- Obtain information about the API services, its APIs, or its service instances

Notes:

- _baseUrl_ or _basePath_ are explained in [Components of URL](api-mediation-components-of-URL.md)
- The _API ID_ uniquely identifies the API in the API ML. The API ID can be used to locate the same APIs that are provided by different service instances. The API developer defines this ID. It must be a string of up to 64 characters that uses lowercase alphanumeric characters and a dot: `.`. The Zowe APIs start with the `zowe.` prefix. API ML APIs start with the `zowe.apiml.` prefix.

## Protection of Service Information

The information about API services is categorized as sensitive. It provides partial information about the internal topology of the mainframe system and should be accessed only by authorized users and services.

Access to this information requires authentication using mainframe credentials and SAF resource check (SAF resource check - TBD).

## API Endpoints

### Obtain Information about Specific Service

`GET /gateway/api/v1/services/{serviceId}`

where:

- **{serviceId}** is the service ID of the API service (e.g. `apicatalog`)

It returns a JSON response that describes the service - see [Response Format](#response-format).

### Obtain Information about All Services

`GET /gateway/api/v1/services`

It returns a JSON response with a list of all services - see [Response Format](#response-format).

### Obtain Information about All Services with a Specific AP ID

`GET /gateway/api/v1/services?apiId={apiId}`

where:

- **{apiId}** is the API ID that needs to be provided by the service (e.g. `zowe.apiml.apicatalog`)

It returns a JSON response with a list of services that provide specified API ID - see [Response Format](#response-format).

### Response Format

This documentation provides basic information about the structure of the response. Full reference on the field in the response is in the API Catalog.

The `apiml` section provides information about:

- the service in the `service` subsection
- the APIs that are provided by the service in the `apiInfo` section. It shows each major version that is provided by at least one instance. For each major version, the lowest minor version is displayed
- the authentication methods that are supported by all instances are displayed

The API clients can use this information to locate the the right API based on API ID and use `baseUrl` or `basePath` to access it via API gateway.

The `instances` section contains more details about instances. The API services can provide more application specific details in `customMetadata` that can be used by the API clients.

Example:

```json
{
  "apiml": {
    "apiInfo": [
      {
        "apiId": "zowe.sample",
        "basePath": "/zowesample/api/v1",
        "baseUrl": "https://sys1.acme.net:7554/zowesample/api/v1",
        "defaultApi": true,
        "documentationUrl": "https://docs.zowe.org/",
        "gatewayUrl": "api/v1",
        "swaggerUrl": "https://sys1.acme.net:7554/casample/api/v1/apiDocs",
        "version": "1.0.0"
      }
    ],
    "authentication": [
      {
        "applid": "TSTAPPL",
        "scheme": "zoweJwt",
        "supportsSso": true
      }
    ],
    "service": {
      "description": "Sample Spring Boot API service that provides Zowe-conformant REST API",
      "homePageUrl": "https://sys1.acme.net:7554/casample/ui/v1/",
      "title": "Zowe Sample API Service"
    }
  },
  "instances": [
    {
      "instanceId": {
        "homePageUrl": "https://sys1.acme.net:10080/",
        "hostname": "sys1.acme.net",
        "customMetadata": {
          "zos.sysname": "SYS1",
        },
        "status": "UP"
      }
    }
  ],
  "serviceId": "zowesample",
  "status": "UP"
}
```
