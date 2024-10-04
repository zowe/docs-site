# Gathering Information for Support or Troubleshooting

If you need to contact a support group for Zowe, they will likely need a variety of information from you to help you. This page details a list of items you should gather to the best of your ability to provide to your support group. You may also find this list useful for independent troubleshooting.

## Describe your environment

* Zowe version number: 
* Install method (pax, smpe, kubernetes, github clone):
* Operating system (z/OS, kubernetes, etc) and OS version:
* Node.js version number (Shown in logs, or via `node --version`):
* Java version number (Shown in logs, or via `java -version`):
* z/OSMF version:
* Browser:
* Are you accessing the Desktop from the APIML Gateway? (Recommended):
* What is the output of log message ZWES1014I:
* Environment variables in use:

### Tips on gathering this information

A lot of this information can be gathered automatically using the `zwe` command `zwe support`.
Otherwise, you can gather some of the information in the ways below.

#### z/OS release level

To find the z/OS release level, issue the following command in SDSF:  

```
/D IPLINFO
```

#### Zowe version

Locate the file `manifest.json` within the zowe installation directory.
At the top, you will find the version number.



## Describe your issue

Do you think your issue is a bug? If so, try to list the steps to reproduce it, and what you expect to happen instead.

## Provide the logs

When running Zowe servers on z/OS, the joblog has the most information.
Depending on what support group you are contacting, you may want to sanitize the logs as they can contain basic system information like hostnames, usernames, and network configuration.

Ensure that your logs were captured with long enough record length to be read by support. Zowe commonly writes lines as long as 500 characters, especially when tracing.

### Enabling debugging and tracing

There are several debug modes in the Zowe servers, and support groups may ask for you to turn some on.
Below are some tracing you can turn on when needed:

* When running a `zwe` command, you can run it with `--trace` to get the most output from it.
* `zwe` startup tracing can be set via the zowe configuration file property `zowe.launchScript.logLevel="trace"`. [You can see the property in the example file here](https://github.com/zowe/zowe-install-packaging/blob/677a607686e6ee7ecb349dc5925a6f58dd9e61da/example-zowe.yaml#L356)
* app-server tracing can be enabled by setting various loggers in the property `components.app-server.logLevels` in the zowe configuration file. [The full list is documented here](https://github.com/zowe/zlux-app-server/blob/v2.x/master/schemas/app-server-config.json#L442). [More information](../../user-guide/mvd-configuration#logging-configuration)
* zss-tracing tracing can be enabled by setting various loggers in the property `components.zss.logLevels` in the zowe configuration file. [The full list is documented here](https://github.com/zowe/zss/blob/v2.x/master/schemas/zss-config.json#L251). [More information](../../user-guide/mvd-configuration#logging-configuration) 
* discovery, gateway, api-catalog and other servers can have tracing enabled by setting `debug: true` within their zowe configuration file section, such as `components.gateway.debug=true`

You may find more detail within the Mediation Layer and Application Framework troubleshooting categories.

## Screenshots

If you have an issue in the browser, its often helpful to show the issue via screenshots.




