# Troubleshooting the installation

## Known issues

When you initially open the MVD, a security message alerts you that you are attempting to open a site that has an invalid HTTPS certificate. Other applications within the MVD might also encounter this message. To prevent this message, add the URLs that you see to your list of trusted sites.

**Note:** If you clear the browser cache, you must add the URL to your trusted sites again.

zLUX APIs exist but are under development. Features might be reorganized if it simplifies and clarifies the API, and features might be added if applications can benefit from them.h

## Troubleshooting installing the Zowe runtime

1.  Environment variables

    To prepare the environment for the Zowe runtime, a number of ZFS folders need to be located for prerequisites on the platform that Zowe needs to operate. These can be set as environment variables before the script is run.  If the environment variables are not set, the install script will attempt to locate default values.

     - `ZOWE_ZOSMF_PATH`: The path where z/OSMF is installed.  Defaults to `/usr/lpp/zosmf/lib/defaults/servers/zosmfServer`
     - `ZOWE_JAVA_HOME`:  The path where 64 bit Java 8 or later is installed.  Defaults to `/usr/lpp/java/J8.0_64`
     - `ZOWE_EXPLORER_HOST`: The IP address of where the explorer servers are launched from.  Defaults to running `hostname -c`

    The first time the script is run if it has to locate any of the environment variables, the script will add lines to the current user's home directory `.profile` file to set the variables.  This ensures that the next time the same user runs the install script, the previous values will be used.

     **Note**: If you wish to set the environment variables for all users, add the lines to assign the variables and their values to the file `/etc/.profile`.  

    If the environment variables for `ZOWE_ZOSMF_PATH`, `ZOWE_JAVA_HOME` are not set and the install script cannot determine a default location, the install script will prompt for their location.  The install script will not continue unless valid locations are provided.  

2. Expanding the PAX files

    The install script will create the Zowe runtime directory structure using the  `install:rootDir ` value in the  `zowe-install.yaml` file.  The runtime components of the Zowe server are then unpaxed into the directory that contains a number of directories and files that make up the Zowe runtime.

    If the expand of the PAX files is successful, the install script will report that it ran its install step to completion.

3. Changing Unix permissions

    After the install script lay down the contents of the Zowe runtime into the `rootDir`, the next step is to set the file and directory permissions correctly to allow the Zowe runtime servers to start and operate successfully.

    The install process will execute the file `scripts/zowe-runtime-authorize.sh` in the Zowe runtime directory.  If the script is successful, the result is reported.  If for any reason the script fails to run because of insufficient authority by the user running the install, the install process reports the errors.  A user with sufficient authority should then run the `zowe-runtime-authorize.sh`.  If you attempt to start the Zowe runtime servers without the `zowe-runtime-authorize.sh` having successfully completed, the results are unpredictable and Zowe runtime startup or runtime errors will occur.  

4. Creating the PROCLIB member to run the Zowe runtime

    **Note:**  The name of the PROCLIB member might vary depending on the standards in place at each z/OS site, however for this documentation, the PROCLIB member is called `ZOWESVR`.

    At the end of the installation, a Unix file `ZOWESVR.jcl` is created under the directory where the runtime is installed into, `$INSTALL_DIR/files/templates`. The contents of this file need to be tailored and placed in a JCL member of the PROCLIB concatenation for the Zowe runtime to be executed as a started task.  The install script does this automatically, trying data sets `USER.PROCLIB`, other PROCLIB data sets found in the PROCLIB concatenation and finally `SYS1.PROCLIB`.  

    If this succeeds, you will see a message like the following one:

     ```
     PROC ZOWESVR placed in USER.PROCLIB
     ```

    Otherwise you will see messages beginning with the following information:  

     ```
     Failed to put ZOWESVR.JCL in a PROCLIB dataset.
     ```

    In this case, you need to copy the PROC manually. Issue the TSO `oget` command to copy the `ZOWESVR.jcl` file to the preferred PROCLIB:  

     ```
     oget '$INSTALL_DIR/files/templates/ZOWESVR.jcl' 'MY.USER.PROCLIB(ZOWESVR)'
     ```

    You can place the PROC in any PROCLIB data set in the PROCLIB concatenation, but some data sets such as `SYS1.PROCLIB` might be restricted, depending on the permission of the user.  

    You can tailor the JCL at this line

      ```
      //ZOWESVR   PROC SRVRPATH='/zowe/install/path/explorer-server'
      ```

    to replace the `/zowe/install/path` with the location of the Zowe runtime directory that contains the explorer server.  Otherwise you must specify that path on the START command when you start Zowe in SDSF:

      ```
      /S ZOWESVR,SRVRPATH='$ZOWE_ROOT_DIR/explorer-server'
      ```

