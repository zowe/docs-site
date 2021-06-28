# Onboard a REST API without code changes required

As a user of Zowe&trade;, onboard an existing REST API service to the Zowe&trade; API Mediation Layer without changing the code of the API service. This form of onboarding is also refered to as, "static onboarding".

**Note:** When developing a new service, it is not recommended to onboard a REST service using this method, as this method is non-native to the API Mediation Layer. For a complete list of methods to onboard a REST service natively to the API Mediation Layer, see the [Onboarding Overview](onboard-overview.md#service-onboarding-guides).

The following procedure outlines the steps to onboard an API service through the API Gateway in the API Mediation Layer without requiring code changes.

* [Identify the API that you want to expose](#identify-the-api-that-you-want-to-expose)
* [Route your API](#route-your-api)
* [Define your service and API in YAML format](#define-your-service-and-api-in-yaml-format)
* [Customize configuration parameters](#customize-configuration-parameters)
* [Add and validate the definition in the API Mediation Layer running on your machine](#add-and-validate-the-definition-in-the-api-mediation-layer-running-on-your-machine)
* [Add a definition in the API Mediation Layer in the Zowe runtime](#add-a-definition-in-the-api-mediation-layer-in-the-zowe-runtime)
* [(Optional) Check the log of the API Mediation Layer](#optional-check-the-log-of-the-api-mediation-layer)
* [(Optional) Reload the services definition after the update when the API Mediation Layer is already started](#optional-reload-the-services-definition-after-the-update-when-the-api-mediation-layer-is-already-started)

**Tip:** For more information about the structure of APIs and which APIs to expose in the Zowe API Mediation Layer, see the [Onboarding Overview](onboard-overview.md).

## Identify the APIs that you want to expose

The first step in API service onboarding is to identify the APIs that you want to expose.

**Follow these steps:**

1. Identify the following parameters of your API service:
    * Hostname
    * Port
    * (Optional) base path where the service is available.
    This URL is called the base URL of the service.

    **Example:**

    In the sample service described in the [Onboarding Overview](onboard-overview.md#sample-rest-api-service), the URL of the service is: `http://localhost:8080`.

2. Identify the API of the service that you want to expose through the API Gateway.

    **Example:**

    The API provided by the sample service is a second version of the Pet Store API. All the endpoints to be onboarded are available 
    through `http://localhost:8080/v2/` URL. This REST API is therefore available at the path `/v2` relative to base URL of the service. 
    There is no version 1 in this case.

3. Choose the `service ID` of your service. The `service ID` identifies the service uniquely in the API Gateway. The `service ID` is an alphanumeric string in lowercase ASCII.

    **Example:**

    In the sample service, the `service ID` is `petstore`.

4. Decide which URL to use to make this API available in the API Gateway. This URL is referred to as the gateway URL and is composed of the API type and the major version. The usually used types are: `api`, `ui` and `ws` but you can use any valid URL element you want.

    **Example:**

    In the sample service, we provide a REST API. The first segment is `/api` as the service provides only one REST API. To indicate that this is version 2, the second segment is `/v2`. This version is required by the Gateway. If your service does not have a version, use `v1` on the Gateway.

## Route your API

After you identify the APIs you want to expose, define the routing of your API. Routing is the process of sending requests from the API Gateway to a specific API service. Route your API by using the same format as in the following `petstore` example. The configuration parameters are explained in [Customize configuration parameters](#customize-configuration-parameters).

**Note:** The API Gateway differentiates major versions of an API.

**Example:**

To access version 2 of the `petstore` API use the following gateway URL:

`https://gateway-host:port/api/v2/petstore`

The base URL of the version 2 of the `petstore` API is:

`http://localhost:8080/v2`

The API Gateway routes REST API requests from the gateway URL `https://gateway:port/api/v2/petstore` to the service `http://localhost:8080/v2`. This method provides access to the service in the API Gateway through the gateway URL. 

**Example:**

The request to the URL: `https://gateway:port/api/v2/petstore/pets/1` will be routed to `http://localhost:8080/v2/pets/1`

**Note:** This method enables you to access the service through a stable URL, and move the service to another machine without changing the gateway URL. Accessing a service through the API Gateway also enables you to have multiple instances of the service running on different machines to achieve high-availability.

## Define your service and API in YAML format

Define your service and API in YAML format as presented in the following sample `petstore` service example.

**Example:**

To define your service in YAML format, provide the following definition in a YAML file as in the following sample `petstore` service.
This configuration is the minimal configuration necessary for the Gateway to properly route the requests to the application and to show the Service in the Catalog UI.

**Note:** For more details about configuration, see [Customize configuration parameters](onboard-static-definition.md#customize-configuration-parameters).

```yaml
services:
    - serviceId: petstore
      catalogUiTileId: static
      instanceBaseUrls:
        - http://localhost:8080
      routes:
        - gatewayUrl: api/v2
          serviceRelativeUrl: /v2
      authentication:
              scheme: httpBasicPassTicket
              applid: ZOWEAPPL
      apiInfo:
        - apiId: io.swagger.petstore
          gatewayUrl: api/v2

catalogUiTiles:
    static:
        title: Static API services
        description: Services which demonstrate how to make an API service discoverable in the APIML ecosystem using YAML definitions
```

In this example, a suitable name for the file is `petstore.yml`.

**Notes:**

* The filename does not need to follow specific naming conventions but it requires the `.yml` extension.

* The file can contain one or more services defined under the `services:` node.

* Each service has a service ID. In this example, the service ID is `petstore`. The service id is used as a part of the request URL towards the Gateway. It is removed by the Gateway when forwarding the request to the service.

* The service can have one or more instances. In this case, only one instance `http://localhost:8080` is used.

* One API is provided and the requests with the relative base path `api/v2` at the API Gateway (full gateway URL: `https://gateway:port/api/v2/serviceId/...`) are routed to the relative base path `/v2` at the full URL of the service (`http://localhost:8080/v2/...`).

* The file on USS should be encoded in ASCII to be read correctly by the API Mediation Layer.

**Tips:**

* There are more examples of API definitions at this [link](https://github.com/zowe/api-layer/tree/master/config/local/api-defs).
* For more details about how to use YAML format, see this [link](https://learnxinyminutes.com/docs/yaml/).

## Customize configuration parameters

This part contains a more complex example of the configuration and an explanation of all the possible parameters:

```yaml
services:
    - serviceId: petstore
      catalogUiTileId: static
      title: Petstore Sample Service
      description: This is a sample server Petstore service
      instanceBaseUrls:
        - http://localhost:8080
      homePageRelativeUrl: /home # Normally used for informational purposes for other services to use it as a landing page
      statusPageRelativeUrl: /application/info  # Appended to the instanceBaseUrl
      healthCheckRelativeUrl: /application/health  # Appended to the instanceBaseUrl
      routes:
        - gatewayUrl: api/v2
          serviceRelativeUrl: /v2
      authentication:
              scheme: httpBasicPassTicket
              applid: ZOWEAPPL
      apiInfo:
        - apiId: io.swagger.petstore
          gatewayUrl: api/v2
          swaggerUrl: http://localhost:8080/v2/swagger.json
          documentationUrl: https://petstore.swagger.io/
          version: 2.0.0
      customMetadata:
          yourqualifier:
              key1: value1
              key2: value2

catalogUiTiles:
    static:
        title: Static API services
        description: Services which demonstrate how to make an API service discoverable in the APIML ecosystem using YAML definitions

additionalServiceMetadata:
    - serviceId: petstore
      mode: UPDATE # How to update UPDATE=only missing, FORCE_UPDATE=update all set values
      authentication:
        scheme: bypass
```

* **serviceId**

    This parameter specifies the service instance identifier that is registered in the API Mediation Layer installation.
    The service ID is used in the URL for routing to the API service through the Gateway.
    The service ID uniquely identifies the service in the API Mediation Layer.
    The system administrator at the customer site defines this parameter.

    **Important!**  Ensure that the service ID is set properly with the following considerations:

    * When two API services use the same service ID, the API Gateway considers the services to be clones (i.e. two instances for the same service). An incoming API request can be routed to either of them.
    * The same service ID should be set only for multiple API service instances for API scalability.
    * The service ID value must contain only lowercase alphanumeric characters.
    * The service ID cannot contain more than 40 characters.
    * The service ID is linked to security resources. Changes to the service ID require an update of security resources.

    **Examples:**
    * If the customer system administrator sets the service ID to `monitoringpr1`,
    the API URL in the API Gateway appears as the following URL:

        `https://gateway:port/api/v1/monitoringpr1/...`

    * If customer system administrator sets the service ID to `authenticationprod1`,
    the API URL in the API Gateway appears as the following URL:

        `http://gateway:port/api/v1/authenticationprod1/...`

 * **title**

     This parameter specifies the human readable name of the API service instance (for example, `Monitoring Prod` or `systemInfo LPAR1`). This value is displayed in the API catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.

     **Tip:** We recommend that you provide a specific default value of the `title`.
     Use a title that describes the service instance so that the end user knows the specific purpose of the service instance.

 * **description**

     This parameter specifies a short description of the API service.

     **Examples:** 
     
     - `Monitoring Service - Production Instance`
     - `System Info Service running on LPAR1`

     This value is displayed in the API Catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.

     **Tip:** Describe the service so that the end user knows the function of the service.

* **instanceBaseUrls**

    This parameter specifies a list of base URLs to your service's REST resource. It will be the prefix for the following URLs:

    * **homePageRelativeUrl**
    * **statusPageRelativeUrl**
    * **healthCheckRelativeUrl**

    **Examples:**
    * `- http://host:port/ftpservice` for an HTTP service
    * `- https://host:port/source-code-mngmnt` for an HTTPS service

    You can provide one URL if your service has one instance. If your service provides multiple instances for the high-availability then you can provide URLs to these instances.

    **Examples:**
    * `- https://host1:port1/source-code-mngmnt`
    * `- https://host2:port2/source-code-mngmnt`
     

* **homePageRelativeUrl**

    This parameter specifies the relative path to the homepage of your service. The path should start with `/`.
    If your service has no homepage, omit this parameter. The path is relative to the instanceBaseUrls.

    **Examples:**
    * `homePageRelativeUrl: /` The service has homepage with URL `${baseUrl}/`
    * `homePageRelativeUrl: /ui/` The service has homepage with URL `${baseUrl}/ui/`
    * `homePageRelativeUrl: ` The service has homepage with URL `${baseUrl}`

* **statusPageRelativeUrl**

    This parameter specifies the relative path to the status page of your service.
    Start this path with `/`. If you service doesn't have a status page, omit this parameter. 
    The path is relative to the instanceBaseUrls.

    **Example:**

     `statusPageRelativeUrl: /application/info` 
    
    the result URL will be:
        
    `${baseUrl}/application/info`

* **healthCheckRelativeUrl**

    This parameter specifies the relative path to the health check endpoint of your service.
    Start this URL with `/`. If your service does not have a health check endpoint, omit this parameter. 
    The path is relative to the instanceBaseUrls.

    **Example:**

    `healthCheckRelativeUrl: /application/health`
    
     This results in the URL:

    `${baseUrl}/application/health`

* **routes**

    The following parameters specify the routing rules between the Gateway service and your service. Both specify how the API endpoints are mapped to the API Gateway endpoints.

    * **routes.gatewayUrl**

        The _gatewayUrl_ parameter sets the target endpoint on the Gateway. This is the portion of the final URL that is Gateway specific.
        
        **Example:**
        
        For the petstore example, the full Gateway URL would be:

        `https://gatewayUrl:1345/api/v2/petstore/pets/1`
        
         In this case, the URL that will be called on the service is:

        `http://localhost:8080/v2/pets/1`

    * **routes.serviceRelativeUrl**

        The _serviceRelativeUrl_ parameter points to the target endpoint on the service. This is the base path on the service called through the Gateway.
    
* **authentication**

    Parameters under this grouping allow a service to accept the Zowe JWT token. The API Gateway translates the token to an authentication method supported by a service.
        
    * **authentication.scheme**
    
        This parameter specifies a service authentication scheme. 
        The following schemes are supported by the API Gateway:
        
        * **bypass**
        
            This value specifies that the token is passed unchanged to the service. This is the default scheme when no authentication parameters are specified. 
            
         * **zoweJwt**   
         
            This value specifies that a service accepts the Zowe JWT token. No additional processing is done by the API Gateway.
         
         * **httpBasicPassTicket**
         
            This value specifies that a service accepts PassTickets in the Authorization header of the HTTP requests using the basic authentication scheme.
            It is necessary to provide a service APPLID in the `apiml.authentication.applid` parameter.
            
            **Tip:** For more information, see [Enabling PassTicket creation for API Services that accept PassTickets](api-mediation-passtickets.md).
         
         * **zosmf**
         
            This value specifies that a service accepts z/OSMF LTPA (Lightweight Third-Party Authentication).
            This scheme should only be used for a z/OSMF service used by the API Gateway Authentication Service, and other z/OSMF services that are using the same LTPA key.
            
            **Tip:** For more information about z/OSMF Single Sign-on, see [Establishing a single sign-on environment](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.4.0/com.ibm.zosmfcore.multisysplex.help.doc/izuG00hpManageSecurityCredentials.html).
    
    * **authentication.applid**
    
        This parameter specifies a service APPLID.
        This parameter is only valid for the `httpBasicPassTicket` authentication scheme.

* **apiInfo**

    This section defines APIs that are provided by the service. Currently, only one API is supported. 

    * **apiInfo.apiId**

        This parameter specifies the API identifier that is registered in the API Mediation Layer installation. The API ID uniquely identifies the API in the API Mediation Layer.
        The same API can be provided by multiple services. The API ID can be used to locate the same APIs that are provided by different services.
    
        The creator of the API defines this ID.
        The API ID needs to be a string of up to 64 characters
    that uses lowercase alphanumeric characters and a dot: `.`.
    
        **Tip:** We recommend that you use your organization as the prefix.

        **Examples:**

        - `org.zowe.file`
        - `com.ca.sysview`
        - `com.ibm.zosmf`

    * **apiInfo.gatewayUrl**

        This parameter specifies the base path at the API Gateway where the API is available. Ensure that this path is the same as the _gatewayUrl_ value in the _routes_ sections.

    * **apiInfo.swaggerUrl**

        (Optional) This parameter specifies the HTTP or HTTPS address where the Swagger JSON document is available.

    * **apiInfo.documentationUrl**

        (Optional) This parameter specifies a URL to a website where external documentation is provided.
        This can be used when _swaggerUrl_ is not provided.

    * **apiInfo.version**

        (Optional) This parameter specifies the actual version of the API in [semantic versioning](https://semver.org/) format. This can be used when _swaggerUrl_ is not provided.

* **customMetadata**

    (Optional) Additional metadata can be added to the instance information that is registered in the Discovery Service in the `customMetadata` section. This information is propagated from the Discovery Service to the onboarded services (clients). In general, additional metadata do not change the behavior of the client. Some specific metadata can configure the functionality of the API Mediation Layer. Such metadata are generally prefixed with the `apiml.` qualifier. We recommend you define your own qualifier, and group all metadata you wish to publish under this qualifier.

* **customMetadata.apiml.enableUrlEncodedCharacters**
      
    When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway. The default setting of `false` is the recommended setting. Change this setting to `true` only if you expect certain encoded characters in your application's requests.
          
    **Important!**  When the expected encoded character is an encoded slash or backslash (`%2F`, `%5C`), make sure the Gateway is also configured to allow encoded slashes. For more info see [Installing the Zowe runtime on z/OS](../../user-guide/install-zos.md).
        
* **catalogUiTileId**

   This parameter specifies the unique identifier for the API services group.
   This is the grouping value used by the API Mediation Layer to group multiple API services
   together into "tiles".
   Each unique identifier represents a single API Catalog UI dashboard tile.
   Specify the value based on the ID of the defined tile.

* **catalogUiTile**

   This section contains definitions of tiles. Each tile is defined in a section that has its tile ID as a key.
   A tile can be used by multiple services.

   ```yaml
   catalogUiTiles:
       tile1:
           title: Tile 1
           description: This is the first tile with ID tile1
       tile2:
           title: Tile 2
           description: This is the second tile with ID tile2
   ```

    * **catalogUiTile.{tileId}.title**
    
       This parameter specifies the title of the API services product family. This value is displayed in the API Catalog UI dashboard as the tile title.
    
    * **catalogUiTile.{tileId}.description**
    
       This parameter specifies the detailed description of the API Catalog UI dashboard tile. This value is displayed in the API Catalog UI dashboard as the tile description.

* **additionalServiceMetadata**

    This section contains a list of changes that allows adding or modifying metadata parameters for the corresponding service. 
    
    * **additionalServiceMetadata.serviceId**
    
        This parameter specifies the service identifier for which metadata is updated.
        
    * **additionalServiceMetadata.mode**
    
        This parameter specifies how the metadata are updated. The following modes are available:
        
        **UPDATE**
        
        Only missing parameters are added. Already existing parameters are ignored.
        
        **FORCE_UPDATE**
        
        All changes are applied. Existing parameters are overwritten.     
        
    * **additionalServiceMetadata.{updatedParameter}**
    
        This parameter specifies any metadata parameters that are updated.      

## Add and validate the definition in the API Mediation Layer running on your machine

After you define the service in YAML format, you are ready to add your service definition to the API Mediation Layer ecosystem.

The following procedure describes how to add your service to the API Mediation Layer on your local machine.  

**Follow these steps:**

1.  Copy or move your YAML file to the `config/local/api-defs` directory in the directory with API Mediation Layer.

2.  Start the API Mediation Layer services.

    **Tip:** For more information about how to run the API Mediation Layer locally, see [Running the API Mediation Layer on Local Machine](https://github.com/zowe/api-layer/blob/master/docs/local-configuration.md).

3.  Run your Java application.

    **Tip:** Wait for the services to be ready. This process may take a few minutes.

4.  Go to the following URL to reach the API Gateway (`port 10010`) and see the paths that are routed by the API Gateway. If the authentication is required and the default configuration provider on local instance is used the username is user and password user:

    `https://localhost:10010/application/routes`

    The following line should appear:

    `/api/v2/petstore/**: "petstore"`

    This line indicates that requests to relative gateway paths that start with `/api/v2/petstore/` are routed to the service with the service ID `petstore`.

    You successfully defined your Java application if your service is running and you can access the service endpoints. The following example is the service endpoint for the sample application:

    `https://localhost:10010/api/v2/petstore/pets/1`


## Add a definition in the API Mediation Layer in the Zowe runtime

After you define and validate the service in YAML format, you are ready to add your service definition to the API Mediation Layer running as part of the Zowe runtime installation on z/OS.  

**Follow these steps:**

1. Locate the Zowe instance directory. The Zowe instance directory is the directory from which Zowe was launched, or else was passed as an argument to the SDSF command used to start Zowe.  If you are unsure which instance directory a particular Zowe job is using, open the `JESJCL` spool file and navigate to the line that contains `STARTING EXEC ZWESVSTC,INSTANCE=`. This is the fully qualified path to the instance directory.

    **Tip:**  For more information, see [Creating and configuring the Zowe instance directory](../../user-guide/configure-instance-directory.md#extensions).

    **Note:** We use the `${zoweInstanceDir}` symbol in following instructions.

2. Add the fully qualified zFS path of your YAML file to `instance.env`.

    - To hold your YAML file outside of the instance directory, append the fully qualified zFS path of the YAML file to the `ZWEAD_EXTERNAL_STATIC_DEF_DIRECTORIES` variable in the `instance.env` file.  This variable contains a semicolon separated list of static API extension YAML files.
    
    - To place your YAML file within the instance directory, copy your YAML file to the `${zoweInstanceDir}/workspace/api-mediation/api-defs` directory. 

    **Notes:** 
    - The `${zoweInstanceDir}/workspace/api-mediation/api-defs` directory is created the first time that Zowe starts. If you have not yet started Zowe, this directory might be missing.
    - The user ID `ZWESVUSR` that runs the Zowe started task must have permission to read the YAML file.  

3. Ensure that your application that provides the endpoints described in the YAML file is running.

4. Restart Zowe runtime or follow steps in section [(Optional) Reload the services definition after the update when the API Mediation Layer is already started](#optional-reload-the-services-definition-after-the-update-when-the-api-mediation-layer-is-already-started) which allows you to add your static API service to an already running Zowe.  

5.  Go to the following URL to reach the API Gateway (default port 7554) and see the paths that are routed by the API Gateway:

    `https://${zoweHostname}:${gatewayHttpsPort}/application/routes`

    The following line should appear:

    `/api/v2/petstore/**: "petstore"`

    This line indicates that requests to the relative gateway paths that start with `/api/v2/petstore/` are routed to the service with service ID `petstore`.

You successfully defined your Java application if your service is running and you can access its endpoints. The endpoint displayed for the sample application is:
```
https://l${zoweHostname}:${gatewayHttpsPort}/api/v2/petstore/pets/1
```

## (Optional) Check the log of the API Mediation Layer

The API Mediation Layer log can contain messages based on the API ML configuration. The API ML prints the following messages to its log when the API definitions are processed:

```
Scanning directory with static services definition: config/local/api-defs
Static API definition file: /Users/plape03/workspace/api-layer/config/local/api-defs/petstore.yml
Adding static instance STATIC-localhost:petstore:8080 for service ID petstore mapped to URL http://localhost:8080
```

   **Note:** If these messages are not displayed in the log, ensure that the [API ML debug mode](https://docs.zowe.org/stable/troubleshoot/troubleshoot-apiml#enable-api-ml-debug-mode) is active.

## (Optional) Reload the services definition after the update when the API Mediation Layer is already started

The following procedure enables you to refresh the API definitions after you change the definitions when the API Mediation Layer is already running.

**Follow these steps:**

1. Use a REST API client to issue a `POST` request to the Discovery Service (port 10011):

    `http://localhost:10011/discovery/api/v1/staticApi`

    The Discovery Service requires authentication by a client certificate. If the API Mediation Layer is running on your local machine, the certificate is stored at `keystore/localhost/localhost.pem`.

    This example uses the [HTTPie command-line HTTP client](https://httpie.org) and is run with Python 3 installed:

    ```
    httpie --cert=keystore/localhost/localhost.pem --verify=keystore/local_ca/localca.cer -j POST     https://localhost:10011/discovery/api/v1/staticApi
    ```

2. Check if your updated definition is effective.

    **Note:** It can take up to 30 seconds for the API Gateway to pick up the new routing.

