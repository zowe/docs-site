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

It returns a JSON response that describes the - see [Response Format](#response-format).

### Obtain Information about All Services

TODO

### Obtain Information about All Services with a Specific AP ID

TODO

### Response Format

This documentation provides basic information about the structure of the response. Full reference on the field in the response is in the API Catalog.

TODO
