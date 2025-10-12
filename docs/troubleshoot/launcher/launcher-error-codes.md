# Error Message Codes

The following error message codes may appear on Zowe Launcher SYSPRINT. Use the following message code references and the corresponding reasons and actions to help troubleshoot issues.

## Zowe Launcher informational messages

### ZWEL0001I

  component %s started

  **Reason:**

  The component `<component-name>` was started.

  **Action:**

  No action required.

### ZWEL0002I

  component %s stopped

  **Reason:**

  The component `<component-name>` was stopped.

  **Action:**

  No action required.

### ZWEL0003I

  new component initialized %s, restart_cnt=%d, min_uptime=%d seconds, share_as=%s

  **Reason:**

  The component `<component-name>` was initialized.
  - `restart_cnt` - The number of attempts to restart the component in case of failure
  - `min_uptime` - The minimum uptime that the component can be considered as successfully started
  - `share_as` - One of the following values: `<yes|no|must>`. The value indicates whether child processes of the component start in the same address space. For details, see [_BPX_SHAREAS](https://www.ibm.com/docs/en/zos/2.4.0?topic=shell-setting-bpx-shareas-bpx-spawn-script) in the IBM documentation. 

  **Action:**

  No action required.

### ZWEL0004I

  component %s(%d) terminated, status = %d

  **Reason:**

  The component `<component-name>`(`<process-id>`) terminated with the status `<code>`.

  **Action:**

  No action required.

### ZWEL0005I

  next attempt to restart component %s in %d seconds

  **Reason:**

  Next attempt to restart component `<component-name>` in `<n>` seconds.

  **Action:**

  No action required. The component `<component-name>` will be restarted in `<n>` seconds.

### ZWEL0006I

  starting components

  **Reason:**

  Starting the components.

  **Action:**

  No action required.

### ZWEL0007I

  components started

  **Reason:**

  The components are started.

  **Action:**

  No action required.

### ZWEL0008I

  stopping components

  **Reason:**

  Stopping the components.

  **Action:**

  No action required.

### ZWEL0009I

  components stopped

  **Reason:**

  The components are stopped.

  **Action:**

  No action required.

### ZWEL0010I

  launcher has the following components:

  **Reason:**

  The launcher has the following components.

  **Action:**

  No action required.

### ZWEL0011I

  name = %16.16s, PID = %d

  **Reason:**

  Name = `<component-name>`, PID = `<process-id>`.

  **Action:**

  No action required.

### ZWEL0012I

  starting console listener

  **Reason:**

  Starting the console listener.

  **Action:**

  No action required.

### ZWEL0013I

  command \'%s\' received

  **Reason:**

  The command `<command>` was received.

  **Action:**

  No action required.

### ZWEL0014I

  termination command received

  **Reason:**

  The termination command was received.

  **Action:**

  No action required.

### ZWEL0015I

  console listener stopped

  **Reason:**

  The console listener was stopped.

  **Action:**

  No action required.

### ZWEL0016I

  start component list: '%s'

  **Reason:**

  Start the component list `<component-list>`

  **Action:**

  No action required.

### ZWEL0017I

  ROOT_DIR is '%s'

  **Reason:**

  The ROOT_DIR (`zowe.runtimeDirectory`) is `<zowe-runtime-directory>`

  **Action:**

  No action required.

### ZWEL0018I

  Zowe instance prepared successfully

  **Reason:**

  Zowe instance prepared successfully.

  **Action:**

  No action required.

### ZWEL0019I

  Zowe Launcher stopping

  **Reason:**

  Zowe Launcher is stopping.

  **Action:**

  No action required.

### ZWEL0021I

  Zowe Launcher starting

  **Reason:**

  Zowe Launcher is starting.

  **Action:**

  No action required.

### ZWEL0022I

  Zowe Launcher stopped

  **Reason:**

  Zowe Launcher was stopped.

  **Action:**

  No action required.

### ZWEL0023I

  Zowe YAML config file is \'%s\'

  **Reason:**

  Zowe YAML config file is `<path-to-zowe-yaml>`.

  **Action:**

  No action required.

### ZWEL0024I

  HA_INSTANCE_ID is '%s'

  **Reason:**

  The HA_INSTANCE_ID name is `<ha-instance-name>`.

  **Action:**

  No action required.

### ZWEL0025I

  restart_intervals for component '%s'= %s

  **Reason:**

  Restart intervals for component `<component-name>` = `<restart-intervals>.`
  Restart intervals is defined in `zowe.launcher.restartIntervals`.

  **Action:**

  No action required.

### ZWEL0058I

  WORKSPACE_DIR is '%s'

  **Reason:**

  The WORKSPACE_DIR (`zowe.workspaceDirectory`) is `<path-to-workspace-dir>`.

  **Action:**

  No action required.

### ZWEL0069I

  Configuration is valid

  **Reason:**

  The configuration is valid.

  **Action:**

  No action required.


## Zowe Launcher error messages

### ZWEL0026E

  %s env variable not found

  **Reason:**

  The environmental variable `<variable-name>` was not found.

  **Action:**

  In launcher's STC, under `DD` statement `STDENV`, review the `<variable-name>`.

### ZWEL0027E

  %s env variable too large

  **Reason:**

  `<variable-name>` environmental variable is too large.

  **Action:**

  In launcher's STC, under `DD` statement `STDENV`, review the `<variable-name>`.

### ZWEL0028E

  failed to get component list

  **Reason:**

  Failed to get the component list.

  **Action:**

  Review the components defined in the configuration (identified by message `ZWEL0023I`).

### ZWEL0029E

  start component list is empty

  **Reason:**

  Start component list is empty.

  **Action:**

  Review the components defined in the configuration (identified by message `ZWEL0023I`).

### ZWEL0030E

  failed to prepare Zowe instance

  **Reason:**

  Failed to prepare the zowe instance.

  **Action:**

  Check previous messages in the Zowe Launcher `SYSPRINT` to find the reason and correct it.

### ZWEL0031E

  failed to setup signal handlers

  **Reason:**

  Failed to setup signal handlers.

  **Action:**

  Contact Support.

### ZWEL0032E

  failed to find %s='%s', check if the dir exists

  **Reason:**

  Failed to find `<dir-type>`=`<dir-path>`, check if the directory exists.

  **Action:**

  Verify `<dir-type>` is correctly defined in configuration (identified by message `ZWEL0023I`).

### ZWEL0033E

  failed to get ROOT_DIR dir

  **Reason:**

  Failed to get ROOT_DIR (`zowe.runtimeDirectory`).

  **Action:**

  Review `zowe.runtimeDirectory` defined in configuration (identified by message `ZWEL0023I`).

### ZWEL0034E

  ROOT_DIR is empty string

  **Reason:**

  ROOT_DIR (`zowe.runtimeDirectory`) is empty string.

  **Action:**

  Review `zowe.runtimeDirectory` defined in configuration (identified by message `ZWEL0023I`).

### ZWEL0035E

  invalid command line arguments, provide HA_INSTANCE_ID as a first argument

  **Reason:**

  Invalid command line arguments, provide `<HA_INSTANCE_ID>` as a first argument.

  **Action:**

  Review the command and provide `<HA_INSTANCE_ID>` as a first argument.

### ZWEL0036E

  failed to initialize launcher context

  **Reason:**

  Failed to initialize launcher context.

  **Action:**

  Contact support.

### ZWEL0037E

  max component number reached, ignoring the rest

  **Reason:**

  Maximal number of components reached, ignoring the rest.

  **Action:**

  Review the components defined in configuration (identified by message `ZWEL0023I`).

### ZWEL0038E

  failed to restart component %s, max retries reached

  **Reason:**

  The component `<component-name>` terminates, and the start limit of the launcher has been reached,
  thereby preventing component restart. 

  **Action:**

  Review the logs to determine the cause of component terminations.
  When the problem has been corrected, restart the main Zowe task or 
  restart the component manually, to continue using the component.
  For more information on restarting Zowe or individual components, 
  see [Starting and stopping Zowe](https://docs.zowe.org/stable/user-guide/start-zowe-zos).

### ZWEL0039E

  cannot start component %s - already running

  **Reason:**

  Cannot start the component `<component-name>` because it is already running.

  **Action:**

  No action required.

### ZWEL0040E

  failed to start component %s

  **Reason:**

  Failed to start the component `<component-name>`.

  **Action:**

  Review the component defined in configuration (identified by message `ZWEL0023I`).

### ZWEL0041E

  bad value supplied, command ignored

  **Reason:**

  Bad value for the command supplied, such command is ignored.

  **Action:**

  Review the command.

### ZWEL0042E

  command not recognized

  **Reason:**

  Command not recognized.

  **Action:**

  Review the command.

### ZWEL0043E

  failed to start console thread

  **Reason:**

  Failed to start the console thread.

  **Action:**

  Contact support.

### ZWEL0044E

  failed to stop console thread

  **Reason:**

  Failed to stop the console thread.

  **Action:**

  Contact support.

### ZWEL0045E

  error converting zowe.yaml file - %s

  **Reason:**

  Error converting zowe.yaml file - `<path-to-zowe-yaml>`.

  **Action:**

  Contact support.

### ZWEL0046E

  error reading zowe.yaml file - %s

  **Reason:**

  There is an error while reading zowe.yaml file - `<path-to-zowe.yaml>`

  **Action:**

  Contact support.

### ZWEL0047E

  failed to parse zowe.yaml - %s

  **Reason:**

  Failed to parse the zowe.yaml - `<path-to-zowe-yaml>`.

  **Action:**

  Verify that the YAML has no syntax errors.

### ZWEL0048E

  failed to open zowe.yaml - %s: %s

  **Reason:**

  Failed to open zowe.yaml - `<path-to-zowe-yaml>`:?

  **Action:**

  Verify if the YAML provided exists and the user running Zowe has permission to read it.

### ZWEL0049E

  failed to restart component %s

  **Reason:**

  Failed to restart the component `<component-name>`.

  **Action:**

  Contact support.

### ZWEL0050E

  cannot read output from comp %s(%d) - %s

  **Reason:**

  Cannot read the output from component `<component-name>` (`<process-id>`) - `<error-text>`

  **Action:**

  Contact support.

### ZWEL0055E

  failed to create file for stdin(%s) - %s

  **Reason:**

  Failed to create the file for stdin(`<file>`) - `<error-text>`.

  **Action:**

  Contact support.

### ZWEL0056E

  failed to open file for stdin(%s) - %s

  **Reason:**

  Failed to open the file for stdin(`<file>`) - `<error-text>`.

  **Action:**

  Contact support.

### ZWEL0057E

  failed to create workspace dir '%s'

  **Reason:**

  Failed to create the workspace directory `<path-to-workspace-dir>`.

  **Action:**

  Verify that the directory is valid and the Zowe user has permission to create it.

### ZWEL0059E

  failed to get WORKSPACE_DIR dir

  **Reason:**

  Failed to get the WORKSPACE_DIR (`zowe.workspaceDirectory`) directory.

  **Action:**

  Contact support.

### ZWEL0060E

  WORKSPACE_DIR is empty string

  **Reason:**

  The WORKSPACE_DIR (`zowe.workspaceDirectory`) is empty string.

  **Action:**

  Correct the Zowe YAML to define the `zowe.workspaceDirectory` value.

### ZWEL0061E

  failed to find %s='%s', check if the file exists

  **Reason:**

  Failed to find ?=?, check if the file exists.

  **Action:**

  Contact support.

### ZWEL0062E

  failed to create dir '%s' - %s

  **Reason:**

  Failed to create the directory `<directory>` - `<error-text>`.

  **Action:**

  Review the error text to determine the action to take.

### ZWEL0064E

  failed to run command %s - %s

  **Reason:**

  Failed to run the command `<command>` - `<error-text>`.

  **Action:**

  Review the error text to determine the action to take.

### ZWEL0065E

  error reading output from command '%s' - %s

  **Reason:**

  There is an error reading the output from command `<command>` - `<error-text>`

  **Action:**

  Review the error text to determine the action to take.

### ZWEL0067E

  PARMLIB() entries must all have the same member name

  **Reason:**

  PARMLIB() entries must all have the same member name.

  **Action:**

  Review the member names are identical for all PARMLIB() entries.

### ZWEL0068E

  PARMLIB() entries must have a member name

  **Reason:**

  PARMLIB() entries must have a member name.

  **Action:**

  Review the dataset name contains the member name in PARMLIB entry.

### ZWEL0070E

  Configuration has validity exceptions:

  **Reason:**

  Configuration has validity exceptions.

  **Action:**

  Review the exceptions and correct the configuration.

### ZWEL0071E

  Internal failure during validation, please contact support

  **Reason:**

  Internal failure during validation, please contact support.

  **Action:**

  Contact support.

### ZWEL0072E

  Launcher could not load configurations

  **Reason:**

  Launcher could not load the configurations.

  **Action:**

  Review the configuration entries. A possible fix is to re-run the Zowe install and init steps due to unintented Zowe dataset content.

### ZWEL0073E

  Launcher could not load schemas, status=%d

  **Reason:**

  Launcher could not load schemas, status=`<return-code>`

  **Action:**

  For the `status=5`, locate the `zowe.runtimeDirectory` in the configuration.

  Check the `zowe.runtimeDirectory/schemas` contains four `.json` files shown below:

  ```
  manifest-schema.json
  server-common-json
  trivial-component-schema.json
  zowe-yaml-schema.json
  ```

  On occasion the error occurs because the `zowe.runtimeDirectory` is pointing to a valid directory, but one which doesn't contain a valid Zowe runtime environment is one of the first failures during a Zowe launch.

### ZWEL0074E

  Log context was not created

  **Reason:**

  The logging context was not created.

  **Action:**

  Contact support.

## Zowe Launcher warning messages

### ZWEL0051W

  failed to read zowe.yaml, launcher will use default settings

  **Reason:**

  Failed to read zowe.yaml, launcher will use default settings.

  **Action:**

  Contact support.

### ZWEL0052W

  not all components started

  **Reason:**

  Not all components were started.

  **Action:**

  No action required.

### ZWEL0053W

  not all components stopped gracefully

  **Reason:**

  Not all components were stopped gracefully.

  **Action:**

  No action required.

### ZWEL0054W

  component %s not found

  **Reason:**

  The component `<component-name>` was not found.

  **Action:**

  No action required.

### ZWEL0063W

  Component %s(%d) will be terminated using SIGKILL

  **Reason:**

  Component `<component-name>`(`<process-id>`) will be terminated using `SIGKILL`.

  **Action:**

  No action required.

### ZWEL0066W

  command '%s' ended with code %d

  **Reason:**

  The command `<command>` ended with return code `<return-code>`.

  **Action:**

  No action required.
