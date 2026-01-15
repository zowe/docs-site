# Zowe version-specific Install/Config Tasks

Review the following table for a comprehensive overview of the **version-specific installation and configuration tasks** for Zowe, comparing Zowe v2.18, v3.0, and v3.4.

The table highlights the significant architectural shift in Zowe 3.0, including the migration from the Zuul Gateway to **Spring Cloud Gateway**, an upgrade in the required **Java version (from Java 11 to 17)**, and changes to the deployment model to modular microservices. Zowe v3.4.x further refines this model by introducing the **single-service deployment option**, which allows for an optional single-JVM setup for simplified configuration and port planning.

The comparison details key changes across several areas:

  * **Prerequisites:** Updated Java and z/OS requirements.
  * **Architecture & Deployment:** Transition from separate Gateway, Discovery, and Catalog JVMs to a modular runtime with the optional unified single-JVM single-service deployment in v3.4.
  * **Security & Certificates:** Changes to Keyring syntax, new security parameters for trusted proxies, and enhanced certificate validation tools.
  * **Configuration:** Evolution of the configuration layout (from separate to modular YAML) and updates to z/OSMF workflow names and options.
  * **High Availability (HA):** A shift from manual failover to a design that leverages Spring-based Eureka registry and external load balancing for HA.
  * **Start/Stop Commands:** Simplification of the commands to manage the entire API ML runtime (e.g., `zwe start all` and `zwe start apiml` for single-service deployment).

The table serves as a guide for users upgrading or planning deployments, detailing how Zowe has progressed toward a more modern, modular, and streamlined operational architecture.


## Preparing for Installation
| Task                                   | Zowe v2.18                                        | Zowe v3.0                                 | Zowe v3.4.x                                               |
| -------------------------------------- | ------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| **Verify Java and z/OS prerequisites** | Requires Java **11+**, z/OS 2.4+.                 | Requires Java **17+**, z/OS 2.4+.         | Same as v3.0 (Java 17+, z/OS 2.4+).                     |
| **Gateway architecture**               | **Zuul Gateway** with Discovery and Catalog JVMs. | Migrated to **Spring Cloud Gateway**.     | Uses **Spring Gateway Modulith** (optional single JVM). |
| **Port planning**                      | Separate ports for Gateway, Discovery, Catalog.   | Modular services with distinct ports.     | **Single port** possible in single-service deployment mode.              |
| **Keyring syntax**                     | `safkeyring:////<keyring_name>`.                  | Updated to `safkeyring://<keyring_name>`. | Same as v3.0.                                           |
| **Deployment planning**                | Multi-JVM only.                                   | Modular runtime deployment: same microservice-based API ML (Gateway, Discovery, Catalog)               | Choice of  **single-service deployment** (_recomended_) or microservice-based deployment.       |

## Installing the Zowe z/OS Runtime
| Task                     | Zowe v2.18                                              | Zowe v3.0                                         | Zowe v3.4.x                                           |
| ------------------------ | ------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| **Installation command** | `zwe install` or z/OSMF workflow for full Zowe runtime. | `zwe install` supports modular API ML components. | `zwe install` enhanced with `--dry-run` option.     |
| **Configuration layout** | Separate YAML entries for each API ML service.          | Modular `components:` structure in `zowe.yaml`.   | Unified `components.apiml:` block for single-service deployment.     |
| **Component packaging**  | Gateway, Discovery, Catalog packaged separately.        | Modular microservices under one runtime.          | Optional **single-JVM single-service deployment** for simpler setup. |

## Configuring with a z/OSMF Workflow
| Task                          | Zowe v2.18                                             | Zowe v3.0                                       | Zowe v3.4.x                                          |
| ----------------------------- | ------------------------------------------------------ | ----------------------------------------------- | -------------------------------------------------- |
| **Workflow name**             | “Install Zowe Server Components”.                      | “Install Zowe Server Components v3.0”.          | “Install Zowe Server Components v3.4.x”.             |
| **Workflow options**          | Option to “Install API ML and Zowe Server Components.” | Option to “Install API ML Components (Spring)”. | Option to “Install Modulith Deployment.”           |
| **Proxy/trust configuration** | Not applicable.                                        | Introduced reverse proxy header support.        | Adds `trustedProxies` and `forwardHeader` options. |

