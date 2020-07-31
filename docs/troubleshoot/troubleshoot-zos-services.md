# Troubleshooting z/OS Services

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using Zowe&trade; z/OS Services.

## z/OSMF JVM Cache Corruption

There are situations when z/OSMF abends when working with Zowe. 
The following is a snippet from the snap trace

```
* ** ASSERTION FAILED ** at ./OSCachesysv.cpp:1213: 
from info thread * ,  part of failing native thread  is 
SH_OSCachesysv::acquireWriteLock(unsigned
SH_CompositeCacheImpl::enterWriteMutex(J9
SH_CacheMap::startClassTransaction(J9VMTh
j9shr_classStoreTransaction_start+0x956  
```

and the following is a snippet from the java stack

```sh
4XESTACKTRACE                at sun/misc/Unsafe.defineAnonymousClass(Native Method) 
4XESTACKTRACE                at java/lang/invoke/InnerClassLambdaMetafactory.spinInnerClass(InnerClassLambdaMetafactory.java:339) 
4XESTACKTRACE                at java/lang/invoke/InnerClassLambdaMetafactory.buildCallSite(InnerClassLambdaMetafactory.java:206) 
```

The error occurs because the Java runtime being used by the z/OSMF Liberty server and the Java runtimes being used by Zowe are sharing a user ID of `IZUSVR1` and a collision occurs.  

### Isolate the started task user IDs

The z/OSMF started task `IZUSVR1` runs under the user ID of `IZUSER`.  Prior to version 1.9 of Zowe its started task `ZWESVSTC` also ran under the same user ID.  With Zowe 1.9 the default configuration changed to use a new userID of `ZWESVUSR` and group of `ZWEADMIN`.  

If your started task `ZWESVSTC` is configured to run under the user ID `IZUUSER` change it to run under user ID `ZWESVUSR`, see [Configuring the z/OS System for Zowe](../user-guide/configure-zos.system.md#user-ids-and-groups-for-the-zowe-started-tasks)

### Update z/OSMF to not use JVM class caching

If you need to run `ZWESVSTC` under the same user ID as z/OSMF for your environment, you can update z/OSMF configuration to switch off shared class caching which will stops the crash from occurring.  Disabling shared class caching will reduce the performance of z/OSMF so the preferred fix is to change the user ID of  `ZWESVSTC` away from `IZUUSER` to `ZWESVUSR` as described above.  

Navigate to the file `/var/zosmf/configuration/local_override.cfg`.  This contains the startup arguments for the Java runtime used by z/OSMF.  Add the line
```sh
JVM_OPTIONS=-Xshareclasses:none
```
You will need to recycle the z/OSMF server running, which by default will be running under the started task `IZUSVR1`.  

For more information on the effect that disabling a shared class cache has on a Java runtime see, [Class data sharing](https://www.ibm.com/support/knowledgecenter/SSYKE2_8.0.0/com.ibm.java.vm.80.doc/docs/shrc.html)

## Unable to generate unique CeaTso APPTAG

**Symptom:**

When you request a Zowe data set or z/OS Files API, you receive a response code 500 - 'Internal Server Error', with a message "Unable to generate unique CeaTso APPTAG". 

**Solution:**

Check z/OSMF settings of REST API of file. You must define `RESTAPI_FILE` in IZUPRMxx by the following statement:

```RESTAPI_FILE ACCT(IZUACCT) REGION(32768) PROC(IZUFPROC)```  

The default IZUFPROC can be found in SYS1.PPROCLIB. And the proper authorization is needed to get IZUFPROC work successfully.

## z/OS Services are unavailable

If the z/OS Services are unavailable, take the following corrective actions. 

- Ensure that the z/OSMF REST API services are working. Check the z/OSMF IZUSVR1 task output for errors and confirm that the z/OSMF RESTFILES services are started successfully. If no errors occur, you can see the following message in the IZUSVR1 job output:

    ```
    CWWKZ0001I: Application IzuManagementFacilityRestFiles started in n.nnn seconds.
    ```

    To test z/OSMF REST APIs you can run curl scripts from your workstation. 

    ```
    curl --user <username>:<password> -k -X GET --header 'Accept: application/json' --header 'X-CSRF-ZOSMF-HEADER: true' "https://<z/os host name>:<securezosmfport>/zosmf/restjobs/jobs?prefix=*&owner=*"
    ```

    where the *securezosmfport* is 443 by default. You can verify the port number by checking the *izu.https.port* variable assignment in the z/OSMF `bootstrap.properties` file.

    If z/OSMF returns jobs correctly, you can test whether it is able to returns files by using the following curl scripts:

    ```
    curl --user <username>:<password> -k -X GET --header 'Accept: application/json' --header 'X-CSRF-ZOSMF-HEADER: true' "https://<z/os host name>:<securezosmfport>/zosmf/restfiles/ds?dslevel=SYS1"
    ```

    If the restfiles curl statement returns a TSO SERVLET EXCEPTION error, check that the the z/OSMF installation step of creating a valid IZUFPROC procedure in your system PROCLIB has been completed. For more information, see the [z/OSMF Configuration Guide](https://www-01.ibm.com/servers/resourcelink/svc00100.nsf/pages/zOSV2R3sc278419?OpenDocument).

    The IZUFPROC member resides in your system PROCLIB, which is similar to the following sample:

    ```
    //IZUFPROC PROC ROOT='/usr/lpp/zosmf'  /* zOSMF INSTALL ROOT     */
    //IZUFPROC EXEC PGM=IKJEFT01,DYNAMNBR=200                          
    //SYSEXEC  DD DISP=SHR,DSN=ISP.SISPEXEC                            
    //         DD DISP=SHR,DSN=SYS1.SBPXEXEC                           
    //SYSPROC  DD DISP=SHR,DSN=ISP.SISPCLIB                            
    //         DD DISP=SHR,DSN=SYS1.SBPXEXEC                           
    //ISPLLIB  DD DISP=SHR,DSN=SYS1.SIEALNKE                           
    //ISPPLIB  DD DISP=SHR,DSN=ISP.SISPPENU                            
    //ISPTLIB  DD RECFM=FB,LRECL=80,SPACE=(TRK,(1,0,1))                
    //         DD DISP=SHR,DSN=ISP.SISPTENU                            
    //ISPSLIB  DD DISP=SHR,DSN=ISP.SISPSENU                            
    //ISPMLIB  DD DISP=SHR,DSN=ISP.SISPMENU                            
    //ISPPROF  DD DISP=NEW,UNIT=SYSDA,SPACE=(TRK,(15,15,5)),            
    //         DCB=(RECFM=FB,LRECL=80,BLKSIZE=3120)                     
    //IZUSRVMP DD PATH='&ROOT./defaults/izurf.tsoservlet.mapping.json'  
    //SYSOUT   DD SYSOUT=H                                              
    //CEEDUMP  DD SYSOUT=H                                              
    //SYSUDUMP DD SYSOUT=H                                              
    //                                                                 
    ```

    **Note:** You might need to change paths and data sets names to match your installation.

    A known issue and workaround for RESTFILES API can be found at [TSO SERVLET EXCEPTION ATTEMPTING TO USE RESTFILE INTERFACE](http://www-01.ibm.com/support/docview.wss?crawler=1&uid=isg1PI63398).

-   Check your system console log for related error messages and respond to them.
