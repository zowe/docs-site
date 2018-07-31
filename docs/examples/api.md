# API extension sample

Users can connect with and create their own API's within the Zowe environment. In this section we will create an API to expose environmental variables.

## Adding a REST API to Zowe

#### Github Sample Code: [atlas-jzos-sample](https://github.com/gizafoundation/atlas-jzos-sample)

### To Install

After creating or obtaining the REST API war file:

1.  Stop the Zowe server.

    - Navigate to `<zowe_base>/scripts/`
    - Run `./zoe-stop.sh`

2.  Push the war file up to the dropins folder using SCP, SFTP, or on Windows with Putty SCP (PSCP).
    - _EX_:
      `scp /path/to/warfile <usrID>@<serverLocation>:<zoe_base>/explorer-server/wlp/usr/servers/Atlas/dropins/`

::: tip
Use the USS, IDZ, or IBM Explorer for z/OS to confirm that your files have transferred.
:::

3.  Restart the Zowe server.

    - Navigate to `<zowe_base>/scripts/`
    - Run `./zoe-start.sh`

### Verify Install

1.  Check the Browser to see if the REST APIs have been added.
    - _EX_: `<base>:<yourport>/ibm/api/explorer/#/`
