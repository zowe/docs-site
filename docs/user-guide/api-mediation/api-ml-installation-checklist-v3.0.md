# Zowe v3.0 – API ML Installation and Configuration Checklist

## Preparing for Installation
| Step | Task                                                         | Notes / References                                                                   |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| 1    | Verify Java 17 + and z/OS 2.4 + prerequisites.               | See [Zowe v3 Prerequisites](https://docs.zowe.org/v3.0.x/user-guide/install-nodejs-zos) |
| 2    | Allocate workspace for the new modular API ML runtime.       | Gateway now uses Spring Cloud Gateway.                                               |
| 3    | Reserve updated ports for Gateway, Discovery, and Catalog.   | Port defaults changed in v3.                                                         |
| 4    | Confirm SAF keyring access for new format (`safkeyring://`). | Updated URI syntax required.                                                         |

## Installing the Zowe z/OS Runtime
| Step | Task                                                    | Notes / References                                                     |
| ---- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1    | Install Zowe v3.0 using Zowe Server Install Wizard, Convenience Build, SMP/E build, or Portable Software Instance.           | See **Zowe 3.0.0** in [All Zowe V3.x Releases](https://www.zowe.org/download#all-v3-releases) in Download Zowe on the zowe.org website|
| 2    | Use `zwe install` to deploy the runtime.                | Installs API ML (Spring Gateway) components.                           |
| 3    | Update `zowe.yaml` for new service layout and defaults. | Gateway, Discovery, Catalog parameters changed.                        |

## Configuring with a z/OSMF Workflow

| Step | Task                                                             | Notes / References                                                       |
| ---- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1    | Import and start “Install Zowe Server Components v3.0” workflow. | See [Configuring Zowe with z/OSMF Workflows](https://docs.zowe.org/v3.0.x/user-guide/configure-zowe-zosmf-workflow) |
 2    | Provide `safkeyring://` entries during prompts.                  | Replaces older keyring path format.                                      |

## Configuring Security
| Step | Task                                                      | Notes / References                                                    |
| ---- | --------------------------------------------------------- | --------------------------------------------------------------------- |
| 1    | Run `zwe init security` for new group IDs.                | See [Addressing security requirements](https://docs.zowe.org/v3.0.x/user-guide/address-security-requirements) |
| 2    | Verify security definitions for `ZWEUSER` and `ZWESVUSR`. | Needed for Spring Gateway startup.                                    |
| 3    | Confirm RACF permissions for SAF keyrings and ports.      | Use `PERMIT` command as needed.                                       |

## Configuring Certificates
| Step | Task                                                             | Notes / References                                                                            |
| ---- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 1    | Create or import certificates for the new Gateway (Spring).      | See [Configuring certificates](https://docs.zowe.org/v3.0.x/user-guide/configure-certificates/) |
| 2    | Update certificate properties to `verify_certificates: ENABLED`. | Required for production.                                                                      |
| 3    | Validate trust chain across API ML services.                     | Check Gateway logs.                                                                           |

## Configuring High Availability
| Step | Task                                                       | Notes / References                                                                                 |
| ---- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1    | Deploy multiple Gateway (Spring) instances for redundancy. | See [Configuring high availability](https://docs.zowe.org/v3.0.x/user-guide/zowe-ha-overview/) |
| 2    | Configure shared Discovery and Catalog with HA cache.      | Ensure Eureka syncs correctly.                                                                     |
| 3    | Use external load balancer for Gateway endpoints.          | Recommended for production.                                                                        |

## Starting and Stopping Zowe
| Step | Task                        | Notes / References        |
| ---- | --------------------------- | ------------------------- |
| 1    | Start with `zwe start all`. | Verifies all services up. See [Starting and stopping Zowe](https://docs.zowe.org/v3.0.x/user-guide/start-zowe-zos) |
| 2    | Stop with `zwe stop all`.   | Graceful shutdown.        |

## Verifying Installation
| Step | Task                                                  | Notes / References                  |
| ---- | ----------------------------------------------------- | ----------------------------------- |
| 1    | Open API Catalog: `https://<host>:<port>/apicatalog`. | Confirm Spring Gateway response.    |
| 2    | Verify Discovery Service logs show registered APIs.   | Look for “registered successfully”. |
| 3    | Test CLI authentication via `zowe auth login apiml`.  | Confirms token service operational. |
