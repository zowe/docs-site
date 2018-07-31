# Summary of changes

Learn about what is new, changed, and removed in Project Zowe.

## Version 0.8.4 (July 2018)
### What's new

**Project Zowe**

Project Zowe now contains a component named API Mediation Layer. You install API Mediation Layer when you install the Zowe runtime on z/OS. For more information, see [API Mediation Layer](api-mediation/api-mediation-overview.md) and [Installing the Zowe runtime on z/OS](zoeinstall.md).

### What's changed
**Project naming**

  Zoe is renamed to Zowe.

**zLUX**

The mainframe account under which the ZSS server runs must have UPDATE permission on the `BPX.DAEMON` and `BPX.SERVER` facility class profiles.

**Explorer server**

The System Display and Search Facility (SDSF) of z/OS is no longer a prerequisite for installing explorer server.

****Zoe Brightside/Zowe CLI**

Zoe Brightside is renamed to Zowe CLI.

### What's removed

Removed all references to SYSLOG.

## Version 0.8.3 (June 2018)
### What's changed

**Zoe Brightside**

The following plug-ins are no longer packaged with Zoe Brightside:

  - Zoe Brightside Plug-in for CA Endevor® Software Change Manager
  - Zoe Brightside Plug-in for CA File Master™ Plus

## Version 0.8.2 (June 2018)

### What's new

**Zoe Brightside**

Zoe Brightside is now built on a framework that lets you install plug-ins to extend the capabilities of the product. You can install the following plug-ins for Zoe Brightside:

   - Zoe Brightside plug-in for CA Endevor® Software Change Manager
   - Zoe Brightside plug-in for CA File Master™ Plus
   - Zoe Brightside plug-in for IBM® Db2® Database   

   [Learn more](cli-extending.md)

   The new framework also improves the stability and quality of Zoe Brightside.

**Installation procedure**

- zLUX and explorer server installation

    - Added RACF authorization for Zoe.
    - Zoe start and stop are now available as shell scripts that you can issue from the USS command line without using TSO LOGON and SDSF.
    - You can now start and stop zLUX server, explorer server, and zSS server together.
    - The JCL for the Zoe server started task is now _automatically_ copied to a suitable PROCLIB.
    - The install script now writes a date-time-stamped log as it runs, which you can use for debugging or reference.

     [Learn more](zoeinstall-zos.md)

- Zoe Brightside installation

    You can now install Zoe Brightside using simplified and flexible installation process. You can use either of the following methods:

    - Install Zoe Brightside using the installation package that is contained on the Project Zoe Downloads repository.
    - Install Zoe Brightside using the Node.js Package Manager (npm).

    **Important!** Both of the installation methods require Internet access on client PCs.

    [Learn more](cli-installcli.md)



**zLUX**

- zLUX application plug-in definition and Configuration Dataservices

    - Information about the plug-in definition file and the zLUX application plug-in filesystem structure was added.

      [Learn more](mvd-zluxplugindefandstruct.md)

    - Information about Configuration Dataservices that enable you to set plug-in default behavior was added.

      [Learn more](mvd-configdataservice.md)

- zLUX terminal application plug-in initial configuration steps

    Steps to initially configure the zLUX terminal application plug-ins were added.

    [Learn more](mvd-configterminalappports.md)


### What's changed

**Zoe Brightside**

- **CA Brightside** was renamed to **Zoe Brightside**.


### What's removed:

**Zoe Brightside**

Experimental command groups have been removed from Zoe Brightside.

## Version 0.8.1 (May 2018)

### What's new
**VT Terminal**

  zLUX now provides a VT Terminal application plug-in that provides a connection to USS and UNIX. [Learn more](mvd-appplugins.md)

### What's changed
**Product naming**

  Project Giza is renamed to Project Zoe. Atlas is renamed to explorer server.

**Installation procedure**

  Project Zoe now provides an enhanced and simplified installation process to improve your installation experience. [Learn more](zoeinstall.md)
