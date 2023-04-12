# Troubleshooting Zowe Explorer

As a Zowe Explorer user, you may encounter problems when using Visual Studio Code extension functions. Review Zowe Explorer known issues and troubleshooting solutions here.

## Before reaching out for support

1. Is there already a GitHub issue (open or closed) that covers the problem? Check [Zowe Explorer Issues](https://github.com/zowe/vscode-extension-for-zowe/issues).
2. Review the current list of [Known issues](known-ze.md) in documentation. Also, try searching using the Zowe Docs search bar.
3. Collect the following information to help diagnose the issue:
    - Zowe Explorer and Visual Studio Code versions installed.
    - Node.js and NPM versions installed.
    - Whether you have Zowe CLI and the Secure Credential Store (SCS) Zowe CLI plug-in installed.

      **Note:** Zowe CLI V2 does not require the SCS plug-in to manage security.  Security is now managed by Zowe CLI core functionality.  

    - Your operating system.
    - Zowe Logs, which usually, can be found in `C:\Users\userID\.zowe\zowe\logs`.

Use [the Slack channel](https://app.slack.com/client/T1BAJVCTY/CUVE37Z5F) to reach the Zowe Explorer community for assistance.

## Resolving invalid profiles

A problem with a configuration file can make Zowe Explorer unable to read your configurations.

Zowe Explorer displays an error message advising it cannot read the configuration file when either:

- A Zowe v1 profile is invalid.
- A Zowe v2 configuration file fails to load.

Possible problems in the file could include a syntax error, or an invalid keyword or symbol.

To fix the configuration file causing the error, follow these steps:

1. Click the **Show Config** button in the message window.

    ![Show Config button](/stable/images/ze/ZE-show-config-button.gif)

    This opens the file in an **Editor** tab.

2. Modify the file as needed and save the changes.
3. Reload Visual Studio Code to confirm that Zowe Explorer can read the updated file.


