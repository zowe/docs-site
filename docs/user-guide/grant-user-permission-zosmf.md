# Granting users permission to access z/OSMF

For every TSO user ID that is going to log on to Zowe and use services that require z/OSMF, it must have permission to access the z/OSMF services that are used by Zowe. They should be added to the group with appropriate z/OSMF privileges, `IZUUSER` or `IZUADMIN` by default. 

This step is not included in the provided Zowe JCL because it must be done for every TSO user ID who wants to access Zowe's z/OS services.  The list of those user IDs will typically be the operators, administrators, developers, or anyone else in the z/OS environment who is logging in to Zowe.

**Note:** You can skip this section if you use Zowe without z/OSMF.  Zowe can operate without z/OSMF but services that use z/OSMF REST APIs will not be available, specifically the USS, MVS, and JES Explorers and the Zowe Command Line Interface files, jobs, workflows, tso, and console groups.

To grant permissions to the user ID to access z/OSMF, 

- If you use RACF, issue the following command:

  ```
  CONNECT (userid) GROUP(IZUUSER)
  ```

- If you use ACF2, issue the following commands:

  ```
  ACFNRULE TYPE(TGR) KEY(IZUUSER) ADD(UID(<uid string of user>) ALLOW)
  F ACF2,REBUILD(TGR)
  ```

- If you use Top Secret, issue the following commands:

  ```
  TSS ADD(userid)  PROFILE(IZUUSER)
  TSS ADD(userid)  GROUP(IZUUSRGP) 
  ```