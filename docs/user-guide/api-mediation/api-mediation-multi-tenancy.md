# Multitenancy Configuration

Zowe supports management of multiple tenants, whereby different tenants can serve different purposes or different customers. The use case for multi-tenant support is when a service provider manages sysplexes/monoplexes for multiple customers. This configuration makes it possible to have a single access point for all customers, and properly route and authenticate across different domains.

* [Overview of Central and Domain API MLs](#overview-of-central-and-domain-api-mls)
* [Multitenancy component enablement settings](#multitenancy-component-enablement-settings)
* [Onboarding a Domain Gateway service to the Central Discovery service](#onboarding-a-domain-gateway-service-to-the-central-discovery-service)
    * [Dynamic configuration via zowe.yaml](#dynamic-configuration-via-zoweyaml)
    * [Dynamic configuration via Environment variables](#dynamic-configuration-via-environment-variables)
    * [Validating successful configuration](#validating-successful-configuration)
* [Establishing a trust relationship between Domain API ML and Central API ML](#establishing-a-trust-relationship-between-domain-api-ml-and-central-api-ml)
  * [Commands to establish trust between Domain and Central API MLs](#commands-to-establish-trust-between-domain-and-central-api-mls)
* [Using the `/registry` endpoint in the Central Gateway](#using-the-registry-endpoint-in-the-central-gateway)
  * [Configuration for `/registry`](#configuration-for-registry)
  * [Authentication for `/registry`](#authentication-for-registry)
  * [Authorization with `/registry`](#authorization-with-registry)
  * [Requests with `/registry`](#requests-with-registry)
  * [Response with `/registry`](#response-with-registry)
  * [Response with `/registry{apimlId}`](#response-with-registryapimlid)
  * [Response with `GET /gateway/api/v1/registry/{apimlId}?apiId={apiId}&serviceId={serviceId}`](#response-with-get-gatewayapiv1registryapimlidapiidapiidserviceidserviceid)
* [Validating successful configuration with `/registry`](#validating-successful-configuration-with-registry)
* [Troubleshooting multitenancy configuration](#troubleshooting-multitenancy-configuration)
  * [ZWESG100W](#zwesg100w)
  * [No debug messages similar to apiml1 completed with onComplete are produced](#no-debug-messages-similar-to-apiml1-completed-with-oncomplete-are-produced)

## Overview of Central and Domain API MLs

The following diagram illustrates communication between the "central" API Mediation Layer and Zowe in multiple domains. Note that some API MLs may be running in a sysplex (HA), while others may be in a monoplex (non-HA).

![Multi-domain architecture diagram](./diagrams/multi-domain_architecture_V2.svg)

Domain-Central is where the "central" API ML is running, and may be on z/OS, or off z/OS, for example in Kubernetes. This API ML is referred to as the Central API ML.
The Central API ML serves as a single point of access to all API Mediation Layers registered in this Central API ML and, by extension, to all services registered in those secondary API MLs.

Domain-1 to Domain-N are z/OS systems with the standard Zowe API ML running either in HA (sysplex) or non-HA (monoplex). These API MLs are referred to as Domain API MLs.

## Multitenancy component enablement settings

In the multitenancy environment, certain Zowe components may be enabled, while others may be disabled. The multitenancy environment expects one Central API ML that handles the discovery and registration as well as routing to the API ML installed in specific domains. 

## Onboarding a Domain Gateway service to the Central Discovery service

The Central API ML can onboard Gateways of all domains. This service onboarding can be achieved similar to additional registrations of the Gateway. This section describes the dynamic configuration of the yaml file and environment variables, and how to validate successful configuration.

- [Dynamic configuration via zowe.yaml](#dynamic-configuration-via-zoweyaml)
- [Dynamic configuration via Environment variables](#dynamic-configuration-via-environment-variables)

### Dynamic configuration via zowe.yaml 

1. Set the following property for the Domain Gateway to dynamically onboard to the Central Discovery service.

    `components.gateway.apiml.service.additionalRegistration`

    Use the following example as a template for how to set the value of this property in zowe.yml.

    **Example:**
    ```
    components.gateway.apiml.service.additionalRegistration:
        # central API ML (in HA, for non-HA mode use only 1 hostname)
        - discoveryServiceUrls: https://sys1:   {discoveryServicePort}/eureka/,https://sys2:    {discoveryServicePort}/eureka/
    ```

    :::note Notes:
    * Ensure that each API ML instance is defined in a separated record. Do not combine multiple API ML instances in a single record. In the case of a high availability setup, the value `discoveryServiceUrls` may contain multiple URLs.

    * We highly recommend to provide all available Discovery URLs in the value `discoveryServiceUrls`.

    * Always provide the direct address to the system. Do not use the DVIPA address. Using this address could lead to unexpected behaviour.

    * Use hostnames `sys1` and `sys2` for the LPAR in the sysplex.
    :::

2. (Optional) Configure the Gateway to forward client certificates.   
Use this step to enable the domain gateway to use this client certificate for authentication. .  
Set the `certificatesUrl` property to ensure that only  Gateway-forwarded certificates are used for client certificate authentication. This URL returns a certificate chain from the central gateway.

    ```
    components.gateway.apiml.security.x509:
        # central gateway port 
        certificatesUrl: https://{centralGatewayHost}:{centralGatewayPort}/gateway/certificates
    ```

### Dynamic configuration via Environment variables

The list of additional registrations is extracted from environment variables. You can define a list of objects by following YML -> Environment translation rules. 

The previous example can be substituted with the following variables:

```
ZWE_CONFIGS_APIML_SERVICE_ADDITIONALREGISTRATION_0_DISCOVERYSERVICEURLS=https://sys1:{discoveryServicePort}/eureka/,https://sys2:{discoveryServicePort}/eureka/
```

:::note Notes:
  * The number in the properties names (see position of `#` in `ZWE_CONFIGS_APIML_SERVICE_ADDITIONALREGISTRATION_#_*`)
  defines ID of API ML instance.

  * Ensure that each API ML instance is defined in a separated record. Do not combine multiple API ML instances in a 
  single record. In the case of a high availability setup, the value `discoveryServiceUrls` may contain multiple URLs. 
  We highly recommend to provide all available Discovery URLs in the value `discoveryServiceUrls`.

  * Always provide the direct address to the system. Do not use the DVIPA address. Using this address could lead to unexpected behaviour.

  * Use hostnames `sys1` and `sys2` for the LPAR in the sysplex.
:::

This Zowe configuration transforms the zowe.yaml configuration file into the environment variables described previously. 

### Validating successful configuration

The corresponding Gateway service should appear in the Eureka console of the Central Discovery service. 

To see details of all instances of the ‘GATEWAY’ application, perform a **GET** call on the following endpoint of the Central Discovery service:

```
/eureka/apps
```

## Establishing a trust relationship between Domain API ML and Central API ML

For routing to work in a multitenancy configuration, the Central API Mediation Layer must trust the Domain API Mediation Layers for successful registration into the Discovery Service component.
The Domain API Mediation Layers must trust the Central API Mediation Layer Gateway to accept routed requests.
It is necessary that the root and, if applicable, intermediate public certificates be shared between the Central API Mediation Layer and Domain API Mediation Layers. 

The following diagram shows the relationship between the Central API ML and Domain API MLs. 

![Trust relation diagram](./diagrams/mt-trust-relations.png)

As presented in this example diagram, the Central API ML is installed on system X. Domain API MLs are installed on systems Y and Z.

To establish secure communications, "Domain APIML 1" and "Domain APIML 2" are using different private keys signed with different public keys. These API MLs do not trust each other.

In order for all Domain API MLs to register with the Central API ML, it is necessary that the Central API ML have all public keys from the certificate chains of all Domain API MLs:
* DigiCert Root CA
* DigiCert Root CA1
* DigiCert CA

These public keys are required for the Central API ML to establish trust with "Domain APIML 1" and "Domain APIML 2". 

The Central API ML uses a private key which is signed by the Local CA public key for secure communication. 

"Domain APIML 1" and "Domain APIML 2" require a Local CA public key in order to accept the routing requests from the Central API ML, otherwise the Central API ML requests will not be trusted by the Domain API MLs.
The diagram indicates all of the added certificates inside the red dashed lines.

### Commands to establish trust between Domain and Central API MLs

The following commands are examples of establishing a trust relationship between a Domain API ML and the Central API ML for both PKCS12 certificates and when using keyrings.

1. Import the root and, if applicable, the intermediate public key certificate of Domain API MLs running on systems Y and Z into the truststore of the Central API ML running on system X.

    - **PKCS12**
  
      <details>
      <summary>Click here for an example of keytool commands for PKCS12 certificates.</summary>

      For PKCS12 certificates, use the following example of keytool commands:
  
      `keytool -import -file sysy/keystore/local_ca/local_ca.cer -alias gateway_sysy -keystore sysx/keystore/localhost/localhost.truststore.p12`
  
      `keytool -import -file sysz/keystore/local_ca/local_ca.cer -alias gateway_sysz -keystore sysx/keystore/localhost/localhost.truststore.p12`

      </details>

    - **Keyring**
      
      For keyrings, use the following examples of commands specific to your ESM to add certificates from the dataset and connect these certificates to the keyring used by the Central API ML:

      <details>  
      <summary>Click here for command details for RACF. </summary>

      - **For RACF:**
      
        ```
        RACDCERT ADD('SHARE.SYSY.ROOTCA.CER') ID(ZWESVUSR) WITHLABEL('DigiCert Root CA') TRUST
        RACDCERT ADD('SHARE.SYSZ.INTERCA.CER') ID(ZWESVUSR) WITHLABEL('DigiCert CA') TRUST
        RACDCERT ID(ZWESVUSR) CONNECT(ID(ZWESVUSR) LABEL('DigiCert Root CA') RING(ZoweKeyring) USAGE(CERTAUTH))
        RACDCERT ID(ZWESVUSR) CONNECT(ID(ZWESVUSR) LABEL('DigiCert CA') RING(ZoweKeyring) USAGE(CERTAUTH))
        SETROPTS RACLIST(DIGTCERT, DIGTRING) REFRESH
        ```

        Verify:
        ```
        RACDCERT LISTRING(ZoweKeyring) ID(ZWESVUSR)
        ```

      </details>

      <details>
      <summary>Click here for command details for ACF2.</summary>

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
      
        Verify:
        ```
        SET PROFILE(USER) DIVISION(KEYRING)
        LIST LIKE(ZWESVUSR.-)
        ```
      </details>

      <details>
      <summary>Click here for command details for Top Secret.</summary>

      - **For TopSecret:**
      
        ```
        TSS ADD(CERTAUTH) DCDS(SHARE.SYSY.ROOTCA.CER)  DIGICERT(SYSYROOT) LABLCERT('DigiCert Root CA') TRUST
        TSS ADD(CERTAUTH) DCDS(SHARE.SYSZ.INTERCA.CER)  DIGICERT(SYSZINTR) LABLCERT('DigiCert CA') TRUST
        TSS ADD(ZWESVUSR) KEYRING(ZOWERING) RINGDATA(CERTAUTH,SYSYROOT) USAGE(CERTAUTH)
        TSS ADD(ZWESVUSR) KEYRING(ZOWERING) RINGDATA(CERTAUTH,SYSZINTR) USAGE(CERTAUTH)
        ```

        Verify:
        ```
        TSS LIST(ZWESVUSR) KEYRING(ZOWERING)
        ```
      </details>

2. Import root and, if applicable, intermediate public key certificates of the Central API ML running on system X into the truststore of the Domain API MLs running on systems Y and Z.

    - **PKCS12**

      <details>
      <summary>Click here for example keytool commands for PKCS12 certificates.</summary>

      For PKCS12 certificates, use the following example of the keytool commands:

      `keytool -import -file x/keystore/local_ca/local_ca.cer -alias gateway_x -keystore y/keystore/localhost/localhost.truststore.p12`

      `keytool -import -file x/keystore/local_ca/local_ca.cer -alias gateway_x -keystore z/keystore/localhost/localhost.truststore.p12`
  
      </details>

    - **Keyring**

      For keyring certificates, use the following examples of commands specific to your ESM to add certificates from the dataset, and connect these certificates to the keyrings used by Domain API MLs:

      <details>
      <summary>Click here for command details for RACF.</summary>
  
      - **For RACF:**
  
      ```
      RACDCERT ADD('SHARE.SYSX.ROOTCA.CER') ID(ZWESVUSR) WITHLABEL('Local CA') TRUST
      RACDCERT ID(ZWESVUSR) CONNECT(ID(ZWESVUSR) LABEL('Local CA') RING(ZoweKeyring) USAGE(CERTAUTH))
      SETROPTS RACLIST(DIGTCERT, DIGTRING) REFRESH
      ```

      Verify:
      ```
      RACDCERT LISTRING(ZoweKeyring) ID(ZWESVUSR)
      ```

      </details>

      <details>
      <summary>Click here for command details for ACF2.</summary>

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

      Verify:
      ```
      SET PROFILE(USER) DIVISION(KEYRING)
      LIST LIKE(ZWESVUSR.-)
      ```

      </details>

      <details>
      <summary>Click here for command details for Top Secret.</summary>

      - **For Top Secret:**
  
      ```
      TSS ADD(CERTAUTH) DCDS(SHARE.SYSX.ROOTCA.CER)  DIGICERT(SYSXROOT) LABLCERT('Local CA') TRUST
      TSS ADD(ZWESVUSR) KEYRING(ZOWERING) RINGDATA(CERTAUTH,SYSXROOT) USAGE(CERTAUTH)
      ```

      Verify:
      ```
      TSS LIST(ZWESVUSR) KEYRING(ZOWERING)
      ```

      </details>

You completed certificates setup for multitenancy configuration, whereby Domain API MLs can trust the Central API ML and vice versa.

## Using the `/registry` endpoint in the Central Gateway

The `/registry` endpoint provides information about services onboarded to all Domain Gateways (all domains and the central one). This section describes the configuration, authentication, authorization, example of requests, and responses when using the `/registry` endpoint. 

### Configuration for `/registry`

The `/registry` endpoint is disabled by default. Use the configuration property `apiml.gateway.registry.enabled=true` or
environment variable `APIML_GATEWAY_REGISTRY_ENABLED=TRUE` to enable this feature.

### Authentication for `/registry`

The `/registry` endpoint is authenticated by the client certificate. The Central Gateway accepts certificates that are trusted. The username is obtained from the common name of the client certificate.

Unsuccessful authentication returns a 401 error code.

### Authorization with `/registry`

Only users configured by the following environment variable are allowed to use the `/registry` endpoint.

`APIML_SECURITY_X509_REGISTRY_ALLOWEDUSERS=USER1,user2,User3`

This parameter makes it possible to set multiple users as a comma-separated list.

Unsuccessful authorization returns a 403 error code. 

### Requests with `/registry`

There are two endpoints that provide information about services registered to the API ML. One endpoint is for all domains, and the other endpoint is for the specific domain. Choose from the following **GET** calls:

* `GET /gateway/api/v1/registry`  
This request lists services in all domains.

* `GET /gateway/api/v1/registry/{apimlId}`  
This request lists services in the apimlId domain.

* `GET /gateway/api/v1/registry/{apimlId}?apiId={apiId}&serviceId={serviceId}`  
  This request gets the specific service in the specific apimlId domain.

### Response with `/registry`

<details>
<summary>Click here for an example response with `/registry`. </summary>

**Example:**

```
[
    {
        "apimlId": "apiml1",
        "services": [
            {
                "status": "UP",
                "customMetadata": {
                    "zos.sysname": "sys1",
		            "zos.sysplex": "sysplex"
                },
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
                "customMetadata": {
                    "zos.sysname": "sys2",
		            "zos.sysplex": "sysplex"
				},
                "apiId": [
                    "zowe.apiml.gateway"
                ],
                "serviceId": "gateway"
            },
            {
                "status": "UP",
                "customMetadata": {
                    "zos.sysname": "sys2",
 		            "zos.sysplex": "sysplex"
 		        },
                "apiId": [
                    "zowe.apiml.catalog"
                ],
                "serviceId": "catalog"
            }
        ]
    }
]
```

</details>

### Response with `/registry{apimlId}`

This response should contain information about all services in a specific domain.

<details>
<summary>Click here for an example response with `/registry{apimlId}`.</summary>

**Example:**

* `GET /gateway/api/v1/registry/apiml2`

```
[
    {
        "apimlId": "apiml2",
        "services": [
            {
                "status": "UP",
                "customMetadata": {
                    "zos.sysname": "sys2",
	 	            "zos.sysplex": "sysplex"
				},
                "apiId": [
                    "zowe.apiml.gateway"
                ],
                "serviceId": "gateway"
            },
            {
                "status": "UP",
                "customMetadata": {
                    "zos.sysname": "sys2",
		            "zos.sysplex": "sysplex"
				},
                "apiId": [
                    "zowe.apiml.catalog"
                ],
                "serviceId": "catalog"
            }
        ]
    }
]
```

</details>

### Response with `GET /gateway/api/v1/registry/{apimlId}?apiId={apiId}&serviceId={serviceId}`

This response should contain information about a specific service in a specific domain.

<details>
<summary>Click here for an example of a response with `GET /gateway/api/v1/registry/{apimlId}?apiId={apiId}&serviceId={serviceId}`. </summary>

**Example:**

* `GET /gateway/api/v1/registry/apiml2?apiId=zowe.apiml.gateway&serviceId=catalog`

```
 [
    {
        "apimlId": "apiml2",
        "services": [
            {
                "status": "UP",
                "customMetadata": {
                    "zos.sysname": "sys2",
		             "zos.sysplex": "sysplex"
                },
                "apiId": [
                    "zowe.apiml.catalog"
                ],
                "serviceId": "catalog"
            }
        ]
    }
]
```

</details>

## Validating successful configuration with `/registry`

Use the `/registry` endpoint to validate successful configuration. The response should contain all Domain API MLs represented by `apimlId`, and information about onboarded services.


## Troubleshooting multitenancy configuration

### ZWESG100W

Cannot receive information about services on API Gateway with apimlId 'apiml1' because: Received fatal alert: certificate_unknown; nested exception is javax.net.ssl.SSLHandshakeException: Received fatal alert: certificate_unknown

**Reason**  
The trust between the domain and the central Gateway was not established. 

**Action**  
Review your certificate configuration.

### No debug messages similar to apiml1 completed with onComplete are produced

 **Reason**  
 Domain Gateway is not correctly onboarded to Discovery Service in Central API ML. 
 
 **Action**  
 Review Gateway static definition. Check the Central Discovery Service dashboard if the domain Gateway is displayed. 
