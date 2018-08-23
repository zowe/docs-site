# Obtaining installation files

The Zowe installation files are distributed as a PAX file that contains the runtimes and the scripts to install and launch the z/OS runtime and the runtime for the command line interface. For each release, there is a PAX file named `zowe-v.r.m.pax`, where

- `v` indicates the version
- `r` indicates the release number
- `m` indicates the modification number

The numbers are incremented each time a release is created so the higher the numbers, the later the release.  Use your web browser to download the PAX file by saving it to a folder on your desktop.

You can download the PAX file from the Zowe website. After you obtain the PAX file, transfer the PAX file to z/OS and prepare it to install the Zowe runtime.

**Follow these steps:**

1. Verify the downloaded PAX file

    These commands are tested on both Mac OS X v10.13.6 and Ubuntu v16.04 and v17.10.

    **Note:** the `v.r.m` mentioned below should be replaced with your downloaded version, for example, 0.9.0.

    a. Verify Hash Code

    You may download hash code file `zowe-v.r.m.pax.sha512` from Zowe website, then use this command to check:

    ```
    (gpg --print-md SHA512 zowe-v.r.m.pax > zowe-v.r.m.pax.sha512.my) && diff zowe-v.r.m.pax.sha512.my zowe-v.r.m.pax.sha512 && echo matched || echo "not match"
    ```

    If you see "matched" means the binary you have downloaded is the same one that was officially distributed by the Zowe project. You can delete temporary "zowe-v.r.m.pax.sha512.my" after that.

    You can also use other commands, like `sha512`, `sha512sum`, or `openssl dgst -sha512` to generate `SHA512` hash code. Just those hash code results are in a different format from what we provided but the values should be the same.

    b. Verify With Signature File

    In addition to the SHA512 hash we ensure that the hash is verifiable as well. This is done by digitally signing the hash text file with a KEY from one of the Zowe developers.

    You can download the signature file `zowe-v.r.m.pax.asc` from Zowe website, and also public key `KEYS` from https://github.com/zowe/release-management/.

    There are few steps:

    - Import the public key with command: `gpg --import KEYS`
    - If you never use gpg before, you may need to generate keys first: `gpg --gen-key`. Otherwise, please proceed to next step.
    - Sign the downloaded public key with command: `gpg --sign-key DC8633F77D1253C3`
    - Verify the file with command: `gpg --verify zowe-v.r.m.pax.asc zowe-v.r.m.pax`
    - You can remove the imported key with command: `gpg --delete-key DC8633F77D1253C3`

    If you see output like this:

    ```
    gpg: Signature made Tue 14 Aug 2018 08:29:46 AM EDT
    gpg:                using RSA key DC8633F77D1253C3
    gpg: Good signature from "Matt Hogstrom (CODE SIGNING KEY) " [full]
    ```

    means the binary you have downloaded is the same one that was officially distributed by the Zowe project.

    After completing these steps you can be assured that the binary file you have has come from the Zowe project.

2. Transfer the PAX file to z/OS.

    a. Open a terminal in Mac OS/Linux, or command prompt in Windows OS, and navigate to the directory where you downloaded the Zowe PAX file.

    b. Connect to z/OS using SFTP. Issue the following command:

     ```
     sftp <userID@ip.of.zos.box>
     ```

     If SFTP is not available or if you prefer to use FTP, you can issue the following command instead:

     ```
     ftp <userID@ip.of.zos.box>
     ```

     **Note:** When you use FTP, switch to binary file transfer mode by issuing the following command:

     ```
     bin
     ```

    c. Navigate to the target directory that you wish to transfer the Zowe PAX file into on z/OS.

    **Note:** After you connect to z/OS and enter your password, you enter into the Unix file system. The following commands are useful:

    - To see what directory you are in, type `pwd`.
    - To switch directory, type `cd`.
    - To list the contents of a directory, type `ls`.
    - To create a directory, type `mkdir`.   

    d. When you are in the directory you want to transfer the Zowe PAX file into, issue the following command:

     ```
     put <pax-file-name>.pax
     ```

    Where _pax-file-name_ is a variable that indicates the full name of the PAX file you downloaded.

    **Note:** When your terminal is connected to z/OS through FTP or SFTP, you can prepend commands with `l` to have them issued against your desktop.  To list the contents of a directory on your desktop, type `lls` where `ls` will list contents of a directory on z/OS.  

3. When the PAX file is transferred, expand the PAX file by issuing the following command in an ssh session:

    ```
    pax -ppx -rf <pax-file-name>.pax
    ```  

    Where _pax-file-name_ is a variable that indicates the name of the PAX file you downloaded.


    This will expand to a file structure.

    ```
      /files
      /install
      /scripts
      ...
    ```

     **Note**: The PAX file will expand into the current directory. A good practice is to keep the installation directory apart from the directory that contains the PAX file.  To do this, you can create a directory such as `/zowe/paxes` that contains the PAX files, and another such as `/zowe/builds`.  Use SFTP to transfer the Zowe PAX file into the `/zowe/paxes` directory, use the `cd` command to switch into `/zowe/builds` and issue the command `pax -ppx -rf ../paxes/<zowe-v.r.m>.pax`.  The `/install` folder will be created inside the `zowe/builds` directory from where the installation can be launched.
