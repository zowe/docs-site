# Troubleshooting startup of Zowe z/OS components

Review the following topics for information that can help you troubleshoot problems when installing Zowe z/OS components or starting Zowe's `ZWESLSTC` started task.


## How to check if `ZWESLSTC` startup is successful 

The `ZWESLSTC` started task on z/OS brings up a number of address spaces.  There is no single message that **Zowe has launched and is ready to run** as the sequence of address spaces initialization is environment-dependent. Note that the message ID `ZWED0021I` is typically the last one that is logged.  More details on each subsystem and their startup messages are described in the following sections.

- [Troubleshooting startup of Zowe z/OS components](#troubleshooting-startup-of-zowe-zos-components)
  - [How to check if `ZWESLSTC` startup is successful](#how-to-check-if-zweslstc-startup-is-successful)
    - [Check the startup of API Mediation Layer](#check-the-startup-of-api-mediation-layer)
    - [Check the startup of Zowe Desktop](#check-the-startup-of-zowe-desktop)
    - [Check the startup of Zowe Secure Services](#check-the-startup-of-zowe-secure-services)
    
The most complete way to check that Zowe started successfully is to check that each component successfully completed its initialization. Each component writes messages to the JES `SYSPRINT` and writes severe errors to the `STDERR` job spool file.  

To learn more about the Zowe components and their role, see [Zowe Architecture](../getting-started/zowe-architecture.md). It is possible to configure Zowe to bring up only a subset of its components by using the `zowe.components.<NAME>.enabled: boolean` variables in the `zowe.yaml` file.

### Check the startup of API Mediation Layer 

The API Mediation Layer has four address spaces: API Catalog, API Gateway,  API Discovery and Caching Service.  

To check whether the API Mediation Layer is fully initialized, look for the message `ZWEAM000I`. Each component writes a successful startup message `ZWEAM000I` to JES as shown in the following example. The message also indicates the CPU of seconds spent. In a normal startup of API ML components, each component writes a `ZWEAM00I` message as in the following example:

**Example:**

```
2023-02-21 17:20:57.614 [35m<ZWEACS1:main:33554882>[0;39m IBMUSER [32mINFO [0;39m [36m(o.z.a.p.s.ServiceStartupEventHandler)
[0;39m ZWEAM000I Caching Service started in 43.818 seconds
...
2023-02-21 17:21:03.924 <ZWEAAC1:main:50332214> IBMUSER INFO  (o.z.a.p.s.ServiceStartupEventHandler) 
ZWEAM000I API Catalog Service started in 53.75 seconds
...
2023-02-21 12:10:08.468 <ZWEAAC1:main:83889734> ZWESVUSR INFO  (o.z.a.p.s.ServiceStartupEventHandler) ZWEAM000I API Catalog Service started in 37.025 seconds
...
2023-02-21 17:21:06.368 <ZWEAGW1:main:50332206> IBMUSER INFO  (o.z.a.p.s.ServiceStartupEventHandler) ZWEAM000I Gateway Service started in 56.2 seconds
```

In addition to looking for `ZWEAM00I` in the JES log, you can also log in to the Gateway homepage and check the service status indicator. The Gateway home page is accessible on the externalPort. The default value for this port is `7554`. If there is a red or yellow tick beside one of its three services, the components are still starting.  

<img src={require("../images/api-mediation/apiml-startup.png").default} alt="Zowe API Mediation Layer Startup" width="600px"/> 

When all services are fully initialized, three green ticks are displayed.

<img src={require("../images/api-mediation/apiml-started.png").default} alt="Zowe API Mediation Layer Startup" width="300px"/> 

### Check the startup of Zowe Desktop 

During startup, Zowe Desktop loads its plug-ins and writes the message `ZWED0031I` when completed.  

```
2023-02-21 12:10:12.824 <ZWED:33558118> ZWESVUSR INFO (_zsf.install,index.js:439) ZWED0031I - Server is ready at https://0.0.0.0:27556, Plugins successfully loaded: 100% (19/19)
```

The `ZWED0031I` message includes a count of the number of loaded plug-ins as well as the total number of plug-ins, for example `Plugins successfully loaded: 100% (19/19)`.  A failed plug-in load will not abort the launch of the Desktop.

If Zowe Desktop is started together with the API Gateway, the Zowe Desktop will register itself with the API Gateway. This step must be completed before a user is able to successfully log in to the Zowe Desktop. The message `ZWED0021I` indicates successful registration between the Zowe Desktop and the API Gateway. 

**Example:**

```
2023-02-21 12:10:12.226 <ZWED:33558118> ZWESVUSR INFO (_zsf.apiml,apiml.js:309) ZWED0021I - Eureka Client Registered from 127.0.0.1. Available at https://tvt5003.svl.ibm.com:27553/zlux/ui/v1/
```

If you try to log into the Zowe Desktop too early before the Eureka client registration is complete, you may receive the message that **Authentication failed** on the login page. This is due to an incomplete API ML handshake. If authentication fails, wait for the registration to complete as indiciated by the `ZWED0021I` message.

In addition to spooling to the JES `SYSPRINT` file for the Zowe `ZWESLSTC` task, the Zowe Desktop writes messages to `zowe.logDirectory/zssServer-yyyy-mm-dd-hh-ss.log`.

### Check the startup of Zowe Secure Services

The zssServer is used for secure services for the Zowe Desktop.  

```
ZWES1013I ZSS Server has started. Version '2.5.0+20221130' 31-bit
```

The zssServer registers itself with the cross memory server running under the address space `ZWESISTC`.  You can use the attach message ID `ZWES1014I` to check that this has occurred successfully. If this message contains a nonzero return code in the `cmsRC=` value, then a failure occurred. For more information on how to diagnose these, see [ZSS server unable to communicate with ZIS](./app-framework/app-troubleshoot.md#zss-server-unable-to-communicate-with-zis).

```
ZWES1014I ZIS status - 'Ok' (name='ZWESIS_STD      ', cmsRC='0', description='Ok', clientVersion='2')
```
