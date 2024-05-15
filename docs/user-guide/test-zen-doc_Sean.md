# Zowe Server Install Wizard Overview

The Zowe Server Install Wizard is an installation wizard for Zowe server-side components. You can install the wizard on Microsoft Windows, Mac OS, and Linux systems. Performing installation via the installation wizard streamlines the installation process and is an alternative to performing manual Zowe server-side component installation.

# Benefits of wizard installation

- Reduces interactions with z/OS Unix and YAML by handling these operations for you based on inputs to the prompts presented in the wizard UI.

- Inputs to the prompts are validated, so that invalid input or typos entered in any commands are prevented. 

- In each step, you can review the commands to be executed to ensure accuracy.

- Required separation of duties such as steps to be performed by a security administrator is made easier, whereby a system programer or system administrator can skip particular steps where elevated user permissions are required, whereupon security administrators can perform such steps outside of the wizard.

- Results for each step and the YAML configuration output can be reviewed for reference alongside activites performed outside of the wizard, or for future use.

# Prerequisites of the wizard

- Microsoft Windows or Apple Mac OS, or a Linux with an X11 or Wayland server display which can install programs from .rpm or .deb formats 
- An FTP or FTPS connection to z/OS for Zowe installation
- An account on z/OS that has access to z/OS UNIX for Zowe installation 
- A security administrator to configure required permissions in z/OS and z/OSMF
- A security administrator to generate certificates for Zowe
- A network administrator to open ports used by Zowe 
 

# Downloading the wizard

To download the latest version of the wizard, visit [Zowe.org](https://www.zowe.org/download.html).
Ensure that you download the appropriate file extension type based upon your operating system:

Operating System | File Extension Type
---|---
Microsoft Windows | .exe
Apple Mac OS | .dmg
Linux (debian-based) | .deb
Linux (RedHat or SuSE-based) | .rpm

After you complete the installation of the wizard, you can run the program to start your Zowe server installation process.

# Installing Zowe server-side components
Follow the prompts as presented in the wizard UI.

1. Select **New Zowe Installation**.
2. In the Connection window, provide details as described in the following table:

## Setup Wizard connection to z/OS

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
6. Click **Save & Close** if you want to go back to the **New Zowe Installation** screen.
7. Click **Continue**.
8. In the **Before you start** window, review the instructions. 
9. In the **Job statement** field, customize the job statement if needed and click **SAVE AND VALIDATE**.
10. In the **Planning window**, provide details for z/OS Unix locations, identifiers, and z/OSMF details. 

### Setting z/OSMF Attributes (optional)
Provide details as for z/OSMF. 

1. After specifying all the mandatory details , click **VALIDATE LOCATIONS**. You will receive a confirmation message for Java and Node.js locations.
2. Click **Continue to Installation Options**.

## Choosing the Server Installation Type

1. In the **Installation Type** window, select one of the following three installation types in the wizard:

Type | Description
---|---
Download Zowe convenience build PAX from internet | Download the latest Zowe convenience build in .PAX format from [zowe.org](https://zowe.org) using the wizard without visiting the website.  <br /> &nbsp;&nbsp;       1 Click **License Agreement**. <br /> &nbsp;&nbsp; 2 On the End User License Agreement for Zowe page, click **AGREE**.
Upload Zowe PAX for offline install | Upload a local (already downloaded) Zowe .PAX file using this option. <br /> &nbsp;&nbsp; 1. Click **UPLOAD PAX**.  <br /> &nbsp;&nbsp; 2. Select the downloaded PAX file and click **Open**.
SMP/E | Use this option to install Zowe through SMP/E build outside the wizard. <br /> &nbsp;&nbsp; 1. Provide the location of the Runtime Directory. <br /> &nbsp;&nbsp; 2. Click **VALIDATE LOCATION**.                           <br /> &nbsp;&nbsp; **Note:** In the case of SMP/E installation, in the Initialization window, under the **Installation** tab, confirm the dataset names used during installation. <br /> &nbsp;&nbsp; 3. Click **Save**. 


2. Click **Continue to Component Installation**.

## Zowe Server Configuration

Perform Zowe server configuration in the wizard by providing inputs to the prompts for configuration values.
Some steps may require an administrator with sufficient privileges to complete the step. You have the option to **Skip** the page to allow the step to be completed externally to the wizard. It is also possible to input the correct values on the page, and click **View Job** to collect the job content to provide to an administrator without submitting it.
Each value entered is validated.

When you complete an entry the following actions can be performed:

* **View/Edit YAML**  
This feature lets you preview or adjust the YAML configuration that is used by Zowe. The prompts of the wizard are used to automatically generate the YAML contents, but you also have the options to review, edit, or import and export contents of the YAML file.
* **View/Submit Job**  
When you have completed providing the values for each step, you can click **View/Submit Job** to execute the operations of the configuration step upon the z/OS system.
* After a job is submitted, job output is available for review.

## Final Review

After completing the steps presented in the wizard, a summary is provided indicating which steps were completed, skipped, or had errors. You can revisit any step to retry performing the step. You also have the option to export the final YAML file that was generated.
 
