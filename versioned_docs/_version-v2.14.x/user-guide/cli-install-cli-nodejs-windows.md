# Installing Zowe CLI with Node.js 16 on Windows

There are several preferred installation workarounds when you encounter the following scenarios:

- Using Node.js version 16 with npm version 8 on Windows, want to install from the TGZ, and have restricted Internet access
- Unable to install Zowe CLI while offline using the TGZ bundle

The workaround installation options are, in order of preference:

- Configure NPM proxy to access the public NPM registry (npmjs.org) so that the install from TGZ can succeed. To configure an NPM proxy:
  - If your proxy is HTTP: `npm config set proxy <proxyUrl>`
  - If your proxy is HTTPS: `npm config set https-proxy <proxyUrl>`
- Install CLI from an online registry instead of TGZ. This may also require configuring an NPM proxy. See [Installing Zowe CLI from an online registry](cli-installcli.md#installing-zowe-cli-from-an-online-registry).
- Downgrade NPM to version 6. To downgrade from a newer version of NPM, issue the command: `npm install -g npm@6.x`

## Additional Considerations

There are issues with Node 16 and bundled optional dependencies in offline node installs. Because of the issues, the optional `cpu-features` package was removed from the offline .tgz file that is available from zowe.org and Broadcom. The installation process attempts to reach a configured registry and to use any NPM proxy configured on the system. If the attempt fails, the installation process completes normally.

`cpu-features` changes the SSH cipher order that is used on the `zowe uss issue ssh` commands, favoring `chacha20-poly1305` cipher in cases where CPUs do not have built in AES instructions. This should not affect performance.
