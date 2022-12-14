# Provide Liberty API Sample

:::tip Github Sample Repo:
[rest-api-jzos sample](https://github.com/zowe/rest-api-jzos-sample)
:::

This sample is a boilerplate for creating Rest API's using a liberty. For more information, visit [Creating a RestAPI with Swagger documentation using Liberty](./libertyAPI.md).

## To Install

After creating or obtaining the REST API war file:

1.  Stop the Zowe server.

    - Navigate to `<zowe_base>/scripts/`
    - Run `./zowe-stop.sh`

2.  Push the war file up to the dropins folder using SCP, SFTP, or on Windows with Putty SCP (PSCP).
    - _EX_:
      `scp /path/to/warfile <usrID>@<serverLocation>:<zowe_base>/explorer-server/wlp/usr/servers/Atlas/dropins/`

:::tip
Use the USS, IDZ, or IBM Explorer for z/OS to confirm that your files have transferred.
:::

3.  Restart the Zowe server.

    - Navigate to `<zowe_base>/scripts/`
    - Run `./zowe-start.sh`

## Verify Install

1.  Check the Browser to see if the REST APIs have been added.
    - _EX_: `<base>:<yourport>/ibm/api/explorer/#/`

<img src={require("../../images/common/SampleMicroservesLook.png").default} alt="view" align="center"/>

:::tip
Make sure to set file transfer mode to binary before the transfer.
After transferring the WAR file, check the permission on the file by running
ls -la
If the read permission is not set, turn on the read permission by running,
chmod +r javazos-sample.war
:::
