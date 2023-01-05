# Zowe lifecycle

This topic describes the lifecycle of Zowe core components and how an offering that provides a Zowe extension can set up lifecycle for their component.  

The Zowe UNIX System Services (USS) components are run as part of the started task `ZWESVSTC`. For more information, see [Starting Zowe from a USS shell](../user-guide/configure-zowe-server.md#option-1-starting-zowe-from-a-uss-shell). There are two key USS directories that play different roles when launching Zowe.  

- The Zowe runtime directory `<RUNTIME_DIR>` that contains the executable files is an immutable set of directories and files that are replaced each time a new release is applied.  The initial release or an upgrade is installed either with UNIX shell scripts (see [Installing Zowe runtime from a convenience build](../user-guide/install-zowe-zos-convenience-build.md)), or SMP/E where the runtime directory is laid down initially as FMID AZWE001 and then upgraded through rollup PTF builds (see [Installing Zowe SMP/E](../user-guide/install-zowe-smpe.md)).  The Zowe runtime directory is not altered during operation of Zowe, so no data is written to it and no customization is performed on its contents.  

- The Zowe instance directory `<INSTANCE_DIR>` contains information that is specific to a launch of Zowe.  It contains configuration settings that determine how an instance of the Zowe server is started, such as ports that are used or paths to dependent Java and Node.js runtimes.  The instance directory also contains log directory where different 'microservices' write trace data for diagnosis, as well as a workspace and shell scripts to start and stop Zowe.  More than one Zowe instance directory can be created to allow multiple launches of a Zowe runtime, each one isolated from each other and starting Zowe depending on how the instance directory has been configured. For more information, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md).

To start Zowe, the script `<INSTANCE_DIR>/bin/zowe-start.sh` is run from a USS shell.  This uses a REXX program to launch the started task `ZWESVSTC`, passing the instance directory path as a parameter.  It is the equivalent of using the TSO command `/S ZWESVSTC,INSTANCE='<INSTANCE_DIR>',JOBNAME='<JOBNAME>'`.  The `ZWESVSTC` PROCLIB uses the program that creates a USS process and starts the script `<INSTANCE_DIR>/bin/internal/run-zowe.sh`.  By using `BPXATSL` to start the USS process, all of the address spaces started under this shell are managed by SDSF.  If the `zowe-start.sh` run `run-zowe.sh` directly, the USS processes will not run as a started task and will run under the user ID of whoever ran the `run-zowe.sh` script rather than the Zowe user ID of `ZWESVUSR`, likely leading to permission errors accessing the contents of the `<RUNTIME_DIR>` as well as the Zowe certificate. For these reasons, the `zowe-start.sh` script launches Zowe's USS process beneath the started task `ZWESVSTC`.  

