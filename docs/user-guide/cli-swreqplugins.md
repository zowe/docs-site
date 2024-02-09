# Zowe CLI plug-ins software requirements

Before installing a Zowe&trade; CLI plug-in, meet the software requirements to run the plug-in as expected.

:::info**Required role:** systems administrator
:::

| Plug-in | Requirements |
| --- | --- |
| [IBM CICS Plug-in for Zowe CLI](cli-cicsplugin.md) | <ul><li>Ensure that [IBM CICS Transaction Server v5.2 or later](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.home.doc/welcomePage/welcomePage.html) is installed and running in your mainframe environment.</li><li>[IBM CICS Management Client Interface (CMCI)](https://www.ibm.com/support/knowledgecenter/en/SSGMCP_5.2.0/com.ibm.cics.ts.clientapi.doc/topics/clientapi_overview.html) is configured and running in your CICS region.</li></ul> |
| [IBM Db2 Database Plug-in for Zowe CLI](cli-db2plugin.md) | <ul> <li>[Download and prepare the ODBC driver](../user-guide/cli-db2plugin.md#downloading-the-odbc-driver) (required for only package installations) and address the licensing requirements.</li><li>For MacOS: Download and Install [Xcode](https://developer.apple.com/xcode/resources/).</li> </ul>|  [z/OS FTP Plug-in for Zowe CLI](cli-ftpplugin.md) | <ul> <li>Ensure that z/OS FTP service is enabled and configured with `JESINTERFACELEVEL` = 2.</li> <li>FTP over SSL is recommended.</li>   </ul> |
| [IBM z/OS FTP Plug-in for Zowe CLI](cli-ftpplugin.md) | <ul> <li>Ensure that z/OS FTP service is enabled and configured with `JESINTERFACELEVEL` = 2.</li> <li>FTP is recommended over SSL.</li> </ul> |
| [IBM IMS Plug-in for Zowe CLI](cli-imsplugin.md) | <ul><li>Ensure that [IBM® IMS™ v14.1.0](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_14.1.0/com.ibm.ims14.doc/ims_product_landing_v14.html) or later is installed and running in your mainframe environment.</li><li> Configure [IBM® IMS™ Connect](https://www.ibm.com/support/knowledgecenter/en/SSEPH2_13.1.0/com.ibm.ims13.doc.ccg/ims_ct_intro.html).</li> <li>Configure [IBM IMS Operations APIs](https://github.com/zowe/ims-operations-api) to enable communication between the CLI and the IMS instance. </li></ul> |
| [IBM MQ Plug-in for Zowe CLI](cli-mqplugin.md) | <ul><li>Ensure that [IBM® MQ™ v9.1.0](https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_9.1.0/com.ibm.mq.pro.doc/q121910_.htm) or later is installed and running in your mainframe environment. Please read this blog for more information: [Exposing the MQ REST API via the Zowe API Mediation Layer](https://community.ibm.com/community/user/integration/viewdocument/exposing-the-mq-rest-api-via-the-zo?CommunityKey=b382f2ab-42f1-4932-aa8b-8786ca722d55). </li></ul>|