### Troubleshooting installing zLUX

To help zLUX research any problems you might encounter, collect as much of the following information as possible and open an issue in GitHub with the collected information.

 - Project Zowe version and release level
 - z/OS release level
 - Job output and dump (if any)
   - Javascript console output (Web Developer toolkit accessible by pressing F12)
   - Log output from the Zowe Node Server
 - Error message codes
 - Screenshots (if applicable)
 - Other relevant information (such as the version of Node.js that is running on the Zowe Node Server and the browser and browser version).

### Troubleshooting installing explorer server

If explorer server REST APIs do not work, check the following items:

-   Check whether your Liberty explorer server is running.

    You can check this in the Display Active \(DA\) panel of SDSF under ISPF. The ZOWESVR started task should be running. If the ZOWESVR task is not running, start the explorer server by using the following `START` operator command:

    ```
    /S ZOWESVR
    ```

    You can also use the operator command `/D A,ZOWESVR` to verify whether the task is active, which alleviates the need for the DA panel of SDSF. If the started task is not running, ensure that your ZOWESVR procedure resides in a valid PROCLIB data set, and check the task’s job output for errors.

-   Check whether the explorer server is started without errors.

    In the DA panel of SDSF under ISPF, select the ZOWESVR job to view the started task output. If the explorer server is started without errors, you can see the following messages:

    ```
    CWWKE0001I: The server Atlas has been launched.
    ```

    ```
    CWWKF0011I: The server Atlas is ready to run a smarter planet.
    ```

    If you see error messages that are prefixed with "ERROR" or stack traces in the ZOWESVR job output, respond to them.

-   Check whether the URL that you use to call explorer server REST APIs is correct. For example: https://your.server:atlasport/Atlas/api/system/version. The URL is case-sensitive.
-   Ensure that you enter a valid z/OS® user ID and password when initially connecting to the explorer server.
-   If testing the explorer server REST API for jobs information fails, check the z/OSMF IZUSVR1 task output for errors. If no errors occur, you can see the following messages in the IZUSVR1 job output:

    ```
    CWWKE0001I : The server zosmfServer has been launched.
    ```

    ```
    CWWKF0011I: The server zosmfServer is ready to run a smarter planet.
    ```

    If you see error messages, respond to them.

    For RESTJOBS, you can see the following message if no errors occur:

    ```
    CWWKZ0001I: Application IzuManagementFacilityRestJobs started in n.nnn seconds.
    ```

    You can also call z/OSMF RESTJOBS APIs directly from your Internet browser with a URL, for example,

    https://your.server:securezosmfport/zosmf/restjobs/jobs

    where the *securezosmfport* is 443 by default. You can verify the port number by checking the *izu.https.port* variable assignment in the z/OSMF `bootstrap.properties` file.

    You might get error message IZUG846W, which indicates that a cross-site request forgery (CSRF) was attempted. To resolve the issue, update your browser by adding the `X-CSRF-ZOSMF-HEADER` HTTP custom header to every cross-site request. This header can be set to any value or an empty string (""). For details, see the z/OSMF documentation. If calling the z/OSMF RESTJOBS API directly fails, fix z/OSMF before explorer server can use these APIs successfully.

