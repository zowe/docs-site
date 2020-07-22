# Troubleshooting z/OS Services

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using Zowe&trade; z/OS Services.

## z/OSMF JVM Cache Corruption

If you are running Zowe 1.12 or 1.13 then there are situations where z/OSMF abends reporting a class cache problem.  This problem has been resolved in Zowe 1.14.  The following is a snippet from the snap trace

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

The error occurs because the Java runtime being used by the z/OSMF Liberty server and the Java runtimes being used by Zowe are sharing a cache and a collision occurs.  The fix is to change either z/OSMF, or Zowe (or both) runtimes so that they don't use the cache to share classes with the java startup argument `-Xshareclasses:none`.  

### Update z/OSMF to not use JVM class caching

Navigate to the file `/var/zosmf/configuration/local_override.cfg`.  This contains the startup arguments for the Java runtime used by z/OSMF.  Add the line
```sh
JVM_OPTIONS=-Xshareclasses:none
```
You will need to recycle the z/OSMF server running, which by default will be running under the started task `IZUSVR1`.  

### Update Zowe to not use JVM class caching

As an alternative to updating z/OSMF configuration you can update your Zowe runtime so that when it starts its Java servers class sharing in the cache is disabled.  

Zowe has five Java Apache Tomcat servers that are launched with three shell scripts.

The **API Mediation Layer** servers are launched with the script `<ROOT_DIR>/components/api-mediation/bin/start/sh`.  Navigate to this file and add the line `-Xshareclasses:none` to the three lines with the `java` command.  The -X argument must be added before any of the -D arguments.  

For example, the code snippet below shows the line added to the java command for the Discovery server, the API Catalog, and the API Gateway.  

```sh
...
DISCOVERY_CODE=AD
_BPX_JOBNAME=${ZOWE_PREFIX}${DISCOVERY_CODE} java -Xms32m -Xmx256m -Xquickstart \
    -Xshareclasses:none \
    -Dibm.serversocket.recover=true \
...
CATALOG_CODE=AC
_BPX_JOBNAME=${ZOWE_PREFIX}${CATALOG_CODE} java -Xms16m -Xmx512m -Xquickstart \
    -Xshareclasses:none \
    -Dibm.serversocket.recover=true \
...
GATEWAY_CODE=AG
_BPX_JOBNAME=${ZOWE_PREFIX}${GATEWAY_CODE} java -Xms32m -Xmx256m -Xquickstart \
    -Xshareclasses:none \
...
```

The **Zowe z/OS Jobs API services** java server is launched with the script `<ROOT_DIR>/components/jobs-api/bin/start/sh`.  Navigate to this file and add the line `-Xshareclasses:none` to the `java` command, making sure it is before the first -D argument.

```sh
...
COMPONENT_CODE=EJ
_BPX_JOBNAME=${ZOWE_PREFIX}${COMPONENT_CODE} java -Xms16m -Xmx512m -Xshareclasses:none -Dibm.serversocket.recover=true -Dfile.encoding=UTF-8 \
    -Djava.io.tmpdir=/tmp -Xquickstart \
...
```
Do the same for the file `<ROOT_DIR>/components/files-api/bin/start/sh` which is the server for the **Zowe z/OS Files API services**.
```sh
...
COMPONENT_CODE=EF
_BPX_JOBNAME=${ZOWE_PREFIX}${COMPONENT_CODE} java -Xms16m -Xmx512m -Xshareclasses:none -Dibm.serversocket.recover=true -Dfile.encoding=UTF-8 \
    -Djava.io.tmpdir=/tmp -Xquickstart \
...
```

Having updated the `start.sh` scripts within Zowe you will need to stop and start the started task `ZWESVSTC`.  

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
