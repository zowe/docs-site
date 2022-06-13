# Updating Zowe on z/OS using the update script

In the past, to update Zowe&trade; on z/OS, you had to install a new version of Zowe on top of an existing one. With the introduction of the Zowe update script, the update process becomes faster and more seamless. You can update Zowe on z/OS using shell.

## Prerequisites

Ensure that you meet the following requirements before you run the update script:

- Stop a running instance of Zowe.
- Download and unpaсk the [pax file](https://www.zowe.org/download.html). Use the following command to unpack the file:

    ```
     pax -ppx -rf <path/to/pax>
    ```
    
    where:

    `<path/to/pax>` - a path to a directory with Zowe installation files.

## Update Zowe using the update script

Run the update script to update Zowe.

**Follow these steps:**

1. Run the shell script by issuing the following command: 

    ```
    update.sh <path/to/zowe/install> <path/to/unpaxed/new-zowe> <LOADLIB.DS.NAME> <path/to/backup>
    ```
    where:
    - `<path/to/zowe/install>` - a path to a Zowe install directory
    - `<path/to/unpaxed/new-zowe>` - a path to a directory the with unpaxed new version of Zowe
    - `<LOADLIB.DS.NAME>` - a data set with a load module
    - `<path/to/backup>` - a path to a directory where to back up
            
2. Restart Zowe.

You successfully updated Zowe.

## Restore Zowe installation 

Zowe installation backup is created before the update. Restore a previous Zowe installation. 

**Follow these steps:**

1. Remove a directory with the Zowe installation by issuing the following command:
   ```
   rm -rf <path/to/zowe/install>
   ```
2. Copy a Zowe installation backup to the original location by issuing the following commands:
   ```   
   mkdir <path/to/zowe/install>

   cd <path/to/zowe/install>

   pax -ppx -rf <path/to/backup/file>
   ```
3. Restore the LOADLIB module by issuing the following command:
    ```
    cp -r <path/to/backup/>install_log/ZWESIS01 //'<LOADLIB.DS.NAME>(ZWESIS01)'
    ```
You successfully restored Zowe.