When `run-zowe.sh` is run in the USS shell that `BPXBATSL` creates, it executes the file `<INSTANCE_DIR>/instance.env`.  This file sets a number of shell variables, such as `ROOT_DIR` that points to the directory with the `<RUNTIME_DIR>`, variables for all of the ports used by the Zowe components, and other configuration data. For more information, see [Reviewing the instance.env file](../user-guide/configure-instance-directory.md#reviewing-the-instance.env-file).

## Zowe components

Zowe consists of a series of 'microservices' or components.  Each component is its own USS directory, which contains its executable files. Within each component's USS directory, a `bin` directory contains scripts that are used for the lifecycle of the component.  When Zowe is started, it identifies the components that are configured to launch and then execute the scripts of those components in the cycle of [validate](#validate), [configure](#configure), and [start](#start).  All components are validated, then all are configured, and finally all are started.  This technique is used as follows: 
- Used for the base Zowe components that are included with the core Zowe runtime.
- Applies to extensions to allow vendor offerings to be able to have the lifecycle of their 'microservices' within the Zowe USS shell and be included as address spaces under the `ZWESVSTC` started task.

### Validate

Each component is asked to validate itself with a call to its `/bin/validate.sh` script.  This script is optional.  

If present, the `validate.sh` script performs tasks such as:
- Check that the shell has the correct prerequisites.
- Validate that ports are available.
- Perform other steps to ensure that the component is able to be launched successfully.

During execution of the `validate.sh` script, if an error is detected, then a component should echo a message that contains information to assist a user diagnosing the problem.

If you are a Zowe administrator, you might want to check whether all the component validation checks of the Zowe installation pass without starting any of the components. To do this, you can add `VALIDATE_ONLY=true` to the `instance.env` file. Then, Zowe will not be launched after the validation stage.

### Configure

Each component is asked to configure itself with a call to its `/bin/configure.sh` script.  This script is optional.  

An example configuration step is if a component wants to install applications into the Zowe desktop as iframes, or add API endpoints statically into the API Mediation Layer.  Because a component's `configure.sh` script is run inside the USS shell that the `instance.env` has initialized, it will have all of the shell variables for prerequisites set, so the configure step can be used to query these in order to prepare the component ready for launch.  

### Start

Each component is asked to start itself with a call to its `/bin/start.sh` script.  This script is mandatory because without it, the component will not be launched.

It is up to each component to start itself based on how it has been written.  We recommend that any variables that someone who configure Zowe may need to vary, such as timeout values, port numbers, or similar, are specified as variables in the `instance.env` file and then referenced as shell variables in the `start.sh` script to be passed into the component runtime.

## Zowe core components

The Zowe runtime directory delivers its 'microservices' as components that follow the lifecycle of validate, configure, and start.  To understand the type of steps that these scripts perform, you can look at the `<RUNTIME_DIR>/components/` directory. For each of the base Zowe components, look at their `/bin` directories and the scripts they contain.

```
<RUNTIME_DIR>/components/
  /api-mediation
  /app-server
  /explorer-jes
  /explorer-mvs
  /files-api
  /jobs-api
```

**Note:**

The scripts of core Zowe components use the helper library `<RUNTIME_DIR>/scripts/utils`.  Currently, these are not publicly supported. Future releases of Zowe might provide these as supported system programming interfaces (SPIs) and include their usage in the Zowe documentation.  

## Zowe extensions

If you want to set up a lifecycle for your Zowe extension, you must provide your own directory that contains your Zowe lifecycle scripts `start.sh`, and optionally `validate.sh` and `configure.sh`.

The `instance.env` file in the `<INSTANCE_DIR>` used to launch Zowe contains the variable `EXTENDER_COMPNENTS` whose value is a semi-colon separated list of fully qualified directory paths that contain extender lifecycle scripts.

**Example:**

Vendor MYVENDOR has a product MYAPP that installs into `/usr/lpp/myvendor/myapp`.  This product is a Zowe extension so they want it to be started and stopped with Zowe and run as an address space under the `ZWESVSTC` in the Zowe USS shell.   

The script `/usr/lpp/myvendor/myapp/zowe/validate.sh` checks that the environment has been configured correctly and the script `/usr/lpp/myvendor/myapp/zowe/start.sh` starts the vendor application.

The installation documentation for MYAPP instructs the system programmer to update the `instance.env` file and update the `EXTENDER_COMPONENTS` variable to point to the fully qualified path of the directory that contains the Zowe lifecycle scripts.

```
EXTENDER_COMPONENTS='/usr/lpp/myvendor/myapp/zowe'
```

When the Zowe instance is launched by running `<INSTANCE_DIR>/bin/zowe-start.sh`, this will call the `/usr/lpp/myvendor/myapp/zowe/start.sh` script and the started task will create an address space under `ZWESVSTC` for the vendor component.  When the Zowe instance is stopped, the address space is terminated.

## Sample extensions

### Sample Zowe API extension

The repository [https://github.com/zowe/sample-node-api](https://github.com/zowe/sample-node-api) contains a sample Zowe extension with a node server providing sample APIs for looking at cars in a dealership. For more information, see [sample-node-api](https://github.com/zowe/sample-node-api/blob/master/README.md).  

The [configure.sh](https://github.com/zowe/sample-node-api/blob/master/bin/configure.sh) script statically registers the API into the API Mediation Layer as well as a tile that includes the Swagger definitions into the API Catalog.

### Sample Zowe Desktop and API Catalog extension

The repository [https://github.com/zowe/sample-trial-app](https://github.com/zowe/sample-trial-app) contains a sample Zowe extension with a node server providing a web page that gives a user interface to the APIs included with the API sample above.  

The [configure.sh](https://github.com/zowe/sample-trial-app/blob/master/bin/configure.sh) script installs a web page into the Zowe Desktop by using the utility script `<RUNTIME_DIR>/bin/utils/zowe-install-iframe-plugin.sh`.  The [configure.sh](https://github.com/zowe/sample-trial-app/blob/master/bin/configure.sh) script also installs a tile into the API Mediation Layer's API Catalog.

