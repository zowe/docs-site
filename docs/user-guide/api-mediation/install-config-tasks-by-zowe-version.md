# Zowe version-specific Install/Config Tasks

## Preparing for Installation
| Task                                   | Zowe v2.18                                        | Zowe v3.0                                 | Zowe v3.3                                               |
| -------------------------------------- | ------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| **Verify Java and z/OS prerequisites** | Requires Java **11+**, z/OS 2.4+.                 | Requires Java **17+**, z/OS 2.4+.         | Same as v3.0 (Java 17+, z/OS 2.4+).                     |
| **Gateway architecture**               | **Zuul Gateway** with Discovery and Catalog JVMs. | Migrated to **Spring Cloud Gateway**.     | Uses **Spring Gateway Modulith** (optional single JVM). |
| **Port planning**                      | Separate ports for Gateway, Discovery, Catalog.   | Modular services with distinct ports.     | **Single port** possible in modulith mode.              |
| **Keyring syntax**                     | `safkeyring:////<keyring_name>`.                  | Updated to `safkeyring://<keyring_name>`. | Same as v3.0.                                           |
| **Deployment planning**                | Multi-JVM only.                                   | Modular runtime deployment: same microservice-based API ML (Gateway, Discovery, Catalog)               | Choice of  **modulith** (_recomended_) or microservice-based deployment.       |

## Installing the Zowe z/OS Runtime
| Task                     | Zowe v2.18                                              | Zowe v3.0                                         | Zowe v3.3                                           |
| ------------------------ | ------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| **Installation command** | `zwe install` or z/OSMF workflow for full Zowe runtime. | `zwe install` supports modular API ML components. | `zwe install` enhanced with `--dry-run` option.     |
| **Configuration layout** | Separate YAML entries for each API ML service.          | Modular `components:` structure in `zowe.yaml`.   | Unified `components.apiml:` block for modulith.     |
| **Component packaging**  | Gateway, Discovery, Catalog packaged separately.        | Modular microservices under one runtime.          | Optional **single-JVM modulith** for simpler setup. |

## Configuring with a z/OSMF Workflow
| Task                          | Zowe v2.18                                             | Zowe v3.0                                       | Zowe v3.3                                          |
| ----------------------------- | ------------------------------------------------------ | ----------------------------------------------- | -------------------------------------------------- |
| **Workflow name**             | “Install Zowe Server Components”.                      | “Install Zowe Server Components v3.0”.          | “Install Zowe Server Components v3.3”.             |
| **Workflow options**          | Option to “Install API ML and Zowe Server Components.” | Option to “Install API ML Components (Spring)”. | Option to “Install Modulith Deployment.”           |
| **Proxy/trust configuration** | Not applicable.                                        | Introduced reverse proxy header support.        | Adds `trustedProxies` and `forwardHeader` options. |

## Configuring Security
| Task                         | Zowe v2.18                                           | Zowe v3.0                                                  | Zowe v3.3                                                    |
| ---------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| **Security initialization**  | `zwe init security` creates SAF profiles and groups. | Same command; includes new service IDs for Spring Gateway. | Same as v3.0, plus new trusted proxy security parameters.    |
| **Runtime user permissions** | Distinct for each API ML service JVM.                | Common runtime users (`ZWEUSER`, `ZWESVUSR`).              | Modulith requires unified SAF and port permissions.          |
| **Trusted proxy handling**   | Not applicable.                                      | Introduced header forwarding in Spring Gateway.            | Adds property `apiml.security.forwardHeader.trustedProxies`. |

## Configuring Certificates
| Task                         | Zowe v2.18                       | Zowe v3.0                                            | Zowe v3.3                                            |
| ---------------------------- | -------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| **Keyring reference format** | `safkeyring:////<keyring_name>`. | `safkeyring://<keyring_name>`.                       | Same as v3.0.                                        |
| **Certificate verification** | Manual validation only.          | Introduced `verify_certificates: ENABLED`.           | Same as v3.0, plus enhanced validation for modulith. |
| **Certificate tools**        | RACF/PKCS12 manual management.   | No change from v2.18.                                | New **`certificate-analyser.jar`** diagnostic tool.  |
| **TLS property placement**   | Under each component section.    | Under `components.gateway` / `components.discovery`. | Consolidated under `components.apiml.tls`.           |

## Configuring High Availability
| Task                     | Zowe v2.18                               | Zowe v3.0                                      | Zowe v3.3                                                      |
| ------------------------ | ---------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| **HA topology**          | Multiple Gateway/Discovery/Catalog JVMs. | Modular microservices; external load balancer. | Modulith supports HA via **external clustering**.              |
| **Service registration** | Internal Discovery synchronization.      | Uses Spring-based Eureka registry.             | Adds new timeout parameters (`connectTimeout`, `readTimeout`). |
| **Failover management**  | Manual restart of JVMs.                  | Automatic via Spring Gateway and LB.           | Modulith HA must be handled externally.                        |

## Starting and Stopping Zowe
| Task              | Zowe v2.18                                               | Zowe v3.0                                  | Zowe v3.3                                    |
| ----------------- | -------------------------------------------------------- | ------------------------------------------ | -------------------------------------------- |
| **Start command** | `zwe start` per component (Gateway, Discovery, Catalog). | `zwe start all` for all API ML components. | `zwe start apiml` for modulith (single JVM). |
| **Stop command**  | `zwe stop` per service.                                  | `zwe stop all` for modular runtime.        | `zwe stop apiml` or `zwe stop all`.          |
| **Startup logs**  | Separate logs per JVM.                                   | Combined logs for modular runtime.         | Unified log stream in modulith.              |

## Verifying Installation
| Task                        | Zowe v2.18                              | Zowe v3.0                                 | Zowe v3.3                                          |
| --------------------------- | --------------------------------------- | ----------------------------------------- | -------------------------------------------------- |
| **API Catalog access**      | Verify via Zuul `/apicatalog` endpoint. | Verify via Spring Gateway endpoint.       | Same endpoint; check “modulith mode enabled” log.  |
| **CLI authentication**      | Basic auth via API ML.                  | Test token auth: `zowe auth login apiml`. | Same as v3.0, improved header trust verification.  |
| **Proxy header validation** | Not applicable.                         | Optional proxy forwarding test.           | Verify `trustedProxies` configuration and headers. |

