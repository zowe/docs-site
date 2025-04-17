# Onboarding a Python based REST API service

This article is part of a series of onboarding articles, which outline the process of onboarding REST API services to Zowe API Mediation Layer (API ML). As a service developer, you can onboard a REST service based on Python with Zowe API ML using our Python Enabler.

:::note
For more information about onboarding API services with the API ML, see the [Onboarding Overview](./onboard-overview.md).
:::

## Introduction

The [API ML onboarding Python enabler](https://pypi.org/project/zowe-apiml-onboarding-enabler-python/) is a Python package which helps to simplify the process of onboarding a REST service written in Python with API ML. 

For more information about how to utilize other API ML enablers, see the [Onboarding Overview](onboard-overview.md).

## Onboarding your Python service with API ML

The following steps outline the overall process to onboard a REST service with API ML using the onboarding Python enabler. Each step is described in further detail in this article.

- [Onboarding a Python based REST API service](#onboarding-a-python-based-rest-api-service)
  - [Introduction](#introduction)
  - [Onboarding your Python service with API ML](#onboarding-your-python-service-with-api-ml)
  - [Prerequisites](#prerequisites)
  - [Installing the Python dependency](#installing-the-python-dependency)
  - [Configuring your service](#configuring-your-service)
  - [Registering your service with API ML](#registering-your-service-with-api-ml)
  - [Validating the discoverability of your API service by the Discovery Service](#validating-the-discoverability-of-your-api-service-by-the-discovery-service)

## Prerequisites
Ensure that you meet the following prerequisites:

* You satisfy the prerequisites from the [Onboarding Overview](onboard-overview.md).
* The REST API service to onboard is written in Python.
* The service is enabled to communicate with API ML Discovery Service over a TLS v1.2 secured connection.

## Installing the Python dependency

Install the onboarding Python enabler package as a dependency of your service. Run the following pip command from your project directory:
```
pip install zowe-apiml-onboarding-enabler-python
```
:::note
If you have a multi-module project, you have to run the pip command from the submodule where your Python project is located.
:::

## Configuring your service

Create a yaml file named `service-configuration.yml` inside a `/config` directory at the same level of your `app.py`, and add the configuration properties as presented in the following configuration example. 
 
 **Example:**
    
   ```yaml
    eureka:
       ssl: true
       host: localhost
       ipAddress: 127.0.0.1
       port: 10011
       servicePath: '/eureka'
       maxRetries: 30
       requestRetryDelay: 1000
       registryFetchInterval: 5


    instance:
       app: pythonservice
       scheme: https
       vipAddress: pythonservice
       instanceId: localhost:pythonservice:10018
       homePageUrl: https://localhost:10018/pythonservice
       hostName: 'localhost'
       ipAddr: '127.0.0.1'
       port: 10018
       securePort: 10018
       secureVipAddress: pythonservice
       statusPageUrl: https://localhost:10018/pythonservice/application/info
       healthCheckUrl: https://localhost:10018/pythonservice/application/health
       nonSecurePortEnabled': false
       securePortEnabled: true
       metadata:
          apiml.catalog.tile.id: 'cademoapps'
          apiml.catalog.tile.title: 'Sample Python Hello World'
          apiml.catalog.tile.description: 'Applications Hello'
          apiml.routes.api_v1.gatewayUrl: "api/v1"
          apiml.routes.api_v1.serviceUrl: "/pythonservice"
          apiml.apiInfo.0.apiId: org.zowe.pythonservice
          apiml.apiInfo.0.gatewayUrl: "api/v1"
          apiml.apiInfo.0.swaggerUrl: https://localhost:10018/pythonservice/apidoc
          apiml.apiInfo.0.version: 1.0.0
          apiml.service.title: 'Zowe Sample Python Service'
          apiml.service.description: 'Sample API services to demonstrate Python Onboarding Enabler'

    ssl:
       certificate: ssl/localhost.keystore.cer
       keystore: ssl/localhost.keystore.key
       caFile: ssl/localhost.pem
       keyPassword: password
  ```

## Registering your service with API ML

To register your service with API ML, use the following procedure.

1. Inside your Python service `app.py`, add the following script to register your service with Eureka:

   ```python
   from fastapi import FastAPI
   from onboarding_enabler_python.registration import PythonEnabler
       
   app = FastAPI()
   enabler = PythonEnabler(config_file="service-configuration.yml")
       
   @app.on_event("startup")
   def register_service():
      enabler.register()
   ```
2. Start your Python service and verify that the service is registered to Zowe API Mediation Layer.

## Validating the discoverability of your API service by the Discovery Service

Once you build and start your service successfully, you can validate that your service is registered correctly with the API ML Discovery Service.

  1. [Validate successful onboarding](./onboard-overview.md#verify-successful-onboarding-to-the-api-ml).
 
  2. Check that you can access your API service endpoints through the Gateway.

  3. (Optional) Check that you can access your API service endpoints directly outside the Gateway.

Specific addresses and user credentials for the individual API ML components depend on your target runtime environment.

:::note Notes:
* If you are working with a local installation of API ML, and you are using the provided dummy identity provider, enter `user` for both `username` and `password`. If API ML was installed by system administrators, ask them to provide you
with actual addresses of API ML components and the respective user credentials.  
* Wait for the Discovery Service to fully register your service. This process may take a few minutes after your
service starts successfully.
:::

