 # Configuring Zowe via JCL

One option to configure Zowe is by directly customizing JCLs. The Zowe Runtime Dataset `SZWESAMP` contains JCL samples that have templates referencing Zowe YAML parameters. These samples should not be submitted without modification. Samples that are submitted without modification will end unsuccessfully with a JCL ERROR status.

Edit and submit the job `SZWESAMP(ZWEGENER)` to validate the contents of your `zowe.yaml` before resolving the `JCL templates` and placing the resulting JCL into a separate data set created by the job `ZWEGENER`. The location is specified in `zowe.setup.dataset.jcllib`.

:::note

`zowe.setup.dataset.jcllib` is deleted and created each time the job `SZWESAMP(ZWEGENER)` is submitted.

:::

When the JCL is prepared, the following jobs can be submitted to perform the following instance configuration actions.
In addition to core JCL samples, you can also customize JCL samples for various keyring setup options according to your security manager. 

* For sample JCLs corresponding to core tasks, see the table [Core Tasks](#core-tasks). 
* For sample JCLs corresponding to keyring tasks, see the section [Keyring Tasks](#keyring-tasks) later in this article. 
* For JCL samples if you are using VSAM as your storage solution for the Caching service, see the table corresponding to [(Deprecated) Caching Service VSAM Task](#deprecated-caching-service-vsam-task).

## Core Tasks

| Task | Description | Sample JCL|
|------|-------------|-----------|
|Create Instance Datasets | <br />**Purpose:**<br /> Create datasets for Zowe's PARMLIB content and non-ZFS extension content for a given Zowe Instance <br /> **Action:**<br /> 1) Allocate the PDSE FB80 dataset with at least 15 tracks named from Zowe parameter `zowe.setup.dataset.parmlib`<br/>2) Allocate the PDSE FB80 dataset with at least 30 tracks named from Zowe parameter `zowe.setup.dataset.authPluginLib`<br/>3) Copy the member `ZWESIP00` from `zowe.setup.dataset.prefix.SZWESAMP` into `zowe.setup.dataset.parmlib` | [ZWEIMVS](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIMVS)
|APF Authorize privileged content | <br />**Purpose:**<br /> The majority of Zowe is unprivileged code running in Key 8. Zowe relies on a single component called ZIS to own all of the privileged code logic. The load library for the ZIS component and its extension library must be set as APF authorized and run in Key 4 to use ZIS and components that depend upon it. <br /> **Action:**<br />1) APF authorize the datasets defined at `zowe.setup.dataset.authLoadlib` and `zowe.setup.dataset.authPluginLib`. <br />2) Define PPT entries for the members `ZWESIS01` and `ZWESAUX` as Key 4, NOSWAP in the `SCHEDxx` member of the system PARMLIB. | [ZWEIAPF](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIAPF) <br /> 
 Grant SAF premissions | <br />**Purpose:**<br /> The STC accounts for Zowe need permissions for operating servers, and users need permissions for interacting with the servers. <br />**Action:**<br /> [Set SAF permissions for accounts](https://docs.zowe.org/stable/user-guide/assign-security-permissions-to-users#security-permissions-reference-table) | RACF: [ZWEIRAC](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIRAC) <br /> TSS: [ZWEITSS](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEITSS) <br /> ACF2: [ZWEIACF](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIACF) <br /> 
 |(z/OS v2.4 ONLY) Create Zowe SAF Resource Class |  On z/OS v2.4, the SAF resource class for Zowe is not included, and must be created. This step is not needed on z/OS v2.5 and later versions. | RACF: [ZWEIRACZ](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIRACZ) <br />TSS: [ZWEITSSZ](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEITSSZ) <br />ACF2: [ZWEIACFZ](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIACFZ)
 Copy STC JCL to PROCLIB | <br />**Purpose:**<br /> The job ZWESLSTC runs Zowe's webservers. The job ZWESISTC runs the APF authorized cross-memory server. The job ZWESASTC is started by ZWESISTC on an as-needed basis. <br /> **Action:**<br /> Copy the members ZWESLSTC, ZWESISTC, and ZWESASTC into your desired PROCLIB. If the job names are customized, also modify the YAML values of them in `zowe.setup.security.stcs`. | [ZWEISTC](https://github.com/zowe/zowe-install-packaging/blob/v2.x/staging/files/SZWESAMP/ZWEISTC)

## Keyring Tasks
**Certificate requirements**  
Ensure that your Zowe keyring has the following elements:

* **Private key & certificate pair**  
The Zowe Servers will use this certificate. Ensure that the certificate either does not have the `Extended Key Usage` attribute, or alternatively, that the certificate does have `Extended Key Usage` with both `Server Authorization` and `Client Authorization` values. For more information about extended key usage, see [Extended key usage](./configure-certificates.md#extended-key-usage) heading in the article _Configuring certificates_.

* **Certificate Authorities**  
Every intermediate and root Certificate Authority (CA) that Zowe interacts with must be within the Keyring, unless the `zowe.yaml` value `zowe.verifyCertificates` is set to `DISABLED`. CAs that must be within the keyring include z/OSMF's CAs if using z/OSMF, and Zowe's own certificate's CAs as Zowe servers must be able to verify each other.

There are four options for setting up keyrings: Three scenarios presented in the following table include JCL samples where a keyring is created for you. If you already have a keyring, you can  configure Zowe to use this keyring by configuring `zowe.yaml` values within `zowe.certificate` according to the following example:

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

<details>
<summary><b>If you would like Zowe to create a keyring instead, click here for options</b></summary>

|Keyring Setup Type|Description|Sample JCL|
|---|---|---|
|1|Zowe will create a keyring and populate it with a newly generated certificate and certificate authority. The certificate would be seen as "self-signed" by clients unless import of the CA to clients is performed|RACF: [ZWEIKRR1](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIKRR1)<br /><br />TSS: [ZWEIKRT1](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIKRT1)<br /><br />ACF2: [ZWEIKRA1](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIKRA1)|
|2|Zowe will create a keyring and populate it by connecting pre-existing certificates and CAs that you specify.|RACF: [ZWEIKRR2](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRR2)<br /><br />TSS: [ZWEIKRT2](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIKRT2)<br /><br />ACF2: [ZWEIKRA2](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIKRA2)|
|3|Zowe will create a keyring and populate it by importing PKCS12 content from a dataset that you specify.|RACF: [ZWEIKRR3](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIKRR3)<br /><br />TSS: [ZWEIKRT3](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIKRT3)<br /><br />ACF2: [ZWEIKRA3](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWEIKRA3)|
</details>


## (Deprecated) Caching Service VSAM Task 
The Caching Service is a server of Zowe that improves the high availability and fault tolerance of Zowe.
It is enabled by default and uses Infinispan for its backing storage by default.

Using VSAM instead of Infinispan is deprecated, but still possible. 

<details>
<summary>Click here to see how to set up a VSAM dataset for the Caching Service.</summary>

 | Task | Description | Sample JCL|
|------|-------------|-----------|
|Create VSAM Dataset for Caching Service | **Action**: Create a RLS or NONRLS dataset for the caching service, and set the name into the YAML value `components.caching-service.storage.vsam.name` | [ZWECSVSM](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWECSVSM)
</details>

You can also use JCL samples for removing Zowe configuration:
|Action | Sample JCL |
|------|-----------|
|Remove Instance Datasets | [ZWERMVS](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWERMVS)
|Remove SAF Permissions | [ZWENOSEC](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWENOSEC)
|Remove Keyring | ACF2:<br /> [ZWENOKRA](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWENOKRA)<br />RACF:<br /> [ZWENOKRR](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWENOKRR)<br />TSS:<br />[ZWENOKRT](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWENOKRT)|
|Remove Caching Service VSAM Dataset | [ZWECSRVS](https://github.com/zowe/zowe-install-packaging/tree/v3.x/master/files/SZWESAMP/ZWECSRVS)
