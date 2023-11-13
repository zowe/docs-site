# Zowe MultiTenancy Configuration

Zowe supports management of multiple sysplexes with different sysplexes serving different purposes or different customers. E.g. in case of a service provider managing sysplexes for multiple customers. This configuration allows you to have single access point for all the customers and properly route and authenticate for different sysplexes. 

## Component Layout example

The following bullets describe which Zowe components should be enabled and disabled in the multi-tenancy environment. The multi-tenancy environment expects one central API ML that handles the discovery and registration as well as routing to the API ML installed in the specific sysplexes. As such we need different setups for the V2 version of the API ML on the central node and on the specific customer environments. 

- Domain API ML
  - Gateway and Discovery Service: **enabled**
  - Cloud Gateway: **disabled**
- Central API ML
  - Cloud Gateway and Discovery Service: **enabled**
  - Gateway: **disabled**

## Onboard domain Gateways to the central Cloud Gateway

The Cloud Gateway must onboard all domain Gateways. This can be done dynamically or by the static definition. We strongly recommend using dynamic onboarding as it adapts better to the potentially changing customer's environments. The static onboarding doesn't provide the functionality to actively monitor the health of the specific services. E.g. domain gateways in this case. 

### Dynamic Onboarding (preferred way)

Users must set the following property for all domain Gateways to dynamically onboard to the Discovery Service in the central cluster:

`components.gateway.apiml.service.additionalRegistration`

Use the following example as a reference on how to set the value for this property in zowe.yml.

**Example:**
```
components.gateway.apiml.service.additionalRegistration:
    # central API ML (in HA, for non-HA mode use only 1 hostname)
       - discoveryServiceUrls:      https://ca32.lvn.broadcom.net:27554/eureka/,https://ca32.lvn.broadcom.net:37554/eureka/
 	    routes:
              - gatewayUrl: /
                serviceUrl: /
```

:::note
The Gateway service may need to provide different routing patterns for the central discovery service. This metadata could be the same for every cluster.
:::

### Static Onboarding (deprecated)

Alternatively, you can statically onboard all domain Gateways on the Central Discovery service.

Make sure that the following parameters are correctly specified in the static definition file:

- **services.serviceId**  
  Specify this parameter to GATEWAY
- **services.instanceBaseUrls**  
  Specifies the URL of the Domain Gateway
- **services.customMetadata.apiml.service.apimlId**  
  Specifies the id of the API ML environment

Use the example in the section A.

## Establish a trust relationship between domain Gateways and the Cloud Gateway

The following keytool commands are examples of establishing a trust relationship between domain Gateways and the Cloud Gateway.

- Import the public key certificate of all domain Gateways into the truststore of the Cloud Gateway.

  The following keytool command is an example when the domain Gateways running on CA11 and CA32 import the certificate into Cloud Gateway running on CA31:

  `keytool -import -file keystore/ca11/local_ca/local_ca.cer -alias gateway_ca11 -keystore keystore/ca31/localhost/localhost.truststore.p12`

  `keytool -import -file keystore/ca32/local_ca/local_ca.cer -alias gateway_ca32 -keystore keystore/ca31/localhost/localhost.truststore.p12`

- Import public key certificate of the Cloud Gateway into the truststore of all domain Gateways.

  The following keytool command is an example when the certificate of the Cloud Gateway running on CA31 is imported into the truststore of the domain Gateways running on CA11 and CA32:

  `keytool -import -file keystore/ca31/local_ca/local_ca.cer -alias gateway_ca31 -keystore keystore/ca11/localhost/localhost.truststore.p12`

  `keytool -import -file keystore/ca31/local_ca/local_ca.cer -alias gateway_ca31 -keystore keystore/ca32/localhost/localhost.truststore.p12`

## Use the /registry endpoint in Cloud Gateway

The /registry endpoint provides information about services onboarded to all domain Gateways and the Central Gateway.

### Configuration

