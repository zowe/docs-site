# Onboarding an existing REST API service without code changes

As a user of Zowe API Mediation Layer, onboard a REST API service into the Zowe API Mediation Layer without changing the code of the API service. This article outlines a step-by-step process to make any API service available in the API Mediation Layer.

The following procedure is an overview of steps to onboard a REST API application with the API Mediation Layer. 

Provide access to your service's REST APIs through the API Gateway by following this procedure.

**Follow these steps:**

1. Identify the API that you want to expose
2. Define the service and API in the YAML format
3. Add and validate the definition in the API Mediation Layer
4. (Optional) Check the log of the API Mediation Layer
5. (Optional) Reload the services definition after the update when the API Mediation Layer is already started


## Identify the API that you want to expose

An API or application programming interface is a set of rules that allow programs to talk to each other. A developer creates an API on a server and allows the client to talk to the API. Representational State Transfer (REST) determines the look of the API. REST is a set of rules that developers follow when creating an API.  One of these rules states that a user should be able to get a piece of data (called a resource) accessible via URL endpoints through HTTP. These resources are usually represented in the form of JSON or XML documents. The preferred documentation type in Zowe is in JSON format.

Definitions used in this procedure follow the [OpenAPI specification](https://swagger.io/specification/). 
Each API has its own title, description, and version (versioned using [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

REST APIs are provided by REST API services. A REST API service can provide one or more REST APIs. A service usually provides the latest version of its API. A REST service is hosted on a web server which can host one or more services. A service is sometimes called _application_. A web server that hosts multiple services (applications) is usually called a _web application server_. Examples of _web application servers_ are [Apache Tomcat](http://tomcat.apache.org/) or [WebSphere Liberty](https://developer.ibm.com/wasdev/websphere-liberty/). 

![REST API Components](diagrams/rest-api-components.svg)

In microservice architecture, a web server usually provides one service. A typical example of such implementation is a Spring Boot web application. The following example uses a Spring Boot web service: https://github.com/swagger-api/swagger-samples/tree/master/java/java-spring-boot.

You can build this service using instructions in the source code of that example (https://github.com/swagger-api/swagger-samples/blob/master/java/java-spring-boot/README.md) or you can use another existing service.

The sample service has its base URL. If you start this service on your computer then the _service base URL_ is http://localhost:8080. If a service deployed to an application server, the base URL of the service (application) can be `http://application-server-hostname:port/application-name.`

This service provides one API that has the base path `/v2` which is represented in the base URL of the API as http://localhost:8080/v2.

This API provides only one endpoint:

- `/pets/{id}` - *Find pet by ID*. This endpoint returns a pet when 0 < ID <= 10. ID > 10 or when non-integers simulate API error conditions.

Access http://localhost:8080/v2/pets/1 to get the following response:

```json
{
    "category": {
        "id": 2,
        "name": "Cats"
    },
    "id": 1,
    "name": "Cat 1",
    "photoUrls": [
        "url1",
        "url2"
    ],
    "status": "available",
    "tags": [
        {
            "id": 1,
            "name": "tag1"
        },
        {
            "id": 2,
            "name": "tag2"
        }
    ]
}
```

The following example defines a new REST API service in the API Mediation Layer. This service generates one REST API.

A service is identified in the API Gateway by its `service ID`. Service ID is an alphanumeric string in lowercase ASCII (for example `petstore`). The API Gateway differentiates different major versions of the API. To access version 2 of the `petstore` API you use the following gateway URL:

    https://gateway-host:port/api/v2/petstore

The base URL of the version 2 of the `petstore` API is:

    http://localhost:8080/v2

The API Gateway routes REST API requests from the gateway URL `https://gateway:port/api/v2/petstore` to the service `http://localhost:8080/v2`.

As the user of the API Gateway, you access the service only through the gateway URL. This enables you to access the service through a stable URL and move the service to another machine without changing the gateway URL. Accessing a service through the APU Gateway also enables you to have multiple instances of the service running on different machines to achieve high-availability.


## Define the service and API in the YAML format

To define the sample `petstore` service described above, you need to provide the following definition in a YAML file:

```yaml
services:
    - serviceId: petstore
      instanceBaseUrls:
        - http://localhost:8080
      routes:
        - gatewayUrl: api/v2
          serviceRelativeUrl: /v2
```

In this example, the file can be named `petstore.yml`. The filename does not need to follow specific naming conventions but it needs to have the `.yml` extension.

The file can contain one or more services defined under the `services:` node.

Each service has its own service ID. In this example, the service ID is `petstore`. The service can have one or more instances. In this case, onlu one instance `http://localhost:8080` is used.

A service can provide multiple APIs that are routed by the API Gateway. In this case, requests with the relative base path `api/v2` at the API Gateway (full gateway URL: `https://gateway:port/api/v2/...`) are routed to the relative base path `/v2` at the full URL of the service (`http://localhost:8080/v2/...`).

There are more examples of API definitions in https://github.com/gizafoundation/api-layer/tree/master/config/local/api-defs.

**Note:** For more details about YAML formatting, see https://learnxinyminutes.com/docs/yaml/

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
    * If the customer system administrator sets the service ID to `sysviewlpr1`, the API URL in the API Gateway appears as the following URL: 

            https://gateway:port/api/v1/sysviewlpr1/...

    * If customer system administrator sets the service ID to `vantageprod1`, the API URL in the API Gateway appears as the following URL:

            http://gateway:port/api/v1/vantageprod1/...

* **baseUrl**

    Specifies the URL to your service to the REST resource. It will be the prefix for the following URLs:
    
    * **homePageRelativeUrl**
    * **statusPageRelativeUrl**
    * **healthCheckRelativeUrl**
    
    **Examples:** 
    * `http://host:port/serviceid` for HTTP service
    * `https://host:port/serviceid` for HTTPS service
 
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
    Start this URL with `/`. If you service has not a health check endpoint, omit this parameter.

    **Example:**
    * `healthCheckRelativeUrl: /application/health`. This results in the URL:
    `${baseUrl}/application/health`
    
* **routes**

    The routing rules between the gateway service and your service.

    * **routes.gatewayUrl**
    
        Both _gateway-url_ and _service-url_ parameters specify how the API service endpoints are mapped to the API
        gateway endpoints. The _gateway-url_ parameter sets the target endpoint on the gateway.

    * **routes.serviceUrl**
    
        Both _gateway-url_ and _service-url_ parameters specify how the API service endpoints are mapped to the API
        gateway endpoints. The _service-url_ parameter points to the target endpoint on the gateway.


## Add and validate the definition in the API Mediation Layer

After defining the service in YAML format, you are ready to add your service definition to the API Mediation Layer ecosystem.

Following steps show how to add your service to the API Mediation Layer on your local machine.

**Follow these steps:**

1.  Copy or move you YAML file to the `config/local/api-defs` directory in the directory with API Mediation layer.

2.  Run the following services to onboard your application:

    **Tip:** For more information about how to run the API Mediation Layer locally, see [Running the API Mediation Layer on Local Machine.](https://github.com/gizafoundation/api-layer/blob/master/docs/local-configuration.md) 
    
3.  Run your Java application. 

    **Tip:** Wait for the services to be ready. This process may take a few minutes.

4.  Go to the following URL to reach the API Gateway (port 10010) and see the paths that are routed by the API Gateway:

        https://localhost:10010/application/routes

    You should see a line:

        /api/v2/petstore/**: "petstore"

    This line says that requests to relative gateway paths that start with `/api/v2/petstore/` are routed to the service with service ID `petstore`.

    You successfully defined your Java application. If your service is running and you can access its endpoints. In case of the sample application it is for example:

        https://localhost:10010/api/v2/petstore/pets/1


## (Optional) Check the log of the API Mediation Layer

The API Mediation Layer prints following messages to its log when the API definitions are processed:

        Scanning directory with static services definition: config/local/api-defs
        Static API definition file: /Users/plape03/workspace/api-layer/config/local/api-defs/petstore.yml
        Adding static instance STATIC-localhost:petstore:8080 for service ID petstore mapped to URL http://localhost:8080


## (Optional) Reload the services definition after the update when the API Mediation Layer is already started

The following procedure enables you to refresh the API definitions after you change the definitions while the API Mediation Layer is already started.

**Follow these steps:**

1. Use a REST API client to issue a POST request to the Discovery Service (port 10011):
    
        http://localhost:10011/discovery/api/v1/staticApi

    Discovery Services requires authentication. In the case of the API Mediation Layer running on your local machine, it is `eureka` as the user ID and `password` as the password.

    This is an example that uses the [HTTPie command-line HTTP client](https://httpie.org):
   
        http -j -a eureka:password POST http://localhost:10011/discovery/api/v1/staticApi

2. Check if your updated definition is effective

    **Note:** It can take up 30 seconds to API Gateway to pick up the new routing.

    **Note:** The basic authentication will be replaced by client certificates when the Discovery Service is updated to use HTTPS.
