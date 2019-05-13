# Software requirements for Zowe CLI plug-ins

Before you install Zowe CLI plug-ins, meet the following steps:

1. Install [Zowe CLI](cli-installcli.md) on your computer.
2. Complete the required configurations for the plug-ins that are listed in the following table:


| Plug-in | Required Configurations |
| --- | --- |
| [Zowe CLI Plug-in for IBM CICS](cli-cicsplugin.md) | Ensure that [IBM CICS Transaction Server v5.2 or later](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.home.doc/welcomePage/welcomePage.html) is installed and running in your mainframe environment, and [IBM CICS Management Client Interface (CMCI)](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) is configured and running in your CICS region. |
| [Zowe CLI Plug-in for IBM Db2 Database](cli-db2plugin.md) | Download and prepare the ODBC driver (required for only package installations) and address the licensing requirements. For more information, see [Zowe CLI plug-in for IBM Db2 Database](cli-db2plugin.md). |

**Important!** You can perform the required configurations for the plug-ins that you want to use ***before*** or ***after*** you install the plug-ins. However, if you do not perform the required configurations, the plug-ins will not function as designed.