## Configuring Security and Certificates


| Task                     | Zowe v2.18                                                                 | Zowe v3.0                                                                                            | Zowe v3.4.x                                                                              |
| :----------------------: | :------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
| **Security initialization**  | \`\`\` &#10;zwe init security &#10;\`\`\` creates SAF profiles and groups. | Same command; **includes new service IDs for Spring Gateway**.                                       | Same as v3.0, **plus new trusted proxy security parameters**.                          |
| **Runtime user permissions** | **Distinct** for each API ML service JVM.                                  | **Common** runtime users (\`\`\` &#10;ZWEUSER &#10;\`\`\`, \`\`\` &#10;ZWESVUSR &#10;\`\`\`).        | Modulith requires **unified** SAF and port permissions.                                |
| **Trusted proxy handling**   | **Not applicable.**                                                        | **Introduced header forwarding** in Spring Gateway.                                                  | **Adds property** \`\`\` &#10;apiml.security.forwardHeader.trustedProxies &#10;\`\`\`. |
| **Keyring reference format**| \`\`\` &#10;safkeyring:////\<keyring\_name\> &#10;\`\`\`.                  | **Updated to** \`\`\` &#10;safkeyring://\<keyring\_name\> &#10;\`\`\`.                               | Same as v3.0.                                                                          |
| **Certificate verification** | **Manual validation only.**                                                | **Introduced** \`\`\` &#10;verify\_certificates: ENABLED &#10;\`\`\`.                                | Same as v3.0, **plus enhanced validation** for single-service deployment (Modulith).   |
| **Certificate tools**        | RACF/PKCS12 manual management.                                             | No change from v2.18.                                                                                | **New** \`\`\` &#10;certificate-analyser.jar &#10;\`\`\` diagnostic tool.              |
| **TLS property placement**   | **Under each component section.**                                          | **Under** \`\`\` &#10;components.gateway &#10;\`\`\` / \`\`\` &#10;components.discovery &#10;\`\`\`. | **Consolidated under** \`\`\` &#10;components.apiml.tls &#10;\`\`\`.                   |



## Configuring High Availability
| Task                     | Zowe v2.18                               | Zowe v3.0                                      | Zowe v3.4.x                                                      |
| ------------------------ | ---------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| **HA topology**          | Multiple Gateway/Discovery/Catalog JVMs. | Modular microservices; external load balancer. | Modulith supports HA via **external clustering**.              |
| **Service registration** | Internal Discovery synchronization.      | Uses Spring-based Eureka registry.             | Adds new timeout parameters (`connectTimeout`, `readTimeout`). |
| **Failover management**  | Manual restart of JVMs.                  | Automatic via Spring Gateway and LB.           | Modulith HA must be handled externally.                        |

## Starting and Stopping Zowe
| Task              | Zowe v2.18                                               | Zowe v3.0                                  | Zowe v3.4.x                                    |
| ----------------- | -------------------------------------------------------- | ------------------------------------------ | -------------------------------------------- |
| **Start command** | `zwe start` per component (Gateway, Discovery, Catalog). | `zwe start all` for all API ML components. | `zwe start apiml` for single-service deployment (single JVM). |
| **Stop command**  | `zwe stop` per service.                                  | `zwe stop all` for modular runtime.        | `zwe stop apiml` or `zwe stop all`.          |
| **Startup logs**  | Separate logs per JVM.                                   | Combined logs for modular runtime.         | Unified log stream in single-service deployment.              |

## Verifying Installation
| Task                        | Zowe v2.18                              | Zowe v3.0                                 | Zowe v3.4.x                                          |
| --------------------------- | --------------------------------------- | ----------------------------------------- | -------------------------------------------------- |
| **API Catalog access**      | Verify via Zuul `/apicatalog` endpoint. | Verify via Spring Gateway endpoint.       | Same endpoint; check “single-service deployment mode enabled” log.  |
| **CLI authentication**      | Basic auth via API ML.                  | Test token auth: `zowe auth login apiml`. | Same as v3.0, improved header trust verification.  |
| **Proxy header validation** | Not applicable.                         | Optional proxy forwarding test.           | Verify `trustedProxies` configuration and headers. |

