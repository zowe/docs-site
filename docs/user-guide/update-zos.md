# Updating Zowe on z/OS using Update Script
<!-- TODO -->
Previously, Zowe on z/OS had to be updated by installing a new version of Zowe. With the introduction of the update script, you can optimize this process, and make installation faster and more seamless. 

Use the update script to update Zowe on z/OS.

### Prerequisites

Ensure that you met the following requirements before you run the update script:

  - Stop a running instance of Zowe
  - Download the [pax file](https://zowe.org/download/) and. To unpax the file run the following command
    ```
     pax -ppx -rf <path/to/pax>
    ```
    where:

    - `<path/to/pax>` - a path to a directory with 


### Update Zowe using Update Script

Run the update script to update Zowe.

**Follow these steps:**

1. Run the script by issuing the following command: 

    ```
    update.sh <path/to/zowe/install> 
    update.sd <path/to/unpaxed/new-zowe>
    update.sh <LOADLIB.DS.NAME>
    update.sh <path/to/backup>
    ```
   <!-- TODO. Not sure this code block is correctly put, especially `update.sd <path/to/unpaxed/new-zowe>` -->
    where:

    - `<path/to/zowe/install>` - path to a Zowe install directory
    - `<path/to/unpaxed/new-zowe>` - path to a directory the with unpaxed new version of Zowe
    <!-- TODO. Why do we need it? and what does an "unpaxed new version of Zowe" mean? A pax.Z file?  -->
    - `<LOADLIB.DS.NAME>` - a data set with a load module
    - `<path/to/backup>` - path to a directory where to back up

2. Restart Zowe.

You successfully updated Zowe.

### Revert/Restore Zowe Installation

Zowe installation backup is created before an update starts. 
<!-- TODO. Why is this important? How do we know the backup is created? Is this connected with? `update.sh <path/to/backup>` -->
Restore a previous Zowe installation. 

**Follow these steps:**

1. Remove directory with Zowe installation by issuing the following command:
   ```
   rm -rf <path/to/zowe/install>
   ```
2. Copy a backup to the original location by issuing the following command:
   ```
   cp -r <path/to/backup> <path/to/zowe/install>
   ```
3. Restore LOADLIB module
<!-- TODO. How do I restore the LOADLIB module? By issuing the command below? -->
4. Copy the LOADLIB to load module data set by issuing the following command:
    ```
    cp -X -v <path/to/backup/>install_log/ZWESIS01 //'<LOADLIB.DS.NAME>(ZWESIS01)'
    ```
<!-- TODO. Is that the end of procedure? Where can a user perform these action? Should we point users at a specific 'tool'?-->

You successfully restored Zowe.