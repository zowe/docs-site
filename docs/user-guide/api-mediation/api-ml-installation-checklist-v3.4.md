# Zowe v3.4 – API ML Installation and Configuration Checklist 

Zowe v3.4 introduces a significant architectural shift with its single-service deployment option for the API Mediation Layer (API ML). Unlike previous Zowe versions (such as v2.18 and early v3.0 releases) where the API Gateway, Discovery Service, and other core API ML components were often deployed as separate microservices, the single-service deployment consolidates these essential functionalities into a single, unified Spring Boot application. 

This single-server architecture offers substantial benefits over multi-service deployments by simplifying installation and configuration, reducing the number of processes to manage, and lowering internal communication overhead. The result is a more streamlined, easier-to-maintain, and potentially more performant API ML environment.

## Preparing for Installation
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :--------------------------------------- |
| 1 | Verify Java 17+, z/OS 2.4+, and Zowe 3.3 runtime prerequisites. | [Addressing Zowe server prerequisites](https://docs.zowe.org/stable/user-guide/install-nodejs-zos/) | Java 17, z/OS 2.4+, and Zowe 3.3 prerequisites confirmed; all system requirements met. | System Programmer / Zowe Administrator |
| 2 | Choose deployment type: **single-service** or **multi-component**. | [Zowe deployment types](https://docs.zowe.org/stable/install-zos/install-zowe-zos.html#zowe-deployment-types) | Modulith deployment chosen for consolidated API ML. | Zowe Administrator |
| 3 | Update firewall and port settings if using single-service mode. | [Zowe default ports](https://docs.zowe.org/stable/user-guide/configure-zos-system.html#zowe-default-ports) | Firewall rules updated for single-port operation; required ports confirmed open and available. | Network Administrator / Zowe Administrator |

## Installing the Zowe z/OS Runtime
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 4 | Install Zowe v3.4 using Zowe Server Install Wizard, Convenience Build, SMP/E build, or Portable Software Instance. | [Install Zowe on z/OS](https://docs.zowe.org/stable/install-zos/install-zowe-zos.html) | Zowe v3.4 convenience build package downloaded and extracted to `/usr/local/zowe/runtime`. | System Programmer / Zowe Administrator |
| 5 | Run `zwe install` or `zwe generate --dry-run`. | [zwe install command](https://docs.zowe.org/stable/install-zos/install-zowe-convenience-build.html#installation-steps) | `zwe install` executed, Zowe runtime deployed; `instance.env` and `zowe.yaml` generated. | System Programmer / Zowe Administrator |
| 6 | Define API ML settings under `components.apiml` in `zowe.yaml`. | [API Mediation Layer configuration](https://docs.zowe.org/stable/user-guide/configuration-file-reference.html#api-mediation-layer-configuration) | `zowe.yaml` updated with consolidated `components.apiml` settings for Gateway, Discovery, and Catalog. | Zowe Administrator |

## Configuring API ML with a z/OSMF Workflow
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- | :--------------------------------------- |
| 7 | Use the Stand-alone Zowe API ML Configuration workflow. | [Configuring API ML with z/OSMF Workflow](https://docs.zowe.org/stable/user-guide/configure-apiml-zosmf-workflow.html) | Zowe API ML Configuration z/OSMF workflow imported and initiated. | System Programmer / Zowe Administrator |
| 8 | We recommend you select “Modulith Deployment” as your deployment method. | [Define workflow variables in z/OSMF](https://docs.zowe.org/stable/user-guide/configure-apiml-zosmf-workflow.html#define-workflow-variables) | "Modulith Deployment" selected as the deployment method in the z/OSMF workflow. | Zowe Administrator |
| 9 | Specify trusted proxies and forward-header parameters. | [Configure trusted proxies](https://docs.zowe.org/stable/user-guide/configure-apiml-zosmf-workflow.html#configure-trusted-proxies) | Trusted proxy and forward-header parameters configured as required during workflow execution. | Network Administrator / Zowe Administrator |

## Configuring Security
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 10 | Run `zwe init security` as standard. | [Generating security configurations](https://docs.zowe.org/stable/admin/security/security-overview.html#generating-security-configurations) | SAF profiles for Zowe and new group IDs created successfully. | Security Administrator / Zowe Administrator |
| 11 | Perform Configuration tasks that apply to API Mediation Layer. | [API specific tasks in Address security requirements](https://docs.zowe.org/stable/user-guide/address-security-requirements.html#api-specific-tasks) | API ML-specific security configurations reviewed and applied (e.g., service IDs, access control). | Security Administrator |
| 12 | Define trusted proxy headers in `zowe.yaml`. | [Defining trusted proxy headers](https://docs.zowe.org/stable/user-guide/configuration-file-reference.html#defining-trusted-proxy-headers) | `apiml.security.forwardHeader.trustedProxies` configured in `zowe.yaml` with appropriate IP ranges/hostnames. | Zowe Administrator / Network Administrator |
| 13 | Verify port and certificate access for runtime users. | [Granting Zowe user access to certificates and keyrings](https://docs.zowe.org/stable/user-guide/configure-certificates.html#granting-the-zowe-started-task-user-access-to-certificates-and-keyrings) | Zowe runtime user confirmed to have necessary access to ports and keyring/certificate files. | Security Administrator |

## Configuring Certificates
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------- | :--------------------------------------- |
| 14 | Create or import certificates for the new Gateway (Spring). | [Configuring Zowe certificates](https://docs.zowe.org/stable/user-guide/configure-certificates.html) | Gateway certificates created/imported into the Zowe keystore using the certificate manager. | Security Administrator / Zowe Administrator |
| 15 | Update `zowe.yaml` with keyring references and single-service TLS settings. | [Certificate configuration parameters](https://docs.zowe.org/stable/user-guide/configuration-file-reference.html#certificate-configuration-parameters) | `zowe.yaml` updated with `safkeyring://` references and single-service TLS settings. | Zowe Administrator |
| 16 | Confirm TLS communication between clients and backend. | [Troubleshooting Zowe certificates](https://docs.zowe.org/stable/admin/security/security-troubleshoot-certificates.html) | Successful TLS handshake confirmed in Gateway logs and via client connections. | Zowe Administrator / Security Administrator |

## Configuring High Availability
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 17 | Configure HA mode by deploying multiple independent Zowe server component instances, ideally on different LPARs. | [High availability overview](https://docs.zowe.org/stable/admin/high-availability/overview.html) | Multiple Zowe single-service instances deployed on separate LPARs, ensuring redundancy. | Zowe Administrator / System Programmer |
| 18 | Define Eureka timeouts (`connectTimeout`, `readTimeout`). | [Eureka configuration](https://docs.zowe.org/stable/user-guide/configuration-file-reference.html#eureka-configuration) | Eureka `connectTimeout` and `readTimeout` defined in `zowe.yaml` for robust discovery. | Zowe Administrator |
| 19 | For single-service, enable HA through external clustering. | [Load balancing configuration](https://docs.zowe.org/stable/admin/high-availability/load-balancing-configuration.html) | External load balancer (e.g., Sysplex Distributor) configured for Gateway endpoints. | Network Administrator |

## Starting and Stopping Zowe
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :---------------------------------------------------- | :------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- | :--------------------------------------- |
| 20 | Start Zowe with `zwe start apiml` or `zwe start all`. | [Starting and stopping a Zowe instance](https://docs.zowe.org/stable/manage/managing-zowe-instances.html#starting-and-stopping-a-zowe-instance) | Zowe started successfully; all API ML services (Gateway, Discovery) show as active. | Zowe Administrator / System Programmer |
| 21 | Stop Zowe with `zwe stop apiml` or `zwe stop all`. | [Starting and stopping a Zowe instance](https://docs.zowe.org/stable/manage/managing-zowe-instances.html#starting-and-stopping-a-zowe-instance) | Zowe stopped successfully; JES logs confirm clean shutdown of all components. | Zowe Administrator / System Programmer |

## Verifying Installation
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :----------------------------------------------- | :----------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 22 | Access API Catalog and verify registered APIs. | [Verify Zowe API Mediation Layer is up and running](https://docs.zowe.org/stable/user-guide/installandconfig.html#verify-zowe-api-mediation-layer-is-up-and-running) | API Catalog UI loaded, showing expected core and onboarded APIs registered via the Spring Gateway. | Zowe Administrator / Application Developer |
| 23 | Confirm “single-service mode enabled” in Gateway logs. | [Zowe API Mediation Layer logs](https://docs.zowe.org/stable/troubleshoot/troubleshoot-apiml.html#zowe-api-mediation-layer-logs) | Gateway logs show clear indication of "single-service mode enabled" upon startup. | Zowe Administrator |
| 24 | Test proxy header forwarding using REST client. | [Configure trusted proxies](https://docs.zowe.org/stable/user-guide/configure-apiml-zosmf-workflow.html#configure-trusted-proxies) | REST client requests through Gateway confirm `X-Forwarded-*` headers are correctly processed. | Application Developer / Zowe Administrator | 


