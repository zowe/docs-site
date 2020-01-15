# Software requirements for Zowe CLI plug-ins

Before you use Zowe&trade; CLI plug-ins, complete the following steps:

1. Install [Zowe CLI](cli-installcli.md) on your computer.
2. Complete the following configurations:

| Plug-in | Required Configurations |
| --- | --- |
| [IBM CICS Plug-in for Zowe CLI](cli-cicsplugin.md) | <ul><li>Ensure that [IBM CICS Transaction Server v5.2 or later](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.home.doc/welcomePage/welcomePage.html) is installed and running in your mainframe environment</li><li>[IBM CICS Management Client Interface (CMCI)](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) is configured and running in your CICS region.</li></ul> |
| [IBM Db2 Database Plug-in for Zowe CLI](cli-db2plugin.md) | <ul> <li>Download and prepare the ODBC driver (required for only package installations) and address the licensing requirements. </li><li>**(MacOS)** Download and Install [Xcode](https://developer.apple.com/xcode/resources/).</li> </ul>|
[Secure Credential Store Plug-in for Zowe CLI](cli-scsplugin.md) | <ul> <li> (Linux only) Install libsecret on your computer. </li></ul> |

**Important!** You can perform the required configurations for the plug-ins that you want to use ***before*** or ***after*** you install the plug-ins. However, if you do not perform the required configurations, the plug-ins will not function as designed.