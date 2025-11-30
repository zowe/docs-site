# Setting up terminal app plugins

Follow these optional steps to configure the default connection to open for the terminal app plugins.

## Setting up the TN3270 mainframe terminal app plugin

The file `_defaultTN3270.json` within the `tn3270-ng2` app folder `/config/storageDefaults/sessions/` is deployed to the [configuration dataservice](../extend/extend-desktop/mvd-configdataservice.md) when the app-server runs for the first time. This file is used to tell the terminal what host to connect to by default. If you'd like to customize this default, you can edit the file directly within the configuration dataservice `<components.app-server.instanceDir>/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json`. Or you can open the app, customize a session within the UI, click the save icon (floppy icon) and then copy that file from `<components.app-server.usersDir>/<your user>/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json` to `<components.app-server.instanceDir>/org.zowe.terminal.tn3270/sessions/_defaultTN3270.json`. Either way, you will see a file with the following properties:

```
  "host": <hostname>
  "port": <port>
  "security": {
    type: <"telnet" or "tls">
  }
```

## Setting up the VT Terminal app plugin

The file `_defaultVT.json` within the `vt-ng2` app folder `/config/storageDefaults/sessions/` is deployed to the [configuration dataservice](../extend/extend-desktop/mvd-configdataservice.md) when the app-server runs for the first time. This file is used to tell the terminal what host to connect to by default. If you'd like to customize this default, you can edit the file directly within the configuration dataservice `<components.app-server.instanceDir>/org.zowe.terminal.vt/sessions/_defaultVT.json`. Or you can open the app, customize a session within the UI, click the save icon (floppy icon) and then copy that file from `<components.app-server.usersDir>/<your user>/org.zowe.terminal.vt/sessions/_defaultVT.json` to `<components.app-server.instanceDir>/org.zowe.terminal.vt/sessions/_defaultVT.json`. Either way, you will see a file with the following properties:

```
  "host":<hostname>
  "port":<port>
  "security": {
    type: <"telnet" or "ssh">
  }
```

