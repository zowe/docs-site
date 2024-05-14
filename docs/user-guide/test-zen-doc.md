# Zowe Server Install Wizard Overview

The Zowe Server Install Wizard is an installation wizard for Zowe server-side components. You can install the wizard on Microsoft Windows, Mac OS, and Linux system. It is an alternative to the existing Zowe installation process and improves the user experience.

# Benefits of the wizard

- It reduces manual interactions with z/OS Unix and YAML. You can connect to z/OS Unix host using your TSO ID and view or edit YAML using the wizard. 

- You do not need to run zwe commands manually to verify the steps. In the wizard, you validate the information at each step, and you cannot complete the installation without validation

- It provides easier separation of duties. You can skip a particular step and a team member with sufficient user privileges can complete it for you outside of the wizard.

- You do not need to run zwe commands manually and by doing so you do not skip the security or permission requirements for Zowe. You can run installation (zwe install) and initialization (zwe init) commands on the mainframe by submitting jobs through the FTP connection using ZEN. 

# Prerequisites of the wizard

- A computer with Microsoft Windows or Mac OS or a Linux computer with an X11 or Wayland server display and distributed in .rpm or .deb formats. 
- An FTP or FTPS connection to the z/OS computer for the Zowe installation (recommended).
- An account on z/OS that has access to z/OS UNIX for Zowe installation. 
- A security administrator to configure required permissions in z/OS and z/OSMF.
- A security administrator to generate certificates for Zowe.
- A network administrator to open the ports used by Zowe. 
 

# Downloading the wizard

Visit [Zowe.org](https://www.zowe.org/download.html) website to download the latest version of the wizard on your computer.

# Installing the wizard

The istaller is available in the following formats:
- zowe-server-install-wizard-1.0.0.exe for Microsoft Windows.
- zowe-server-install-wizard-1.0.0.dmg for Mac OS.
- zowe-server-install-wizard-1.0.0.deb and zowe-server-install-wizard-1.0.0.rpm for Linux.

Download the relevant installer file for your PC and follow the steps to install the wizard.

1. Locate the downloaded wizard installer on your PC.
2. Double-click the installer file.

Zowe Server Install wizard window opens with the following two tiles:
- New Zowe Installation
- Zowe Installation Dry Run


# Installing Zowe

1. Select **New Zowe Installation**.
2. In the Connection window, provide details as described in the following table:


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
11. In the **Installation Type** window, select one of the following three installation types in the wizard:

Type | Description
---|---
Download Zowe convenience build PAX from internet | Download the latest Zowe convenience build in .PAX format from [zowe website] (https://zowe.org) using the wizard without visiting the website.        1 Click **License Agreement**. 2 On the End User License Agreement for Zowe page, click **AGREE**.
Upload Zowe PAX for offline install | Upload a local (already downloaded) Zowe .PAX file using this option.               1. Click **UPLOAD PAX**. 2. Select the downloaded PAX file and click **Open**.
SMP/E | Use this option to install Zowe through SMP/E build outside the wizard. 1. Provide the location of the Runtime Directory. 2. Click **VALIDATE LOCATION**.                          **Note** In the case of SMP/E installation, in the Initialization window, under the **Installation** tab, confirm the dataset names used during installation and click **Save**. 

12. Click **Continue to Component Installation**.
13. (Optional) In the **Initialization** window, under the **Installation** tab, click the following buttons, if needed:
    1. **View/Edit YAML**
    2. **View/Submit Job**
    3. **View Job Output**
14. In the **Initialization** window, under the **Installation** tab, provide details for the High-Level Qualifiers (HLQ) and click **INSTALL MVS DATASETS**.

15. In the **Initialization** window, under the APF Authorized Load Libraries tab, review the dataset setup configuration values and click **RUN ZWE INIT APFAUTH**.

16. Click **Continue to Security Setup**.
17. In the **Initialization** window, under **Security** tab, provide values to configure security using ZEN.

**Note**
The system admin can create the usernames as well as the group name as per your environment. You can define the group and the usernames in the Zowe configuration YAML file under Security related configuration section.

18. After providing all the values, click **INITIALIZE SECURITY CONFIG**.
29. In the **Initialization** window, under **Certificates** tab, provide the values to configure Zowe certificates.

20. Select the **Lock** checkbox provided for locking the keystore directory. Once locked, it is accessible only to the Zowe runtime user and group.
21. Provide the values and click **Review**.

# Reviewing Installation


 
