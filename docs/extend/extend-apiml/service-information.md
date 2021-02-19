# Obtaining Information about API Services

As an API Mediation Layer user, information about API services can be obtained for various purposes. The following list presents some of the use cases for using the API Mediation Layer:

- To display available services based on a particular criterion (API ID, hostname, or custom metadata)
- To locate a specific API service based on one or more specific criteria (for example the API ID)
- To obtain information that permits routing through the API Gateway such as _baseUrl_ or _basePath_
- To obtain information about an API service, the service APIs, or instances of the service

This article provides further detail about each of these use cases.

- [API ID in the API Mediation Layer](#api-id-in-the-api-mediation-layer)
- [Protection of Service Information](#protection-of-service-information)
- [API Endpoints](#api-endpoints)
  - [Obtain Information about a  Specific Service](#obtain-information-about-a-specific-service)
  - [Obtain Information about All Services](#obtain-information-about-all-services)
  - [Obtain Information about All Services with a Specific API ID](#obtain-information-about-all-services-with-a-specific-api-id)

## API ID in the API Mediation Layer

The _API ID_ uniquely identifies the API in the API ML. The API ID can be used to locate the same APIs that are provided by different service instances. The API developer defines this ID.

For more information about _baseUrl_ or _basePath_, see [Components of URL](api-mediation-components-of-URL.md).

## Protection of Service Information

Information about API services is considered sensitive as it contains partial information about the internal topology of the mainframe system. As such, this information should be made accessible only by authorized users and services.

Access to this information requires authentication using mainframe credentials, and a SAF resource check is done. The resource class and resource is defined in the `ZWESECUR` job. You can find more details about the `ZWESECUR` job in [Configuring the z/OS system for Zowe](../../user-guide/configure-zos-system.md).

The security administrator needs to permit READ access to the `APIML.SERVICES` resource in the `ZOWE` resource class to the your that can access the information about API services.

In IBM RACF, the access to the service information can be given by:

```txt
PERMIT APIML.SERVICES CLASS(ZOWE) ID(user) ACCESS(READ)
```

In CA Top Secret:

```txt
TSS PERMIT(user) ZOWE(APIML.SERVICES) ACCESS(READ)
```

In ACF2:

```txt
SET RESOURCE(ZWE)
RECKEY APIML ADD(SERVICES SERVICE(READ) ROLE(user) ALLOW)
F ACF2,REBUILD(ZWE)
```

## API Endpoints

### Obtain Information about a Specific Service

Use the following method to get information about a specific service:

`GET /gateway/api/v1/services/{serviceId}`

where:

- **`{serviceId}`** is the service ID of the API service (Example: `apicatalog`)

This method returns a JSON response that describes the service. For more information, see [Response Format](#response-format).

### Obtain Information about All Services

Use the following method to get information about all services:

`GET /gateway/api/v1/services`

This method returns a JSON response with a list of all services. For more information, see [Response Format](#response-format).

### Obtain Information about All Services with a Specific API ID

Use the following method to get information about all services with a specific API ID:

`GET /gateway/api/v1/services?apiId={apiId}`

where:

- **`{apiId}`** is the API ID that represents required API (e.g. `zowe.apiml.apicatalog`)

This method returns a JSON response with a list of services provided by a specified API ID. For more information, see [Response Format](#response-format).

### Response Format

This section provides basic information about the structure of the response. The full reference on the field in the response is presented in the API Catalog.

The `apiml` section provides information about the following points:

- The service in the `service` subsection is displayed.
- The APIs that are provided by the service in the `apiInfo` section. This section presents each major API version that is provided by at least one instance. For each major version, the lowest minor version is displayed.
- The authentication methods that are supported by all instances are displayed.

API clients can use this information to locate the API based on API ID. `baseUrl` or `basePath` are used to access the API through the API Gateway.

The `instances` section contains more details about the instances of the service. An API service can provide more application specific details in `customMetadata` that can be used by API clients. Do not use information in this section for use cases that API Gateway supports, such as routing or load balancing.

**Example:**

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
