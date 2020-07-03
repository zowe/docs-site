# Verify Zowe runtime directory

The Zowe runtime directory `ROOT_DIR` contains the code modules that make up Zowe.  If these are altered in any way the behavior of Zowe is unpredictable.  

To provide system programmers with the ability to check that the `ROOT_DIR` has not been altered, Zowe provides a verify tool which comprises a script file `zowe-verify-authenticity.sh` and the files it needs to check the release contents. 

If you have Zowe version 1.14 or higher the verify tool is delivered with Zowe, but you can still download the verify tool if required.  

If you have an earlier Zowe version you can obtain the script and use it to verify a `ROOT_DIR` for 1.9, 1.10, 1.11, 1.12 and 1.13.   

## Step 1: Obtain the verify tool (Prior to v1.14)

1. Start a USS terminal session with the z/OS system where Zowe is installed.  
2. Create a new, writable, local directory, for example, `/u/username/hash`.
3. Go to Jfrog Artifactory to obtain the `fingerprint.pax` PAX file.
<!-- something like this ...
https://zowe.jfrog.io/zowe/libs-snapshot-local/org/zowe/1.13.0-PR-1316/fingerprint-1.13.0-pr-1316-127-20200701121612.pax 
--> .
5. Download this file to a temporary directory such as `/tmp` on your z/OS USS file system 
by using SFTP or a similar file-transfer utility. 
When you transfer the PAX file between systems, you must use binary transfer mode.
6. Extract the PAX file inside `/u/username/hash` using commands like this
```
   cd /u/username/hash
   pax -ppx -rf /tmp/fingerprint.pax
```
<!-- The zip file contains text files, which are in ASCII, and one class file, which is binary.  
Once you un-PAX the zip file, you will need to convert the text files to EBCDIC before you can use them on z/OS.  
So you could FTP the zip file to your workstation in binary format, un-PAX the zip file there, and transfer the text files to your z/OS USS directory in text format,
which will convert them to EBCDIC.  Alternatively, you could transfer the zip file directly to z/OS in binary format, and un-PAX it there.  Then you could convert the text
files to EBCDIC with `iconv` or another suitable utility.  -->
6. When un-PAXed, you will see the following files in your `/u/username/hash` directory:

   - `HashFiles.class` (binary)
   - `RefRuntimeHash-1.9.0.txt` (text)  
   - `RefRuntimeHash-1.10.0.txt` (text)  
   - `RefRuntimeHash-1.11.0.txt` (text)  
   - `RefRuntimeHash-1.12.0.txt` (text)  
   - `RefRuntimeHash-1.13.0.txt` (text) 
   - `zowe-verify-authenticity.sh` (text)

Note that each `RefRuntimeHash-v.r.m.txt` file is specific to a Zowe release, where `v.r.m` is your Zowe release number, e.g. `1.9.0`.  Further 
`RefRuntimeHash-v.r.m.txt` files will be added to the zip file as each release becomes available.  This includes releases after v1.14.  



## Step 2: Verify your runtime folder

Now you are ready to verify your `ROOT_DIR` runtime folder, for example, `/usr/lpp/zowe/v1.14`, which contains the following files, which you can show by using the `ls` command. 

```
/u/username/hash:>ls /usr/lpp/zowe/v1.14
bin            components     fingerprint   install_log    manifest.json  scripts
```
Note that you will not have a `fingerprint` directory in releases prior to v1.14.0.  

1. Change to the runtime directory. 
   ```
   cd /usr/lpp/zowe/v1.14
   ``` 

2. Run the `zowe-verify-authenticity.sh` script.

   Note: The script will automatically choose the
   correct `RefRuntimeHash-v.r.m.txt` file for the release found in your runtime directory.

   **For Zowe v1.14 and later** 

   ```
   bin/zowe-verify-authenticity.sh
   ``` 
   Note: You do not need to specify any parameters to this script.  

   If you want to use the verify tool's script or files which you downloaded
   instead of the ones in your runtime directory, you can call the downloaded script and specify the options `-f` and `-h` like this.
   
   ```
   /u/username/hash/zowe-verify-authenticity.sh -f /u/username/hash -h /u/username/hash
   ```
   You might want to use the downloaded script and files if you suspect that the versions of those files in `ROOT_DIR` 
   have been altered since this version of Zowe was installed.  
   <!-- The script and files in `ROOT_DIR` 
   are interoperable with the ones you downloaded, so you can use them in any combination.  
   The exception to this is the `zowe-verify-authenticity.sh` script in `ROOT_DIR/bin`, which is not backwards-compatible
   with Zowe runtimes prior to v1.12, so you should use the version from the zipfile instead. 
   This will affect you only if you are using the `zowe-verify-authenticity.sh` script in `ROOT_DIR/bin`,
   which is in v1.14 and above, to check a runtime prior to v1.12.
   This is an unlikely scenario unless you have more than one Zowe release installed.
   -->

   **For Zowe releases prior to v1.14**
   ```
   /u/username/hash/zowe-verify-authenticity.sh -r /usr/lpp/zowe/v1.9 -f /u/username/hash -h /u/username/hash
   ```

