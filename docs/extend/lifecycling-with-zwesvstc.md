# Zowe server component runtime lifecycle

## Zowe runtime lifecycle

This topic describes the runtime lifecycle of Zowe core components and how an offering that provides a Zowe extension can set up runtime lifecycle for their component.  

The Zowe UNIX System Services (USS) components are run as part of the started task `ZWESVSTC`. For more information, see [Starting Zowe from a USS shell](../user-guide/configure-zowe-server.md#option-1-starting-zowe-from-a-uss-shell). There are two key USS directories that play different roles when launching Zowe.  

- The Zowe runtime directory `<RUNTIME_DIR>` that contains the executable files is an immutable set of directories and files that are replaced each time a new release is applied.  The initial release or an upgrade is installed either with UNIX shell scripts (see [Installing Zowe runtime from a convenience build](../user-guide/install-zowe-zos-convenience-build.md)), or SMP/E where the runtime directory is laid down initially as FMID AZWE001 and then upgraded through rollup PTF builds (see [Installing Zowe SMP/E](../user-guide/install-zowe-smpe.md)).  The Zowe runtime directory is not altered during operation of Zowe, so no data is written to it and no customization is performed on its contents.  

- The Zowe instance directory `<INSTANCE_DIR>` contains information that is specific to a launch of Zowe.  It contains configuration settings that determine how an instance of the Zowe server is started, such as ports that are used or paths to dependent Java and Node.js runtimes.  The instance directory also contains log directory where different 'microservices' write trace data for diagnosis, as well as a workspace and shell scripts to start and stop Zowe.  More than one Zowe instance directory can be created to allow multiple launches of a Zowe runtime, each one isolated from each other and starting Zowe depending on how the instance directory has been configured. For more information, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md).

To start Zowe, the script `<INSTANCE_DIR>/bin/zowe-start.sh` is run from a USS shell.  This uses a REXX program to launch the started task `ZWESVSTC`, passing the instance directory path as a parameter.  It is the equivalent of using the TSO command `/S ZWESVSTC,INSTANCE='<INSTANCE_DIR>',JOBNAME='<JOBNAME>'`.  The `ZWESVSTC` PROCLIB uses the program that creates a USS process and starts the script `<INSTANCE_DIR>/bin/internal/run-zowe.sh`.  By using `BPXATSL` to start the USS process, all of the address spaces started under this shell are managed by SDSF.  If the `zowe-start.sh` run `run-zowe.sh` directly, the USS processes will not run as a started task and will run under the user ID of whoever ran the `run-zowe.sh` script rather than the Zowe user ID of `ZWESVUSR`, likely leading to permission errors accessing the contents of the `<RUNTIME_DIR>` as well as the Zowe certificate. For these reasons, the `zowe-start.sh` script launches Zowe's USS process beneath the started task `ZWESVSTC`.  

When `run-zowe.sh` is run in the USS shell that `BPXBATSL` creates, it executes the file `<INSTANCE_DIR>/instance.env`.  This file sets a number of shell variables, such as `ROOT_DIR` that points to the directory with the `<RUNTIME_DIR>`, variables for all of the ports used by the Zowe components, and other configuration data. For more information, see [Reviewing the instance.env file](../user-guide/configure-instance-directory.md#reviewing-the-instance.env-file).

**Note:**

The scripts of core Zowe components and some extensions use the helper library `<RUNTIME_DIR>/bin/utils`.  Currently, these are not publicly supported. Future releases of Zowe might provide these as supported system programming interfaces (SPIs) and include their usage in the Zowe documentation.  

## Zowe component runtime lifecycle

Each Zowe component will be installed with its own USS directory, which contains its executable files. Within each component's USS directory, a `bin` directory is recommended to contain scripts that are used for the lifecycle of the component.  When Zowe is started, it identifies the components that are configured to launch and then execute the scripts of those components in the cycle of [validate](#validate), [configure](#configure), and [start](#start).  All components are validated, then all are configured, and finally all are started. This technique is used as follows: 
- Used for the base Zowe components that are included with the core Zowe runtime.
- Applies to extensions to allow vendor offerings to be able to have the lifecycle of their 'microservices' within the Zowe USS shell and be included as address spaces under the `ZWESVSTC` started task.

### Validate

Each component can optionally instruct Zowe runtime to validate itself with a USS command defined in manifest `commands.validate`. If this is not defined, for backward compatible purpose, a call to its `/bin/validate.sh` script will be executed if it exists.

If present, the `validate` script performs tasks such as:
- Check that the shell has the correct prerequisites.
- Validate that ports are available.
- Perform other steps to ensure that the component is able to be launched successfully.

During execution of the `validate` script, if an error is detected, then a component should echo a message that contains information to assist a user diagnosing the problem.

### Configure

Each component can optionally instruct Zowe runtime to configure itself with a USS command defined in manifest `commands.configure`. If this is not defined, for backward compatible purpose, a call to its `/bin/configure.sh` script will be executed if it exists.

If the component has manifest defined, some configure actions will be performed automatically based on manifest definition:

- `apimlServices.static`: Zowe runtime will automatically parse and add your static definition to API Mediation Layer.

For backward compatible purpose, you can choose to configure component by yourself with `/bin/configure.sh`. An example configuration step is if a component wants to install applications into the Zowe desktop as iframes, or add API endpoints statically into the API Mediation Layer.  Because a component's `configure.sh` script is run inside the USS shell that the `instance.env` has initialized, it will have all of the shell variables for prerequisites set, so the configure step can be used to query these in order to prepare the component ready for launch.  

### Start

Each component can optionally instruct Zowe runtime to start itself with a USS command defined in manifest `commands.start`. If this is not defined, for backward compatible purpose, a call to its `/bin/start.sh` script will be executed if it exists. If your component is not supposed to be started by itself, for example, the component is a shared library, you can skip this instruction.

It is up to each component to start itself based on how it has been written.  We recommend that any variables that someone who configure Zowe may need to vary, such as timeout values, port numbers, or similar, are specified as variables in the `instance.env` file and then referenced as shell variables in the `start.sh` script to be passed into the component runtime.
