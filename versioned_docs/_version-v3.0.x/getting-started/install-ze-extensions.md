# Installing Zowe Explorer extensions

To successfully install Zowe Explorer extensions, meet the following system requirements.

## Zowe Explorer CICS Extension system requirements

### Client side requirements

- [Visual Studio Code](https://code.visualstudio.com/download)
- [Zowe Explorer V3](../user-guide/ze-install#installing-zowe-explorer)

### Server side requirements

The following services must be installed, configured, and running on the mainframe:

- CICS Management Client Interface (CMCI) APIs
- z/OSMF (optional but recommended)

## Zowe Explorer FTP Extension system requirements

### Client side requirements

- [Visual Studio Code](https://code.visualstudio.com/download)
- [Zowe Explorer V3](../user-guide/ze-install#installing-zowe-explorer)

### Server side requirements

- Ensure that you can obtain remote access to a z/OS FTP service before using the extension.

- Some functionality within the FTP extension requires the FTP server on the mainframe to be configured with the `JESINTERFACELevel` parameter set to `2`. For more information, see the [JESINTERFACELEVEL (FTP server) statement](https://www.ibm.com/docs/en/zos/2.5.0?topic=protocol-jesinterfacelevel-ftp-server-statement).

     The `JESINTERFACELevel` parameter can be found in multiple locations within the mainframe, depending on your site's security policies.

    Contact your system administrator to determine if your FTP server is configured with the correct `JESINTERFACELevel`. For more information, see [FTP configuration statements in FTP.DATA](https://www.ibm.com/docs/en/zos/2.5.0?topic=protocol-ftp-configuration-statements-in-ftpdata).