The `/registry` endpoint is disabled by default. Use the following environment variable to enable this feature:

`APIML_CLOUDGATEWAY_REGISTRY_ENABLED=TRUE`

### Authentication
The `/registry` endpoint is authenticated by the client certificate. Cloud Gateway accepts certificates that are trusted. The user name is obtained from the common name of the client certificate.

Unsuccessful authentication returns a 401 error code.

### Authorization
Only the users configured by the following environment variable are allowed to use the `/registry` endpoint.

`APIML_SECURITY_X509_REGISTRY_ALLOWEDUSERS=USER1,user2,User3`

This parameter allows the setting of multiple users as a comma-separated list.

Unsuccessful authorization returns a 403 error code. 

### Get Information

There are two endpoints providing the information about the services registered to the API ML. One for all domains and another for the specific domain. The details are below.

#### Requests

GET /cloud-gateway/api/v1/registry              List services in all domains
GET /cloud-gateway/api/v1/registry/{apimlId}    List services in apimlId domain

#### Response

**Example:**

```
[
    {
        "apimlId": "apiml1",
        "services": [
            {
                "status": "UP",
                "customMetadata": {},
                "apiId": [
        "zowe.apiml.gateway"
],
                "serviceId": "gateway"
            }
        ]
    },
    {
        "apimlId": "apiml2",
        "services": [
            {
                "status": "UP",
                "customMetadata": {},
                "apiId": [
        "zowe.apiml.gateway"
],
                "serviceId": "gateway"
            }
        ]
]
```

## Validate successful configuration

Use the `/registry` endpoint to validate successful configuration. The response should contain all API ML domains represented by `apimlId`, and information about onboarded services.

## Troubleshooting


### ZWESG100W  

Cannot receive information about services on API Gateway with apimlId 'Gateway-CA32' because: Received fatal alert: certificate_unknown; nested exception is javax.net.ssl.SSLHandshakeException: Received fatal alert: certificate_unknown

**Reason**  
The trust between the domain and the Cloud Gateway was not established. 

**Action**  
Review your certificate configuration.

### No debug messages similar to Gateway-CA32 completed with onComplete are produced

 **Reason**  
 Domain Gateway is not correctly onboarded to Discovery Service in Central API ML. 
 
 **Action**  
 Review Gateway static definition. Check the Central Discovery Service dashboard if the domain Gateway is displayed. 

## Onboarding domain cloud-gateway service to central discovery service

The central Cloud Gateway can onboard Cloud Gateways of all domains. This can be achieved similar to additional registrations of the Gateway:

- Dynamic configuration via zowe.yaml
- Dynamic configuration via Environment variables

### Configurations

#### Dynamic configuration: YML

Users must set the following property for the domain cloud-gateway to dynamically onboard to central Discovery Service.

`components.cloud-gateway.apiml.service.additionalRegistration`

Use the following example as a reference on how to set the value for this property in zowe.yml.

**Example:**
```
components.cloud-gateway.apiml.service.additionalRegistration:
    # central API ML (in HA, for non-HA mode use only 1 hostname)
       - discoveryServiceUrls:      https://ca32.lvn.broadcom.net:27554/eureka/,https://ca32.lvn.broadcom.net:37554/eureka/
 	    routes:
              - gatewayUrl: /
                serviceUrl: /
```

#### Dynamic configuration: Environment variables

The list of additional registrations is extracted from environment variables. You can define a list of objects by following YML->Environment translation rules. 

The previous example can be substituted with the following variables:

```
ZWE_CONFIGS_APIML_SERVICE_ADDITIONALREGISTRATION_0_DISCOVERYSERVICEURLS=https://ca32.lvn.broadcom.net:27554/eureka/,https://ca32.lvn.broadcom.net:37554/eureka/
ZWE_CONFIGS_APIML_SERVICE_ADDITIONALREGISTRATION_0_ROUTES_0_GATEWAYURL=/
ZWE_CONFIGS_APIML_SERVICE_ADDITIONALREGISTRATION_0_ROUTES_0_SERVICEURL=/
```

