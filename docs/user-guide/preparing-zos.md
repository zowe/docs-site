# System requirements

Zowe installation and configuration requires different privileges or permissions to perform certain tasks. To understand the user IDs and permissions involved, see the following table.

## User IDs

<table>
<!--header1--> 
  <tr>
    <td>
      <b>User ID</b>
    </td>
    <td>
      <b>Description</b> 
    </td>
    <td colspan="6">
      <b>Required privilege or permissions</b>
    </td>
  </tr>
  <!--header2--> 
  <tr>
    <td colspan="2">
    </td>
    <td>
      <b>Class</b>
    </td>
    <td>
      <b>ID</b>
    </td>
    <td>
      <b>Access</b>
    </td>
    <td>
      <b>Reason</b>
    </td>
  </tr>
  <!--row1-->  
  <tr>
    <td rowspan="7">
      ZWESVUSR
    </td>
    <td rowspan="7">
     A started task ID associated PROCLIB ZWESVSTC
    </td>
    <td>
      CSFSERV
    </td>
    <td>
      CSFRNGL
    </td>
    <td>
      READ
    </td>
    <td>
      For generating symmetrics keys using ICSF for Zowe Desktop cookies
    </td>
  </tr>
<!--row2-->  
  <tr>
    <td>
     FACILITY
    </td>
    <td>
      ZWES.IS
    </td>
    <td>
      READ
    </td>
    <td>
      To access the Zowe ZIS cross memory server
    </td>
  </tr>
  <!--row3-->  
  <tr>
    <td>
     FACILITY
    </td>
    <td>
     <a href="./configure-zos-system.html#configure-main-zowe-server-to-use-identity-mapping">IRR.RUSERMAP</a>
    </td>
    <td>
      READ
    </td>
    <td>
      For API Mediation Layer to map an X.509 client certificate to a z/OS identify
    </td>
  </tr>
  <!--row4-->  
  <tr>
    <td>
     FACILITY
    </td>
    <td>
     BPX.SERVER
    </td>
    <td>
      UPDATE
    </td>
    <td rowspan="2">
      To allow Zowe Desktop ZLUX server to run API requests on behalf of the requester's TSO user ID
    </td>
  </tr>
  <!--row5-->  
  <tr>
    <td>
     FACILITY
    </td>
    <td>
     BPX.DAEMON
    </td>
    <td>
      UPDATE
    </td>
  </tr>
  <!--row6-->  
  <tr>
    <td>
     FACILITY
    </td>
    <td>
     BPX.JOBNAME
    </td>
    <td>
      READ
    </td>
    <td>
      Allows z/OS address spaces to be renamed for identification
    </td>
  </tr>
  <!--row7-->  
  <tr>
    <td colspan="3">
     Must have a valid OMVS segment
    </td>
    <td>
     Allows creation of a Unix System Services shell to run the Zowe Desktop ZLUX and Zowe API Mediation Layer servers
    </td>
  </tr>
  <tr>
    <td>
     ZWESIUSR
    </td>
    <td>
     A started task ID associated with PROCLIB ZWESISTC
    </td>
    <td colspan="3">
     Must have a valid OMVS segment
    </td>
    <td>
    Allows access to the Unix System Services file system
    </td>
  </tr>
  <!--row8-->
  <tr>
    <td>
     ZWEADMIN
    </td>
    <td>
     A group that ZWESVUSR and ZWESIUSR should belong to
    </td>
    <td colspan="3">
     Must have a valid OMVS segment
    </td>
    <td>
    Allows access to Unix System Services
    </td>
  </tr>
  <!--row9-->
  <tr>
    <td>
     zowe_user
    </td>
    <td>
     The TSO users who will be logging into Zowe
    </td>
    <td colspan="3">
     Must be part of z/OSMF group IZUUSER or IZUADMIN
    </td>
    <td>
    <ul>
    <li>Needed if z/OSMF is being used for authentication.</li>
    <li>Needed for REST APIs used by the Zowe desktop MVS, USS and JES Explorer apps</li>
    </ul>
    </td>
  </tr>
</table>


