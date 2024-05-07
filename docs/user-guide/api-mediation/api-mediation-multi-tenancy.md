# Routing MultiTenancy Configuration

Zowe supports management of multiple sysplexes whereby different sysplexes can serve different purposes or different customers. The use case for multi-sysplex support is when a service provider manages sysplexes for multiple customers. This configuration makes it possible to have a single access point for all customers, and properly route and authenticate across different sysplexes. 

## Component Layout example

In the multi-tenancy environment, certain Zowe components may be enabled, while others may be disabled. The multi-tenancy environment expects one central API ML that handles the discovery and registration as well as routing to the API ML installed in specific sysplexes. As such, different setups are required for the V2 version of the API ML on the central node and on the specific customer environments. 

When using a multi-tenancy environment, ensure that the following Zowe components are either enabled or disabled:

- Domain API ML
  - Gateway and Discovery Service: **enabled**
  - Cloud Gateway: **disabled**

- Central API ML
  - Cloud Gateway and Discovery Service: **enabled**
  - Gateway: **disabled**

## Onboarding Domain Gateways to the central Cloud Gateway

The Cloud Gateway must onboard all domain Gateways. This can be done dynamically or by the static definition. We strongly recommend using dynamic onboarding as this onboarding method adapts better to the potentially changing environments of the customer. Static onboarding does not provide the functionality to actively monitor the health of the specific services (e.g. domain gateways).  

### Dynamic Onboarding (recommended) for domain Gateways

To dynamically onboard to the Discovery Service in the central cluster, set the following property for all domain Gateways:

`components.gateway.apiml.service.additionalRegistration`

Use the following example as a template for how to set the value for this property in zowe.yml.

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
It is not necessary for the Gateway service to provide different routing patterns for the central discovery service. These metadata can be the same for every cluster.
:::

### Static Onboarding for domain Gateways (deprecated)

Alternatively, you can statically onboard all domain Gateways on the Central Discovery service. Note that dynamic onboarding is the preferred method.

For static onboarding, make sure that the following parameters are correctly specified in the static definition file:

- **services.serviceId**  
  Specify this parameter to GATEWAY
- **services.instanceBaseUrls**  
  Specifies the URL of the Domain Gateway
- **services.customMetadata.apiml.service.apimlId**  
  Specifies the id of the API ML environment

