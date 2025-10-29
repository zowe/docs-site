# API Mediation Layer (API ML) Installation and Configuration Checklist

## Preparing for Installation
| Step | Task                                                            | Notes / References                                                                    |
| ---- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1    | Verify Java 17+, z/OS 2.4+, and Zowe 3.3 runtime prerequisites. | See [Addressing Zowe server prerequisites](https://docs.zowe.org/stable/user-guide/install-nodejs-zos/) |
| 2    | Choose deployment type: **modulith** or **multi-component**.    | Modulith consolidates all API ML components.                                          |
| 3    | Update firewall and port settings if using modulith mode.       | Single-port operation.                                                                |

## Installing the Zowe z/OS Runtime
| Step | Task                                                            | Notes / References                                                              |
| ---- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1    | Install Zowe v3.0 using Zowe Server Install Wizard, Convenience Build, SMP/E build, or Portable Software Instance.                                   | See **Zowe 3.3.0** in [All Zowe V3.x Releases](https://www.zowe.org/download#all-v3-releases)  <br> Includes updated API ML modulith.                                              |
| 2    | Run `zwe install` or `zwe generate --dry-run`.                  | See [zwe generate](https://docs.zowe.org/stable/user-guide/install-zos#zwe-install) |
| 3    | Define API ML settings under `components.apiml` in `zowe.yaml`. | Unified section replaces separate components.                                   |

## Configuring API ML with a z/OSMF Workflow
| Step | Task                                                   | Notes / References                                                       |
| ---- | ------------------------------------------------------ | ------------------------------------------------------------------------ |
| 1    | Use the Stand-alone Zowe API ML Configuration workflow.    | See [Configuring API ML with z/OSMF Workflow](https://docs.zowe.org/stable/user-guide/configure-apiml-zosmf-workflow) |
| 2    | We recommend you select “Modulith Deployment” as your deployment method.            | Creates consolidated API ML service.                                     |
| 3    | Specify trusted proxies and forward-header parameters. | New in v3.3.                                                             |

## Configuring Security
| Step | Task                                                  | Notes / References                                                    |
| ---- | ----------------------------------------------------- | --------------------------------------------------------------------- |
| 1    | Run `zwe init security` as standard.  | See [Address security requirements](https://docs.zowe.org/stable/user-guide/address-security-requirements) |
| 2    | Perform Configuration tasks that apply to API Mediation Layer.   | See API sepecific tasks in [Address security requirements](https://docs.zowe.org/stable/user-guide/address-security-requirements) |
| 3    | Define trusted proxy headers in `zowe.yaml`.          | `apiml.security.forwardHeader.trustedProxies`.                        |
| 4   | Verify port and certificate access for runtime users. | Required for modulith start.                                          |

## Configuring Certificates
| Step | Task                                                                  | Notes / References   |
| ---- | --------------------------------------------------------------------- | -------------------- |
| 1    | Create or import certificates for the new Gateway (Spring).      | See [Configuring certificates](https://docs.zowe.org/stable/user-guide/configure-certificates/)         |
| 2    | Update `zowe.yaml` with keyring references and modulith TLS settings. | Consolidated config. |
| 3    | Confirm TLS communication between clients and backend.                | Check Gateway logs.  |

## Configuring High Availability
| Step | Task                                                      | Notes / References                                                             |
| ---- | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1    | Configure HA mode by deploy multiple independent Zowe server component instances "moduliths", ideally be on different LPARs                  | See [Configuring high availability](https://docs.zowe.org/stable/user-guide/zowe-ha-overview) |
| 2    | Define Eureka timeouts (`connectTimeout`, `readTimeout`). | Added in v3.3.                                                                 |
| 3    | For modulith, enable HA through external clustering.      | Gateway and Discovery combined.                                                |

## Starting and Stopping Zowe
| Step | Task                                                  | Notes / References          |
| ---- | ----------------------------------------------------- | --------------------------- |
| 1    | Start Zowe with `zwe start apiml` or `zwe start all`. | Modulith starts as one JVM. <br>See [Starting and stopping Zowe](https://docs.zowe.org/stable/user-guide/start-zowe-zos) |
| 2    | Stop Zowe with `zwe stop apiml` or `zwe stop all`.    | Confirm shutdown.           |

## Verifying Installation
| Step | Task                                             | Notes / References                       |
| ---- | ------------------------------------------------ | ---------------------------------------- |
| 1    | Access API Catalog and verify registered APIs.   | `https://<host>:<port>/apicatalog`       |
| 2    | Confirm “modulith mode enabled” in Gateway logs. | Indicates v3.3 deployment.               |
| 3    | Test proxy header forwarding using REST client.  | Validates trusted proxies configuration. |
