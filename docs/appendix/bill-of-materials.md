---
meta:
  - name: description
    content: Zowe distributes a list of materials in its binaries.
  - name: keywords
    content: Zowe binaries
---

# Zowe Binaries - Bill of Materials

The following materials are distributed with Zowe&trade; binaries:

## Zowe PAX

| File Path | Description | Source Location | Build Script(s) |
| --------- | ----------- | --------------- | --------------- |
| zowe-x.y.z.pax | Root PAX file containing all Zowe z/OS Components | Multiple open source repositories within [zowe](https://www.github.com/zowe), detailed below. | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| manifest.json | Zowe PAX Manifest | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/manifest.json.template) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| bin/apiml_cm.sh | APIML Certificate Management Script | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/bin/apiml_cm.sh) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| bin/zowe-support.sh | In development script to gather Zowe z/OS diagnostics. | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/bin/zowe-support.sh) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| bin/internal/run-zowe.sh | Zowe entrypoint script, executed from the Zowe STC  | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/bin/internal/run-zowe.sh) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| bin/internal/zowe-set-env.sh | Sets ENVs for Zowe install and runtime | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/bin/internal/zowe-set-env.sh) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| bin/zowe-setup-certificates.sh | Script to generate Zowe TLS certificates | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/bin/zowe-setup-certificates.sh) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| bin/utils/zowe-install-iframe-plugin.sh | Script to install default Zowe Application Framework plugins | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/bin/utils/zowe-install-iframe-plugin.sh) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| bin/zowe-init.sh |  Script to initialize Zowe installation | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/bin/zowe-init.sh) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| bin/zowe-setup-certificates.env | Environment configurations for certificate management | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/bin/zowe-setup-certificates.env) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| bin/zowe-configure-instance.sh | Script which configures installed instance of Zowe | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/bin/zowe-configure-instance.sh) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| licenses/zowe_licenses_full.zip | License archive for Zowe third party dependencies | N/A | [Zowe License Scan Pipeline](https://github.com/zowe/zowe-dependency-scan-pipeline/blob/master/Jenkinsfile.license-scan) |
| files/zlux/sample-iframe-app.pax | Sample iFrame ZAF App | [sample-iframe-app](https://github.com/zowe/sample-iframe-app) | N/A |
| files/zlux/sample-react-app.pax | Sample React ZAF App | [sample-react-app](https://github.com/zowe/sample-react-app) | N/A |
| files/zlux/tn3270-ng2.pax | TN3270 ZAF App | [tn3270-ng2](https://github.com/zowe/tn3270-ng2) | N/A |
| files/zlux/vt-ng2.pax | USS/VT Terminal Emulator ZAF App | [vt-ng2](https://github.com/zowe/vt-ng2) | N/A |
| files/zlux/config/zluxserver.json | Zowe Application Framework Config JSON | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/files/zlux/config/zluxserver.json) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| files/zlux/config/plugins/*.json | Zowe Application Framework JSON Configuration Files | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/files/zlux/config/plugins/)| [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| files/zlux/zlux-workflow.pax | Workflow ZAF App | [zlux-workflow](https://github.com/zowe/zlux-workflow) | N/A |
| files/zlux/zlux-editor.pax | Editor ZAF App | [zlux-editor](https://github.com/zowe/zlux-editor) | N/A |
| files/zlux/zlux-core.pax | Zowe Application Framework Core Components | [zlux](https://github.com/zowe/zlux)| N/A |
| files/zlux/sample-angular-app.pax | Sample Angular ZAF App | [sample-angular-app](https://github.com/zowe/sample-angular-app) | N/A |
| files/zlux/zosmf-auth.pax | z/OSMF Authentication ZAF App | [zosmf-auth](https://github.com/zowe/zosmf-auth)| N/A |
| files/zlux/zss-auth.pax | zSS Authentication ZAF App | [zss-auth](https://github.com/zowe/zss-auth)| N/A |
| files/jcl/ZWESECUR.jcl | JCL to define Zowe z/OS security definitions | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/files/jcl/ZWESECUR.jcl)| [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| files/jcl/ZWENOSEC.jcl | JCL to remove Zowe z/OS Security definitions| [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/files/jcl/ZWENOSEC.jcl)| [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| files/jcl/ZWESVSTC.jcl | JCL to start Zowe (Zowe STC) | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/files/jcl/ZWESVSTC.jcl)| [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| files/jobs-api-server-*-boot.jar | Java binaries - Zowe Jobs REST API Server | [jobs sources](https://www.github.com/zowe/jobs) | [Jobs Pipeline](https://github.com/zowe/jobs/blob/master/Jenkinsfile) |
| files/workflows/ZWEWRF02.xml | Zowe Install Workflow Definition | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/files/workflows/ZWEWRF02.xml)| [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| files/workflows/ZWEYML02.yml | Zowe Install Workflow Configuration Variables | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/blob/master/files/workflows/ZWEYML02.yml)| [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| files/api-mediation-package-*.pax | PAX Archive containing Zowe API Mediation Layer Components | [api layer](https://www.github.com/zowe/api-layer) | [api-layer pipeline](https://github.com/zowe/api-layer/blob/master/Jenkinsfile) |
| files/explorer-uss-*.pax | PAX Archive containing Zowe Desktop USS Plugin | [explorer-uss](https://www.github.com/zowe/explorer-uss) | [explorer-uss pipeline](https://github.com/zowe/explorer-uss/blob/master/Jenkinsfile) |
| files/explorer-jes-*.pax | PAX Archive containing Zowe Desktop JES Plugin | [explorer-jes](https://www.github.com/zowe/explorer-jes) | [explorer-jes pipeline](https://github.com/zowe/explorer-jes/blob/master/Jenkinsfile) |
| files/data-sets-api-server-*-boot.jar | Java binaries - Zowe Data-Sets REST API Server | [data-sets](https://www.github.com/zowe/data-sets) | [Data-Sets pipeline](https://github.com/zowe/data-sets/blob/master/Jenkinsfile) |
| files/scripts/files-api-start.sh | Script to start the Data-Sets Server | [data-sets](https://github.com/zowe/data-sets/tree/master/data-sets-zowe-server-package/src/main/resources/scripts/files-api-start.sh)| [Data-Sets Pipeline](https://github.com/zowe/data-sets/blob/master/Jenkinsfile) |
| files/scripts/files-api-validate.sh | Script to validate the Data-Sets Server Configuration | [data-sets](https://github.com/zowe/data-sets/tree/master/data-sets-zowe-server-package/src/main/resources/scripts/files-api-validate.sh)| [Data-Sets Pipeline](https://github.com/zowe/data-sets/blob/master/Jenkinsfile) |
| files/scripts/files-api-configure.sh | Script to configure the Data-Sets Server Configuration | [data-sets](https://github.com/zowe/data-sets/tree/master/data-sets-zowe-server-package/src/main/resources/scripts/files-api-configure.sh)| [Data-Sets Pipeline](https://github.com/zowe/data-sets/blob/master/Jenkinsfile) |
| files/scripts/jobs-api-validate.sh | Script to validate the Jobs Server Configuration | [jobs](https://github.com/zowe/jobs/tree/master/jobs-zowe-server-package/src/main/resources/scripts/jobs-api-validate.sh)| [Jobs Pipeline](https://github.com/zowe/jobs/blob/master/Jenkinsfile) |
| files/scripts/jobs-api-start.sh | Script to start the Jobs server | [jobs](https://github.com/zowe/jobs/tree/master/jobs-zowe-server-package/src/main/resources/scripts/jobs-api-validate.sh)| [Jobs Pipeline](https://github.com/zowe/jobs/blob/master/Jenkinsfile) |
| files/scripts/jobs-api-configure.sh | Script to configure the Jobs Server Configuration | [jobs](https://github.com/zowe/jobs/tree/master/jobs-zowe-server-package/src/main/resources/scripts/jobs-api-validate.sh)| [Jobs Pipeline](https://github.com/zowe/jobs/blob/master/Jenkinsfile) |
| files/explorer-mvs-*.pax | PAX Archive containing Zowe Desktop MVS Plugin | [explorer-mvs sources](https://www.github.com/zowe/explorer-mvs) | [Explorer MVS Pipeline](https://github.com/zowe/explorer-mvs/blob/master/Jenkinsfile) |
| files/zss.pax | Zowe ZSS Cross-Memory Server | [zss](https://github.com/zowe/zss) | [zss build scripts](https://github.com/zowe/zss/tree/master/build) |
| install/zowe-check-prereqs.sh | Script to check required environment configuration(s) | [zowe-install-packaging](https://www.github.com/zowe/zowe-install-packaging) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| install/zowe-install.sh | Script to initiate Zowe automated installation | [zowe-install-packaging/install](https://github.com/zowe/zowe-install-packaging/) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/allocate-dataset.sh | Script to allocate a dataset | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/shared/scripts/) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/check-dataset-dcb.sh | Script to check Database DCB property | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/shared/scripts/) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/check-dataset-exist.sh | Script to check if a dataset exists | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/shared/scripts/) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/instance.template.env | Zowe Instance Template ENV Configuration | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts/) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/ocopyshr.clist | A CList to copy a USS file to a PDS member | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/ocopyshr.sh | Script to copy a uss JCL file to a shared PDS | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/opercmd | REXX file to issue z/OS console commands | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/opercmd.rex | REXX script to issue an operator command and trap output | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/tag-files.sh | Script to change USS file tags | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/shared/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/configure-java.sh | Script to configure Java Home ENV variable | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/configure-node.sh | Script to configure Node Home ENV variable | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/error.sh | Script to track and handle errors |[zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/mcopyshr.clist | CLIST to copy PDS member to another PDS | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-apiml-variables.sh | Validate APIML Configuration Variables | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-directory-is-accessible.sh | Validate user can access directory | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-directory-is-writable.sh | Validate user can write to directory | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-java.sh | Validate Java version and PATH |[zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-keystore-directory.sh | Validate Keystore Directory | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-node.sh | Validate Node Version and PATH | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-port-available.sh | Validate a port is available | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-static-definition-directory.sh | Validate APIML Static Definition Dir | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-zosmf-host-and-port.sh | Validate z/OSMF Configuration | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/validate-zowe-prefix.sh | Validate configured Zowe prefix | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/zosmfHttpRequest.js | Node.js script to validate z/OSMF info | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/zowe-copy-to-JES.sh | Copy SAMPLIB member into JES PROCLIB concatenation | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/zowe-install-proc.sh | Copy Zowe server PROC to JES concatenation|[zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/utils/zowe-install-xmem.sh | Copy cross-memory server artifacts to destination | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/wait-for-job.sh  | Script to submit job and wait for completion | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/shared/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/zowe-install-MVS.sh  | Script which installs Zowe datasets, such as LOADLIB | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/zowe-install-api-mediation.sh  | Script which installs Zowe API Mediation Layer | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/zowe-install-explorer-api.sh  | Script which installs Explorer API Server | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/zowe-install-explorer-ui.sh  | Script which installs Explorer UI App | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |
| scripts/zowe-install-zlux.sh | Script which extracts and install Zowe Desktop | [zowe-install-packaging](https://github.com/zowe/zowe-install-packaging/tree/master/scripts) | [Zowe Install/Packaging Pipeline](https://github.com/zowe/zowe-install-packaging/blob/master/Jenkinsfile) |


## Zowe CLI Package

| File Path | Description | Source Location | Build Script(s) |
| --------- | ----------- | --------------- | --------------- |
| zowe-cli-package-1.9.0.zip | Zowe CLI Package containing the core Zowe CLI and SCS plugin | Multiple open source repositories within [zowe](https://www.github.com/zowe) | [zowe-cli-standalone-package pipeline](https://github.com/zowe/zowe-cli-standalone-package/blob/master/Jenkinsfile) |
| licenses/zowe_licenses_full.zip | License archive for Zowe third party dependencies | N/A | [Zowe License Scan Pipeline](https://github.com/zowe/zowe-dependency-scan-pipeline/blob/master/Jenkinsfile.license-scan) |
| zowe-cli.tgz | Zowe CLI | [zowe-cli](https://github.com/zowe/zowe-cli/) | [zowe-cli pipeline](https://github.com/zowe/zowe-cli/blob/master/Jenkinsfile) |
| secure-credential-store-for-zowe-cli.tgz | Secure Credential Store for Zowe CLI | [zowe-cli-scs-plugin](https://github.com/zowe/zowe-cli-scs-plugin) | [zowe-cli-scs-plugin pipeline](https://github.com/zowe/zowe-cli-scs-plugin/blob/master/Jenkinsfile) |


## Zowe CLI Plugins

| File Path | Description | Source Location | Build Script(s) |
| --------- | ----------- | --------------- | --------------- |
| zowe-cli-plugins-1.9.0.zip | Zowe CLI Package containing Zowe CLI Plugins | Multiple open source repositories within [zowe](https://www.github.com/zowe) | [zowe-cli-standalone-package pipeline](https://github.com/zowe/zowe-cli-standalone-package/blob/master/Jenkinsfile) |
| licenses/zowe_licenses_full.zip | License archive for Zowe third party dependencies | N/A | [Zowe License Scan Pipeline](https://github.com/zowe/zowe-dependency-scan-pipeline/blob/master/Jenkinsfile.license-scan) |
| cics-for-zowe-cli.tgz |  IBM® CICS® Plug-in for Zowe CLI | [zowe-cli-cics-plugin](https://github.com/zowe/zowe-cli-cics-plugin) | [zowe-cli-cics-plugin pipeline](https://github.com/zowe/zowe-cli-cics-plugin/blob/master/Jenkinsfile) |
| db2-for-zowe-cli.tgz | IBM® Db2® for z/OS® Plug-in for Zowe CLI | [zowe-cli-db2-plugin](https://github.com/zowe/zowe-cli-db2-plugin) | [zowe-cli-db2-plugin pipeline](https://github.com/zowe/zowe-cli-db2-plugin/blob/master/Jenkinsfile) |
| zos-ftp-for-zowe-cli.tgz | IBM® z/OS FTP Plug-in for Zowe CLI | [zowe-cli-ftp-plugin](https://github.com/zowe/zowe-cli-ftp-plugin) | [zowe-cli-ftp-plugin pipeline](https://github.com/zowe/zowe-cli-ftp-plugin/blob/master/Jenkinsfile)  |
| ims-for-zowe-cli.tgz | IBM® IMS™ Plug-in for Zowe CLI | [zowe-cli-ims-plugin](https://github.com/zowe/zowe-cli-ims-plugin) | [zowe-cli-ims-plugin pipeline](https://github.com/zowe/zowe-cli-ims-plugin/blob/master/Jenkinsfile) |
| mq-for-zowe-cli.tgz | IBM® MQ Plug-in for Zowe CLI | [zowe-cli-mq-plugin](https://github.com/zowe/zowe-cli-mq-plugin) | [zowe-cli-mq-plugin pipeline](https://github.com/zowe/zowe-cli-mq-plugin/blob/master/Jenkinsfile) |
