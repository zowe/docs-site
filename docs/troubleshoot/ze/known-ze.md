# Known Zowe Explorer issues

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior, using Zowe Explorer.

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