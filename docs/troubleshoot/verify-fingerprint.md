# Verify Zowe runtime directory

The Zowe runtime directory `RUNTIME_DIR` contains the code modules that make up Zowe.  If these code modules are altered in any way, the behavior of Zowe is unpredictable. To check if the `RUNTIME_DIR` has been altered, Zowe provides a verify tool that comprises a script file `zowe-verify-authenticity.sh` and the files it needs to check the release contents.

You can use this verify tool on Zowe version 1.9 and later. 
- If you use Zowe version 1.14 or later, the verify tool is delivered with Zowe, so you can skip [Step 1](#step-1-obtain-the-verify-tool-prior-to-v114) below, but you can still download the verify tool if required.  
- If you use Zowe version 1.9, 1.10, 1.11, 1.12, and 1.13, you must obtain the verify tool separately and use it to verify the `RUNTIME_DIR`.

**Contents in this topic**
    
- [Step 1: Obtain the verify tool (Required for versions before v1.14)](#step-1-obtain-the-verify-tool-required-for-versions-before-v114)
- [Step 2: Verify your runtime directory](#step-2-verify-your-runtime-directory)
- [Step 3: Review results](#step-3-review-results)
   - [Mismatch](#mismatch)
   - [Match](#match)
- [zowe-verify-authenticity.sh parameters](#zowe-verify-authenticitysh-parameters)
- [Use of zowe-verify-authenticity.sh by zowe-support.sh](#use-of-zowe-verify-authenticitysh-by-zowe-supportsh)

## Step 1: Obtain the verify tool (Required for versions before v1.14)

1. Start a USS terminal session with the z/OS system where Zowe is installed.  
2. Create a new, writable, local directory, for example, `/u/username/hash`.
3. Go to the [download link](https://github.com/zowe/zowe-install-packaging/blob/staging/files/fingerprint.pax) to download the `fingerprint.pax` PAX file.
4. Upload the downloaded file to a temporary directory such as `/tmp` on your z/OS USS file system by using SFTP or a similar file transfer utility. 
When you transfer the PAX file between systems, you must use binary transfer mode.
5. Extract the PAX file from inside the local directory you created (in this example, it is `/u/username/hash`) using commands like the following one:
   ```
   cd /u/username/hash
   pax -ppx -rf /tmp/fingerprint.pax
   ```
6. When the PAX file is extracted, you will see the following files in your `/u/username/hash` directory:

   - `HashFiles.class` (binary)
   - `RefRuntimeHash-1.9.0.txt` (text)  
   - `RefRuntimeHash-1.10.0.txt` (text)  
   - `RefRuntimeHash-1.11.0.txt` (text)  
   - `RefRuntimeHash-1.12.0.txt` (text)  
   - `RefRuntimeHash-1.13.0.txt` (text) 
   - `zowe-verify-authenticity.sh` (text)

Each `RefRuntimeHash-V.v.p.txt` file is specific to a Zowe release, where `V.v.p` is your Zowe release number, for example, `1.9.0`. This list of files is updated to include new Zowe releases as they become available. For example, if you use Zowe version 1.14, you will see `RefRuntimeHash-1.14.0.txt` in the list. 

## Step 2: Verify your runtime directory

Now you are ready to verify your runtime directory `RUNTIME_DIR`, for example, `/usr/lpp/zowe/v1.14`, which contains the following files. You can show these files by using the `ls` command. 

```
/u/username/hash:>ls /usr/lpp/zowe/v1.14
bin  components  fingerprint  install_log  manifest.json  scripts
```
Note that you will not have a `fingerprint` directory in releases prior to v1.14.0.  

1. Change to the runtime directory. 
   ```
   cd /usr/lpp/zowe/v1.14
   ``` 

2. Run the `zowe-verify-authenticity.sh` script.

   The script will automatically choose the correct `RefRuntimeHash-V.v.p.txt` file that matches the release found in your runtime directory.

   **For Zowe v1.14 and later** 
   
   Issue the following command. You do not need to specify any parameters to this script. 

   ```
   bin/zowe-verify-authenticity.sh
   ``` 
   
   If you suspect that the versions of the files in `RUNTIME_DIR` have been altered since this version of Zowe was installed, you might want to use the verify tool's script or files which you downloaded instead of the ones in your runtime directory. In this case, you can call the downloaded script and specify the options `-f` and `-h` in the following way:  

   ```
   /u/username/hash/zowe-verify-authenticity.sh -f /u/username/hash -h /u/username/hash
   ``` 

   To display a list of parameters, enter this command
   ```
   bin/zowe-verify-authenticity.sh -?
   ```

   <!-- The script and files in `ROOT_DIR` 
   are interoperable with the ones you downloaded, so you can use them in any combination.  
   The exception to this is the `zowe-verify-authenticity.sh` script in `ROOT_DIR/bin`, which is not backwards-compatible
   with Zowe runtimes prior to v1.12, so you should use the version from the zipfile instead. 
   This will affect you only if you are using the `zowe-verify-authenticity.sh` script in `ROOT_DIR/bin`,
   which is in v1.14 and above, to check a runtime prior to v1.12.
   This is an unlikely scenario unless you have more than one Zowe release installed.
   -->

   **For Zowe releases prior to v1.14**

   Issue commands similar to the following. In this example, you use Zowe v1.9.

   ```
   /u/username/hash/zowe-verify-authenticity.sh -r /usr/lpp/zowe/v1.9 -f /u/username/hash -h /u/username/hash
   ```

The `zowe-verify-authenticity.sh` script creates a `CustRuntimeHash.txt` file, which it compares with the `RefRuntimeHash-V.v.p.txt` file.  

## Step 3: Review results

You will get one of the following results.

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

This is a worst-case scenario of a bad mismatch.  To find out what the problem is, you could, for example, start by referring to the [`manifest.json` file](troubleshoot-zowe-release.md#check-the-zowe-release-number) to see whether one of the components is from the wrong release.

If you have many files different but none missing or extra, you might have a file tagging or code-page problem.  Check that the environment variables are set as required according to `zowe-set-env.sh`.  

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

## zowe-verify-authenticity.sh parameters

Usage:
```
zowe-verify-authenticity.sh [-r <runtime-dir>] [-h <HashPgm-dir>] [-f <HashRef-dir>] [-l <output-dir>]
```
- All parameters are optional
- You can use dot (.) and tilde (~) in the parameters

Description of parameters:

- `-r <runtime-dir>` 
   
   Root directory of the executables used by Zowe at run time. The typical value is `/usr/lpp/zowe`. The default value is the parent directory of the `bin` folder where this script is located.

- `-h <HashPgm-dir>` 

   Directory of the hash key program. The typical value is `/usr/lpp/zowe/fingerprint`. The default value is the `fingerprint` directory of the parent folder where this script is located.

- `-f <HashRef-dir>` 

   Directory of the reference hash key file `RefRuntimeHash-V.v.p.txt`. The typical value and default value are the same as that of the `-h` parameter. The values specified for `-h` and `-f` can be the same or different.

- `-l <output-dir>`  

   Output directory where the following log and output files will be written.
   ```
   zowe-verify-authenticity.log
   CustRuntimeHash.sort
   CustRuntimeHash.txt 
   RefRuntimeHash.sort  
   ```
   
   The typical value is `~/zowe/fingerprint`. The directory will be created if you specify it but it does not exist.

   The following defaults will be tried in the listed order: 
   ```
   /global/zowe/log 
   ```
   ```
   ~/zowe
   ``` 
   ```
   $TMPDIR
   ```
   ```
   /tmp
   ```

## Use of zowe-verify-authenticity.sh by zowe-support.sh

Starting in Zowe v1.14, the `zowe-verify-authenticity.sh` script is automatically called, with no parameters, by `zowe-support.sh`.  

