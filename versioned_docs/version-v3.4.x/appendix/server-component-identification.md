# Server Component Identification

The following table details properties of the Zowe server-side components that can be used to identify the source of a message, job, or network activity.
Values presented in the table are default values. You can change the values by updating variable values in the `zowe.yaml` file.

For more information about variable names in the following table, see the [Zowe YAML configuration file reference](./zowe-yaml-configuration.md) in the References section.

Most Components of Zowe are HTTPS servers. The ports of each and their default jobnames are listed below.
The ports can be customized for each component by editing the value of `components.<component-name>.port` within the Zowe YAML file.
Each Jobname has a default prefix of ZWE1, but that can be customized via the `zowe.job.prefix` value in the Zowe YAML file. The ports used are different between single-service deployment and multi-service deployment.


| Port number | Category | Component(s) | Default Jobname     | Log Suffix | Purpose                                                                                                                                                                                                              |
|------|------|--------------|---------------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 7553 | API Mediation Layer | discovery    | ZWE1**AG**          | AGW        | Discovery server port which dynamic API services can issue APIs to register or unregister themselves.                                                                                                                |
| 7554 | API Mediation Layer | gateway      | ZWE1**AG**          | AGW        | The northbound edge of the API Gateway used to accept client requests.  This port must be exposed outside the z/OS network so clients (web browsers, VS Code, processes running the Zowe CLI) can reach the gateway. |
| 7556 | App Framework | app-server   | ZWE1**DS** & ZWE1SV | D          | The Zowe Desktop (also known as ZLUX) port used to log in through web browsers.                                                                                                                                      |
| 7557 | App Framework | zss          | ZWE1**SZ**          | SZ         | Z Secure Services (ZSS) provides REST API services to ZLUX, used by the File Editor application and other ZLUX applications in the Zowe Desktop.                                                                     |
## Older, Multi-service APIML

In versions prior to Zowe v3.4, APIML was composed of multiple jobs instead of just ZWE1AG operating on ports 7553 & 7554.
This is seen when the Zowe YAML property "components.apiml.enabled: false" but other components such as gateway are enabled. It is no longer recommended.

| Port number | Category | Component | Default Jobname | Log Suffix | Purpose |
|------|------|------|------|------|------|
| 7552 | API Mediation Layer | api-catalog | ZWE1**AC** | AAC | Used to view API swagger / openAPI specifications for registered API services in the API Catalog. |
| 7553 | API Mediation Layer | discovery | ZWE1**AD** | ADS | Discovery server port which dynamic API services can issue APIs to register or unregister themselves. |
| 7554 | API Mediation Layer | gateway | ZWE1**AG** | AGW | The northbound edge of the API Gateway used to accept client requests before routing them to registered API services.  This port must be exposed outside the z/OS network so clients (web browsers, VS Code, processes running the Zowe CLI) can reach the gateway. |
| 7555 | API Mediation Layer | Caching Service | ZWE1**CS** | ACS | Port of the Caching Service that is used to share state between different Zowe instances in a high availability topology. |
| 7558 | API Mediation Layer | zaas | ZWE1**AZ** | AZ | Used for the Zowe Authentication and Authorization Service. This port receives internal connections only. |


## Application Server Jobname for Port

The jobnames associated with the component "app-server" varies depending on whether cluster mode is enabled or not (default: enabled).

| Cluster mode | Jobname for listener port | Jobname for worker processes |
|---|---|---|
| Enabled (Default) | Name of STC (default: ZWE1SV) | `zowe.job.prefix` + DS (default: ZWE1**DS**) |
| Disabled | `zowe.job.prefix` + DS (default: ZWE1**DS**) | Not Applicable |