-   If testing the explorer server REST API for data set information fails, check the z/OSMF IZUSVR1 task output for errors and confirm that the z/OSMF RESTFILES services are started successfully. If no errors occur, you can see the following message in the IZUSVR1 job output:

    ```
    CWWKZ0001I: Application IzuManagementFacilityRestFiles started in n.nnn seconds.
    ```

    You can also call z/OSMF RESTFILES APIs directly from your internet browser with a URL, for example,

    https://your.server:securezosmfport/zosmf/restfiles/ds?dslevel=userid.**

    where the *securezosmfport* is 443 by default. You can verify the port number by checking the *izu.https.port* variable assignment in the z/OSMF `bootstrap.properties` file.

    You might get error message IZUG846W, which indicates that a cross-site request forgery (CSRF) was attempted. To resolve the issue, update your browser by adding the `X-CSRF-ZOSMF-HEADER` HTTP custom header to every cross-site request. This header can be set to any value or an empty string (""). For details, see the z/OSMF documentation. If calling the z/OSMF RESTFILES API directly fails, fix z/OSMF before explorer server can use these APIs successfully.

    **Tip:** The z/OSMF installation step of creating a valid IZUFPROC procedure in your system PROCLIB might be missed. For more information, see the [z/OSMF Configuration Guide](https://www-01.ibm.com/servers/resourcelink/svc00100.nsf/pages/zOSV2R3sc278419?OpenDocument).

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

If the explorer server cannot connect to the z/OSMF server, check the following item:

By default, the explorer server communicates with the z/OSMF server on the localhost address. If your z/OSMF server is on a different IP address to the explorer server, for example, if you are running z/OSMF with Dynamic Virtual IP Addressing (DVIPA), you can change this by adding a `ZOSMF_HOST` parameter to the `server.env` file. For example: `ZOSMF_HOST=winmvs27`.

## Troubleshooting installing Zowe CLI
The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior using Zowe CLI.

### `npm install -g `Command Fails Due to an EPERM Error

**Valid on Windows**

**Symptom:**

This behavior is due to a problem with Node Package Manager (npm). There
is an open issue on the npm GitHub repository to fix the defect.

**Solution:**

If you encounter this problem, some users report that repeatedly
attempting to install Zowe CLI yields success. Some users also
report success using the following workarounds:

  - Issue the `npm cache clean` command.

  - Uninstall and reinstall Zowe CLI. For more information,
    see [Install Zowe CLI](cli-installcli.md).

  - `Add the --no-optional` flag to the end of the `npm install` command.

### `Sudo` syntax required to complete some installations

**Valid on Linux**

**Symptom:** 

The installation fails on Linux. 

**Solution:**

Depending on how you configured Node.js on Linux or Mac, you might need
to add the prefix `sudo `before the `npm install -g` command or the `npm
uninstall -g` command. This step gives Node.js write access to the
installation directory.


### `npm install -g` command fails due to `npm ERR! Cannot read property 'pause' of undefined` error

**Valid on Windows or Linux**

**Symptom:**

You receive the error message `npm ERR! Cannot read property 'pause' of undefined` when you attempt to install the product. 

**Solution:**

This behavior is due to a problem with Node Package Manager (npm). If
you encounter this problem, revert to a previous version of npm that
does not contain this defect. To revert to a previous version of npm,
issue the following command:
```
npm install npm@5.3.0 -g
```

### Node.js commands do not respond as expected

**Valid on Windows or Linux**

**Symptom:**

You attempt to issue node.js commands and you do not receive the expected  output.

**Solution:**

There might be a program that is named *node* on your path. The Node.js installer automatically adds a program that is named *node* to your path. When there are pre-existing programs that are named *node* on your computer, the program that appears first in the path is used. To correct this behavior, change the order of the programs in the path so that Node.js appears first.

### Installation fails on Oracle Linux 6

**Valid on Oracle Linux 6**

**Symptom:**

You receive error messages when you attempt to install the product on an
Oracle Linux 6 operating system. 

**Solution:**

Install the product on Oracle Linux 7 or another Linux or Windows OS. Zowe CLI is not compatible with Oracle Linux 6.
