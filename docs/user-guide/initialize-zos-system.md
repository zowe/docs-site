# Extract the installation data sets

Before Zowe can be started a number of steps need to occur to prepare the z/OS Environmemnt and to configure all of the required artefacts to successfully start the Zowe started task.

Whether you have obtained Zowe from a `.pax` convenience build, or an SMP/E distribution, the steps to initialize the system are the same.

- security.   Create the user IDs and security manager settings.  
- [mvs](#initialize-the-mvs-data-sets-using-zwe-init-mvs).  Copy the data sets provided with Zowe to cust data sets.
- stc. Configure the system to launch the Zowe started task.
- apfauth.  APF authorize the LOADLIB containing the modules that need to perform z/OS priviledged security calls.  
- certificate.  Configure Zowe to use TLS certificates.
- vsam.  Configure the VSAM files needed to run the Zowe caching service used for high availability (HA)

## Initialize the MVS Data sets using `zwe init mvs`

During the installation of Zowe three data sets `SZWEAUTH`, `SZWESAMP` and `SZWEEXEC` were created as part of the `zwe install` step and populated with members copied across from the Zowe installation files.  The contents of these represent the original files that were provided as part of the Zowe installation and are not meant to be modified, as they will be replaced during subsequent upgrades of Zowe version 2.  For modification and execution three custom data sets are used instead which are created by the command `zwe init mvs`.

The `zowe.yaml` section that contains the parameters for the data set names is:

```
zowe:
  setup:
    dataset:
      prefix: IBMUSER.ZWE
      parmlib: IBMUSER.ZWE.CUST.PARMLIB
      jcllib: IBMUSER.ZWE.CUST.JCLLIB
      authLoadlib: IBMUSER.ZWE.CUST.ZWESALL
      authPluginLib: IBMUSER.ZWE.CUST.ZWESAPL
```

The storage requirements for the three data sets are included here.

Library DDNAME | Member Type | zowe.yaml | Target Volume | Type | Org | RECFM | LRECL | No. of 3390 Trks | No. of DIR Blks
---|---|---|---|---|---|---|---|---|--
CUST.PARMLIB | PARM Library Members | zowe.setup.dataset.parmlib | ANY | U | PDSE | FB | 80 | 15 | 5
CUST.JCLLIB | JCL Members | zowe.setup.dataset.jcllib | ANY | U | PDSE | FB | 80 | 15 | 5
CUST.ZWESAPL | CLIST copy utilities | zowe.setup.dataset.authPluginLib | ANY | U | PDSE | U | 0 | 15 | N/A

An example of executing `zwe init mvs` is shown below.  

```
#>zwe init mvs -c ./zowe.yaml
-------------------------------------------------------------------------------
>> Initialize Zowe custom data sets

Create data sets if they are not exist
Creating IBMUSER.ZWEV2.CUST.PARMLIB
Creating IBMUSER.ZWEV2.CUST.JCLLIB
Creating IBMUSER.ZWEV2.SZWEAUTH
Creating IBMUSER.ZWEV2.CUST.ZWESAPL

Copy IBMUSER.ZWEV2.SZWESAMP(ZWESIP00) to WINCHJ.ZWEV2.CUST.PARMLIB(ZWESIP00)
Copy components/zss/LOADLIB/ZWESIS01 to WINCHJ.ZWEV2.SZWEAUTH(ZWESIS01)
Copy components/zss/LOADLIB/ZWESAUX to WINCHJ.ZWEV2.SZWEAUTH(ZWESAUX)
Copy components/launcher/bin/zowe_launcher to WINCHJ.ZWEV2.SZWEAUTH(ZWELNCH)

>> Zowe custom data sets are initialized successfully.
#>
```

As well as the three `CUST` data sets, the PDS `SZWEAUTH` is created.  This may already exist (as it is created by the `zwe init mvs` command, in which case you may receive the error message `Error ZWEL0158E: IBMUSER.ZWEV2.SZWEAUTH already exists`.  You may ignore this message, or you may use the `--allow-overwritten` option on the command, for example `zwe init mvs -c zowe.yaml --allow-overwritten`.

## Verifying Data Set initialization

If this step is successful there will be three data sets matching the values in `zowe.setup.dataset.parmlib`, `zowe.setup.dataset.jcllib` and `zowe.setup.dataset.authPluginLib` in the `zowe.yaml` file.  The member `ZWESIP00` will exist in the `CUST.PARMLIB` and the `JCLLIB` and `ZWESAPL` will be empty.  