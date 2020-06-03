# Verify Zowe runtime directory

The Zowe runtime directory `ROOT_DIR` contains the code modules that make up Zowe.  If these are altered in any way the behavior of Zowe is unpredictable.  

To provide system programmers with the ability to check that the `ROOT_DIR` has not been altered, Zowe provides a verify tool which comprises a script file `zowe-verify-authenticity.sh` and the files it needs to check the release contents. 

If you have Zowe version 1.12 or higher the verify tool is delivered with Zowe, but you can still download the verify tool if required.  

If you have an earlier Zowe version you can obtain the script and use it to verify a `ROOT_DIR` for 1.9, 1.10 and 1.11.   

## Step 1: Obtain the verify tool (Prior to v1.12)

1. Start a USS terminal session with the z/OS system where Zowe is installed.  
2. Create a new, writable local directory, for example, `/u/username/hash`.
3. Go to [zowe.org](https://www.zowe.org/).
4. Select the hash file directory for your release.
5. Download these files to your local directory `/u/username/hash`  by using FTP or a similar file-transfer utility.  <!--How to select the hash files? Will there be a link or button somewhere? -->

   - `HashFiles.class` (binary)
   - `RefRuntimeHash.txt` (text)  
   - `zowe-verify-authenticity.sh` (text)

Note that the `RefRuntimeHash.txt` file is specific to a Zowe release.  Rename it now, to `RefRuntimeHash-v.r.m.txt`, where `v.r.m` is your Zowe release number, e.g. `1.9.0`.  

## Step 2: Verify your runtime folder

Now you are ready to verify your `ROOT_DIR` runtime folder, for example, `/usr/lpp/zowe/v1.12`, which contains the following files that you can show by using the `ls` command. 

```
/u/username/hash:>ls /usr/lpp/zowe/v1.12
bin            components     fingerprint   install_log    manifest.json  scripts
```
Note that you will not have a `fingerprint` directory in releases prior to v1.12.0.  

1. Change to the runtime directory. 
   ```
   cd /usr/lpp/zowe/v1.12
   ``` 

2. Run the `zowe-verify-authenticity.sh` script.

   **For Zowe v1.12 and later** 

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
   have been altered since this version of Zowe was installed.  The script and files in `ROOT_DIR` 
   are interchangeable wih the ones you downloaded, so you can use them in any combination.   


   **For Zowe releases prior to v1.12**
   ```
   /u/username/hash/zowe-verify-authenticity.sh -r /usr/lpp/zowe/v1.9 -f /u/username/hash
   ```

The `zowe-verify-authenticity.sh` script creates a `CustRuntimeHash.txt` file, which it compares with the `RefRuntimeHash.txt` file.  

## Step 3: Review results

- [Mismatch](#mismatch)
- [Match](#match)

### Mismatch

When files don't match, you see a message similar to the following one. 

```
USERNAME:/u/username/hash: >ls -l
total 1856
-rw-r--r--   1 OMVSKERN SYS1        1680 May  5 03:38 HashFiles.class
-rw-r--r--   1 OMVSKERN SYS1      921961 May  5 03:38 RefRuntimeHash-v.r.m.txt
-rwxr-xr-x   1 OMVSKERN SYS1        5029 May  5 03:51 zowe-verify-authenticity.sh
USERNAME:/u/username/hash: >/u/username/hash/zowe-verify-authenticity.sh /tmp/usr/lpp/zowe /u/username/hash
Info: Gathering files ...
Info: Calculating hashes ...
Info: Comparing results ...
Info: Number of files different =  14563
Info: Number of files extra     =  7280
Info: Number of files missing   =  7283
Info: List of matching files with different hashes

./bin/utils/setup-log-dir.sh 3650968642054508621
./bin/utils/setup-log-dir.sh -6203646612024312948

./bin/zowe-init.sh 2648663514856093289
./bin/zowe-init.sh -3839623020834687592

./bin/zowe-setup-certificates.sh 3582505309200469587
./bin/zowe-setup-certificates.sh 2717941914157242956

./components/api-mediation/api-catalog-services.jar -7166618309590884285
./components/api-mediation/api-catalog-services.jar -5061845581250795692

…

./components/app-server/share/sample-angular-app/webClient/src/assets/i18n/pluginDefinition.i18n.fr.json -1821281463413293505
./components/app-server/share/sample-angular-app/webClient/src/assets/i18n/pluginDefinition.i18n.fr.json -117903603306749052

Info: More than 10 differences, no further differences are listed
Info: End of list

Info: Customer  runtime hash file is available in  /u/username/hash/CustRuntimeHash.txt
Info: Reference runtime hash file is available in  /u/username/hash/RefRuntimeHash.txt
USERNAME:/u/username/hash: >
```
#### Troubleshooting and hints

This is a worst-case scenario of a bad mismatch.  To find out what the problem is, you could, for example, start by checking the [`manifest.json` file](troubleshoot-zowe-release.md#check-the-zowe-release-number) to see whether one of the components is from the wrong release.
If you have many files different but none missing or extra, you may have a file tagging or
code-page problem.  Check that the environment variables are set as required according to 
`zowe-set-env.sh`.  

The hash files mentioned above are left in the `/u/username/hash` directory in case you want to use a GUI tool to perform a better file comparison.

### Match

When files match, you see a message similar to the following one:

```
zowe-verify-authenticity.sh started
Info: Gathering files ...
Info: Calculating hashes ...
Info: Comparing results ...
Info: Number of files different =  0
Info: Number of files extra     =  0
Info: Number of files missing   =  0

Info: Customer  runtime hash file is available in 
... /hash/CustRuntimeHash.sort
... /hash/CustRuntimeHash.txt
Info: Reference runtime hash file is available in 
... /hash/RefRuntimeHash.sort
... /hash/RefRuntimeHash.txt
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

`-f <HashRef-dir>` directory of the reference hash key file RefRuntimeHash-v.r.m.txt
same typical value and default as -h
The values specified for `-h` and `-f` can be the same or different.

`-l <output-dir>`  output directory where the following log and output files will be written.

    zowe-verify-authenticity.log
    CustRuntimeHash.sort
    CustRuntimeHash.txt 
    RefRuntimeHash.sort  

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

From v1.12 on, `zowe-verify-authenticity.sh` is automatically called by `zowe-support.sh`, with no parameters.  

