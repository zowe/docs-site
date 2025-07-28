# Zowe CLI plug-ins software requirements

Before installing a Zowe&trade; CLI plug-in, meet the software requirements to run the plug-in as expected.

:::info Required role: systems administrator
:::

| Plug-in | Requirements |
| --- | --- |
| [IBM CICS Plug-in for Zowe CLI](cli-cicsplugin.md) | <ul><li>Ensure that [IBM CICS Transaction Server v5.2 or later](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.home.doc/welcomePage/welcomePage.html) is installed and running in your mainframe environment.</li><li>[IBM CICS Management Client Interface (CMCI)](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) is configured and running in your CICS region.</li></ul> |
| [IBM Db2 Database Plug-in for Zowe CLI](cli-db2plugin.md) | <ul> <li>[Download and prepare the ODBC driver](../user-guide/cli-db2plugin.md#downloading-the-odbc-driver) (required for only package installations) and address the licensing requirements. _Perform this task before you install the plug-in_.</li><li>**(MacOS)** Download and Install [Xcode](https://developer.apple.com/xcode/resources/).</li><li>**Note**: Linux users might need to resolve an [incompatible glibc version](../troubleshoot/cli/troubleshoot-ibm-db2-database-plug-in.md#incompatible-glibc-version).</li> </ul>|  [z/OS FTP Plug-in for Zowe CLI](cli-ftpplugin.md) | <ul> <li>Ensure that z/OS FTP service is enabled and configured with `JESINTERFACELEVEL` = 2.</li> <li>FTP over SSL is recommended.</li>   </ul> |
| [IBM z/OS FTP Plug-in for Zowe CLI](cli-ftpplugin.md) | <ul> <li>Ensure that z/OS FTP service is enabled and configured with `JESINTERFACELEVEL` = 2.</li> <li>FTP over SSL is recommended.</li> </ul> |
| [IBM MQ Plug-in for Zowe CLI](cli-mqplugin.md) | <ul><li>Ensure that [IBM® MQ™ v9.1.0](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.pro.doc/q121910_.htm) or later is installed and running in your mainframe environment. Please read this blog for more information: [Exposing the MQ REST API via the Zowe API Mediation Layer](https://developer.ibm.com/messaging/2019/05/17/exposing-the-mq-rest-api-via-the-zowe-api-mediation-layer/) </li></ul>|
| [Visual Studio Code Extension for Zowe](../user-guide/ze-install.md) | <ul><li>Node.js V8.0 or later</li><li>Access to z/OSMF; at least one profile is configured</li><li>Configure TSO/E address space services, z/OS data set, file REST interface, and z/OS jobs REST interface. For more information, see [z/OS Requirements](../user-guide/systemrequirements-zosmf.md).</li></ul>|