The `zowe-verify-authenticity.sh` script creates a `CustRuntimeHash.txt` file, which it compares with the `RefRuntimeHash-v.r.m.txt` file.  

## Step 3: Review results

- [Mismatch](#mismatch)
- [Match](#match)

### Mismatch

When files don't match, you see output similar to the following. 

```
USERNAME:/u/username/hash: >zowe-verify-authenticity.sh  -l ~/hash-v1.12.0 
zowe-verify-authenticity.sh started
Info: Logging to directory /u/username/hash-v1.12.0
Info: zoweVersion = 1.12.0
Info: Gathering files ...
Info: Checking java ...
Info: Calculating hashes ...
Info: Comparing results ...
Info: Number of files different =  14749
Info: Number of files extra     =  171
Info: Number of files missing   =  22
Error: Verification FAILED
Info: Result files and script log are in directory /u/username/hash-v1.12.0
zowe-verify-authenticity.sh ended
USERNAME:/u/username/hash: >
```
#### Troubleshooting and hints

This is a worst-case scenario of a bad mismatch.  To find out what the problem is, you could, for example, start by checking the [`manifest.json` file](troubleshoot-zowe-release.md#check-the-zowe-release-number) to see whether one of the components is from the wrong release.
If you have many files different but none missing or extra, you may have a file tagging or
code-page problem.  Check that the environment variables are set as required according to 
`zowe-set-env.sh`.  

The hash files mentioned above are left in the `/u/username/hash` directory in case you want to use a GUI tool to perform a better file comparison.

### Match

When files match, you see output similar to the following. 

```
zowe-verify-authenticity.sh started
Info: Logging to directory /u/username/hash-v1.12.0
Info: zoweVersion = 1.12.0
Info: Gathering files ...
Info: Checking java ...
Info: Calculating hashes ...
Info: Comparing results ...
Info: Number of files different =  0
Info: Number of files extra     =  0
Info: Number of files missing   =  0
Info: Verification PASSED
Info: Result files and script log are in directory /u/username/hash-v1.12.0
zowe-verify-authenticity.sh ended
```

## Description of parameter format for zowe-verify-authenticity.sh

Usage:
`
zowe-verify-authenticity.sh [-r <runtime-dir>] [-h <HashPgm-dir>] [-f <HashRef-dir>] [-l <output-dir>]`

Description of parameters

   - All parameters are optional

   - You can use dot (.) and tilde (~) in the parameters

`-r <runtime-dir>` root directory of the executables used by Zowe at run time

typical value : `/usr/lpp/zowe`
default: the parent directory of the 'bin' folder where this script is located

`-h <HashPgm-dir>` directory of the hash key program

typical value : `/usr/lpp/zowe/fingerprint`
default: the 'fingerprint' directory of the parent folder where this script is located

`-f <HashRef-dir>` directory of the reference hash key file `RefRuntimeHash-v.r.m.txt`
same typical value and default as -h
The values specified for `-h` and `-f` can be the same or different.

`-l <output-dir>`  output directory where the following log and output files will be written.
```
    zowe-verify-authenticity.log
    CustRuntimeHash.sort
    CustRuntimeHash.txt 
    RefRuntimeHash.sort  
```
typical value : `~/zowe/fingerprint`
The directory will be created if you specify it but it does not exist.

default: The following defaults will be tried in this order
```
    /global/zowe/log 
    ~/zowe 
    $TMPDIR
    /tmp
```
## Use of zowe-verify-authenticity.sh by zowe-support.sh

From v1.14 on, `zowe-verify-authenticity.sh` is automatically called, with no parameters, by `zowe-support.sh`.  

