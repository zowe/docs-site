# Troubleshooting Zowe Server Install Wizard

As a user of the Zowe Server Install Wizard, you may encounter problems during installation of the Wizard. This article presents known Zowe Server Install Wizard issues and their solutions.

## Failure to establish a TLS connection

When attempting to establish a TLS connection, you may encounter the following message:

```
Client network socket disconnected before secure TLS connection was established
```

If you receive this message, go back to the _Connection_ page and attempt to re-establish the connection. If the connection cannot be established, restart the Wizard.

## Unable to continue with Wizard installation

If you encounter strange behavior that prohibits you from continuing with Wizard installation, we recommend you follow this procedure:

1. View the Job output within the Wizard.
2. If the error is not clear from the Job output, view the output of the log file according to your platform:

    <details>
    <summary>For Windows</summary>

    `%USERPROFILE%\AppData\Roaming{app name}\logs\main.log`
    </details>
    
    <details>
    <summary>For macOS</summary>

    ` ~/Library/Logs/{app name}/main.log`
    </details>

    <details>
    <summary>For Linux</summary>
    
    ` ~/.config/{app name}/logs/main.log`
    </details>

If you are still unsure how to proceed, you can optionally make a backup of these log files, and then use the following procedure to remove the Wizard's cache. 

1. Close the Wizard.
2. Follow the steps according to your operating system: 
    <details>
    <summary>For Windows</summary>
    
    1. Open File Explorer. In the address bar type `%APPDATA%`. This takes you to the directory where your app data is stored. The typical directory path is `C:\Users[Your User Name]\AppData\Roaming`.  
    
    2. Locate the folder corresponding to `zowe-install-wizard`.

    </details>

    <details>
    <summary>For macOS</summary>

    1. Open Finder. In the menu bar select **Go > Go to Folder**.

    2. Type `~/Library/Application Support/` and press **Enter**. 

    3. Locate the folder corresponding to `zowe-install-wizard`
    </details>

    <details>
    <summary>For Linux</summary>

    1. Open a terminal or file manager. 

    2. Navigate to `~/.config/`, which is where most apps store their configuration data. 

    3. In the terminal, enter the following command:  `cd ~/.config/`.   

    4. Locate the folder corresponding to `zowe-install-wizard`.
    </details>

3. Delete this folder to remove all stored data.
4. Restart the Wizard.

## Unable to save setting to zowe.yaml via the Wizard's UI or editor

The accurate updating & saving to `YAML` in the UI may not always work as intended. If you have issues saving a specific setting to the `Zowe configuration YAML` via the Wizard's UI or editor (or an advanced setting is not available to be edited), it is recommended to make a manual edit to the configuration `YAML` file in `z/OS Unix` & then proceed with the Wizard as intended.
