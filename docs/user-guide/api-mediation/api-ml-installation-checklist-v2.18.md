# Zowe v2.18 – API ML Installation and Configuration Checklist

## Preparing for Installation
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 1 | Verify z/OS prerequisites for Zowe (z/OS 2.4 +, Java 11 +, USS enabled). | [Zowe v2.18 Prerequisites](https://docs.zowe.org/v2.18.x/user-guide/systemrequirements-zos) | All prerequisites verified and confirmed to be met. | System Programmer / Zowe Administrator |
| 2 | Ensure proper USS directory and zFS space for the API ML runtime. | [Prepare for installation - Zowe runtime directory](https://docs.zowe.org/v2.18.x/install-zos/install-zowe-zos#zowe-runtime-directory)| `/ZOWE/runtime/` created with sufficient space (e.g., 5GB). | System Programmer / Zowe Administrator |
| 3 | Identify ports for Gateway, Discovery, and Catalog services. | [Zowe default ports](https://docs.zowe.org/v2.18.x/user-guide/configure-zos-system#zowe-default-ports) | Ports 7551 (Gateway), 7552 (Discovery), 7553 (Catalog) identified and confirmed available. | Network Administrator / Zowe Administrator |
| 4 | Verify access to SAF keyrings or keystore directories. | [Granting Zowe user access to certificates and keyrings](https://docs.zowe.org/v2.18.x/user-guide/keystore#granting-the-zowe-started-task-user-access-to-certificates-and-keyrings) | Zowe user ID (ZWESVUSR) confirmed to have READ access to `ZoweKeyring` and certificate. | Security Administrator / Zowe Administrator |

## Installing the Zowe z/OS Runtime
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :----------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :--------------------------------------- |
| 5 | Obtain and extract the Zowe v2.18 PAX or SMP/E package. | [Install Zowe on z/OS](https://docs.zowe.org/v2.18.x/user-guide/install-zos) | Zowe v2.18 PAX file downloaded and extracted to `/usr/local/zowe/runtime`. | System Programmer / Zowe Administrator |
| 6 | Run `zwe install` or equivalent setup job to deploy runtime. | [Run the Zowe installation script](https://docs.zowe.org/v2.18.x/install-zos/install-zowe-convenience-build#installation-steps) | Zowe runtime successfully deployed; `instance.env` and `zowe.yaml` generated. | System Programmer / Zowe Administrator |
| 7 | Prepare and update the `zowe.yaml` configuration file. | [Configuration file reference](https://docs.zowe.org/v2.18.x/user-guide/configuration-file-reference) | `zowe.yaml` updated with correct ports, certificate paths, and instance details. | Zowe Administrator |
| 8 | Validate environment variables for the Zowe runtime user (e.g., `JAVA_HOME`, `ZOWE_ROOT_DIR`). | [zowe.yaml file environment variables](https://docs.zowe.org/v2.18.x/user-guide/configuration-file-reference#zowe.yaml-file-environment-variables) | `JAVA_HOME` set to Java 11 path; `ZOWE_ROOT_DIR` pointing to `/usr/local/zowe`. | System Programmer / Zowe Administrator |

## Configuring with a z/OSMF Workflow
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------- |
| 9 | Import and start the “Install Zowe Server Components” z/OSMF workflow. | [Installing Zowe via z/OSMF workflows](https://docs.zowe.org/v2.18.x/install-zos/install-zowe-zosmf-workflow) | Zowe z/OSMF workflow imported and initiated in z/OSMF. | System Programmer / Zowe Administrator |
| 10 | Specify **“Install API ML and Zowe Server Components”** as the workflow option. | [Install Zowe optional components in z/OSMF workflow](https://docs.zowe.org/v2.18.x/install-zos/install-zowe-zosmf-workflow#install-zowe-optional-components) | Workflow option "Install API ML and Zowe Server Components" selected. | Zowe Administrator |
| 11 | Complete prompts for workspace, port assignments, and keyrings. | [Define z/OSMF workflow variables](https://docs.zowe.org/v2.18.x/install-zos/install-zowe-zosmf-workflow#define-workflow-variables) | All workflow prompts completed; `zowe.yaml` automatically populated and verified. | Zowe Administrator / Security Administrator |

## Configuring Security
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 12 | Run `zwe init mvs` and `zwe init security` to create required SAF profiles. | [Generating Zowe security configurations](https://docs.zowe.org/v2.18.x/admin/security/security-overview#generating-security-configurations) | SAF profiles for Zowe created successfully for MVS commands and security. | Security Administrator / Zowe Administrator |
| 13 | Grant the Zowe runtime user access to SAF keyring or certificates. | [Granting Zowe user access to certificates and keyrings](https://docs.zowe.org/v2.18.x/user-guide/keystore#granting-the-zowe-started-task-user-access-to-certificates-and-keyrings) | Zowe runtime user (`ZWESVUSR`) granted `READ` access to `ZoweKeyring` and its associated certificates. | Security Administrator |
| 14 | Configure Zowe security group IDs for API ML users and services. | [Configuring Zowe security on z/OS](https://docs.zowe.org/v2.18.x/admin/security/security-configuration-zos) | Zowe security group IDs assigned to API ML users and services as per security policy. | Security Administrator |

## Configuring Certificates
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :------------------------------------------------ | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 15 | Create or import certificates into SAF or PKCS12 keystore. | [Configuring Zowe Certificates](https://docs.zowe.org/v2.18.x/user-guide/keystore#configuring-zowe-certificates) | Zowe certificate `ZOWE.SERVER.CERT` created in SAF and trusted. | Security Administrator / Zowe Administrator |
| 16 | Update `zowe.yaml` with certificate locations and keyring names. | [Configuring Zowe Certificates](https://docs.zowe.org/v2.18.x/user-guide/keystore#configuring-zowe-certificates) | `zowe.yaml` updated to point to `safkeyring://ZWESVUSR/ZOWE.KEYRING`. | Zowe Administrator |
| 17 | Test certificate trust between Gateway, Discovery, and Catalog. | [Troubleshooting Zowe certificates](https://docs.zowe.org/v2.18.x/admin/security/security-troubleshoot-certificates) | All components confirm trust; `openssl s_client` shows valid certificate chain. | Zowe Administrator / Security Administrator |

## Configuring High Availability
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 18 | Configure multiple Gateway instances if needed. | [Deploying multiple Zowe instances for HA](https://docs.zowe.org/v2.18.x/admin/high-availability/overview#deploying-multiple-zowe-instances) | Multiple Zowe instances deployed, each with its own Gateway. | Zowe Administrator / System Programmer |
| 19 | Enable caching service for session consistency. | [Configuring external caching service for Zowe HA](https://docs.zowe.org/v2.18.x/admin/high-availability/external-caching-service) | External Redis instance configured and connected for caching. | Zowe Administrator / System Programmer |
| 20 | Validate shared zFS directories or VSAM datasets for HA. | [Prerequisites for shared Zowe file system for HA](https://docs.zowe.org/v2.18.x/admin/high-availability/overview#prerequisites-for-shared-zowe-file-system) | Shared `/zowe/config` and `/zowe/workspace` zFS directories validated across LPARs. | System Programmer / Zowe Administrator |

## Starting and Stopping Zowe
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :--------------------------------------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------- | :--------------------------------------- |
| 21 | Start the Zowe runtime with `zwe start`. | [Starting a Zowe instance](https://docs.zowe.org/v2.18.x/manage/managing-zowe-instances#starting-and-stopping-a-zowe-instance) | Zowe started successfully; all services show as active. | Zowe Administrator / System Programmer |
| 22 | Stop with `zwe stop` or JCL STOP job. | [Stopping a Zowe instance](https://docs.zowe.org/v2.18.x/manage/managing-zowe-instances#starting-and-stopping-a-zowe-instance) | Zowe stopped successfully; JES logs confirm clean shutdown. | Zowe Administrator / System Programmer |

## Verifying Installation
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :----------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| 23 | Access the API Catalog UI: `https://<host>:<port>/apicatalog`. | [Verify Zowe API Mediation Layer is up and running](https://docs.zowe.org/v2.18.x/user-guide/installandconfig#verify-zowe-api-mediation-layer-is-up-and-running) | API Catalog UI loaded successfully in browser, showing registered services. | Application Developer / Zowe Administrator |
| 24 | Confirm Gateway and Discovery registration in logs. | [Verify Zowe API Mediation Layer is up and running](https://docs.zowe.org/v2.18.x/user-guide/installandconfig#verify-zowe-api-mediation-layer-is-up-and-running) | Zowe logs show "Registered service: api-gateway" and "Registered service: discovery-service". | Zowe Administrator |
| 25 | Onboard a sample service (e.g., z/OSMF API) and confirm routing. | [Onboarding APIs with Zowe API ML](https://docs.zowe.org/v2.18.x/user-guide/api-mediation/using-api-mediation-layer) | z/OSMF API successfully onboarded and accessible via the Zowe Gateway URL. | Application Developer / Zowe Administrator | 

