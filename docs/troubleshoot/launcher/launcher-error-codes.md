# Error Message Codes

The following error message codes may appear on Zowe Launcher SYSPRINT. Use the following message code references and the corresponding reasons and actions to help troubleshoot issues.

## Zowe Launcher informational messages

### ZWEL0001I

  component %s started

  **Reason:**

  Component `<component-name>` started.

  **Action:**

  No action required.

### ZWEL0002I

  component %s stopped

  **Reason:**

  Component `<component-name>` stopped.

  **Action:**

  No action required.

### ZWEL0003I

  new component initialized %s, restart_cnt=%d, min_uptime=%d seconds, share_as=%s

  **Reason:**

  Component `<component-name>` initialized.
  - `restart_cnt` - Number of attempts to restart the component in case of failure
  - `min_uptime` - Minimum uptime that the component can be considered as successfully started
  - `share_as` - One of `<yes|no|must>` which indicates whether child processes of the component start in the same address space. See documentation for [_BPX_SHAREAS](https://www.ibm.com/docs/en/zos/2.4.0?topic=shell-setting-bpx-shareas-bpx-spawn-script) for details.

  **Action:**

  No action required.

### ZWEL0004I

  component %s\(%d\) terminated, status = %d

  **Reason:**

  Component `<component-name>`(`<pid>`) terminated with status `<code>`.

  **Action:**

  No action required.

### ZWEL0005I

  next attempt to restart component %s in %d seconds

  **Reason:**

  Component failure detected.

  **Action:**

  No action required. The component `<component-name>` will be restarted in `<n>` seconds.

## Zowe Launcher error messages

### ZWEL0030E

  failed to prepare Zowe instance

  **Reason:**

  Failed to prepare the Zowe high availability (HA) instance.

  **Action:**

  Check previous messages in the Zowe Launcher SYSPRINT to find the reason and correct it.

### ZWEL0038E

  failed to restart component %s, max retries reached

  **Reason:**

  Maximum retries reached for restarting component `<component-name`>.

  **Action:**

  Check `<component-name>` configuration and correct the maximum restart count via configuration attribute `restartIntervals` if needed, then restart the component by using z/OS MODIFY command `F ZWESLSTC,APPL=STOP(<component-name>)`

### ZWEL0040E

  failed to start component %s

  **Reason:**

  Failed to start component `<component-name>`.

  **Action:**

  Check `<component-name>` configuration and correct if needed, then either 1) start the component manually by using z/OS MODIFY command `F ZWESLSTC,APPL=STOP(<component-name>)` or 2) restart the entire HA instance

### ZWEL0047E

  failed to parse zowe.yaml - %s

  **Reason:**

  Failed to parse Zowe configuration file.

  **Action:**

  Validate the format of Zowe configuration file. It should be a valid YAML file following specifications defined in https://yaml.org/.

### ZWEL0073E

  Launcher Could not load schemas, status=5

  **Reason:**

  The Zowe Launcher was able to locate the runtime directory, but unable to find the /schemas directory.  

  **Action:**

  Locate the runtimeDirectory from the `zowe.yaml` variable `runtimeDirectory: "<PATH_TO_RUNTIME>"`.

  Check that there is a `<PATH_TO_RUNTIME>/schemas` directory. This should contain four `.json` files shown below. 

  ```
  manifest-schema.json
  server-common-json
  trivial-component-schema.json
  zowe-yaml-schema.json
  ```

  On ocassion the error occurs because the `runtimeDirectory` is pointing to a valid directory, but one which doesn't contain a valid Zowe runtime environment is one of the first failures during a Zowe launch.
