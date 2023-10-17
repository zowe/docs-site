# Configuring security checklist

During the initial installation of Zowe server-side components, it is necessary for your organization's security administrator to perform a range of tasks that require elevated security permissions. As a security administrator, follow the procedures outlined in this checklist to configure Zowe and your z/OS system to run Zowe with z/OS.

**Tip:** We recommend that you consult with your security administrator who has the necessary permissions to perform the following security configuration procedures. 

## Validate and re-run `zwe init` commands

**Important!** During installation, the system programmer customizes values in the zowe.yaml file. However, due to insufficient permissions of the system programmer, the `zwe init security` command fails without notification. 

<!-- ADD INSTRUCTIONS FOR HOW THE SECURITY ADMIN CHECKS FOR FAILED RUNS OF zwe init. -->

<!-- ADD PROCEDURE FOR RE-RUNNING THE `zwe init security` COMMAND -->

## Initialize Zowe security configurations

Choose from the following methods to initialize Zowe security configurations:

* Configuring with `zwe init security`
* Configuring with `ZWESECUR` JCL

For more information about both of these methods, see [Initialize Zowe security configurations](./initialize-security-configuration.md).

## Perform APF authorization of load libraries

Zowe contains load modules that require access to make privileged z/OS security manager calls. These load modules are held in two load libraries which must be APF authorized. For more information about how to issue the `zwe init apfauth` command to perform APF authority commands, see [Make z/OS security manager calls with APF authority commands](./apf-authorize-load-library.md).

## Configure the z/OS system for Zowe

Review and perform z/OS configuration steps based on your settings. For a detailed table of configuration procedures and associated purposes for performing these procedures, see [Configuring the z/OS system for Zowe](./configure-zos-system.md).

## Configure address space job naming

The user ID ZWESVUSR that is associated with the Zowe started task must have `READ` permission for the `BPX.JOBNAME` profile in the `FACILITY` class. For more information about permitting user to activate the `FACILITY` class for this profile, see [Configuring addrss space job naming](./configure-zos-system/#configure-address-space-job-naming).

## Assign security permissions of users

Assign users (ZWESVUSR and ZWESIUSR) and the ZWEADMIN security group permissions required to perform specific tasks. For more information see, [Assign security permissions to users]().







 