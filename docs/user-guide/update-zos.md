# Updating Zowe on z/OS using Update Script
<!-- TODO -->
Zowe applications are updated continuously. Zowe on z/OS used to be updated in a way that you need to install a completely new version of Zowe. With the introduction of the update script you can optimize this process, and make installation and applying fixes faster and more seamless. 

To use the most of the update script, you need to take the following actions:

 ### Prerequisites

 Ensure that you met the following requirements before you run the update script:

  - Stop a running instance of Zowe
  - Have the [pax file](https://zowe.org/download/) downloaded. To unpax the file run the following command
  ```
 pax -ppx -rf <path/to/pax>
  ```

Run the update script to update Zowe.

**Follow these steps:**

1. Run the script by issuing the following command: 

    ```
    update.sh <path/to/zowe/install> 
    update.sd <path/to/unpaxed/new-zowe>
    update.sh <LOADLIB.DS.NAME> <path/to/backup>
    ```

    where:

    - `<path/to/zowe/install>` - path to a Zowe install     directory, which you want to update
    - `<path/to/unpaxed/new-zowe>` - path to directory with     unpaxed new version of Zowe
    - `<LOADLIB.DS.NAME>` - a dataset with a load module
    - `<path/to/backup>` - path to directory where to back up

2. Restart Zowe.
You sucessfully updated Zowe. 


<!-- TODO.

Why do we need to revert 

Revert steps
Backup of Zowe installation is created before update starts. To restore follow these steps:

restore Zowe installation
remove directory with Zowe installation
rm -rf <path/to/zowe/install>
copy backup to original location
cp -r <path/to/backup> <path/to/zowe/install>
restore LOADLIB module
copy LOADLIB to load module DS
cp -X -v <path/to/backup/>install_log/ZWESIS01 //'<LOADLIB.DS.NAME>(ZWESIS01)' -->