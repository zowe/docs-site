# System requirements

## User IDs


<table rules="all">
 <thead>
  <th style=background-color:#5555AA>User ID </th>
 <th style=background-color:#5555AA>Description </th>
 <th style=background-color:#5555AA colspan=4>Required privilege or permissions</th>
 </thead>

 <tr>
   <th colspan=2></th>
  <th style=background-color:#5555AA>Class</th>
  <th style=background-color:#5555AA>ID</th>
  <th style=background-color:#5555AA>Access</th>
  <th colspan=1 style=background-color:#5555AA>Reason</th>
 </tr>

 <tr>
   <th style="background-color:#555555" rowspan=7>ZWESVUSR</th>
   <th style="background-color:#555555" rowspan=7>A started task ID associated PROCLIB ZWESVSTC</th>
   <th rowspan=1 style="background-color:#AAAAAA">CSFSERV</th>
   <th rowspan=1 style="background-color:#AAAAAA">CSFRNGL</th>
 <th rowspan=1 style="background-color:#AAAAAA">READ</th>
 <th>For generating symmetrics keys using ICSF for Zowe Desktop cookies<th>
 </tr>

  <tr>
    <th style="background-color:#AAAAAA">FACILITY</th>
   <th style="background-color:#AAAAAA">ZWES.IS</th>
 <th style="background-color:#AAAAAA">READ</th>
  <th>To access the Zowe ZIS cross memory server<th>
 </tr>

   <tr>
    <th style="background-color:#AAAAAA">FACILITY</th>
   <th style="background-color:#AAAAAA">IRR.RUSERMAP</th>
 <th style="background-color:#AAAAAA">READ</th>
 <th>For API Mediation Layer to map an X.509 client certificate to a z/OS identify</th>
 </tr>

<tr>
    <th style="background-color:#AAAAAA">FACILITY</th>
   <th style="background-color:#AAAAAA">BPX.SERVER</th>
 <th style="background-color:#AAAAAA">UPDATE</th>
   <th rowspan=2>To allow Zowe Desktop ZLUX server to run API requests on behalf of the requester's TSO user ID</th>

 <tr>
    <th style="background-color:#AAAAAA">FACILITY</th>
   <th style="background-color:#AAAAAA">BPX.DAEMON</th>
 <th style="background-color:#AAAAAA">UPDATE</th>


  <tr>
    <th style="background-color:#AAAAAA">FACILITY</th>
   <th style="background-color:#AAAAAA">BPX.JOBNAME</th>
 <th style="background-color:#AAAAAA">READ</th>
 <th>Allows z/OS address spaces to be renamed for identification</th>

  <tr>
  <th colspan=3>Must have a valid OMVS segment</th>
  <th>Allows creation of a Unix System Services shell to run the Zowe Desktop ZLUX and Zowe API Mediation Layer servers</th>
 </tr>

   <th colspan=6></th>

 <tr>
    <th style="background-color:#555555" rowspan=2>ZWESIUSR</th>
   <th style="background-color:#555555" rowspan=2>A started task ID associated with PROCLIB ZWESISTC</th>
   <th colspan=3>Must have a valid OMVS segment</th>
    <th>Allows access to the Unix System Services file system</th>
 </tr>

<tr>
  
 </tr>

  <th colspan=6></th>

  <tr>
    <th style="background-color:#555555">ZWEADMIN</th>
   <th style="background-color:#555555">A group that ZWESVUSR and ZWESIUSR should belong to</th>
  <th colspan=3>Must have a valid OMVS segment</th>
      <th>Allows access to Unix System Services</th>
 </tr>

   <th colspan=6></th>

  <tr>
    <th style="background-color:#555555" rowspan=1>zowe_user</th>
   <th style="background-color:#555555" rowspan=1>The TSO users who will be logging into Zowe</th>
 <th colspan=3>Must be part of z/OSMF group IZUUSER or IZUADMIN</th>
 <th>Needed if z/OSMF is being used for authentication. Needed for REST APIs used by the Zowe desktop MVS, USS and JES Explorer apps</th>
 </tr>
 </table>

 