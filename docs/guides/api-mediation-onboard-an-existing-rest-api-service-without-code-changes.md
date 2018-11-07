# REST APIs without code changes required

As a user of Zowe API Mediation Layer, onboard a REST API service with the Zowe API Mediation Layer without changing the code of the API service. The following procedure is an overview of steps to onboard an API service through the API Gateway in the API Mediation Layer.

**Follow these steps:**

<!-- TOC depthFrom:2 depthTo:2 orderedList:true -->

1. [Identify the API that you want to expose](#identify-the-api-that-you-want-to-expose)
2. [Route your API](#route-your-api)
3. [Define your service and API in YAML format](#define-your-service-and-api-in-yaml-format)
4. [Configuration parameters](#configuration-parameters)
5. [Add and validate the definition in the API Mediation Layer running on your machine](#add-and-validate-the-definition-in-the-api-mediation-layer-running-on-your-machine)
6. [Add a definition in the API Mediation Layer in the Zowe runtime](#add-a-definition-in-the-api-mediation-layer-in-the-zowe-runtime)
7. [(Optional) Check the log of the API Mediation Layer](#optional-check-the-log-of-the-api-mediation-layer)
8. [(Optional) Reload the services definition after the update when the API Mediation Layer is already started](#optional-reload-the-services-definition-after-the-update-when-the-api-mediation-layer-is-already-started)

<!-- /TOC -->

## Identify the API that you want to expose

Onboard an API service through the API Gateway without making code changes.

**Tip:** For more information about the structure of APIs and which APIs to expose in the Zowe API Mediation Layer, see [Onboarding Overview](onboarding-overview.md)

**Follow these steps:**

1. Identify the following parameters of your API service:
    * Hostname
    * Port
    * (Optional) base path where the service is available. 
    This URL is called base URL of the service.

    **Example:**
    
    In the sample service described earlier, the URL of the service is: `http://localhost:8080`.

2. Identify all APIs that this service provides that you want to expose through the API Gateway.

    **Example:**
    
    In the sample service, this REST API is the one available at the path `/v2` relative to base URL of the service. This API is version     2 of the Pet Store API.

3. Choose the _service ID_ of your service. The _service ID_ identifies the service in the API Gateway. The service ID is an alphanumeric string in lowercase ASCII.

    **Example:**
    
    In the sample service, the _service ID_ is `petstore`.

4. Decide which URL to use to make this API available in the API Gateway. This URL is refered to as the gateway URL and is composed of the API type and the major version. 

    **Example:**
    
    In the sample service, we provide a REST API. The first segment is `/api`. To indicate that this is version 2, the second segment is `/v2`.

### Route your API

After you identify the APIs you want to expose, define the _routing_ of your API. Routing is the process of sending requests from the API gateway to a specific API service. Route your API by using the same format as in the following `petstore` example.

**Note:** The API Gateway differentiates major versions of an API.

**Example:**

To access version 2 of the `petstore` API use the following gateway URL:

`https://gateway-host:port/api/v2/petstore`

The base URL of the version 2 of the `petstore` API is:

`http://localhost:8080/v2`

The API Gateway routes REST API requests from the gateway URL `https://gateway:port/api/v2/petstore` to the service `http://localhost:8080/v2`. This method provides access to the service in the API Gateway through the gateway URL. 

**Note:** This method enables you to access the service through a stable URL and move the service to another machine without changing the gateway URL. Accessing a service through the API Gateway also enables you to have multiple instances of the service running on different machines to achieve high-availability.

## Define your service and API in YAML format

Define your service and API in YAML format in the same way as presented in the following sample `petstore` service example.

**Example:**

To define your service in YAML format, provide the following definition in a YAML file as in the following sample `petstore` service:

```yaml
services:
    - serviceId: petstore
      catalogUiTileId: static 
      title: Petstore Sample Service  
      description: This is a sample server Petstore service
      instanceBaseUrls:
        - http://localhost:8080
      routes:
        - gatewayUrl: api/v2
          serviceRelativeUrl: /v2
      apiInfo:
        - apiId: io.swagger.petstore
          gatewayUrl: api/v2
          swaggerUrl: http://localhost:8080/v2/swagger.json
          version: 2.0.0

catalogUiTiles:
    static:
        title: Static API services
        description: Services which demonstrate how to make an API service discoverable in the APIML ecosystem using YAML definitions
```

In this example, a suitable name for the file is `petstore.yml`. 

**Notes:** 

* The filename does not need to follow specific naming conventions but it requires the `.yml` extension.

* The file can contain one or more services defined under the `services:` node.
    
* Each service has a service ID. In this example, the service ID is `petstore`. The service can have one or more instances. In this case, only one instance `http://localhost:8080` is used.

* A service can provide multiple APIs that are routed by the API Gateway. In this case, requests with the relative base path `api/v2` at the API Gateway (full gateway URL: `https://gateway:port/api/v2/...`) are routed to the relative base path `/v2` at the full URL of the service (`http://localhost:8080/v2/...`).

**Tips:** 

* There are more examples of API definitions in https://github.com/gizafoundation/api-layer/tree/master/config/local/api-defs.

* For more details about how to use YAML format, see https://learnxinyminutes.com/docs/yaml/

## Configuration parameters

The following list describes the configuration parameters:

* **serviceId**

    Specifies the service instance identifier that is registered in the API Mediation Layer installation. 
    The service ID is used in the URL for routing to the API service through the gateway. 
    The service ID uniquely identifies the service in the API Mediation Layer. 
    The system administrator at the customer site defines this parameter.
    
    **Important!**  Ensure that the service ID is set properly with the following considerations:

    * When two API services use the same service ID, the API gateway considers the services to be clones (two instances for the same service). An incoming API request can be routed to either of them.
    * The same service ID should be set only for multiple API service instances for API scalability.
    * The service ID value must contain only lowercase alphanumeric characters.
    * The service ID cannot contain more than 40 characters.
    * The service ID is linked to security resources. Changes to the service ID require an update of security resources.
    
    **Examples:**
    * If the customer system administrator sets the service ID to `sysviewlpr1`, 
    the API URL in the API Gateway appears as the following URL: 

        `https://gateway:port/api/v1/sysviewlpr1/...`

    * If customer system administrator sets the service ID to `vantageprod1`,
    the API URL in the API Gateway appears as the following URL:

        http://gateway:port/api/v1/vantageprod1/...
        
 * **title**

     Specifies the human readable name of the API service instance (for example, "Endevor Prod" or "Sysview LPAR1"). This value is displayed in the API catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.

     **Tip:** We recommend that you provide a specific default value of the `title`.
     Use a title that describes the service instance so that the end user knows the specific purpose of the service instance.

 * **description**

     Specifies a short description of the API service.

     **Example:** "CA Endevor SCM - Production Instance" or "CA SYSVIEW running on LPAR1". 

     This value is displayed in the API Catalog when a specific API service instance is selected. This parameter is externalized and set by the customer system administrator.  

     **Tip:** Describe the service so that the end user knows the function of the service.        

* **instanceBaseUrls**

    Specifies a list of base URLs to your service to the REST resource. It will be the prefix for the following URLs:
    
    * **homePageRelativeUrl**
    * **statusPageRelativeUrl**
    * **healthCheckRelativeUrl**
    
    **Examples:** 
    * `- http://host:port/filemasterplus` for an HTTP service
    * `- https://host:port/endevor` for an HTTPS service
    
    You can provide one URL if your service has one instance. If your service provides multiple instances for the high-availability then you can provide URLs to these instances.

   ```yaml
   - https://host1:port1/endevor
     https://host2:port2/endevor
   ```   

* **homePageRelativeUrl** 

    Specifies the relative path to the homepage of your service. The path should start with `/`.
    If your service has no homepage, omit this parameter. 

    **Examples:**
    * `homePageRelativeUrl: /` The service has homepage with URL `${baseUrl}/`
    * `homePageRelativeUrl: /ui/` The service has homepage with URL `${baseUrl}/ui/`
    * `homePageRelativeUrl: ` The service has homepage with URL `${baseUrl}`
  
* **statusPageRelativeUrl**

    Specifies the relative path to the status page of your service.
    Start this path with `/`. If you service has not a status page, omit this parameter.

    **Example:**
    * `statusPageRelativeUrl: /application/info` the result URL will be `${baseUrl}/application/info`
  
* **healthCheckRelativeUrl**

    Specifies the relative path to the health check endpoint of your service. 
    Start this URL with `/`. If your service does not have a health check endpoint, omit this parameter.

    **Example:**
    * `healthCheckRelativeUrl: /application/health`. This results in the URL:
    `${baseUrl}/application/health`
    
* **routes**

    The routing rules between the gateway service and your service.

    * **routes.gatewayUrl**
    
        Both _gatewayUrl_ and _serviceUrl_ parameters specify how the API service endpoints are mapped to the API
        gateway endpoints. The _gatewayUrl_ parameter sets the target endpoint on the gateway.

    * **routes.serviceUrl**
    
        Both _gatewayUrl_ and _serviceUrl_ parameters specify how the API service endpoints are mapped to the API
        gateway endpoints. The _serviceUrl_ parameter points to the target endpoint on the gateway.

* **apiInfo**

    This section defines APIs that are provided by the service. Currently, only one API is supported.

* **apiInfo.apiId**

    Specifies the API identifier that is registered in the API Mediation Layer installation. 
    The API ID uniquely identifies the API in the API Mediation Layer. 
    The same API can be provided by multiple service. The API ID can be used
    to locate same APIs that are provided by different services.
    The creator of the API defines this ID.
    The API ID needs to be string up to 64 characters 
    that is using lowercase alphanumeric characters and a dot: `.`.
    It is recommended to use your organization as the prefix.
    
    **Examples:**
       
     - `org.zowe.file`
     - `com.ca.sysview`
     - `com.ibm.zosmf`
   
* **apiInfo.gatewayUrl**

    The base path at the API gateway where the API is available. It should be
    the same as a _gatewayUrl_ value in the _routes_ sections.

* **apiInfo.swaggerUrl**

    (Optional) Specifies the HTTP or HTTPS address where the Swagger JSON document 
    that provides the API documentation for this API is available.

* **apiInfo.documentationUrl**

    (Optional) Specifies a URL to a website where external documentation is provided.
    This can be used when _swaggerUrl_ is not provided.
  
* **apiInfo.version**

    (Optional) Specifies the actual version of the API in [semantic versioning](https://semver.org/) format. This can be used when _swaggerUrl_ is not provided.

* **catalogUiTileId**

   Specifies the unique identifier for the API services group. 
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

   Specifies the title of the API services product family. This value is displayed in the API catalog UI dashboard as the tile title.

* **catalogUiTile.{tileId}.description**

   Specifies the detailed description of the API Catalog UI dashboard tile. 
   This value is displayed in the API catalog UI dashboard as the tile description.


## Add and validate the definition in the API Mediation Layer running on your machine

After you define the service in YAML format, you are ready to add your service definition to the API Mediation Layer ecosystem.

The following procedure describes how to add your service to the API Mediation Layer on your local machine.

**Follow these steps:**

1.  Copy or move your YAML file to the `config/local/api-defs` directory in the directory with API Mediation layer.

2.  Start the API Mediation Layer services.

    **Tip:** For more information about how to run the API Mediation Layer locally, see [Running the API Mediation Layer on Local Machine.](https://github.com/gizafoundation/api-layer/blob/master/docs/local-configuration.md) 
    
3.  Run your Java application. 

    **Tip:** Wait for the services to be ready. This process may take a few minutes.

4.  Go to the following URL to reach the API Gateway (port 10010) and see the paths that are routed by the API Gateway:

    `https://localhost:10010/application/routes`

    The following line should appear:

    `/api/v2/petstore/**: "petstore"`

    This line indicates that requests to relative gateway paths that start with `/api/v2/petstore/` are routed to the service with the service ID `petstore`.

    You successfully defined your Java application if your service is running and you can access the service endpoints. The following example is the service endpoint for the sample application:

    `https://localhost:10010/api/v2/petstore/pets/1`


## Add a definition in the API Mediation Layer in the Zowe runtime

After you define and validate the service in YAML format, you are ready to add your service definition to the API Mediation Layer running as part of the Zowe runtime installation. 

**Follow these steps:**

1. Locate the Zowe runtime directory. The Zowe runtime directory is chosen during Zowe installation. 
   The location of the directory is in the `zowe-install.yaml` file in the variable `install:rootDir`. 

    **Note:** We use the `${zoweRuntime}` symbol in following instructions.

2. Copy your YAML file to the `${zoweRuntime}/api-mediation/api-defs` directory.

3. Run your application. 

4. Restart Zowe runtime or follow steps in section [(Optional) Reload the services definition after the update when the API Mediation Layer is already started](#optional-reload-the-services-definition-after-the-update-when-the-api-mediation-layer-is-already-started).

5.  Go to the following URL to reach the API Gateway (default port 7554) and see the paths that are routed by the API Gateway: https://${zoweHostname}:${gatewayHttpsPort}/application/routes

    The following line should appear:

    `/api/v2/petstore/**: "petstore"`

    This line indicates that requests to the relative gateway paths that start with `/api/v2/petstore/` are routed to the service with service ID `petstore`.

    You successfully defined your Java application if your service is running and you can access its endpoints. The endpoint displayed for the sample application is: `https://l${zoweHostname}:${gatewayHttpsPort}/api/v2/petstore/pets/1`


## (Optional) Check the log of the API Mediation Layer

The API Mediation Layer prints the following messages to its log when the API definitions are processed:

        Scanning directory with static services definition: config/local/api-defs
        Static API definition file: /Users/plape03/workspace/api-layer/config/local/api-defs/petstore.yml
        Adding static instance STATIC-localhost:petstore:8080 for service ID petstore mapped to URL http://localhost:8080


## (Optional) Reload the services definition after the update when the API Mediation Layer is already started

The following procedure enables you to refresh the API definitions after you change the definitions when the API Mediation Layer is already running.

**Follow these steps:**

1. Use a REST API client to issue a POST request to the Discovery Service (port 10011):
    
    `http://localhost:10011/discovery/api/v1/staticApi`

    The Discovery Service requires authentication. If the API Mediation Layer is running on your local machine, the user ID is `eureka`, and the password is `password`.

    This example uses the [HTTPie command-line HTTP client](https://httpie.org):
   
        http -j -a eureka:password POST `http://localhost:10011/discovery/api/v1/staticApi`

2. Check if your updated definition is effective.

    **Notes:** 
    
    * It can take up to 30 seconds for the API Gateway to pick up the new routing.
    
    * The basic authentication will be replaced by client certificates when the Discovery Service is updated to use HTTPS.
