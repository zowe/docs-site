# Zowe Server Install Wizard Overview

The Zowe Server Install Wizard is an installation wizard for Zowe server-side components. You can install the wizard on Microsoft Windows, Mac OS, and Linux system. It is an alternative to the existing Zowe installation process and improves the user experience.

# Benefits of the wizard

- It reduces interactions with z/OS Unix and YAML, because it handles the Unix and YAML operations for you based upon the answers you give to prompts.

- Each answer you give for prompts is validated, so any commands being issued are further protected against invalid input or typos.

- In each step, you can review the commands about to be executed, for greater confidence in your installation progress.

- It provides easier separation of duties. You can skip a particular step and a team member with sufficient user privileges can complete it for you outside of the wizard.

- Results for each step and the YAML configuration output can be reviewed for reference alongside activites done outside the wizard, or for future use.

# Prerequisites of the wizard

- A computer with Microsoft Windows or Apple Mac OS or a Linux computer with an X11 or Wayland server display which can install programs from .rpm or .deb formats. 
- An FTP or FTPS connection to the z/OS computer for the Zowe installation.
- An account on z/OS that has access to z/OS UNIX for Zowe installation. 
- A security administrator to configure required permissions in z/OS and z/OSMF.
- A security administrator to generate certificates for Zowe.
- A network administrator to open the ports used by Zowe. 
 

# Downloading the wizard

Visit [Zowe.org](https://www.zowe.org/download.html) website to download the latest version of the wizard on your computer.
You must download the appropriate type based upon your Operating System:

Operating System | File Extension Type
---|---
Microsoft Windows | .exe
Apple Mac OS | .dmg
Linux (debian-based) | .deb
Linux (RedHat or SuSE-based) | .rpm

After installation of the wizard, you can run the program to start your Zowe server installation process.

# Installing Zowe


1. Select **New Zowe Installation**.
2. In the Connection window, provide details as described in the following table:

## Setup Wizard connection to z/OS

Field name| Description                
---|---
Host      |Value for the target z/OS system for Zowe Installation. For example, `mainframe.yourcompany.com`
FTP Port  |The FTP Port number for internal use. The default port is 21. If not specified, the wizard uses the default port.
User Name |Your z/OS username.
Password  |Your z/OS password.

        1. Select Use FTP over TLS (Highly Recommended). Provide details as described in the following table:
        
Field name | Description
---|---
Min TLS    |Select the minimum TLS version to accept the certificate from the server.
Max TLS    |Select the maximum TLS version to accept the certificate from the server.
        2. Select **Accept all certificates**.
3. Click **VALIDATE CREDENTIALS**.
4. Click **Save & Close** if you want to go back to the **New Zowe Installation** screen.
5. Click **Continue**.
6. In the **Before you start** window, review the instructions. 
7. In the **Job statement** field, customize the job statement if needed and click **SAVE AND VALIDATE**.
8. In the **Planning window**, provide details for z/OS Unix locations, identifiers, and z/OSMF details. 

### Setting z/OSMF Attributes (optional)
Provide details as for z/OSMF. 

9. After specifying all the mandatory details , click **VALIDATE LOCATIONS**. You will receive a confirmation message for Java and Node.js locations.
10. Click **Continue to Installation Options**.

## Choosing the Server Installation Type

11. In the **Installation Type** window, select one of the following three installation types in the wizard:

Type | Description
---|---
Download Zowe convenience build PAX from internet | Download the latest Zowe convenience build in .PAX format from [zowe website] (https://zowe.org) using the wizard without visiting the website.        1 Click **License Agreement**. 2 On the End User License Agreement for Zowe page, click **AGREE**.
Upload Zowe PAX for offline install | Upload a local (already downloaded) Zowe .PAX file using this option.               1. Click **UPLOAD PAX**. 2. Select the downloaded PAX file and click **Open**.
SMP/E | Use this option to install Zowe through SMP/E build outside the wizard. 1. Provide the location of the Runtime Directory. 2. Click **VALIDATE LOCATION**.                          **Note** In the case of SMP/E installation, in the Initialization window, under the **Installation** tab, confirm the dataset names used during installation and click **Save**. 


12. Click **Continue to Component Installation**.

## Zowe Server Configuration

Each page of the wizard from this point onward will prompt you for configuration values for a particular step of Zowe server configuration.
Some pages may require an additional administrator with sufficient privileges to complete the step. If you encounter such a page, you can **Skip** the page to allow the step to be completed externally to the wizard. It is also possible to input the correct values on the page, and use the **View Job** button to collect the job content to provide to an administrator without submitting it.
Each value entered in a page will be validated, and when you complete entry on the page, the following actions can be performed:

* View/Edit YAML: This button lets you preview or adjust the YAML configuration that is used by Zowe. The prompts of the wizard are used to automatically generate its contents, but you can review it, edit it, or import and export its contents.
* View/Submit Job: When you are happy with the values for the step, you can press the job submit button to execute the operations of the configuration step upon the z/OS system.
* View Job output: Upon submission of the job, the output will be available for review.

## Final Review

The last page of the wizard contains a summary of which steps were completed, skipped, or had errors. You can revisit any step to retry it, and you can also use this last page for exporting the final YAML that was generated.
 
