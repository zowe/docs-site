# Installing Zowe via Zowe Server Install Wizard

The Zowe Server Install Wizard is an installation wizard for Zowe server-side components available on Microsoft Windows, Mac OS, and Linux systems.  Performing Zowe installation via the Wizard streamlines the installation process and is an alternative to performing manual Zowe server-side component installation.

## Benefits of Wizard installation

- Reduces the need for YAML editing in z/OS Unix by handling these operations for you based on inputs to the prompts presented in the Wizard UI.

- Inputs to the prompts are validated, so that invalid input or typos entered in any commands are prevented.  

- The separation of duties for steps to be performed by a security administrator is made easier, whereby a system programmer or system administrator can skip particular steps where elevated user permissions are required, whereupon security administrators can perform such steps outside of the Wizard.

- Results for each step and the YAML configuration output can be reviewed for reference alongside activites performed outside of the Wizard, or for future use.

## Prerequisites of the Wizard

- Microsoft Windows, Apple Mac OS, or a Linux with an X11 or Wayland server display which can install programs from .rpm or .deb formats 
- An FTP or FTPS connection to z/OS for Zowe installation
- An account on z/OS that has access to z/OS UNIX for Zowe installation 
- A security administrator to configure required permissions in z/OS and z/OSMF
- A security administrator to generate certificates for Zowe
- A network administrator to open ports used by Zowe 

## Downloading the Wizard

