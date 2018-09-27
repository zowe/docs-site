# Appendix

## Appendix A. Creating an IZUPRMxx parmlib member

If z/OSMF requires customization, you can modify the applicable settings by using the IZUPRMxx parmlib member. To see a sample member, locate the IZUPRM00 member in the SYS1.SAMPLIB data set. IZUPRM00 contains settings that match the z/OSMF defaults.

Using IZUPRM00 as a model, you can create a customized IZUPRMxx parmlib member for your environment and copy it to SYS1.PARMLIB to override the defaults.

The following IZUPRMxx settings are required for the z/OSMF nucleus:

-   HOSTNAME

-   HTTP_SSL_PORT

-   JAVA_HOME.

The following setting is needed for the TSO/E REST services:

-   COMMON_TSO ACCT(IZUACCT) REGION(50000) PROC(IZUFPROC)

Descriptions of these settings are provided in the table below. For complete details about the IZUPRMxx settings and the proper syntax for updating the member, see [_z/OSMF Configuration Guide_](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/toc.htm).

If you change values in the IZUPRMxx member, you might need to customize the started procedure IZUSVR1, accordingly. For details, see [Appendix B. Modifying IZUSVR1 settings](#appendix-b-modifying-izusvr1-settings).  


To create an IZUPRMxx parmlib member, follow these steps:

1.  Copy the sample parmlib member into the desired parmlib data set with the desired suffix.

2.  Update the parmlib member as needed.

3.  Specify the IZUPRMxx parmlib member or members that you want the system to use on the IZU parameter of IEASYSxx. Or, code a value for IZUPRM= in the IZUSVR1 started procedure. If you specify both IZU= in IEASYSxx and IZUPARM= in IZUSVR1, the system uses the IZUPRM= value you specify in the started procedure.

**Setting**|**Purpose**|**Rules**|**Default**             
---|---|---|---|
HOSTNAME('hostname') | Specifies the host name, as defined by DNS, where the z/OSMF server is located. To use the local host name, enter asterisk (\*), which is equivalent to \@HOSTNAME from previous releases. If you plan to use z/OSMF in a multisystem sysplex, IBM recommends using a dynamic virtual IP address (DVIPA) that resolves to the correct IP address if the z/OSMF server is moved to a different system. | Must be a valid TCP/IP HOSTNAME or an asterisk (\*).                        | Default: \*
HTTP_SSL_PORT(nnn)   | Identifies the port number that is associated with the z/OSMF server. This port is used for SSL encrypted traffic from your z/OSMF configuration. The default value, 443, follows the Internet Engineering Task Force (IETF) standard. **Note:** By default, the z/OSMF server uses the SSL protocol SSL_TLSv2 for secure TCP/IP communications. As a result, the server can accept incoming connections that use SSL V3.0 and the TLS 1.0, 1.1 and 1.2 protocols. | Must be a valid TCP/IP port number. Value range: 1 - 65535 (up to 5 digits) | Default: 443  
COMMON_TSO ACCT(*account-number*) REGION(*region-size*) PROC(*proc-name*)|Specifies values for the TSO/E logon procedure that is used internally for various z/OSMF activities and by the Workflows task.|The valid ranges for each value are described in [_z/OSMF Configuration Guide_](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/toc.htm).|Default: 443 ACCT(IZUACCT) REGION(50000) PROC(IZUFPROC)
USER_DIR=*filepath*  | z/OSMF data directory path. By default, the z/OSMF data directory is located in /global/zosmf. If you want to use a different path for the z/OSMF data directory, specify that value here, for example: USER_DIR=`/the/new/config/dir`. | Must be a valid z/OS UNIX path name. | Default: `/global/zosmf/`

## Appendix B. Modifying IZUSVR1 settings

You might need to customize the started procedure IZUSVR1 for z/OSMF Lite.

To modify the IZUSVR1 settings, follow these steps:

1.  Make a copy

2.  Apply your changes

3.  Store your copy in PROCLIB.

**Setting**|**Purpose**|**Rules**| **Default**
---|---|---|---
 WLPDIR='directory-path'| WebSphere Liberty server code path. | The directory path must: Be a valid z/OS UNIX path name Be a full or absolute path name Be enclosed in quotation marks Begin with a forward slash ('/'). | Default: `/usr/lpp/zosmf/liberty`
 USER_DIR=*filepath*  | z/OSMF data directory path. By default, the z/OSMF data directory is located in /global/zosmf. If you want to use a different path for the z/OSMF data directory, specify that value here, for example: USER_DIR=`/the/new/config/dir`. | Must be a valid z/OS UNIX path name.| Default: `/global/zosmf/`

## Appendix C. Adding more users to z/OSMF

Your security administrator can authorize more users to z/OSMF. Simply connect the required user IDs to the z/OSMF administrator group (IZUADMIN). This group is permitted to a default set of z/OSMF resources (tasks and services). For the specific group permissions, see Appendix A in [_z/OSMF Configuration Guide_](https://www.ibm.com/support/knowledgecenter/SSLTBW_2.3.0/com.ibm.zos.v2r3.izua300/toc.htm).

You can create more user groups as needed, for example, one group per z/OSMF task.

#### Before you Begin
Collect the z/OS user IDs that you want to add.

#### Procedure
1.	On a RACF system, enter the CONNECT command for the user IDs to be granted authorization to z/OSMF resources:

  `CONNECT userid GROUP(IZUADMIN)`
#### Results

  The user IDs can now access z/OSMF.

#### Common errors

  Review the following messages and the corresponding resolutions as needed:

   **Symptom**  | **Cause** | **Resolution**
---|---|---
A problem…       |           |     
Another problem… |           |                    
Another problem… |           |                          
Another problem… |           |                          
Another problem… |           |                          
