 # Configuring Zowe via JCL

One option to configure Zowe is by directly customizing JCLs. The Zowe Runtime Dataset `SZWESAMP` contains JCL samples that have templates referencing Zowe YAML parameters. These samples cannot be submitted without modification. 
Edit and submit the job `SZWESAMP(ZWEGENER)` to validate the contents of your Zowe `YAML` before resolving the `JCL templates` and placing the resulting JCL into a separate `PDSE` created during installation. The location is specified in `zowe.setup.dataset.jcllib`.
When the JCL is prepared, the following jobs can be submitted to perform the following instance configuration actions:
## Core task
| Task | Description | Sample JCL|
|------|-------------|-----------|
|Create Instance Datasets | <br />**Purpose:**<br /> Create datasets for Zowe's PARMLIB content and non-ZFS extension content for a given Zowe Instance <br /> **Action:**<br /> 1) Allocate the PDSE FB80 dataset with at least 15 tracks named from Zowe parameter `zowe.setup.dataset.parmlib`<br/>2) Allocate the PDSE FB80 dataset with at least 30 tracks named from Zowe parameter `zowe.setup.dataset.authPluginLib`<br/>3) Copy the member `ZWESIP00` from `zowe.setup.dataset.prefix.SZWESAMP` into `zowe.setup.dataset.parmlib` | [ZWEIMVS](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIMVS)
|APF Authorize privileged content | <br />**Purpose:**<br /> Zowe contains one privileged component, ZIS, which enables the security model by which the majority of Zowe is unprivileged and in key 8. The load library for the ZIS component and its extension library must be set APF authorized and run in key 4 to use ZIS and components that depend upon it. <br /> **Action:**<br />1) APF authorize the datasets defined at zowe.setup.dataset.authLoadlib and zowe.setup.dataset.authPluginLib. <br />2) Define PPT entries for the members ZWESIS01 and ZWESAUX as Key 4, NOSWAP in the SCHEDxx member of the system PARMLIB. | [ZWEIAPF](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIAPF) <br /> 
 Grant SAF premissions | <br />**Purpose:**<br /> The STC accounts for Zowe need permissions for operating servers, and users need permissions for interacting with the servers. <br />**Action:**<br /> [Set SAF permissions for accounts](https://docs.zowe.org/stable/user-guide/assign-security-permissions-to-users#security-permissions-reference-table) | RACF: [ZWEIRAC](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIRAC) <br /> TSS: [ZWEITSS](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEITSS) <br /> ACF2: [ZWEIACF](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/SZWIACF) <br /> 
 |(z/OS v2.4 ONLY) Create Zowe SAF Resource Class |  On z/OS v2.4, the SAF resource class for Zowe is not included, and must be created. This step is not needed on z/OS v2.5 and later versions. | RACF: [ZWEIRACZ](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIRACZ) <br />TSS: [ZWEITSSZ](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEITSSZ) <br />ACF2: [ZWEIACFZ](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIACFZ)
 Copy STC JCL to PROCLIB | <br />**Purpose:**<br /> The job ZWESLSTC runs Zowe's webservers. and The job ZWESISTC runs the APF authorized cross-memory server. The job ZWESASTC is started by ZWESISTC on an as-needed basis. <br /> **Action:**<br /> Copy the members ZWESLSTC, ZWESISTC, and ZWESASTC into your desired PROCLIB. If the job names are customized, also modify the YAML values of them in `zowe.setup.security.stcs`. | [ZWEISTC](ZWEISTC)

## Keyring Tasks
**Certificate requirements**: Ensure that your Zowe keyring has the following elements:
* **Private key & certificate pair**: The Zowe Servers will use this certificate. Ensure that the certificate either does not have the "Extended Key Usage" attribute, or alternatively, that it does have "Extended Key Usage" with both "Server Authorization" and "Client Authorization" values.
* **Certificate Authorities**: Every intermediate and root Certificate Authority (CA) that Zowe interacts with must be within the Keyring, unless the YAML value `zowe.verifyCertificates` is set to `DISABLED`. CAs that must be within the keyring include z/OSMF's CAs if using z/OSMF, and Zowe's own certificate's CAs as Zowe servers must be able to verify each other.

There are four options for setting up keyrings: Three scenarios covered by JCL samples where a keyring is created for you, or a fourth where you can bring your own keyring. <br />
If you already have a keyring that meets the requirements, you can configure Zowe to use it by configuring Zowe YAML values within `zowe.certificate` as follows:

```
zowe:
  certificate:
    keystore:
      type: JCERACFKS
      file: "safkeyring://<STC Account Name>/<Ring Name>"
      alias: "<Name of your certificate>"
      password: "password" #literally "password". keyrings do not use passwords, so this is a placeholder.
    truststore:
      type: JCERACFKS
      file: "safkeyring://<STC Account Name>/<Ring Name>"
      password: "password" #literally "password". keyrings do not use passwords, so this is a placeholder.
```
If you would like Zowe to create a keyring instead, you can do one of these three tasks:
| Keyring Setup Type | Description | Sample JCL|
|--------------------|-------------|-----------|
|1 | Zowe will create a keyring and populate it with a newly generated certificate and certificate authority. The certificate would be seen as "self-signed" by clients unless import of the CA to clients is performed. | RACF : [ZWEIKRR1](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRR1) <br /> TSS: [ZWEIKRT1](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRT1) <br /> ACF2: [ZWEIKRA1](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRA1) 
| 2| Zowe will create a keyring and populate it by connecting pre-existing certificates and CAs that you specify.| RACF : [ZWEIKRR2](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRR2)<br /> TSS: [ZWEIKRT2](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRT2) <br /> ACF2: [ZWEIKRA2](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRA2) 
|3 | Zowe will create a keyring and populate it by importing PKCS12 content from a dataset that you specify. | RACF: [ZWEIKRR3](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRR3) <br /> TSS: [ZWEIKRT3](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRT3) <br /> ACF2: [ZWEIKRA3](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRA3)

## (Optional) Caching Service VSAM Task: 
If you plan to use the Zowe caching service Component, such as for high availability and fault tolerance reasons, then you must choose a form of database for it to use. Among the choices is for it to use a VSAM dataset of your choice.
| Task | Description | Sample JCL|
|------|-------------|-----------|
|Create VSAM Dataset for Caching Service | **Action**: Create a RLS or NONRLS dataset for the caching service, and set the name into the YAML value `components.caching-service.storage.vsam.name` | [ZWECSVSM](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWECSVSM)

JCL samples for removing Zowe configuration also exist.
|Action | Sample JCL |
|------|-----------|
|Remove Instance Datasets | [ZWERMVS](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWERMVS)
|Remove SAF Permissions | [ZWENOSEC](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWENOSEC)
|Remove Keyring | [ZWENOKR](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWENOKR) |
|Remove Caching Service VSAM Dataset | [ZWECSRVS](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWECSRVS)