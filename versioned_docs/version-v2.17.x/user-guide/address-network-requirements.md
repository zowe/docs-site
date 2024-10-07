# Addressing network requirements

Review the following table during installation of Zowe server-side components to determine which TCP ports are required. 
Values presented in the table are default values. You can change the values by updating variable values in the `zowe.yaml` file. 

:::info Required roles: network administrator, system programmer
:::

For more information about variable names in the following table, see the [Zowe YAML configuration file reference](../appendix/zowe-yaml-configuration.md) in the References section.

## Component Ports

Most Components of Zowe are HTTPS servers. The ports of each and their default jobnames are listed below.
The ports can be customized for each component by editing the value of `components.<component-name>.port` within the Zowe YAML file.
Each Jobname has a default prefix of ZWE1, but that can be customized via the `zowe.job.prefix` value in the Zowe YAML file.

| Port number | Component | Default Jobname | Purpose |
|------|------|------|
| 7552 | api-catalog | Used to view API swagger / openAPI specifications for registered API services in the API Catalog. 
| 7553 | discovery | Discovery server port which dynamic API services can issue APIs to register or unregister themselves.
| 7554 | gateway | The northbound edge of the API Gateway used to accept client requests before routing them to registered API services.  This port must be exposed outside the z/OS network so clients (web browsers, VS Code, processes running the Zowe CLI) can reach the gateway.
| 7555 | caching-service | Port of the caching service that is used to share state between different Zowe instances in a high availability topology.
| 7556 | app-server | The Zowe Desktop (also known as ZLUX) port used to log in through web browsers.
| 7557 | zss | Z Secure Services (ZSS) provides REST API services to ZLUX, used by the File Editor application and other ZLUX applications in the Zowe Desktop.
| 7558 | jobs-api | Disabled by default, as it duplicates APIs found in zOSMF, and is only retained if needed by extensions.
| 7559 | files-api | Disabled by default, as it duplicates APIs found in zOSMF, and is only retained if needed by extensions.

## Caching Service Infinispan ports

The Caching Service will use these additional ports if enabled (`zowe.components.caching-service.enabled: true`) and set to use infinispan (the default, `zowe.components.caching-service.storage.mode: infinispan`).

| Port number | zowe.yaml variable name | Purpose |
|------|------|------|
| 7118 | zowe.components.caching-service.storage.infinispan.jgroups.keyExchange.port | The port at which the key server in Infinispan is listening. If the port is not available, the next port is probed, up to port+5. Used by the key server (server) to create an SSLServerSocket and by clients to connect to the key server.
| 7600 | zowe.components.caching-service.storage.infinispan.jgroups.port | Bind port for the socket that is used to form an Infinispan cluster.

## IP Addresses

Zowe's servers by default use the TCP IP address `0.0.0.0` which assigns the servers to be available on all network interfaces available to the jobs.

If this default is not desired, it is recommended to use [TCPIP port assignment statements](https://www.ibm.com/docs/en/zos/2.4.0?topic=assignments-profiletcpip-port) to restrict the IP & ports of each server by their jobnames. The jobnames of each Zowe component is derived from the property `zowe.job.prefix` + <component-suffix> as shown in the table prior.

When `zowe.job.prefix` is "ZWE1", An example of port reservations with a fixed IP of "10.11.12.13" could be:

```
   7552 TCP ZWE1AC BIND 10.11.12.13 ; Zowe API Catalog
   7553 TCP ZWE1AD BIND 10.11.12.13 ; Zowe Discovery
   7554 TCP ZWE1AG BIND 10.11.12.13 ; Zowe Gateway
   7555 TCP ZWE1CS BIND 10.11.12.13 ; Zowe Caching Service
   7556 TCP ZWE1DS BIND 10.11.12.13 ; Zowe App Server
   7557 TCP ZWE1SZ BIND 10.11.12.13 ; Zowe ZSS
```