For static onboarding, be sure to use the [Gateway static definition example](#gateway-static-definition-example) presented at the end of this article.

## Establishing a trust relationship between Domain API ML and the Central API ML

For routing to work in a MultiTenancy configuration, the Central API ML must trust the Domain API ML, and vice versa for registration.
In other words it is necessary that the root and, if applicable, intermediate public certificates be shared between Central API ML and Domain API ML. 

The following example describes this relationship. 

![Trust relation diagram](./diagrams/mt-trust-relations.png)

On this example diagram:

Central APIML is installed on system X, Domain APIMLs are installed on system Y and Z.
For secure communication Domain APIML 1 and 2 are using different private keys signed with different public keys (they don't trust each other).
Central APIML should have all public keys from the certificate chain of all Domain APIMLs (DigiCert Root CA, DigiCert Root CA1, DigiCert CA) added to its truststore to be able to register them, otherwise Central APIML will not trust them.
Central APIML is using a private key which is sign by Local CA public key for secure communication. 
Domain APIML 1 and 2 should have Local CA public key to be able to accept the routing requests from Central APIML, otherwise Domain APIMLs will not trust it.
On this diagram you can see all added certificates surrounded by red dashed line.

The following commands are examples of establishing a trust relationship between Domain API ML and the Central API ML for both PKCS12 certificates and when using keyrings.

1. Import the root and, if applicable, the intermediate public key certificate of Domain API MLs running on systems Y and Z into the truststore of the Central API ML running on system X.

  - **PKCS12**
  
    For PKCS12 certificates, use the following example of  keytool commands:
  
    `keytool -import -file sysy/keystore/local_ca/local_ca.cer -alias gateway_sysy -keystore sysx/keystore/localhost/localhost.truststore.p12`
  
    `keytool -import -file sysz/keystore/local_ca/local_ca.cer -alias gateway_sysz -keystore sysx/keystore/localhost/localhost.truststore.p12`

  - **Keyring**
      
    For keyrings, use the following examples of commands specific to your ESM to add certificates from the dataset and connect them to the keyring used by Central API ML:
        
    - **For RACF:**
      
      ```
      RACDCERT ADD('SHARE.SYSY.ROOTCA.CER') ID(ZWESVUSR) WITHLABEL('DigiCert Root CA') TRUST
      RACDCERT ADD('SHARE.SYSZ.INTERCA.CER') ID(ZWESVUSR) WITHLABEL('DigiCert CA') TRUST
      RACDCERT ID(ZWESVUSR) CONNECT(ID(ZWESVUSR) LABEL('DigiCert Root CA') RING(ZoweKeyring) USAGE(CERTAUTH))
      RACDCERT ID(ZWESVUSR) CONNECT(ID(ZWESVUSR) LABEL('DigiCert CA') RING(ZoweKeyring) USAGE(CERTAUTH))
      SETROPTS RACLIST(DIGTCERT, DIGTRING) REFRESH
      ```

    - **For ACF2:**
      
      ```
      ACF
      SET PROFILE(USER) DIV(CERTDATA)
      INSERT CERTAUTH.SYSYROOT DSNAME('SHARE.SYSY.ROOTCA.CER') LABEL(DigiCert Root CA) TRUST
      INSERT CERTAUTH.SYSZINTR DSNAME('SHARE.SYSZ.INTERCA.CER') LABEL(DigiCert CA) TRUST
      F ACF2,REBUILD(USR),CLASS(P),DIVISION(CERTDATA)
      
      SET PROFILE(USER) DIVISION(KEYRING)
      CONNECT CERTDATA(CERTAUTH.SYSYROOT) LABEL(DigiCert Root CA) KEYRING(ZWESVUSR.ZOWERING) USAGE(CERTAUTH)
      CONNECT CERTDATA(CERTAUTH.SYSZINTR) LABEL(DigiCert CA) KEYRING(ZWESVUSR.ZOWERING) USAGE(CERTAUTH)
      F ACF2,REBUILD(USR),CLASS(P),DIVISION(KEYRING)
      ```
      
    - **For TopSecret:**
      
      ```
      TSS ADD(CERTAUTH) DCDS(SHARE.SYSY.ROOTCA.CER)  DIGICERT(SYSYROOT) LABLCERT('DigiCert Root CA') TRUST
      TSS ADD(CERTAUTH) DCDS(SHARE.SYSZ.INTERCA.CER)  DIGICERT(SYSZINTR) LABLCERT('DigiCert CA') TRUST
      TSS ADD(ZWESVUSR) KEYRING(ZOWERING) RINGDATA(CERTAUTH,SYSYROOT) USAGE(CERTAUTH)
      TSS ADD(ZWESVUSR) KEYRING(ZOWERING) RINGDATA(CERTAUTH,SYSZINTR) USAGE(CERTAUTH)
      ```

2. Import root and, if applicable, intermediate the public key certificate of the Central API ML running on system X into the truststore of the Domain API MLs running on system Y and Z.

  - **PKCS12**

    For PKCS12 certificates, use the following example of the keytool commands:

    `keytool -import -file x/keystore/local_ca/local_ca.cer -alias gateway_x -keystore y/keystore/localhost/localhost.truststore.p12`

    `keytool -import -file x/keystore/local_ca/local_ca.cer -alias gateway_x -keystore z/keystore/localhost/localhost.truststore.p12`
  
  - **Keyring**

     For keyring certificates, use the following examples of commands specific to your ESM to add certificates from the dataset and connect them to the keyrings used by Domain API MLs:
  
    - **For RACF:**
  
      ```
      RACDCERT ADD('SHARE.SYSX.ROOTCA.CER') ID(ZWESVUSR) WITHLABEL('Local CA') TRUST
      RACDCERT ID(ZWESVUSR) CONNECT(ID(ZWESVUSR) LABEL('Local CA') RING(ZoweKeyring) USAGE(CERTAUTH))
      SETROPTS RACLIST(DIGTCERT, DIGTRING) REFRESH
      ```
  
    - **For ACF2:**
  
      ```
      ACF
      SET PROFILE(USER) DIV(CERTDATA)
      INSERT CERTAUTH.SYSXROOT DSNAME('SHARE.SYSX.ROOTCA.CER') LABEL(Local CA) TRUST
      F ACF2,REBUILD(USR),CLASS(P),DIVISION(CERTDATA)
      
      SET PROFILE(USER) DIVISION(KEYRING)
      CONNECT CERTDATA(CERTAUTH.SYSXROOT) LABEL(Local CA) KEYRING(ZWESVUSR.ZOWERING) USAGE(CERTAUTH)
      F ACF2,REBUILD(USR),CLASS(P),DIVISION(KEYRING)
      ```
  
    - **For TopSecret:**
  
      ```
      TSS ADD(CERTAUTH) DCDS(SHARE.SYSX.ROOTCA.CER)  DIGICERT(SYSXROOT) LABLCERT('Local CA') TRUST
      TSS ADD(ZWESVUSR) KEYRING(ZOWERING) RINGDATA(CERTAUTH,SYSXROOT) USAGE(CERTAUTH)
      ```

## Using the /registry endpoint in Cloud Gateway

The `/registry` endpoint provides information about services onboarded to all domain Gateways and the Central Gateway. This section describes the configuration, authentication, authorization, example of requests, and responses when using the `/registry` endpoint. 

### Configuration for `/registry`

The `/registry` endpoint is disabled by default. Use the following environment variable to enable this feature:

`APIML_CLOUDGATEWAY_REGISTRY_ENABLED=TRUE`

### Authentication for `/registry`
The `/registry` endpoint is authenticated by the client certificate. Cloud Gateway accepts certificates that are trusted. The user name is obtained from the common name of the client certificate.

Unsuccessful authentication returns a 401 error code.

### Authorization with `/registry`
Only users configured by the following environment variable are allowed to use the `/registry` endpoint.

`APIML_SECURITY_X509_REGISTRY_ALLOWEDUSERS=USER1,user2,User3`

This parameter makes it possible to set multiple users as a comma-separated list.

Unsuccessful authorization returns a 403 error code. 

### Requests with `/registry`

There are two endpoints that provide information about services registered to the API ML. One endpoint is for all domains, and the other endpoint is for the specific domain. Choose from the following **GET** calls:

* `GET /cloud-gateway/api/v1/registry`  
This request lists services in all domains.

* `GET /cloud-gateway/api/v1/registry/{apimlId}`  
This request lists services in the apimlId domain.

### Response with `/registry`

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

## Validate successful configuration with `/registry`

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

## Onboarding a domain cloud-gateway service to central discovery service

The central Cloud Gateway can onboard Cloud Gateways of all domains. This service onboarding can be achieved similar to additional registrations of the Gateway. This section describes the dynamic configuration of the yaml file and environment variables, and how to validate successful configuration.

- Dynamic configuration via zowe.yaml
- Dynamic configuration via Environment variables

### Dynamic Configurations to the central Discovery Service

#### Dynamic configuration: YML

Users must set the following property for the domain cloud-gateway to dynamically onboard to the central Discovery Service.

`components.cloud-gateway.apiml.service.additionalRegistration`

Use the following example as a template for how to set the value of this property in zowe.yml.

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

This Zowe configuration transforms the zowe.yaml configuration file into the environment variables that are shown above. 

### Validating successful configuration

The corresponding ‘Cloud-Gateway’ service should appear in the Eureka console of the central discovery service. 

To see details of all instances of the ‘CLOUD-GATEWAY’ application, perform a **GET** call on the following endpoint of the central discovery service:

```
/eureka/apps
```
 
## Gateway static definition example
This file should be stored together with other statically onboarded services. The default location is `/zowe/runtime/instance/workspace/api-mediation/api-defs/`. There is no naming restriction of the filename, but the file extension must be yml.

**Example:**
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
