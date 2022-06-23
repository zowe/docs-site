# Dataservices

Dataservices are dynamic backend components of Zowe&trade; plug-in applications. You can optionally add them to your applications to make the application do more than receive static content from the proxy server. Each dataservice defines a URL space that the server can use to run extensible code from the application. Dataservices are mainly intended to create REST APIs and WebSocket channels.

## Defining dataservices

You define dataservices in the application's `pluginDefinition.json` file. Each application requires a definition file to specify how the server registers and uses the application's backend. You can see an example of a `pluginDefinition.json` file in the top directory of the [sample-angular-app](https://github.com/zowe/sample-angular-app).

In the definition file is a top level attribute called `dataServices`, for example:
```
  "dataServices": [
    {
      "type": "router",
      "name": "hello",
      "serviceLookupMethod": "external",
      "fileName": "helloWorld.js",
      "routerFactory": "helloWorldRouter",
      "dependenciesIncluded": true
    }
  ]
```

To define your dataservice, create a set of keys and values for your dataservice in the `dataservices` array.

## Schema

The documentation on dataservice types and parameters for each are specified within the [pluginDefinition.json json-schema document](https://github.com/zowe/zlux/blob/v2.x/staging/schemas/plugindefinition-schema.json)

## Defining Java dataservices
In addition to other types of dataservice, you can use Java (also called java-war) dataservices in your applications. Java dataservices are powered by Java Servlets.

To use a Java dataservice you must meet the prerequisites, define the dataservice in your plug-in definition, and define the Java Application Server library to the Zowe Application Server.

### Prerequisites

- Install a Java Application Server library. In this release, Tomcat is the only supported library.
- Make sure your plug-in's compiled Java program is in the application's `/lib` directory, in either a `.war` archive file or a directory extracted from a `.war` archive file. Extracting your file is recommended for faster start-up time.

### Defining Java dataservices

To define the dataservice in the `pluginDefinition.json` file, specify the type as `java-war`, for example:

```
"dataServices": [
    {
      "type": "java-war",
      "name": "javaservlet",
      "filename": "javaservlet.war",
      "dependenciesIncluded": true,
      "initializerLookupMethod": "external",
      "version": "1.0.0"
    }
  ],
```

To access the service at runtime, the plug-in can use the Zowe dataservice URL standard: `/ZLUX/plugins/[PLUGINID]/services/[SERVICENAME]/[VERSIONNUMBER]`

Using the example above, a request to get users might be: `/ZLUX/plugins/[PLUGINID]/services/javaservlet/1.0.0/users`

**Note:** If you extracted your servlet contents from a `.war` file to a directory, the directory must have the same name as the file would have had. Using the example above, `javaservlet.war` must be extracted to a directory named `\javaservlet`.

### Defining Java Application Server libraries

In the `zlux-app-server/zluxserver.json` file, use the example below to specify Java Application Server library parameters:

```
"languages": {
    "java": {
      "runtimes": {
          "name": {
              "home": "<java_runtime_root_path>"
          }
      }
      "war": {
        "defaultGrouping": "<value>"
        "pluginGrouping": []
        "javaAppServer": {
          "type": "tomcat",
          "path": "../../zlux-server-framework/lib/java/apache-tomcat",
          "config": "../deploy/instance/ZLUX/serverConfig/tomcat.xml",
          "https": {
            "key": "../deploy/product/ZLUX/serverConfig/zlux.keystore.key",
            "certificate": "../deploy/product/ZLUX/serverConfig/zlux.keystore.cer"
          }
        }
      },
      "portRange": [7600,7650]
    }
  }

```

Specify the following parameters in the `languages.java` object:

- `runtimes` (object) - The name and location of a Java runtime that can be used by one or more services. Used to load a Tomcat instance.
  - `name` (object) - The name of the runtime.
    - `home` (string) - The path to the runtime root. Must include `/bin` and `/lib` directories.
- `ports` (array```<number>```)(Optional) - An array of port numbers that can be used by instances of Java Application Servers or microservices. Must contain as many ports as distinct servers that will be spawned, which is defined by other configuration values within `languages.java`. Either `ports` or `portRange` is required, but `portRange` has a higher priority.
- `portRange` (array```<number>```)(Optional) - An array of length 2, which contains a start number and end number to define a range of ports to be used by instances of application servers or microservices. You will need as many ports as distinct servers that will be spawned, which is defined by other configuration values within `languages.java`. Either `ports` or `portRange` is required, but `portRange` has a higher priority.
- `war` (object) - Defines how the Zowe Application Server should handle `java-war` dataservices.
  - **defaultGrouping** (string)(Optional) - Defines how services should be grouped into instances of Java Application Servers. Valid values: `appserver` or `microservice`. Default: `appserver`. `appserver` means 1 server instance for all services. `microservice` means one server instance per service.
  - **pluginGrouping** (array```<object>```)(Optional) - Defines groups of plug-ins to have their `java-war` services put within a single Java Application Server instance.
    - **plugins** (Array```<string>```) - Lists the plugins by identifier which should be put into this group. Plug-ins with no `java-war` services are skipped. Being in a group excludes a plugin from being handled by `defaultGrouping`.
    - **runtime** (string)(Optional) - States the runtime to be used by the Tomcat server instance, as defined in `languages.java.runtimes`.
  - **javaAppServer** (object) - Java Application Server properties.
    - **type** (string) - Type of server. In this release, `tomcat` is the only valid value.
    - **path** (string) - Path of the server root, relative to `zlux-app-server/lib`. Must include `/bin` and `/lib` directories.
    - **config** (string) - Path of the server configuration file, relative to `zlux-app-server/lib`.
    - **https** (object) - HTTPS parameters.
      - **key** (string) - Path of a private key, relative to `zlux-app-server/lib`.
      - **certificate** (string) - Path of an HTTPS certificate, relative to `zlux-app-server/lib`.

### Java dataservice logging

The Zowe Application Server creates the Java Application Server instances required for the `java-war` dataservices, so it logs the stdout and stderr streams for those processes in its log file. Java Application Server logging is not managed by Zowe at this time.

### Java dataservice limitations

Using Java dataservices with a Zowe Application Server installed on a Windows computer, the source and Java dataservice code must be located on the same storage volume.

To create multiple instances of Tomcat on non-Windows computers, the Zowe Application Server establishes symbolic links to the service logic. On Windows computers, symbolic links require administrative privilege, so the server establishes junctions instead. Junctions only work when the source and destination reside on the same volume.

## Using dataservices with RBAC
If your administrator configures the Zowe Application Framework to use role-based access control (RBAC), then when you create a dataservice you must consider the length of its paths.

To control access to dataservices, administrators can enable RBAC, then use a z/OS security product such as RACF to map roles and authorities to a System Authorization Facility (SAF) profile. For information on RBAC, see [Applying role-based access control to dataservices](../../user-guide/mvd-configuration.md#applying-role-based-access-control-to-dataservices).

SAF profiles have the following format:

`<product>.<instance id>.SVC.<pluginid_with_underscores>.<service>.<HTTP method>.<dataservice path with forward slashes '/' replaced by periods '.'>`

For example, to access this dataservice endpoint:

`/ZLUX/plugins/org.zowe.foo/services/baz/_current/users/fred`

Users must have READ access to the following profile:

`ZLUX.DEFAULT.SVC.ORG_ZOWE_FOO.BAZ.POST.USERS.FRED`

Profiles cannot contain more than 246 characters. If the path section of an endpoint URL makes the profile name exceed limit, the path is trimmed to only include elements that do not exceed the limit. For example, imagine that each path section in this endpoint URL contains 64 characters:

`/ZLUX/plugins/org.zowe.zossystem.subsystems/services/data/_current/aa..a/bb..b/cc..c/dd..d`

So `aa..a` is 64 "a" characters, `bb..b` is 64 "b" characters, and so on. The URL could then map to the following example profile:

`ZLUX.DEFAULT.SVC.ORG_ZOWE_ZOSSYSTEM_SUBSYSTEMS.DATA.GET.AA..A.BB..B`

The profile ends at the `BB..B` section because adding `CC..C` would put it over 246 characters. So in this example, all dataservice endpoints with paths that start with `AA..A.BB..B` are controlled by this one profile.

To avoid this issue, we recommend that you maintain relatively short endpoint URL paths.

## Dataservice APIs

Dataservice APIs can be categorized as Router-based or ZSS-based, and either WebSocket or not. 

### Router-based dataservices

Each Router dataservice can safely import Express, express-ws, and bluebird without requiring the modules to be present, because these modules exist in the proxy server's directory and the *NODE_MODULES* environment variable can include this directory.

#### HTTP/REST Router dataservices

Router-based dataservices must return a (bluebird) Promise that resolves to an ExpressJS router upon success. For more information, see the ExpressJS guide on use of Router middleware: [Using Router Middleware](http://expressjs.com/en/guide/using-middleware.html#middleware.router).

Because of the nature of Router middleware, the dataservice need only specify URLs that stem from a root '/' path, as the paths specified in the router are later prepended with the unique URL space of the dataservice.

The Promise for the Router can be within a Factory export function, as mentioned in the `pluginDefinition` specification for *routerFactory* above, or by the module constructor.

An example is available in the [Sample Angular App.](https://github.com/zowe/sample-angular-app/blob/master/nodeServer/ts/helloWorld.ts)

#### WebSocket Router dataservices

ExpressJS routers are fairly flexible, so the contract to create the Router for WebSockets is not significantly different.

Here, the express-ws package is used, which adds WebSockets through the ws package to ExpressJS. The two changes between a WebSocket-based router and a normal router are that the method is 'ws', as in `router.ws(<url>,<callback>)`, and  the callback provides the WebSocket on which you must define event listeners.

See the ws and express-ws topics on [www.npmjs.com](https://www.npmjs.com) for more information about how they work, as the API for WebSocket router dataservices is primarily provided in these packages.

An example is available in `zlux-server-framework/plugins/terminal-proxy/lib/terminalProxy.js`

#### Router dataservice context

Every router-based dataservice is provided with a `Context` object upon creation that provides definitions of its surroundings and the functions that are helpful. The following items are present in the `Context` object:

**serviceDefinition**

The dataservice definition, originally from the `pluginDefinition.json` file within a plug-in.

**serviceConfiguration**

An object that contains the contents of configuration files, if present.

**logger**

An instance of a Zowe Logger, which has its component name as the unique name of the dataservice within a plug-in.

**makeSublogger**

A function to create a Zowe Logger with a new name, which is appended to the unique name of the dataservice.

**addBodyParseMiddleware**

A function that provides common body parsers for HTTP bodies, such as JSON and plaintext.

**plugin**

An object that contains more context from the plug-in scope, including:

- **pluginDef**: The contents of the `pluginDefinition.json` file that contains this dataservice.

- **server**: An object that contains information about the server's configuration such as:

    - **app**: Information about the product, which includes the *productCode* (for example: `ZLUX`).

    - **user**: Configuration information of the server, such as the port on which it is listening.

#### Router storage API



### ZSS based dataservices

ZSS dataservices much like zlux router services can be used to implement REST or websocket APIs.
Each service is associated with a URL which when requested will call a function to handle the request or websocket message event.

#### HTTP/REST ZSS dataservices

ZSS REST dataservices are registered into ZSS with a service installer function, where `initializerName` is the function name located in the dll `libraryName`. The `methods` list what HTTP methods are expected of this dataservice.
Example:

```
{
  "type": "service",
  "name": "data",
  "version": "1.0.0",
  "initializerLookupMethod": "external",
  "initializerName": "helloWorldDataServiceInstaller",
  "libraryName": "helloWorld.so",
  "methods": ["GET", "POST"],
  "dependenciesIncluded": true
}
```

The service installer is given `DataService`, which includes context such as the above definition plus a `loggingIdentifier`. The service is also given `HttpServer`, a reference to ZSS and its configuration.
To register the dataservice, you must make an `HttpService` object like

```
HttpService *httpService = makeHttpDataService(dataService, server);
```

Then you must assign properties to the dataservice, such as

* authType: What type of authentication and authorization checks should be done before calling this service. values such as `SERVICE_AUTH_NONE` when the service does not need securty or `SERVICE_AUTH_NATIVE_WITH_SESSION_TOKEN` when the service should be protected by ZSS's cookie are valid.
* serviceFunction: The function within this dataservice that will be called whenever a request is received.
* runInSubtask: (TRUE/FALSE) Whether to run the service function in a subtask or not whenever a request is received.
* doImpersonation: (TRUE/FALSE) When true, the service function will be ran as the authenticated user, rather than the server user. This is recommended whenever possible to keep permissions management in line with the users own permissions.

Example of service installer:

```
void helloWorldDataServiceInstaller(DataService *dataService, HttpServer *server) {
  HttpService *httpService = makeHttpDataService(dataService, server);
  httpService->authType = SERVICE_AUTH_NATIVE_WITH_SESSION_TOKEN;
  httpService->serviceFunction = serveHelloWorldDataService;
  httpService->runInSubtask = TRUE;
  httpService->doImpersonation = TRUE;

  HelloServiceData *serviceData = (HelloServiceData*)safeMalloc(sizeof(HelloServiceData), "HelloServiceData");
  serviceData->loggingId = dataService->loggingIdentifier;

  httpService->userPointer = serviceData;
}
```

When a request is received, the service function is called with the `HttpService` and `HttpResponse` objects. `HttpService` is used to store and retrieve cached data and access the storage API. `HttpRequest` is a pointer within the response object, and utilities exist to help with parsing it.

Example of request handling:

```
static int serveHelloWorldDataService(HttpService *service, HttpResponse *response) {
  HttpRequest *request = response->request;
  char *routeFragment = stringListPrint(request->parsedFile, 1, 1000, "/", 0);
  char *route = stringConcatenate(response->slh, "/", routeFragment);

  HelloServiceData *serviceData = service->userPointer;
  serviceData->timesVisited++;

  zowelog(NULL, serviceData->loggingId, ZOWE_LOG_WARNING,
          "Inside serveHelloWorldDataService\n");

  if (!strcmp(request->method, methodGET)) {
    jsonPrinter *p = respondWithJsonPrinter(response);

    setResponseStatus(response, 200, "OK");
    setDefaultJSONRESTHeaders(response);
    writeHeader(response);

    jsonStart(p);
    {
      jsonAddString(p, "message", "Hello World!");
      jsonAddInt(p, "timesVisited", serviceData->timesVisited);
    }
    jsonEnd(p);
  }

  finishResponse(response);
  return 0;
}
```

#### ZSS dataservice context and structs

Headers to important dataservice structs include
* [HttpResponse](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/httpserver.h#L117)
* [HttpRequest](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/http.h#L124)
* [HttpService](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/httpserver.h#L173)
* [HttpServer](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/httpserver.h#L223)
* [Json handling](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/json.h)
* [DataService context](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/dataservice.h#L57)
* [Utilities](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/utils.h)
* [Data structures](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/collections.h)


#### ZSS storage API

The [DataService](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/dataservice.h#L57) struct contains two [Storage structs](https://github.com/zowe/zowe-common-c/blob/zss-v1.27.0/h/storage.h#L22), `localStorage` and `remoteStorage`. They implement the same API for getting, setting, and removing data, but manage the data in different locations. `localStorage` stores data within the ZSS server, for high speed access. `remoteStorage` stores data in the Caching Service, for high availability state storage.

Usage example:
Sample angular app storage test api: https://github.com/zowe/sample-angular-app/blob/v1.23.0-RC1/zssServer/src/storage.c

## Documenting dataservices
It is recommended that you document your RESTful application dataservices in OpenAPI (Swagger) specification documents. The Zowe Application Server hosts Swagger files for users to view at runtime.

To document a dataservice, take the following steps:

1. Create a `.yaml` or `.json` file that describes the dataservice in valid [Swagger 2.0](https://swagger.io/specification/v2/) format. Zowe validates the file at runtime.

2. Name the file with the same name as the dataservice. Optionally, you can include the dataservice version number in the format: `<name>_<number>`. For example, a Swagger file for a dataservice named `user` must be named either `users.yaml` or `users_1.1.0.yaml`.

3. Place the Swagger file in the `/doc/swagger` directory below your application plug-in directory, for example:

   `/sample-angular-app/doc/swagger/hello.yaml`



At runtime, the Zowe Application Server does the following:

- Dynamically substitutes known values in the files, such as the hostname and whether the endpoint is accessible using HTTP or HTTPS.
- Builds documentation for each dataservice and for each application plug-in, in the following locations:
  - Dataservice documentation: `/ZLUX/plugins/<app_name>/catalogs/swagger/servicename`
  - Application plug-in documentation: `/ZLUX/plugins/<app_name>/catalogs/swagger`

- In application plug-in documentation, displays only stubs for undocumented dataservices, stating that the dataservice exists but showing no details. Undocumented dataservices include non-REST dataservices such as WebSocket services.
