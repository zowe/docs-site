# Onboarding a Node.js based REST API service

This article is part of a series of onboarding articles, which outline the process of onboarding REST API services to the Zowe API Mediation Layer (API ML). As a service developer, you can onboard a REST service based on NodeJS with the API ML with the Zowe API Mediation Layer using our Node.js Enabler.

**Note:** For more information about onboarding API services with the API ML, see the [Onboarding Overview](onboard-overview.md).

## Introduction

The [API ML onboarding Node.js enabler](https://www.npmjs.com/package/@zowe/apiml-onboarding-enabler-nodejs) is an NPM package which helps to simplify the process of onboarding a REST service written in Node.js with the API ML. 

For more information about how to utilize another API ML enablers, see the [Onboarding Overview](onboard-overview.md).
## Onboarding your Node.js service with API ML

The following steps outline the overall process to onboard a REST service with the API ML using the onboarding Node.js enabler. Each step is described in further detail in this article.

1. [Prerequisites](#prerequisites)

2. [Install the npm dependency](#installing-the-npm-dependency)

3. [Configure your service](#configuring-your-service)
   
4. [Register your service with API ML](#registering-your-service-with-api-ml)

5. (Optional) [Validate the discoverability of your API service by the Discovery Service](#validating-the-discoverability-of-your-api-service-by-the-discovery-service)

## Prerequisites
Ensure that you meet the following prerequisites:

* You satisfy the prerequisites from the [Onboarding Overview](onboard-overview.md).
* The REST API service to onboard is written in Node.js.
* The service is enabled to communicate with API ML Discovery Service over a TLS v1.2 secured connection.

## Installing the npm dependency 

Install the onboarding Node.js enabler package as a dependency of your service. Run the following npm command from your project directory:
```
npm i @zowe/apiml-onboarding-enabler-nodejs@latest --dev-save
```
**Note:** If you have a multi-module project, you have to run the npm command from the submodule where your Node.js project is located.

## Configuring your service

Create a yaml file named `service-configuration.yml` inside a `/config` directory at the same level of your `index.js`, and add the following configuration properties. 

The following example shows a sample configuration. 
 
 **Example:**
    
   ```yaml
    serviceId: hwexpress
    title: Hello World express REST API
    eureka:
      ssl: true
      host: localhost
      ipAddress: 127.0.0.1
      port: 10011
      servicePath: '/eureka/apps/'
      maxRetries: 30
      requestRetryDelay: 1000
      registryFetchInterval: 5
    
    
    description: Hello World REST API Service implemented in Express and Node.js
    baseUrl: https://localhost:10020/hwexpress
    homePageRelativeUrl: https://localhost:10020/
    statusPageRelativeUrl: https://localhost:10020/info
    healthCheckRelativeUrl: https://localhost:10020/status
    discoveryServiceUrls:
      - https://localhost:10011/eureka
    routes:
      - gatewayUrl: api/v1
        serviceRelativeUrl: /api/v1
    apiInfo:
      - apiId: zowe.apiml.hwexpress
        gatewayUrl: "api/v1"
        swaggerUrl: https://localhost:10020/swagger.json
    catalogUiTile:
      id: cademoapps
      title: Sample API Mediation Layer Applications
      description: Applications which demonstrate how to make a service integrated to the API Mediation Layer ecosystem
      version: 1.0.0
    instance:
      app: hwexpress
      vipAddress: hwexpress
      instanceId: localhost:hwexpress:10020
      homePageUrl: https://localhost:10020/
      hostName: 'localhost'
      ipAddr: '127.0.0.1'
      secureVipAddress: hwexpress
      port:
        $: 10020
        '@enabled': false
      securePort:
        $: 10020
        '@enabled': "true"
    
      dataCenterInfo:
        '@class': com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo
        name: MyOwn
      metadata:
        apiml.catalog.tile.id: 'samplenodeservice'
        apiml.catalog.tile.title: 'Zowe Sample Node Service'
        apiml.catalog.tile.description: 'NodeJS Sample service running'
        apiml.catalog.tile.version: '1.0.0'
        apiml.routes.api_v1.gatewayUrl: "api/v1"
        apiml.routes.api_v1.serviceUrl: "/api/v1"
        apiml.apiInfo.0.apiId: zowe.apiml.hwexpress
        apiml.apiInfo.0.gatewayUrl: "api/v1"
        apiml.apiInfo.0.swaggerUrl: https://localhost:10020/swagger.json
        apiml.service.title: 'Zowe Sample Node Service'
        apiml.service.description: 'The Proxy Server is an HTTP HTTPS, and Websocket server built upon NodeJS and ExpressJS.'
    
    ssl:
      certificate: ssl/localhost.keystore.cer
      keystore: ssl/localhost.keystore.key
      caFile: ssl/localhost.pem
      keyPassword: password
    
  ```

## Registering your service with API ML

To register your service with API ML, use the following procedure.

**Follow these steps:**

1. Inside your Node.js service `index.js`, add the following code block to register your service with Eureka:

   ```js
    const apiLayerService = require("@zowe/apiml-onboarding-enabler-nodejs");
    tlsOptions = apiLayerService.tlsOptions;
    const httpsServer = https.createServer(tlsOptions, app);
    httpsServer.listen(args.port, function () {
        apiLayerService.connectToEureka();
    });
    
   ```
2. Start your Node.js service and verify that the service is registered to the Zowe API Mediation Layer.

## Validating the discoverability of your API service by the Discovery Service

Once you build and start your service successfully, you can use the option of validating that your service is registered correctly with the API ML Discovery Service.

**Follow these steps:**

  1. [Validate successful onboarding](./onboard-overview.md#verify-successful-onboarding-to-the-api-ml)
 
  2. Check that you can access your API service endpoints through the Gateway.

  3. (Optional) Check that you can access your API service endpoints directly outside of the Gateway.

Specific addresses and user credentials for the individual API ML components depend on your target runtime environment.

**Note:** If you are working with a local installation of API ML, and you are using our dummy identity provider, enter `user` for both `username` and `password`. If API ML was installed by system administrators, ask them to provide you
with actual addresses of API ML components and the respective user credentials.

**Note:** Wait for the Discovery Service to fully register your service. This process may take a few minutes after your
service starts successfully.

