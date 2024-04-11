# Addressing network requirements

Review the following table during installation of Zowe server-side components to determine which TCP ports are required. 
Values presented in the table are default values. You can change the values by updating variable values in the `zowe.yaml` file. 

:::info Required roles: network administrator, system programmer
:::

For more information about variable names in the following table, see the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md) in the References section.

| Port number | zowe.yaml variable name | Purpose |
|------|------|------|
| 2157 | zowe.environments.JGROUPS_KEYEXCHANGE_PORT | The port at which the key server in Infinispan is listening. If the port is not available, the next port is probed, up to port+5. Used by the key server (server) to create an SSLServerSocket and by clients to connect to the key server.
| 7098 | zowe.components.caching-service.storage.infinispan.jgroups.port | Bind port for the socket that is used to form an Infinispan cluster.
| 7552 | zowe.components.api-catalog.port | Used to view API swagger / openAPI specifications for registered API services in the API Catalog. 
| 7553 | zowe.components.discovery.port | Discovery server port which dynamic API services can issue APIs to register or unregister themselves.
| 7554 | zowe.components.gateway.port | The northbound edge of the API Gateway used to accept client requests before routing them to registered API services.  This port must be exposed outside the z/OS network so clients (web browsers, VS Code, processes running the Zowe CLI) can reach the gateway.
| 7555 | zowe.components.caching-service.port | Port of the caching service that is used to share state between different Zowe instances in a high availability topology.
| 7556 | zowe.components.app-server.port | The Zowe Desktop (also known as ZLUX) port used to log in through web browsers.
| 7557 | zowe.components.zss.port | Z Secure Services (ZSS) provides REST API services to ZLUX, used by the File Editor application and other ZLUX applications in the Zowe Desktop.
| 7558 | zowe.components.jobs-api.port | Port of the service that provides REST APIs to z/OS jobs used by the JES Explorer.
| 7559 | zowe.components.files-api.port | Port of the service that provides REST APIs to MVS and USS file systems.
| N/A | zowe.components.explorer-jes | Port of the JES Explorer GUI for viewing and working with jobs in the Zowe Desktop.
| N/A | zowe.components.explorer-mvs | Port of the MVS Explorer GUI for working with data sets in the Zowe Desktop.
| N/A | zowe.components.explorer-uss | Port of the USS Explorer GUI for working with USS in the Zowe Desktop.

