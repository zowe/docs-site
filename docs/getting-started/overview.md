# Zowe overview

Zowe offers modern interfaces to interact with z/OS and allows you to work with z/OS in a way that is similar to what you experience on cloud platforms today. You can use these interfaces as delivered or through plug-ins and extensions that are created by clients or third-party vendors.

Zowe consists of the following main components. For details of each component, see the corresponding section.

- [**Zowe Application Framework**](#zowe-application-framework): Contains a Web user interface (UI) that provides a full screen interactive experience. The Web UI includes many interactions that exist in 3270 terminals and web interfaces such as IBM z/OSMF.

- [**Explorer server**](#explorer-server): Provides a range of APIs for the management of jobs, data sets and z/OS UNIX System Services files.

- [**API Mediation Layer**](#api-mediation-layer): Provides an API abstraction layer through which APIs can be discovered, catalogued, and presented uniformly.

- [**Zowe CLI**](#zowe-cli): Provides a command-line interface that lets you interact with the mainframe remotely and use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. It provides a set of utilities and services for application developers that want to become efficient in supporting and building z/OS applications quickly. Some Zowe extensions are powered by Zowe CLI, for example the [Visual Studio Code Extension for Zowe](../user-guide/cli-vscodeplugin.md).

Check out the video below for a demo of the modern interfaces that Zowe provides.

<iframe class="embed-responsive-item" id="youtubeplayer" title="Zowe overview demo" type="text/html" width="640" height="390" src="https://www.youtube.com/embed/NX20ZMRoTtk" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen> </iframe>

## Zowe Application Framework

The Zowe Application Framework modernizes and simplifies working on the mainframe. With the Zowe Application Framework, you can create applications to suit your specific needs. The Zowe Application Framework contains a web UI that has the following features:

- The web UI works with the underlying REST APIs for data, jobs, and subsystem, but presents the information in a full screen mode as compared to the command line interface.
- The web UI makes use of leading-edge web presentation technology and is also extensible through web UI plug-ins to capture and present a wide variety of information.
- The web UI facilitates common z/OS developer or system programmer tasks by providing an editor for common text-based files like REXX or JCL along with general purpose data set actions for both Unix System Services (USS) and Partitioned Data Sets (PDS) plus Job Entry System (JES) logs.

The Zowe Application Framework consists of the following components:

- **Zowe Desktop**

    The desktop, accessed through a browser.

- **Zowe Application Server**

    The Zowe Application Server runs the Zowe Application Framework. It consists of the Node.js server plus the Express.js as a webservices framework, and the proxy applications that communicate with the z/OS services and components.

- **ZSS Server**

    The ZSS Server provides secure REST services to support the Zowe Application Server.

- **Application plug-ins**

    Several application-type plug-ins are provided. For more information, see [Using the Zowe Application Framework application plug-ins](../user-guide/mvd-using.html#using-zowe-framework-application-plug-ins).

## Explorer server

The explorer server is a z/OS® RESTful web service and deployment architecture for z/OS microservices. The server is implemented as a Liberty Profile web application that uses z/OSMF services to provide a range of APIs for the management of jobs, data sets and z/OS UNIX™ System Services (USS) files.

These APIs have the following features:

- These APIs are described by the Open API Specification allowing them to be incorporated to any standard-based REST API developer tool or API management process.
- These APIs can be exploited by off-platform applications with proper security controls.

Any client application that calls RESTful APIs directly can use the explorer server.

As a deployment architecture, the explorer server accommodates the installation of other z/Tool microservices into its Liberty instance. These microservices can be used by explorer server APIs and client applications.

## Zowe CLI
Zowe CLI is a command-line interface that lets application developers interact with the mainframe in a familiar format. Zowe CLI helps to increase overall productivity, reduce the learning curve for developing mainframe applications, and exploit the ease-of-use of off-platform tools. Zowe CLI lets application developers use common tools such as Integrated Development Environments (IDEs), shell commands, bash scripts, and build tools for mainframe development. It provides a set of utilities and services for application developers that want to become efficient in supporting and building z/OS applications quickly.

Zowe CLI provides the following benefits:

  - Enables and encourages developers with limited z/OS expertise to build, modify, and debug z/OS applications.
  - Fosters the development of new and innovative tools from a computer that can interact with z/OS.
  - Ensure that business critical applications running on z/OS can be maintained and supported by existing and generally available software development resources.
  - Provides a more streamlined way to build software that integrates with z/OS. 

**Note:** For information about prerequisites, software requirements, installing and upgrading Zowe CLI, see
[Installing Zowe](../user-guide/installandconfig.md).

### Zowe CLI capabilities

With Zowe CLI, you can interact with z/OS remotely in the following ways:

  - **Interact with mainframe files:**   
    Create, edit, download, and
    upload mainframe files (data sets) directly from Zowe CLI. 
  - **Submit jobs:**    
    Submit JCL from data sets or local storage, monitor the status, and view and download the output automatically.
  - **Issue TSO and z/OS console commands:**    
    Issue TSO and console commands to the mainframe directly from Zowe CLI.
  - **Integrate z/OS actions into scripts:**    
    Build local scripts that accomplish both mainframe and local tasks. 
  - **Produce responses as JSON documents:**    
    Return data in JSON format on request for consumption in other programming languages.

For detailed information about the available functionality in Zowe CLI, see [Zowe CLI Command Groups](../user-guide/cli-usingcli.html#zowe-cli-command-groups).

For information about extending the functionality of Zowe CLI by installing plug-ins, see [Extending Zowe CLI](../user-guide/cli-extending.md).

### Zowe CLI Third-Party software agreements

Zowe CLI uses the following third-party software:

| Component | Third-party Software | Version | File Name | GitHub |
| ----------| -------------------- | --------| --------- | ------ |
| Zowe CLI  | js-yaml  | 3.9.0 | license_js-yaml_3.9.0.pdf  | [https://github.com/nodeca/js-yaml](https://github.com/nodeca/js-yaml)  |
| Zowe CLI  | string-width  | 2.1.1 | license_string-width_2.1.1.pdf | [https://github.com/sindresorhus/string-width](https://github.com/sindresorhus/string-width) |
| Imperative CLI Framework  | @types/yargs | 8.0.2 | license_types_yargs_8.0.2.pdf | [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)   |
| Imperative CLI Framework  | chalk | 2.1.0 | license_chalk_2.1.0.pdf | [https://github.com/chalk/chalk](https://github.com/chalk/chalk)  |
| Imperative CLI Framework | cli-table3 | 0.5.1 | license_cli-table3_0.5.1.pdf | [https://github.com/cli-table/cli-table3](https://github.com/cli-table/cli-table3)   |
| Imperative CLI Framework | dataobject-parser | 1.2.1  | license_dataobject-parser_1.2.1.pdf | [https://github.com/henrytseng/dataobject-parser](https://github.com/henrytseng/dataobject-parser) |
| Imperative CLI Framework  | deepmerge | 3.0.0 | license_deepmerge_3.0.0.pdf | [https://github.com/TehShrike/deepmerge](https://github.com/TehShrike/deepmerge) |
| Imperative CLI Framework  | find-up  | 2.1.0 | license_find-up_2.1.0.pdf | [https://github.com/sindresorhus/find-up](https://github.com/sindresorhus/find-up)   |
| Imperative CLI Framework  | glob | 7.1.1 | license_glob_7.1.1.pdf | [https://github.com/isaacs/node-glob](https://github.com/isaacs/node-glob) |
| Imperative CLI Framework  | js-yaml | 3.9.0 | license_js-yaml_3.9.0.pdf | [https://github.com/nodeca/js-yaml](https://github.com/nodeca/js-yaml)  |
| Imperative CLI Framework  | jsonfile | 4.0.0 | license_jsonfile_4.0.0.pdf | [https://github.com/jprichardson/node-jsonfile](https://github.com/jprichardson/node-jsonfile)   |
| Imperative CLI Framework  | jsonschema | 1.1.1 | license_jsonschema_1.1.1.pdf | [https://github.com/tdegrunt/jsonschema](https://github.com/tdegrunt/jsonschema)   |
| Imperative CLI Framework  | levenshtein | 1.0.5 | license_levenshtein_1.05.pdf | [https://github.com/gf3/Levenshtein](https://github.com/gf3/Levenshtein)   |
| Imperative CLI Framework  | log4js | 3.0.5 | license_log4js_3.0.5.pdf | [https://github.com/log4js-node/log4js-node](https://github.com/log4js-node/log4js-node)   |
| Imperative CLI Framework  | mkdirp | 0.5.1 | license_mkdirp_0.5.1.pdf | [https://github.com/substack/node-mkdirp](https://github.com/substack/node-mkdirp)   |
| Imperative CLI Framework  | moment | 2.20.1 | license_moment_2.20.1.pdf | [https://github.com/moment/moment](https://github.com/moment/moment)   |
| Imperative CLI Framework  | mustache | 2.3.0 | license_mustache_2.3.0.pdf  | [https://github.com/janl/mustache.js](https://github.com/janl/mustache.js)   |
| Imperative CLI Framework  | npm | 6.4.1 | license_npm_6.4.1.pdf  | [https://github.com/npm/cli](https://github.com/npm/cli)   |
| Imperative CLI Framework  | prettyjson | 1.2.1 | license_prettyjson_1.2.1.pdf   | [https://github.com/rafeca/prettyjson](https://github.com/rafeca/prettyjson)  |
| Imperative CLI Framework  | progress | 2.0.0 | license_progress_2.0.0.pdf | [https://github.com/visionmedia/node-progress](https://github.com/visionmedia/node-progress)   |
| Imperative CLI Framework  | rimraf | 2.6.1 | license_rimraf_2.6.1.pdf | [https://github.com/isaacs/rimraf](https://github.com/isaacs/rimraf)   |
| Imperative CLI Framework  | semver | 5.5.0 | license_semver_5.5.0.pdf | [https://github.com/npm/node-semver](https://github.com/npm/node-semver)   |
| Imperative CLI Framework  | stack-trace | 0.0.10 | license_stack-trace_0.0.10.pdf  | [https://github.com/felixge/node-stack-trace](https://github.com/felixge/node-stack-trace)   |
| Imperative CLI Framework  | wrap-ansi | 3.0.1 | license_wrap-ansi_3.0.1.pdf  | [https://github.com/chalk/wrap-ansi](https://github.com/chalk/wrap-ansi)   |
| Imperative CLI Framework  | yamlis | 0.3.0 | license_yamlis_0.3.0.pdf  | [  https://github.com/jeremyfa/yaml.js](https://github.com/jeremyfa/yaml.js)   |
| Imperative CLI Framework  | yargs | 8.0.2  | license_yargs_8.0.2.pdf  | [https://github.com/yargs/yargs](https://github.com/yargs/yargs)   |
| Zowe CLI Plug-in for IBM CICS | xml2js | 0.4.19 | license_xml2js_0.4.19.pdf | [https://github.com/Leonidas-from-XIV/node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)  |
| Zowe CLI plug-in for IBM Db2 Database | ibm_db | 2.3.0 | license_ibm_db_2.3.0.pdf | [https://github.com/ibmdb/node-ibm_db](https://github.com/ibmdb/node-ibm_db) |

**Note:** All trademarks, trade names, service marks, and logos referenced herein belong to their respective companies.

[Click here](https://github.com/zowe/docs-site/blob/master/docs/.vuepress/public/zowe_cli_tpsrs.zip) to download and read each complete license. The .zip file contains the licenses for all of the third-party components that Zowe CLI uses.

**More Information:**

  - [System requirements for Zowe CLI](../user-guide/systemrequirements.md)
  - [Installing Zowe CLI](../user-guide/cli-installcli.html)

## API Mediation Layer

The API Mediation Layer provides a single point of access for mainframe service REST APIs. The layer offers enterprise, cloud-like features such as high-availability, scalability, dynamic API discovery, consistent security, a single sign-on experience, and documentation. The API Mediation Layer facilitates secure communication across loosely coupled microservices through the API Gateway. The API Mediation Layer includes an API Catalog that provides an interface to view all discovered microservices, their associated APIs, and Swagger documentation in a user-friendly manner. The Discovery Service makes it possible to determine the location and status of microservice instances running inside the ecosystem.  

**More Information:**
- [Onboard an existing Spring Boot REST API service using Zowe API Mediation Layer](../extend/extend-apiml/api-mediation-onboard-a-sprint-boot-rest-api-service.md)
- [Using API Catalog](../user-guide/api-mediation-api-catalog.md)

### Key features  
* High availability of services in which application instances on a failing node are distributed among surviving nodes
* Microservice UIs available through the API Gateway and API Catalog by means of reverse proxying
* Support for standardization and normalization of microservice URLs and routing to provide API Mediation Layer users with a consistent way of accessing microservices.
* Minimal effort to register a microservice with the gateway (configuration over code)
* Runs on Windows, Linux, and z/OS (target platform)
* Written in Java utilizing Spring Boot (2.x), Angular 5, and the Netflix CloudStack
* Supports multiple client types for discovery (including Spring Boot, Java, and NodeJS)
* Contains enablers that allow for easy discovery and exposure of REST APIs and Swagger documentation for each microservice

### API Mediation Layer architecture
The following diagram illustrates the single point of access with the API Gateway and the interactions between the API Gateway, API Catalog, and the Discovery Service:   

![API Mediation Layer Architecture diagram](../images/api-mediation/apiml-architecture.png)

### Components
The API Layer consists of the following key components:

#### API Gateway
The microservices that are contained within the ecosystem are located behind a reverse proxy. Clients interact with the gateway layer (reverse proxy). This layer forwards API requests to the appropriate corresponding service through the microservice endpoint UI. The gateway is built using Netflix Zuul and Spring Boot technology.

#### Discovery Service
The Discovery service is the central point in the API Gateway infrastructure that accepts "announcements of REST services" and serves as a repository of active services. Back-end microservices register with this service either directly by using a Eureka client. Non-Spring Boot applications register with the Discover Service indirectly through a Sidecar. The Discovery Service is built on Eureka and Spring Boot technology.

#### API Catalog
The API Catalog is the catalog of published APIs and their associated documentation that are discoverable or can be available if provisioned from the service catalog. The API documentation is visualized using the Swagger UI. The API Catalog contains APIs of services available as product versions. A service can be implemented by one or more service instances, which provide exactly the same service for high-availability or scalability.


**More Information:**
- [Onboard an existing Spring Boot REST API service using Zowe API Mediation Layer](../extend/extend-apiml/api-mediation-onboard-a-sprint-boot-rest-api-service.md)
- [Using API Catalog](../user-guide/api-mediation-api-catalog.md)


### Zowe API Mediation Layer Third-Party software agreements

Zowe CLI uses the following third-party software:

| Component | Third-party Software | Version | File Name | GitHub |
| ----------| -------------------- | --------| --------- | ------ |
| Zowe CLI  | js-yaml  | 3.9.0 | license_js-yaml_3.9.0.pdf  | [https://github.com/nodeca/js-yaml](https://github.com/nodeca/js-yaml)  |

Zowe API Mediation Layer uses the following third-party software:

| Component | Third-party Software | Version | File name | GitHub |
| --------- | -------------------- | ------- | --------- | ------ |
| Zowe API Mediation Layer | Apache Tomcat | 8.5.33 | license_apache-tomcat_8.5.33.pdf | [https://github.com/apache/tomcat](https://github.com/apache/tomcat) |
| Zowe API Mediation Layer | Apache Commons Validator | 1.0.0 | license_apache-commons-validator_1.0.0.pdf | [https://github.com/apache/commons-validator](https://github.com/apache/commons-validator) |
| Zowe API Mediation Layer | emotion | 9.2.12 | license_emotion_9.2.12.pdf | [https://github.com/emotion-js/emotion](https://github.com/emotion-js/emotion) |
| Zowe API Mediation Layer | eslint-config-airbnb | 16.1.0 | license_eslint-config-airbnb_16.1.0.pdf | [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript) |
| Zowe API Mediation Layer | eslint-plugin-jsx-a11y | 6.1.2 | license_eslint-plugin-jsx-a11y_6.1.2.pdf | [https://github.com/evcohen/eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) |
| Zowe API Mediation Layer | eureka-client | 1.8.6 | license_eureka-client_1.8.6.pdf | [https://github.com/Netflix/eureka/tree/master/eureka-client](https://github.com/Netflix/eureka/tree/master/eureka-client) |
| Zowe API Mediation Layer | exception-formatter | 1.0.7 | license_exception-formatter_1.0.7.pdf | [https://github.com/benbria/exception-formatter](https://github.com/benbria/exception-formatter) |
| Zowe API Mediation Layer | google-gson | 2.8.2 | license_google-gson_2.8.2.pdf | [https://github.com/google/gson](https://github.com/google/gson) |
| Zowe API Mediation Layer | gradle-git | 1.5.1 | license_gradle-git_1.5.1.pdf | [https://github.com/ajoberstar/gradle-git](https://github.com/ajoberstar/gradle-git) |
| Zowe API Mediation Layer | guava | 23.2-jre | license_guava_23.2-jre.pdf | [https://github.com/google/guava](https://github.com/google/guava) |
| Zowe API Mediation Layer | H2 | 1.4.196 | license_H2_1.4.196.pdf | [https://github.com/h2database/h2database](https://github.com/h2database/h2database) |
| Zowe API Mediation Layer | hamcrest | 1.3 | license_hamcrest_1.3.pdf | [https://github.com/hamcrest/JavaHamcrest](https://github.com/hamcrest/JavaHamcrest) |
| Zowe API Mediation Layer | history | 4.7.2 | license_history_4.7.2.pdf | [https://github.com/ReactTraining/history](https://github.com/ReactTraining/history) |
| Zowe API Mediation Layer | httpclient | 4.5.3 | license_httpclient_4.5.3.pdf | [https://github.com/apache/httpcomponents-client](https://github.com/apache/httpcomponents-client) |
| Zowe API Mediation Layer | httpcore | 4.4.10 | license_httpcore_4.4.10.pdf | [https://github.com/apache/httpcomponents-core](https://github.com/apache/httpcomponents-core) |
| Zowe API Mediation Layer | install | 0.12.2 | license_install_0.12.2.pdf | [https://github.com/benjamn/install](https://github.com/benjamn/install) |
| Zowe API Mediation Layer | jackson | 2.9.2 | license_jackson_2.9.2.pdf | [https://github.com/FasterXML/jackson](https://github.com/FasterXML/jackson) |
| Zowe API Mediation Layer | javamail | 1.4.3 | license_javamail_1.4.3.pdf | [https://github.com/eclipse-ee4j/javamail](https://github.com/eclipse-ee4j/javamail) |
| Zowe API Mediation Layer | javax servlet api | 3.1.0 | license_javax-servlet-api_3.1.0.pdf | [https://github.com/javaee/servlet-spec/tree/3.1.0](https://github.com/javaee/servlet-spec/tree/3.1.0) |
| Zowe API Mediation Layer | javax.validation | 2.0.1Final | license_javax.validaton_2.0.1Final.pdf | [https://github.com/beanvalidation/beanvalidation-api](https://github.com/beanvalidation/beanvalidation-api) |
| Zowe API Mediation Layer | Jersey | 2.3 | license_Jersey_2.3.pdf | [https://github.com/jersey/jersey](https://github.com/jersey/jersey) |
| Zowe API Mediation Layer | Jersey Media JSON Jackson | 2.3 | license_Jersey-Media-JSON-Jackson_2.3.pdf | [https://github.com/jersey/jersey/tree/master/media/json-jackson](https://github.com/jersey/jersey/tree/master/media/json-jackson) |
| Zowe API Mediation Layer | Eclipse Jetty | 9.4.11.v20180605 | license_Eclipse-Jetty_9.4.11.v20180605.pdf | [https://github.com/eclipse/jetty.project](https://github.com/eclipse/jetty.project) |
| Zowe API Mediation Layer | jjwt | 0.9.1 | license_jjwt_0.9.1.pdf | [https://github.com/jwtk/jjwt](https://github.com/jwtk/jjwt) |
| Zowe API Mediation Layer | jquery | 2.0.3 | license_jquery_2.0.3.pdf | [https://github.com/jquery/jquery](https://github.com/jquery/jquery) |
| Zowe API Mediation Layer | jsonpath | 2.4.0 | license_json-path_2.4.0.pdf | [https://github.com/json-path/JsonPath](https://github.com/json-path/JsonPath) |
| Zowe API Mediation Layer | Jsoup | 1.8.3 | license_Jsoup_1.8.3.pdf | [https://github.com/jhy/jsoup](https://github.com/jhy/jsoup) |
| Zowe API Mediation Layer | lodash | 4.17.11 | license_lodash_4.17.11.pdf | [https://github.com/lodash/lodash](https://github.com/lodash/lodash) |
| Zowe API Mediation Layer | logback | 1.2.3 | license_logback_1.2.3.pdf | [https://github.com/qos-ch/logback](https://github.com/qos-ch/logback) |
| Zowe API Mediation Layer | loglevel | 1.6.1 | license_loglevel_1.6.1.pdf | [https://github.com/pimterry/loglevel](https://github.com/pimterry/loglevel) |
| Zowe API Mediation Layer | lombok | 1.16.20 | license_lombok_1.16.pdf | [https://github.com/rzwitserloot/lombok](https://github.com/rzwitserloot/lombok) |
| Zowe API Mediation Layer | mineral-ui | 0.54.0 | license_mineral-ui_0.54.0.pdf | [https://github.com/mineral-ui/mineral-ui](https://github.com/mineral-ui/mineral-ui) |
| Zowe API Mediation Layer | mockito | 2.15.0 | license_mockito_2.15.0.pdf | [https://github.com/mockito/mockito](https://github.com/mockito/mockito) |
| Zowe API Mediation Layer | netflix-infix | 0.3.0 | license_netflix-infix_0.3.0.pdf | [https://github.com/Netflix/netflix-commons/tree/master/netflix-infix/src](https://github.com/Netflix/netflix-commons/tree/master/netflix-infix/src) |
| Zowe API Mediation Layer | npm | 6.4.1 | license_npm_6.4.1.pdf | [https://github.com/npm/cli](https://github.com/npm/cli) |
| Zowe API Mediation Layer | powermock | 1.7.3 | license_powermock_1.7.3.pdf | [https://github.com/powermock/powermock](https://github.com/powermock/powermock) |
| Zowe API Mediation Layer | react | 16.6.3 | license_react_16.6.3.pdf | [https://github.com/facebook/react](https://github.com/facebook/react) |
| Zowe API Mediation Layer | react-app-polyfill | 0.1.3 | license_react-app-polyfill_0.1.3.pdf | [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app) |
| Zowe API Mediation Layer | react-loadable | 5.5.0 | license_react-loadable_5.5.0.pdf | [https://github.com/jamiebuilds/react-loadable](https://github.com/jamiebuilds/react-loadable) |
| Zowe API Mediation Layer | reactor-core | 3.0.7.RELEASE | license_reactor-core_3.0.7.RELEASE.pdf | [https://github.com/reactor/reactor-core](https://github.com/reactor/reactor-core) |
| Zowe API Mediation Layer | react-redux | 5.1.1 | license_react-redux_5.1.1.pdf | [https://github.com/reduxjs/react-redux](https://github.com/reduxjs/react-redux) |
| Zowe API Mediation Layer | react-render-html | 0.6.0 | license_react-render-html_0.6.0.pdf | [https://github.com/utatti/react-render-html](https://github.com/utatti/react-render-html) |
| Zowe API Mediation Layer | react-router-dom | 4.3.1 | license_react-router-dom_4.3.1.pdf | [https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) |
| Zowe API Mediation Layer | react-router-tabs | 1.2.0 | license_react-router-tabs_1.2.0.pdf | [https://github.com/chacestew/react-router-tabs](https://github.com/chacestew/react-router-tabs) |
| Zowe API Mediation Layer | react-scripts | 2.1.1 | license_react-scripts_2.1.1.pdf | [https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app) |
| Zowe API Mediation Layer | react-toastify | 4.4.3 | license_react-toastify_4.4.3.pdf | [https://github.com/fkhadra/react-toastify](https://github.com/fkhadra/react-toastify) |
| Zowe API Mediation Layer | redux | 4.0.1 | license_redux_4.0.1.pdf | [https://github.com/reduxjs/redux](https://github.com/reduxjs/redux) |
| Zowe API Mediation Layer | redux-catch | 1.3.1 | license_redux-catch_1.3.1.pdf | [https://github.com/PlatziDev/redux-catch](https://github.com/PlatziDev/redux-catch) |
| Zowe API Mediation Layer | redux-logger | 3.0.6 | license_redux-logger_3.0.6.pdf | [https://github.com/LogRocket/redux-logger](https://github.com/LogRocket/redux-logger) |
| Zowe API Mediation Layer | redux-observable | 1.0.0 | license_redux-observable_1.0.0.pdf | [https://github.com/redux-observable/redux-observabl](https://github.com/redux-observable/redux-observabl) |
| Zowe API Mediation Layer | redux-persist | 5.10.0 | license_redux-persist_5.10.0.pdf | [https://github.com/rt2zz/redux-persist](https://github.com/rt2zz/redux-persist) |
| Zowe API Mediation Layer | redux-thunk | 2.3.0 | license_redux-thunk_2.3.0.pdf | [https://github.com/reduxjs/redux-thunk](https://github.com/reduxjs/redux-thunk) |
| Zowe API Mediation Layer | Roaster | 2.20.1.Final | license_Roaster_2.20.1.Final.pdf | [https://github.com/forge/roaster](https://github.com/forge/roaster) |
| Zowe API Mediation Layer | RxJS | 6.3.1 | license_RxJS_6.3.1.pdf | [https://github.com/reactivex/rxjs](https://github.com/reactivex/rxjs) |
| Zowe API Mediation Layer | RxJS | 6.3.3 | license_RxJS_6.3.3.pdf | [https://github.com/reactivex/rxjs](https://github.com/reactivex/rxjs) |
| Zowe API Mediation Layer | slf4j | 1.7.25 | license_slf4j_1.7.25.pdf | [https://github.com/qos-ch/slf4j](https://github.com/qos-ch/slf4j) |
| Zowe API Mediation Layer | spring-cloud | 2.0.1.RELEASE | license_spring-cloud_2.0.1.RELEASE.pdf | [https://github.com/spring-cloud/spring-cloud-config](https://github.com/spring-cloud/spring-cloud-config) |
| Zowe API Mediation Layer | spring-framework | 4.3.7.RELEASE | license_spring-framework_4.3.7.RELEASE.pdf | [https://github.com/spring-projects/spring-framework](https://github.com/spring-projects/spring-framework) |
| Zowe API Mediation Layer | spring-hateoas | 0.23.0.RELEASE | license_spring-hateoas_0.23.0.RELEASE.pdf | [https://github.com/spring-projects/spring-hateoas](https://github.com/spring-projects/spring-hateoas) |
| Zowe API Mediation Layer | spring-retry | 1.2.2 | license_spring-retry_1.2.2.pdf | [https://github.com/spring-projects/spring-retry](https://github.com/spring-projects/spring-retry) |
| Zowe API Mediation Layer | spring-security | 5.1.0.RELEASE | license_spring-security_5.1.0.RELEASE.pdf | [https://github.com/spring-projects/spring-security](https://github.com/spring-projects/spring-security) |
| Zowe API Mediation Layer | spring-boot | 2.0.4.RELEASE | license_spring-boot_2.0.4.RELEASE.pdf | [https://github.com/spring-projects/spring-boot](https://github.com/spring-projects/spring-boot) |
| Zowe API Mediation Layer | spring-cloud-netflix | 2.0.0.M8 | license_spring-cloud-netflix_2.0.0.M8.pdf | [https://github.com/spring-cloud/spring-cloud-netflix](https://github.com/spring-cloud/spring-cloud-netflix) |
| Zowe API Mediation Layer | springfox | 2.8.0 | license_springfox_2.8.0.pdf | [https://github.com/springfox/springfox](https://github.com/springfox/springfox) |
| Zowe API Mediation Layer | swagger-core | 1.5.21 | license_swagger-core_1.5.21.pdf | [https://github.com/swagger-api/swagger-core](https://github.com/swagger-api/swagger-core) |
| Zowe API Mediation Layer | swagger-jersey2-jaxrs | 1.5.17 | license_swagger-jersey2-jaxrs_1.5.17.pdf | [https://github.com/swagger-api/swagger-core](https://github.com/swagger-api/swagger-core) |
| Zowe API Mediation Layer | swagger-UI | 3.20.0 | license_swagger-UI_3.20.0.pdf | [https://github.com/swagger-api/swagger-ui](https://github.com/swagger-api/swagger-ui) |
| Zowe API Mediation Layer | uuid | 3.3.2 | license_uuid_3.3.2.pdf | [https://github.com/kelektiv/node-uuid](https://github.com/kelektiv/node-uuid) |
| Zowe API Mediation Layer | Apache Velocity | 2.0 | license_apache-velocity_2.0.pdf | [https://github.com/apache/velocity-engine](https://github.com/apache/velocity-engine) |

**Note:** All trademarks, trade names, service marks, and logos referenced herein belong to their respective companies.

[Click here](https://github.com/zowe/docs-site/blob/master/docs/.vuepress/public/zowe_apiml_tpsrs.zip) to download and read each complete license. The .zip file contains the licenses for all of the third-party components that Zowe API Mediation Layer uses.