To download the latest version of the Wizard, visit [Zowe.org](https://www.zowe.org/download.html).
Ensure that you download the appropriate file extension type according to your operating system:

Operating System | File Extension Type
---|---
Microsoft Windows | .exe
Apple Mac OS | .dmg
Linux (debian-based) | .deb
Linux (RedHat or SuSE-based) | .rpm


## Installing Zowe server-side components

1. Select **New Zowe Installation**.
2. In the Connection window, provide details as described in the following table:

### Setup Wizard connection to z/OS

Field name| Description                
---|---
Host      |Value for the target z/OS system for Zowe Installation. For example, `mainframe.yourcompany.com`
FTP Port  |The FTP Port number for internal use. The default port is 21. If not specified, the wizard uses the default port.
User Name |Your z/OS username.
Password  |Your z/OS password.

3. Select Use FTP over TLS (Highly Recommended). Provide details as described in the following table:
        
Field name | Description
---|---
Min TLS    |Select the minimum TLS version to accept the certificate from the server.
Max TLS    |Select the maximum TLS version to accept the certificate from the server.
4. Select **Accept all certificates**.
5. Click **VALIDATE CREDENTIALS**.
6. Click **Continue**.
7. In the **Before you start** window, review the instructions. 
8. In the **Job statement** field, customize the job statement if needed and click **SAVE AND VALIDATE**.
9. In the **Planning window**, provide details for z/OS Unix locations, identifiers, and z/OSMF details. 

### Setting z/OSMF Attributes (optional)
Provide details for z/OSMF. 

1. After specifying all the mandatory details , click **VALIDATE LOCATIONS**.

  You will receive a confirmation message for Java and Node.js locations.

2. Click **Continue to Installation Options**.

## Choosing the Server Installation Type

1. In the **Installation Type** window, select one of the following three installation types in the Wizard:

Type | Description
---|---
Download Zowe convenience build PAX from internet | Download the latest Zowe convenience build in .PAX format from [zowe.org](https://zowe.org) using the wizard without visiting the website.  <br />       1. Click **License Agreement**. <br />2. On the End User License Agreement for Zowe page, click **AGREE**.
Upload Zowe PAX for offline install | Upload a local (already downloaded) Zowe .PAX file using this option. <br />1. Click **UPLOAD PAX**.  <br />2. Select the downloaded PAX file and click **Open**.
SMP/E | Use this option to install Zowe through SMP/E build outside the wizard. <br />1. Provide the location of the Runtime Directory. <br />2. Click **VALIDATE LOCATION**.                           <br />**Note:** In the case of SMP/E installation, in the Initialization window, under the **Installation** tab, confirm the dataset names used during installation. <br />3. Click **Save**. 


2. Click **Continue to Component Installation**.

## Zowe Server Configuration

Perform Zowe server configuration in the wizard by providing inputs to the prompts for configuration values.
Some steps may require an administrator with sufficient privileges to complete the step. 

Click **Skip** the page to allow the step to be completed externally to the wizard. 

Click **View Job Output** to collect the job content to provide to an administrator without submitting it.
Each value entered is validated against the schema.

When you complete an entry the following actions can be performed:

* **View/Edit Yaml**  
This option lets you preview or adjust the YAML configuration that is used by Zowe. The prompts of the wizard are used to automatically generate the YAML contents, but you also have the options to review, edit, or import and export contents of the YAML file. This option also allows you to copy the YAML in its current state, which can than be sent to an administrator that is authorized to perform the task. Copying the YAML also includes a relevant JCL sample and explanation for the particular step.

* **View/Submit Job**  
This option executes the operations of the configuration step upon the z/OS system. After a job is submitted, job output is available for review.

* **View Job Output**  
This option presents the results of the jobs that were submitted. Details are provided if a job fails or returns a warning.

* **Skip**  
This option makes it possible to skip an installation step that you cannot perform such as an administrative security action that you cannot perform yourself.  

|Install Wizard Initalization Step|Description|Sample JCL|
|---|---|---|
|Installation|**Purpose:**<br /> Create datasets for Zowe's PARMLIB content and non-ZFS extension content for a given Zowe Instance<br /><br />**Action:**<br />1.  Allocate the PDSE FB80 dataset with at least 15 tracks named from Zowe parameter `zowe.setup.dataset.parmlib`<br />2. Allocate the PDSE FB80 dataset with at least 30 tracks named from Zowe parameter `zowe.setup.dataset.authPluginLib`<br />3. Copy the ZWESIP00 member from `zowe.setup.dataset.prefix`.SZWESAMP into `zowe.setup.dataset.parmlib`|[ZWEIMVS](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIMVS)|
|APF Auth|**Purpose:**<br /> Zowe contains one privileged component, ZIS, which enables the security model. The majority of Zowe is unprivileged and in key 8. The load library for the ZIS component and its extension library must be set as APF authorized and run in key 4. This enables ZIS and components that depend on ZIS.<br /><br />**Action:**<br />1. APF authorize the datasets defined at `zowe.setup.dataset.authLoadlib` and `zowe.setup.dataset.authPluginLib`.<br />2. <!-- This should be validated --> Define PPT entries for the members ZWESIS01 and ZWESAUX as Key 4, NOSWAP in the SCHEDxx member of the system PARMLIB.|[ZWEIAPF](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIAPF)|
|Security|**Purpose:**<br /> The STC accounts for Zowe need permissions for operating servers, and users need permissions for interacting with the servers.<br /><br />**Action:**<br /> [Set SAF permissions for accounts](https://docs.zowe.org/stable/user-guide/assign-security-permissions-to-users#security-permissions-reference-table)|RACF: [ZWEIRAC](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIRAC)<br /><br />TSS: [ZWEITSS](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEITSS)<br /><br />ACF2: [ZWEIACF](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/SZWIACF)|
|Security|(z/OS v2.4 ONLY) Create Zowe SAF Resource Class|This is not needed on z/OS v2.5+. On z/OS v2.4, the SAF resource class for Zowe is not included, and must be created.|RACF: [ZWEIRACZ](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIRACZ)<br /><br />TSS: [ZWEITSSZ](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEITSSZ)<br /><br />ACF2: [ZWEIACFZ](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIACFZ)|
|Certificates Option 1|Zowe creates a keyring and populates it with a newly generated certificate and certificate authority. The certificate would be seen as "self-signed" by clients unless import of the CA to clients is performed.|RACF: [ZWEIKRR1](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRR1)<br /><br />TSS: [ZWEIKRT1](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRT1)<br /><br />ACF2: [ZWEIKRA1](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRA1)|
|Certificates Option 2|Zowe creates a keyring and populates the keyring by connecting pre-existing certificates and CAs that you specify.|RACF: [ZWEIKRR2](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRR2)<br /><br />TSS: [ZWEIKRT2](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRT2)<br /><br />ACF2: [ZWEIKRA2](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRA2)|
|Certificates Option 3|Zowe creates a keyring and populates the keyring by importing PKCS12 content from a dataset that you specify.|RACF: [ZWEIKRR3](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRR3)<br /><br />TSS: [ZWEIKRT3](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRT3)<br /><br />ACF2: [ZWEIKRA3](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEIKRA3)|
|STC (NYI)|**Purpose**:<br /> ZWESLSTC is the job for running Zowe's webservers. ZWESISTC runs the APF authorized cross-memory server. The ZWESASTC job is started by ZWESISTC on an as-needed basis.<br /><br />**Action**:<br /> Copy the members ZWESLSTC, ZWESISTC, and ZWESASTC into your desired PROCLIB. If the job names are customized, modify the job name YAML values in `zowe.setup.security.stcs`|[ZWEISTC](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWEISTC)|
|(Optional) VSAM for Caching Service (NYI)|**Purpose:**<br /> To use VSAM as your storage method forteh Caching Service. For more information, see [Using VSAM as a storage solution through the Caching service](../extend/extend-apiml/api-mediation-vsam.md).<br /><br />**Action:**<br /> Create a RLM or NONRLM dataset for the Caching service, and set the name into the YAML value `components.caching-service.storage.vsam.name`|[ZWECSVSM](https://github.com/zowe/zowe-install-packaging/tree/feature/v3/jcl/files/SZWESAMP/ZWECSVSM)|


## Final Review

After completing the steps presented in the Wizard, a summary is provided indicating which steps were completed, skipped, or have errors. Errors are stored in the View Job Output. You can revisit any step to retry performing the step. You also have the option to export the final generated YAML file.

## Troubleshooting

### Failure to establish a TLS connection

When attempting to establish a TLS connection, you may encounter the following message:

```
Client network socket disconnected before secure TLS connection was established
```

If you receive this message, go back to the Connection page and attempt to re-establish the connection. If the connection cannot be established, restart the Wizard.

### Unable to continue with Wizard installation

If you encounter strange behavior that prohibits you from continuing with wizard installation, we recommend you follow this procedure:

1. View the Job output within the wizard.
2. If Job output is still unknown, view the output of the log file according to your platform:

    **For Linux:**  
` ~/.config/{app name}/logs/main.log`

    **For macOS:**  
` ~/Library/Logs/{app name}/main.log`

    **For Windows:**  
`%USERPROFILE%\AppData\Roaming{app name}\logs\main.log`

If you are still unsure how to proceed, make a backup of these log files, and then use the following procedure to remove the Wizard's cache. 

1. Close the Wizard.
2. Follow these steps according to your operating system:  
  **For Windows:**  
    (a) Open File Explorer. In the address bar type `%APPDATA%`. This takes you to the directory where your app data is stored. The typical directory path is `C:\Users[Your User Name]\AppData\Roaming`.
  
    (b) Locate the folder corresponding to `zowe-install-wizard`.

    **For macOS:**  
    (a) Open Finder. In the menu bar select **Go > Go to Folder**.

    (b) Type `~/Library/Application Support/` and press **Enter**. 
    (c) Locate the folder corresponding to `zowe-install-wizard`

    **For Linux:**  
    (a) Open a terminal or file manager.  
    (b) Navigate to `~/.config/`, which is where most apps store their configuration data.  
    (c) In the terminal, enter the following command:  
 `cd ~/.config/`.   
    (d) Locate the folder corresponding to `zowe-install-wizard`.

4. Delete this folder to remove all stored data.
5. Restart the Wizard.