# Zowe v2.18 – API ML Installation and Configuration Checklist

## Preparing for Installation
| Step | Task                                                                     | Notes / References                                                                    |
| ---- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| 1    | Verify z/OS prerequisites for Zowe (z/OS 2.4 +, Java 11 +, USS enabled). | [Zowe v2.18 Prerequisites](https://docs.zowe.org/v2.18.x/user-guide/install-nodejs-zos) |
| 2    | Ensure proper USS directory and zFS space for the API ML runtime.        | Typical path: `/ZOWE/runtime/`.                                                       |
| 3    | Identify ports for Gateway, Discovery, and Catalog services.             | Check for conflicts with existing ports.                                              |
| 4    | Verify access to SAF keyrings or keystore directories.                   | Required for TLS setup in API ML.                                                     |


## Installing the Zowe z/OS Runtime
| Step | Task                                                                                           | Notes / References                                                           |
| ---- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1    | Obtain and extract the Zowe v2.18 PAX, SMP/E package, Portable Software Instance, or Containerization Build.                                        | See [Zowe V2 Server-side components installer](https://www.zowe.org/download#download-v2) |
| 2    | Run `zwe install` or equivalent setup job to deploy runtime.                                   | Includes API ML by default.                                                  |
| 3    | Prepare and update the `zowe.yaml` configuration file.                                         | Define API ML components (gateway, discovery, catalog).                      |
| 4    | Validate environment variables for the Zowe runtime user (e.g., `JAVA_HOME`, `ZOWE_ROOT_DIR`). | Verify via `env` command.                                                    |

## Configuring with a z/OSMF Workflow
| Step | Task                                                                            | Notes / References                                                             |
| ---- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1    | Import and start the “Install Zowe Server Components” z/OSMF workflow.          | See [Configuring API ML with z/OSMF Workflows](https://docs.zowe.org/v2.18.x/user-guide/configure-apiml-zosmf-workflow-2-18/#overview-of-stand-alone-zowe-api-ml-configuration-workflow) |
| 2    | Specify **“Install API ML and Zowe Server Components”** as the workflow option. | Ensures Gateway, Discovery, Catalog are configured.                            |
| 3    | Complete prompts for workspace, port assignments, and keyrings.                 | Auto-populates `zowe.yaml`.                                                    |

## Configuring Security
| Step | Task                                                                        | Notes / References                                                                   |
| ---- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1    | Run `zwe init mvs` and `zwe init security` to create required SAF profiles. | See [Addressing security requirements](https://docs.zowe.org/v2.18.x/user-guide/address-security-requirements) |
| 2    | Grant the Zowe runtime user access to SAF keyring or certificates.          | Typically via RACF `RDEFINE DIGTCERT`.                                               |
| 3    | Configure Zowe security group IDs for API ML users and services.            | Assign IDs for API ML discovery/caching.                                             |

## Configuring Certificates
| Step | Task                                                             | Notes / References                                                     |
| ---- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1    | Create or import certificates into SAF or PKCS12 keystore.       | See [Configuring certificates](https://docs.zowe.org/v2.18.x/user-guide/configure-certificates/) |
| 2    | Update `zowe.yaml` with certificate locations and keyring names. | Example: `safkeyring:////ZOWE.KEYRING`.                                |
| 3    | Test certificate trust between Gateway, Discovery, and Catalog.  | Use `openssl s_client` or Zowe logs.                                   |

## Configuring High Availability
| Step | Task                                                     | Notes / References                                                                                      |
| ---- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1    | Configure multiple Gateway instances if needed.          | Share Discovery and Catalog services.                                                                   |
| 2    | Enable caching service for session consistency.          | See [Configuring high availability ](https://docs.zowe.org/v2.18.x/user-guide/zowe-ha-overview/) |
| 3    | Validate shared zFS directories or VSAM datasets for HA. | Required for cross-LPAR setups.                                                                         |

## Starting and Stopping Zowe
| Step | Task                                     | Notes / References                     |
| ---- | ---------------------------------------- | -------------------------------------- |
| 1    | Start the Zowe runtime with `zwe start`. | Includes API ML services. See [Starting and stopping Zowe](https://docs.zowe.org/v2.18.x/user-guide/start-zowe-zos/)             |
| 2    | Stop with `zwe stop` or JCL STOP job.    | Use JES logs to verify clean shutdown. |

## Verifying Installation
| Step | Task                                                             | Notes / References                                                                                  |
| ---- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1    | Access the API Catalog UI: `https://<host>:<port>/apicatalog`.   | Verify UI loads successfully.                                                                       |
| 2    | Confirm Gateway and Discovery registration in logs.              | Look for “Registered service” messages.                                                             |
| 3    | Onboard a sample service using the Onborading Wizard and confirm routing. | See [Onboarding a REST API service with the YAML Wizard](https://docs.zowe.org/v2.18.x/user-guide/onboard-wizard) |
