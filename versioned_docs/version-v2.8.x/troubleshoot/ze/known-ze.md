# Known Zowe Explorer issues

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior when using Zowe Explorer.

## Bidirectional languages

Files written in languages primarily read from right to left (Arabic, Hebrew, many Asian languages) can include portions of text that are written and read left to right, such as numbers.

These bidirectional (BiDi) languages are not currently supported in Visual Studio Code. See [Issue #86667](https://github.com/microsoft/vscode/issues/86667) for more information.

As a result, VS Code extensions like Zowe Explorer, Zowe Explorer CICS Extension, and Zowe Explorer FTP Extension are not able to support BiDi languages in files.

## Data Set Creation Error

**Symptom:**

Data set creation fails.

**Sample message:**

Error running command zowe.createDataset: z/OSMF REST API Error: http(s) request error event called Error: self signed certificate in certificate chain. This is likely caused by the extension that contributes zowe.createDataset.

**Solution:**

Set the value of the Reject-Unauthorized parameter to `false`. Use the profile edit function to change profile's parameters.

## Opening Binary Files Error

**Symptom:**

When opening a binary file, an error message appears.

**Sample messages:**

```
Cannot open file:
///Users/userID/.vscode/extensions/zowe-vs.code-extension-for-zowe-1.8.0/resources/temp/binaryfilename.
Detail: File seems to be binary and cannot be opened as text
```

```
Error running command zowe.editMember:
cannot open file:
///Users/userID/.vscode/extensions/zowe-vs.code-extension-for-zowe-1.8.0/resources/temp/binaryfilename.
Detail: File seems to be binary and cannot be opened as text. This is likely caused by the extension that contributes zowe.editMember.
```

**Solution:**

There is no solution or workaround at this time.

## Theia Mainframe Connection Error

**Symptom:**

When performing an action that requires a mainframe connection (such as searching for data sets), you get a proxy error.

**Sample message:**

"z/OSMF REST API Error" that includes the message `Failed to establish a socket connection to proxies`, as in the following image:

![Proxy Support set to off](../../images/ze/ZE-socket-connection-error.png)

**Solution:**

In Theia settings, search for `proxy` and change the http.proxySupport setting to `off`, as in the following image:

![Proxy Support set to off](../../images/ze/ZE-proxy-support-off.png)
