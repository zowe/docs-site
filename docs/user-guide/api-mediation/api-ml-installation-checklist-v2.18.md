# Zowe v2.18 – API ML Installation and Configuration Checklist

## Preparing for Installation

| Step | Task | Applicable Link | Results |
| :--- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Verify z/OS prerequisites for Zowe (z/OS 2.4 +, Java 11 +, USS enabled). | [Zowe v2.18 Prerequisites](https://docs.zowe.org/v2.18.x/user-guide/installandconfig) | All prerequisites verified and confirmed to be met. |
| 2 | Ensure proper USS directory and zFS space for the API ML runtime. | [Zowe on z/OS Installation Overview](https://docs.zowe.org/v2.18.x/install-zos)| `/ZOWE/runtime/` created with sufficient space (e.g., 5GB). |
| 3 | Identify ports for Gateway, Discovery, and Catalog services. | [Configuring Zowe on z/OS](https://docs.zowe.org/v2.18.x/configure/configure-zowe-zos) | Ports 7551 (Gateway), 7552 (Discovery), 7553 (Catalog) identified and confirmed available. |
| 4 | Verify access to SAF keyrings or keystore directories. (Required for TLS setup in API ML) | [Setting up Zowe Certificates]() | Zowe user ID (ZWESVUSR) confirmed to have READ access to `ZoweKeyring` and certificate. | 



## Installing the Zowe z/OS Runtime
Okay, here's the table with the requested formatting changes applied:

| Step | Task | Applicable Link | Results |
| :--- | :----------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| 5 | Obtain and extract the Zowe v2.18 PAX or SMP/E package. | [Install Zowe on z/OS](https://docs.zowe.org/v2.18.x/user-guide/install-zos) | Zowe v2.18 PAX file downloaded and extracted to `/usr/local/zowe/runtime`. |
| 6 | Run `zwe install` or equivalent setup job to deploy runtime. | [Zowe on z/OS Installation Overview](https://docs.zowe.org/v2.18.x/install-zos)  | Zowe runtime successfully deployed; `instance.env` and `zowe.yaml` generated. |
| 7 | Prepare and update the `zowe.yaml` configuration file. | [Configuring Zowe on z/OS](https://docs.zowe.org/v2.18.x/configure/configure-zowe-zos) | `zowe.yaml` updated with correct ports, certificate paths, and instance details. |
| 8 | Validate environment variables for the Zowe runtime user (e.g., `JAVA_HOME`, `ZOWE_ROOT_DIR`). | [Configuring a Zowe Instance](https://docs.zowe.org/v2.18.x/configure/configure-zowe-instance) | `JAVA_HOME` set to Java 11 path; `ZOWE_ROOT_DIR` pointing to `/usr/local/zowe`. | 


## Configuring with a z/OSMF Workflow
Here's the table with the requested formatting changes applied:

| Step | Task | Applicable Link | Results |
| :--- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| 9 | Import and start the “Install Zowe Server Components” z/OSMF workflow. | [Zowe z/OSMF workflow](https://docs.zowe.org/v2.18.x/user-guide/configure-apiml-zosmf-workflow-2-18) | Zowe z/OSMF workflow imported and initiated in z/OSMF. |
| 10 | Specify **“Install API ML and Zowe Server Components”** as the workflow option. | Ensures Gateway, Discovery, Catalog are configured. | Workflow option "Install API ML and Zowe Server Components" selected. |
| 11 | Complete prompts for workspace, port assignments, and keyrings. | Auto-populates `zowe.yaml`. | All workflow prompts completed; `zowe.yaml` automatically populated and verified. | 


## Configuring Security
Here's the table with the requested formatting changes applied:

| Step | Task | Applicable Link | Results |
| :--- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| 12 | Run `zwe init mvs` and `zwe init security` to create required SAF profiles. | [Security Setup](https://docs.zowe.org/v2.18.x/user-guide/installandconfig#security) | SAF profiles for Zowe created successfully for MVS commands and security. |
| 13 | Grant the Zowe runtime user access to SAF keyring or certificates. | Typically via RACF `RDEFINE DIGTCERT`. | Zowe runtime user (`ZWESVUSR`) granted `READ` access to `ZoweKeyring` and its associated certificates. |
| 14 | Configure Zowe security group IDs for API ML users and services. | Assign IDs for API ML discovery/caching. | Zowe security group IDs assigned to API ML users and services as per security policy. | 


## Configuring Certificates
Okay, here are all the remaining tables with the requested formatting changes applied:

| Step | Task | Applicable Link | Results |
| :--- | :------------------------------------------------ | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| 15 | Create or import certificates into SAF or PKCS12 keystore. | [Zowe Certificates](https://docs.zowe.org/v2.18.x/user-guide/keystore) | Zowe certificate `ZOWE.SERVER.CERT` created in SAF and trusted. |
| 16 | Update `zowe.yaml` with certificate locations and keyring names. | Example: `safkeyring:////ZOWE.KEYRING`. | `zowe.yaml` updated to point to `safkeyring://ZWESVUSR/ZOWE.KEYRING`. |
| 17 | Test certificate trust between Gateway, Discovery, and Catalog. | Use `openssl s_client` or Zowe logs. | All components confirm trust; `openssl s_client` shows valid certificate chain. |

## Configuring High Availability

| Step | Task | Applicable Link | Results |
| :--- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| 18 | Configure multiple Gateway instances if needed. | Share Discovery and Catalog services. | Multiple Zowe instances deployed, each with its own Gateway. |
| 19 | Enable caching service for session consistency. | [API ML Caching Service](https://docs.zowe.org/v2.18.x/user-guide/api-mediation/api-mediation-overview) | External Redis instance configured and connected for caching. |
| 20 | Validate shared zFS directories or VSAM datasets for HA. | Required for cross-LPAR setups. | Shared `/zowe/config` and `/zowe/workspace` zFS directories validated across LPARs. |

## Starting and Stopping Zowe

| Step | Task | Applicable Link | Results |
| :--- | :--------------------------------------- | :-------------------------------------- | :-------------------------------------------------------- |
| 21 | Start the Zowe runtime with `zwe start`. | Includes API ML services. | Zowe started successfully; all services show as active. |
| 22 | Stop with `zwe stop` or JCL STOP job. | Use JES logs to verify clean shutdown. | Zowe stopped successfully; JES logs confirm clean shutdown. |

## Verifying Installation

| Step | Task | Applicable Link | Results |
| :--- | :----------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| 23 | Access the API Catalog UI: `https://<host>:<port>/apicatalog`. | Verify UI loads successfully. | API Catalog UI loaded successfully in browser, showing registered services. |
| 24 | Confirm Gateway and Discovery registration in logs. | Look for “Registered service” messages. | Zowe logs show "Registered service: api-gateway" and "Registered service: discovery-service". |
| 25 | Onboard a sample service (e.g., z/OSMF API) and confirm routing. | [Onboarding APIs](https://docs.zowe.org/v2.18.x/user-guide/api-mediation/using-api-mediation-layer) | z/OSMF API successfully onboarded and accessible via the Zowe Gateway URL. | 
