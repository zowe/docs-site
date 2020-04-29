# Zowe Lifecycle

This chapter describes how core Zowe lifecycles its components, together with the steps that an offering providing a Zowe extension can participate in the lifecycle for their component.  

The Zowe Unix System Services (USS) components are run as part of the started task `ZWESVSTC`, see [Starting Zowe](../../user-guide/configure-zowe-server.md#option-1-starting-zowe-from-a-uss-shell). There are two key USS directories that play different roles when launching Zowe.  

The Zowe runtime directory `<RUNTIME_DIR>` that contains the executables and is an immutable set of directories and files that are replaced each time a new release is applied.  The initial release or an upgrade is installed either with Unix shell scripts, see [Installing Zowe runtime from a convenience build](../../user-guide/install-zowe-zos-convenience-build.md), or else SMP/E where the runtime directory is laid down initially as FMID AZWE001 and then upgraded through rollup PTF builds, see [Installing Zowe SMP/E](../../user-guide/install-zowe-smpe.md).  The Zowe runtime directory is not altered during operation of Zowe, so no data is written to it and no customization is performed on its contents.  

The Zowe instance directory contains information that is specific to a launch of Zowe.  It contains configuration settings which determine how an instance of the zowe server will be starated, such as ports used or paths to dependent Java and Node.js runtimes.  The instance directory also contains log directory where different 'microservices' write trace data for diagnosis, as well as a workspace and shell scripts to start and stop Zowe.  More than one Zowe instance directory can be created to allow multiple launches of a Zowe runtime, each one isolated from each other and starting Zowe depending on how the instance directory has been configured, see [Creating and configuring the Zowe instancen directory](../../user-guide/configure-instance-directory.md).

To start Zowe the script `<INSTANCE_DIR>/bin/zowe-start.sh` is run from a USS shell.  This uses a REXX program to launch the started task `ZWESVSTC`, passing the instance directory path as a parameter.  It is the equivalent of using the TSO command `/S ZWESVSTC,INSTANCE='<INSTANCE_DIR',JOBNAME='<JOBNAME>'`.  The `ZWESVSTC` PROCLIB uses the program `BPXBATSL` which creates a USS process and starts the script `<INSTANCE_DIR>/bin/internal/run-zowe.sh`.  By using `BPXATSL` to start the USS process all of the address spaces started under this shell are managed by SDSF.  If the `zowe-start.sh` had just ran `run-zowe.sh` directly the USS processes would b not br running as a started task and would be running under the user ID of whoever ran the `run-zowe.sh` script rather than the Zowe user ID of `ZWESVUSR`, likely leading to permission errors accessing the contents of the `<RUNTIME_DIR>` as well as the Zowe certificate. For these reasons the `zowe-start.sh` script launches Zowe's USS process beneath the started task `ZWESVSTC`.  

When `run-zowe.sh` is run in the USS shell that `BPXBATSL` has created, it executes the file `<INSTANCE_DIR>/instance.env`.  This file sets a number of shell variables, such as `ROOT_DIR` that points to the directory with the `<RUNTIME_DIR>`, variables for all of the ports used by the Zowe components, as well as other configuration data, see [Reviewing the instance.env file](../../user-guide/configure-instance-directory.md#reviewing-the-instance.env-file)

## Zowe components

Zowe is a series of 'microservices' or components.  Each component is its own USS directory which contains its executables and files. Within each component's USS directory a `bin` directory contains scripts that are used to lifecycle the component.  When Zowe is started it idenfies the components it has been configured to launch and will execute their scripts in the cycle of validate, configure and launch.  All components are validated, then all are configured, and finally all are started.  This technique is used for the base Zowe components that are included with the core Zowe runtime, but also applies to extensions to allow vendor offerings to be able to have their 'microservices' lifecycled within the Zowe USS shell and be included as address spaces under the `ZWESVSTC` started task.

### Validate

Each component is asked to validate itself, with a call to its `/bin/validate.sh` script.  This script is optional.  

If present `validate.sh` may perform tasks such as check that the shell has the correct pre-requisites, validate that ports are available, or other steps to ensure that the component is able to successfully be launched.

During execution of the `validate.sh` script if an error is detected then a component should echo a message that contains information to assist a user dianosing the problem.

There is no provision for a script that detects an during validation to stop their component being launched.  This is expected to be included in a future release of Zowe.  

### Configure

Each component is asked to configure itself, with a call to its `/bin/configure.sh` script.  This script is optional.  

An example configuration step is if a component wishes to install apps into the Zowe desktop as iframes, or API endpoints staticly into the API mediation layer.  Because a component's `configure.sh` script is run inside the USS shell that the `instance.env` has initialized, it will have all of the shell variables for pre-reqs set, so the configure step can be used to query these in order to prepare the component ready for launch.  

### Start

Each component is asked to start itself, with a call to its `/bin/start/sh` script.  This script is mandatory as without it the component will not be launched.

It is up to each component to start itself based on how it has been written.  It is encouraged that any variables that someone configuring Zowe may need to vary, such as timeout values, port numbers, or similar are specified as variables in the `instance.env` file and then referenced as shell variables in the `start.sh` script to be passed into the component runtime.

## Zowe core components

The Zowe runtime directory delivers its 'microservices' as components that follow the lifecycle of validate, configure and start.  A good way to understand the type of steps that these scripts perform is to look at the `<RUNTIME_DIR>/components/` directory and for each of the base Zowe components look at their `/bin` directories and the scripts they contain.


```
<RUNTIME_DIR>/components/
  /api-mediation
  /app-server
  /explorer-jes
  /explorer-mvs
  /files-api
  /jobs-api
```

***Note*** 
The core Zowe components's scripts make use of the helper library `<RUNTIME_DIR>/scripts/utils`.  These are not currently publicly supported and future releases of Zowe will provide these as supported system programming interfaces (SPIs) and their usage will be included in the Zowe documentation.  

## Zowe extensions

If you are providing an extension to Zowe that wishes to be lifecycled, you should provide your own directory containing your Zowe lifecycle scripts `start.sh`, and optinally `validate.sh` and `configure.sh`.

The `instance.env` file in the `<INSTANCE_DIR>` used to launch Zowe contains the variable `EXTENDER_COMPNENTS` whose value is a semi-colon separated list of fully qualified directorys paths containing extender lifecycle scripts.

***Example***
Vendor MYVENDOR has a product MYAPP that installs into `/usr/lpp/myvendor/myapp`.  This product is a Zowe extension so they wish it to be started and stopped with Zowe and run as an address space under the `ZWESVSTC` in the Zowe USS shell.   

The script `/usr/lpp/myvendor/myapp/zowe/validate.sh` checks that the environment has been configured correctly and the script `/usr/lpp/myvendor/myapp/zowe/start.sh` starts the vendor application.

The installation documentation for MYAPP instructs the system programmer to update the `instance.env` file and update the `EXTENDER_COMPONENTS` variable to point to the fully qualified path of the directory containing the Zowe lifecycle scripts.

```
EXTENDER_COMPONENTS='/usr/lpp/myvendor/myapp/zowe'
```

When the Zowe instance is launched by running `<INSTANCE_DIR>/bin/zowe-start.sh` this will call the `/usr/lpp/myvendor/myapp/zowe/start.sh` and started task will create an address space under `ZWESVSTC` for the vendor component.  When the Zowe instance is stopped the address space will be termninated.

## Sample extensions

### Sample Zowe API extension

The repository https://github.com/zowe/sample-node-api contains a sample Zowe extension with  a node server providing sample APIs for looking at cars in a dealership, see [sample-node-api](https://github.com/zowe/sample-node-api/blob/master/README.md).  The [configure.sh](https://github.com/zowe/sample-node-api/blob/master/bin/configure.sh) script statically registers the API into the API Mediation Layer as well as a tile that includes the swagger definitions into the API catalog.

### Sample Zowe Desktop and API catalog extension

The repository https://github.com/zowe/sample-trial-app contains a sample Zowe extension with a node server providing a web page that gives a user interface to the APIs included with the API sample above.  The [configure.sh](https://github.com/zowe/sample-trial-app/blob/master/bin/configure.sh) installs a web page onto the Zowe desktop using the utility script `<RUNTIME_DIR>/bin/utils/zowe-install-iframe-plugin.sh`.  The [configure.sh](https://github.com/zowe/sample-trial-app/blob/master/bin/configure.sh) also installs a tile onto the API Mediation Layer's API Catalog.

