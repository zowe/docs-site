# Zowe v3.0 – API ML Installation and Configuration Checklist

## Preparing for Installation
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :------------------------ |
| 1 | Verify Java 17 + and z/OS 2.4 + prerequisites. | [Zowe z/OS system requirements](https://docs.zowe.org/v3.0/user-guide/systemrequirements-zos.html) | Java 17 and z/OS 2.4+ confirmed; all system prerequisites met. | Zowe Administrator / System Programmer |
| 2 | Allocate workspace for the new modular API ML runtime. | [Prepare for installation - Zowe runtime directory](https://docs.zowe.org/v3.0/install-zos/install-zowe-zos.html#zowe-runtime-directory) | `/usr/local/zowe` allocated with sufficient zFS space (e.g., 5GB). | Zowe Administrator / System Programmer |
| 3 | Reserve updated ports for Gateway, Discovery, and Catalog. | [Zowe default ports](https://docs.zowe.org/v3.0/user-guide/configure-zos-system.html#zowe-default-ports) | Ports 7551 (Gateway), 7552 (Discovery), 7553 (Catalog) identified and confirmed available. | Network Administrator / Zowe Administrator |
| 4 | Confirm SAF keyring access for new format (`safkeyring://`). | [Setting up Zowe certificates for z/OSMF workflow](https://docs.zowe.org/v3.0/install-zos/install-zowe-zosmf-workflow.html#setting-up-zowe-certificates) | Zowe user ID has `READ` access to the SAF keyring; `safkeyring://` syntax confirmed. | Security Administrator / Zowe Administrator |

## Installing the Zowe z/OS Runtime
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :------------------------ |
| 5 | Install Zowe v3.0 using Zowe Server Install Wizard, Convenience Build, SMP/E build, or Portable Software Instance. | [Install Zowe on z/OS](https://docs.zowe.org/v3.0/install-zos/install-zowe-zos.html) | Zowe v3.0 convenience build package downloaded and extracted to `/usr/local/zowe/runtime`. | Zowe Administrator / System Programmer |
| 6 | Use `zwe install` to deploy the runtime. | [Install Zowe using a convenience build](https://docs.zowe.org/v3.0/install-zos/install-zowe-convenience-build.html#installation-steps) | Zowe runtime successfully deployed; `instance.env` and `zowe.yaml` generated in the instance directory. | Zowe Administrator / System Programmer |
| 7 | Update `zowe.yaml` for new service layout and defaults. | [Zowe YAML configuration file](https://docs.zowe.org/v3.0/user-guide/configuration-file-reference.html) | `zowe.yaml` updated with correct ports, certificate paths, and instance details for API ML components. | Zowe Administrator |

## Configuring with a z/OSMF Workflow
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :------------------------ |
| 8 | Import and start “Install Zowe Server Components v3.0” workflow. | [Installing Zowe via z/OSMF workflows](https://docs.zowe.org/v3.0/install-zos/install-zowe-zosmf-workflow.html) | Zowe z/OSMF workflow imported and initiated in z/OSMF. | Zowe Administrator / System Programmer |
| 9 | Provide `safkeyring://` entries during prompts. | [Setting up Zowe certificates for z/OSMF workflow](https://docs.zowe.org/v3.0/install-zos/install-zowe-zosmf-workflow.html#setting-up-zowe-certificates) | Workflow prompts completed, `safkeyring://` syntax used for certificate configuration. | Zowe Administrator / Security Administrator |

## Configuring Security
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :------------------------ |
| 10 | Run `zwe init security` for new group IDs. | [Generating security configurations](https://docs.zowe.org/v3.0/admin/security/security-overview.html#generating-security-configurations) | SAF profiles for Zowe and new group IDs created successfully. | Security Administrator / Zowe Administrator |
| 11 | Verify security definitions for `ZWEUSER` and `ZWESVUSR`. | [Zowe started task user ID](https://docs.zowe.org/v3.0/admin/security/security-configuration-zos.html#zowe-started-task-user-id) | `ZWEUSER` and `ZWESVUSR` security definitions confirmed with required permissions. | Security Administrator |
| 12 | Confirm RACF permissions for SAF keyrings and ports. | [Granting Zowe user access to certificates and keyrings](https://docs.zowe.org/v3.0/user-guide/configure-certificates.html#granting-the-zowe-started-task-user-access-to-certificates-and-keyrings) | `ZWESVUSR` granted `READ` access to `ZoweKeyring`; Zowe granted access to defined ports. | Security Administrator / Network Administrator |

## Configuring Certificates
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :------------------------ |
| 13 | Create or import certificates for the new Gateway (Spring). | [Configuring Zowe certificates](https://docs.zowe.org/v3.0/user-guide/configure-certificates.html) | Gateway certificates created/imported into the Zowe keystore using the certificate manager. | Security Administrator / Zowe Administrator |
| 14 | Update certificate properties to `verify_certificates: ENABLED`. | [Configuring Zowe certificates - `verify_certificates`](https://docs.zowe.org/v3.0/user-guide/configure-certificates.html#verify-certificates) | `zowe.certificate.verify_certificates: ENABLED` set in `zowe.yaml`. | Zowe Administrator |
| 15 | Validate trust chain across API ML services. | [Troubleshooting Zowe certificates](https://docs.zowe.org/v3.0/admin/security/security-troubleshoot-certificates.html) | All API ML services (Gateway, Discovery, Catalog) successfully establish mTLS trust. | Zowe Administrator / Security Administrator |

## Configuring High Availability
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| 16 | Deploy multiple Gateway (Spring) instances for redundancy. | [High availability overview](https://docs.zowe.org/v3.0/admin/high-availability/overview.html) | Multiple Zowe instances, each running a Spring Gateway, deployed on separate LPARs/systems. | Zowe Administrator / System Programmer |
| 17 | Configure shared Discovery and Catalog with HA cache. | [External caching service](https://docs.zowe.org/v3.0/admin/high-availability/external-caching-service.html) | Shared Redis instance configured for Discovery and Catalog services across all Zowe instances. | Zowe Administrator / Network Administrator |
| 18 | Use external load balancer for Gateway endpoints. | [Load balancing configuration](https://docs.zowe.org/v3.0/admin/high-availability/load-balancing-configuration.html) | Sysplex Distributor or external load balancer configured to distribute traffic among Gateway instances. | Network Administrator |

## Starting and Stopping Zowe
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :--------------------------- | :----------------------------------------------------------------------------------------- | :-------------------------------------------------- | :---------------------------------- |
| 19 | Start with `zwe start all`. | [Starting and stopping a Zowe instance](https://docs.zowe.org/v3.0/manage/managing-zowe-instances.html#starting-and-stopping-a-zowe-instance) | Zowe started successfully; all services show as active. | Zowe Administrator / System Programmer |
| 20 | Stop with `zwe stop all`. | [Starting and stopping a Zowe instance](https://docs.zowe.org/v3.0/manage/managing-zowe-instances.html#starting-and-stopping-a-zowe-instance) | Zowe stopped successfully; JES logs confirm clean shutdown. | Zowe Administrator / System Programmer |

## Verifying Installation
| Step | Task | Applicable Link | Results | Required Role |
| :--- | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ | :------------------------------------ |
| 21 | Open API Catalog: `https://<host>:<port>/apicatalog`. | [Verify Zowe API Mediation Layer is up and running](https://docs.zowe.org/v3.0/user-guide/installandconfig.html#verify-zowe-api-mediation-layer-is-up-and-running) | API Catalog UI loaded successfully in browser, showing registered services via the Spring Gateway. | Zowe Administrator / Application Developer |
| 22 | Verify Discovery Service logs show registered APIs. | [Verify Zowe API Mediation Layer is up and running](https://docs.zowe.org/v3.0/user-guide/installandconfig.html#verify-zowe-api-mediation-layer-is-up-and-running) | Discovery Service logs show messages confirming successful registration of core API ML APIs. | Zowe Administrator |
| 23 | Test CLI authentication via `zowe auth login apiml`. | [Using Zowe CLI to log in to API Mediation Layer](https://docs.zowe.org/v3.0/user-guide/cli-using-apiml.html#using-zowe-cli-to-log-in-to-api-mediation-layer) | CLI login to APIML successful; token obtained, confirming token service operational. | Application Developer / Zowe Administrator | 
