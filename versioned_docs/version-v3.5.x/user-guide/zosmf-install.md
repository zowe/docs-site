# Installing Zowe via z/OSMF from PSWI and SMP/E workflow

The following information contains procedures and tips for meeting z/OSMF requirements. For complete information, go to [IBM Documentation](https://www.ibm.com/docs/en/zos/2.3.0) and read the following documents.

- [IBM z/OS Management Facility Configuration Guide](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/IZUHPINFO_PartConfiguring.htm)
- [IBM z/OS Management Facility Help](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izu/izu.htm)

## z/OS requirements for z/OSMF configuration
Ensure that the z/OS system meets the following requirements:

Requirements  | Description  | Resources in IBM Knowledge Center
---|---|---
AXR (System REXX)    | z/OS uses AXR (System REXX) component to perform Incident Log tasks. The component enables REXX executable files to run outside of conventional TSO and batch environments.  |  [System REXX][1dae6ddc]
  Common Event Adapter (CEA) server| The CEA server, which is a co-requisite of the Common Information Model (CIM) server, enables the ability for z/OSMF to deliver z/OS events to C-language clients.       |  [Customizing for CEA][8e6f2b3e]
  Common Information Model (CIM) server| z/OSMF uses the CIM server to perform capacity-provisioning and workload-management tasks. Start the CIM server before you start z/OSMF (the IZU* started tasks).  |  [Reviewing your CIM server setup][155070cd]
CONSOLE and CONSPROF commands |The CONSOLE and CONSPROF commands must exist in the authorized command table.| [Customizing the CONSOLE and CONSPROF commands][51d741c4]
Java level   | IBM® 64-bit SDK for z/OS®, Java Technology Edition V8 or later is required. | [Software prerequisites for z/OSMF][0a0a3cac]
TSO region size   | To prevent **exceeds maximum region size** errors, verify that the TSO maximum region size is a minimum of 65536 KB for the z/OS system.   |  N/A
User IDs   | User IDs require a TSO segment (access) and an OMVS segment. During workflow processing and REST API requests, z/OSMF might start one or more TSO address spaces under the following job names: userid; substr(userid, 1, 6) CN (Console).  |  N/A

  [1dae6ddc]: https://www.ibm.com/docs/en/zos/2.3.0?topic=guide-system-rexx "System REXX"
  [8e6f2b3e]: https://www.ibm.com/docs/en/zos/2.3.0?topic=test-customizing-cea "Customizing for CEA"
  [155070cd]: https://www.ibm.com/docs/en/zos/2.3.0?topic=ins-reviewing-your-cim-server-setup "Reviewing your CIM server setup"
  [51d741c4]: https://www.ibm.com/docs/en/zos/2.3.0?topic=commands-customizing-console-consprof "Customizing the CONSOLE and CONSPROF commands"
  [695feec1]: https://www.ibm.com/docs/en/zos/2.3.0?topic=management-what-is-cloud-provisioning-zos "What is IBM Cloud Provisioning and Management for z/OS?"
  [0a0a3cac]: https://www.ibm.com/docs/en/zos/2.3.0?topic=zosmf-software-prerequisites "Software prerequisites for z/OSMF"