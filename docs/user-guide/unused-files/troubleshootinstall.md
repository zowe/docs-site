# Troubleshooting the installation

Review the following troubleshooting tips if you have problems with Zowe installation.

## Troubleshooting installing Zowe runtime

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing Zowe runtime.

### Troubleshooting Zowe configuration

Once Zowe is running and the startup sequence is complete, you can check the configuration files and jobs for Zowe on your z/OS system. To do this, navigate to the runtime `$ZOWE_ROOT_DIR/scripts` directory, where *$ZOWE_ROOT_DIR* is the location of the Zowe runtime directory that contains the explorer server.  

Then run the `zowe-verify.sh` script by issuing the following command:

```
zowe-verify.sh
```

The script writes its messages to your terminal window.  The results are marked `OK`, `Info`, `Warning` or `Error`.  Correct any reported errors and restart the Zowe server.  The `zowe-troubleshoot.sh` script does not change any settings, so you can run it as often as required.

### Troubleshooting installing explorer server

If explorer server REST APIs do not function properly, check the following items:

-   Check whether your Zowe server is running.

    You can check this in the Display Active \(DA\) panel of SDSF under ISPF. The ZOWESVR started task should be running. If the ZOWESVR task is not running, start the explorer server by using the following `START` operator command:

    ```
    /S ZOWESVR
    ```

    You can also use the operator command `/D A,ZOWESVR` to verify whether the task is active, which alleviates the need for the DA panel of SDSF. If the started task is not running, ensure that your ZOWESVR procedure resides in a valid PROCLIB data set, and check the task’s job output for errors.

-   Check whether z/OSMF is running.

    Some functions of Zowe use z/OSMF REST APIs.  To test z/OSMF REST APIs you can run curl scripts from your workstation. 

    ```
    curl --user <username>:<password> -k -X GET --header 'Accept: application/json' --header 'X-CSRF-ZOSMF-HEADER: true' "https://<z/os host name>:<securezosmfport>/zosmf/restjobs/jobs?prefix=*&owner=*
    ```

    where the *securezosmfport* is 443 by default. You can verify the port number by checking the *izu.https.port* variable assignment in the z/OSMF `bootstrap.properties` file.

    `/zosmf/restjobs/jobs?prefix=*&owner=*` will return a list of the jobs.

    If z/OSMF returns jobs correctly you can test whether it is able to returns files using

    ```
    curl --user <username>:<password> -k -X GET --header 'Accept: application/json' --header 'X-CSRF-ZOSMF-HEADER: true' "https://<z/os host name>:<securezosmfport>/zosmf/restfiles/ds?dslevel=SYS1"
    ```

    If the restfiles curl statement returns a TSO SERVLET EXCEPTION error check that the the z/OSMF installation step of creating a valid IZUFPROC procedure in your system PROCLIB has been completed. For more information, see the [z/OSMF Configuration Guide](https://www-01.ibm.com/servers/resourcelink/svc00100.nsf/pages/zOSV2R3sc278419?OpenDocument).

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

### Troubleshooting installing the Zowe Application Framework

To help Zowe research any problems you might encounter, collect as much of the following information as possible and open an issue in GitHub with the collected information.

 - Zowe version and release level
 - z/OS release level
 - Job output and dump (if any)
   - Javascript console output (Web Developer toolkit accessible by pressing F12)
   - Log output from the Zowe Application Server
 - Error message codes
 - Screenshots (if applicable)
 - Other relevant information (such as the version of Node.js that is running on the Zowe Application Server and the browser and browser version).

## Troubleshooting installing Zowe CLI
The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior using Zowe CLI.

### *Command not found* message displays when issuing npm install commands

**Valid on all supported platforms**

**Symptom:**

When you issue nmp commands to install Zowe CLI, the message *command not found* displays in your CLI.

**Solution:**

The *command not found* message displays because Node.js and NPM are not installed on your computer. To correct this behavior, install Node.js and NPM and reissue the npm command to install Zowe CLI.

**More Information:** [System requirements for Zowe CLI](systemrequirements.md)

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

**Valid on Linux and macOS**

**Symptom:**

The installation fails on Linux or macOS. 

**Solution:**

Depending on how you configured Node.js on Linux or macOS, you might need to add the prefix `sudo ` before the `npm install -g` command or the `npm uninstall -g` command. This step gives Node.js write access to the installation directory.

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