### Validate successful configuration

The corresponding ‘Cloud-Gateway’ service should appear in the eureka console of the central discovery service. 

To see all instances details of the ‘CLOUD-GATEWAY’ application, perform a GET call on the following endpoint of the central discovery service:

```
/eureka/apps
```
 
## A. Gateway static definition example
This file should be stored together with other statically onboarded services. The default location is `/zowe/runtime/instance/workspace/api-mediation/api-defs/`. The filename can be anything and the file extension must be yml.

```
#
# Static definition of "discoverable-client" as "staticclient"
#
# This file provides static API service definition in YAML format.
# It is loaded by the Discovery Service during its startup.
#
services:
   - serviceId: GATEWAY  # unique lowercase ID of the service
     catalogUiTileId: static  # ID of the API Catalog UI tile (visual grouping of the services)
     title: Statically Defined API Service  # Title of the service in the API catalog
     description: Sample to demonstrate how to add an API service with Swagger to API Catalog using a static YAML definition  # Description of the service in the API catalog
     instanceBaseUrls:  # list of base URLs for each instance
         - https://ca32.lvn.broadcom.net:27554/  # scheme://hostname:port/contextPath
     homePageRelativeUrl: / # Normally used for informational purposes for other services to use it as a landing page
     statusPageRelativeUrl: /application/info  # Appended to the instanceBaseUrl
     healthCheckRelativeUrl: /application/health  # Appended to the instanceBaseUrl
     routes:
         - gatewayUrl: api/v1  # [api/ui/ws]/v{majorVersion}
           serviceRelativeUrl: /api/v1 # relativePath that is added to baseUrl of an instance
         - gatewayUrl: ui/v1
           serviceRelativeUrl: /
         - gatewayUrl: ws/v1
           serviceRelativeUrl: /ws
       # List of APIs provided by the service (currently only one is supported):
     apiInfo:
         - apiId: zowe.apiml.gateway
           gatewayUrl: api/v1
           swaggerUrl: https://localhost:10012/discoverableclient/v2/api-docs
     customMetadata:
         apiml:
             service.apimlId: Gateway-CA32
             okToRetryOnAllOperations: true


   - serviceId: GATEWAY  # unique lowercase ID of the service
     catalogUiTileId: static  # ID of the API Catalog UI tile (visual grouping of the services)
     title: Statically Defined API Service  # Title of the service in the API catalog
     description: Sample to demonstrate how to add an API service with Swagger to API Catalog using a static YAML definition  # Description of the service in the API catalog
     instanceBaseUrls:  # list of base URLs for each instance
         - https://ca11.lvn.broadcom.net:27554/  # scheme://hostname:port/contextPath
     homePageRelativeUrl: / # Normally used for informational purposes for other services to use it as a landing page
     statusPageRelativeUrl: /application/info  # Appended to the instanceBaseUrl
     healthCheckRelativeUrl: /application/health  # Appended to the instanceBaseUrl
     routes:
         - gatewayUrl: api/v1  # [api/ui/ws]/v{majorVersion}
           serviceRelativeUrl: /api/v1 # relativePath that is added to baseUrl of an instance
         - gatewayUrl: ui/v1
           serviceRelativeUrl: /
         - gatewayUrl: ws/v1
           serviceRelativeUrl: /ws
         # List of APIs provided by the service (currently only one is supported):
     apiInfo:
         - apiId: zowe.apiml.gateway
           gatewayUrl: api/v1
           swaggerUrl: https://localhost:10012/discoverableclient/v2/api-docs
     customMetadata:
         apiml:
             service.apimlId: Gateway-CA11
             okToRetryOnAllOperations: true


# List of tiles that can be used by services defined in the YAML file:
catalogUiTiles:
   static:
       title: Static API Services
       description: Services which demonstrate how to make an API service discoverable in the APIML ecosystem using YAML definitions

```
