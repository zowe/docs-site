# Verify Zowe runtime directory

The Zowe runtime directory `ROOT_DIR` contains the code modules that make up Zowe.  If these are altered in any way the behavior of Zowe is unpredictable.  

To provide system programmers with the ability to check that the `ROOT_DIR` has not been altered, Zowe provides a script file `zowe-verify-authenticity.sh`. 

If you have a Zowe version 1.12 or higher the script is delivered with Zowe together with the information it needs to check the release contents.  

If you have an earlier Zowe version you can obtain the script and use it to verify a `ROOT_DIR` for 1.9, 1.10 and 1.11.   

## Verifying a Zowe release 1.12 or later

1. Navigate to `ROOT_DIR/bin` and execute the script `zowe-verify-authenticity.sh`.  

This script 

## Step 1: Obtain the verify tool

1. Start a USS terminal session with the z/OS system where Zowe is installed.  
2. Create a new, writable local directory, for example, `/u/username/hash`.
3. Go to [zowe.org](https://www.zowe.org/).
4. Depending on the version of Zowe you are using, download the hash code files to your local directory `/u/username/hash`  by using FTP or a similar file-transfer utility.  <!--How to select the hash files? Will there be a link or button somewhere? -->

   **v1.12 and later** 
   - `HashFiles.class` (binary) 
   - `RefRuntimeHash.txt` (text) 

   **Prior v1.12**
   - `HashFiles.class` (binary)
   - `RefRuntimeHash.txt` (text)  
   - `zowe-verify-authenticity.sh`

Note that the `RefRuntimeHash.txt` file is specific to a Zowe release.

## Step 2: Verify your runtime folder

Now you are ready to verify your runtime folder, for example, `/usr/lpp/zowe/v1.12`, which contains the following files that you can check. 

```
/u/username/hash:>ls /usr/lpp/zowe/v1.12
bin            components     install_log    manifest.json  scripts
```

1. Change to the runtime directory. 
   ```
   cd /usr/lpp/zowe/v1.12
   scripts/utils/zowe-verify-authenticity.sh /usr/lpp/zowe/v1.12 /u/username/hash
   ``` 

2. Run the `zowe-verify-authenticity.sh` script.

   **For Zowe v1.12 and later** 

   ```
   scripts/utils/zowe-verify-authenticity.sh /usr/lpp/zowe/v1.12 /u/username/hash
   ``` 

   **For prior v1.12**
   ```
   /u/username/hash/zowe-verify-authenticity.sh /usr/lpp/zowe/v1.12 /u/username/hash
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
-rw-r--r--   1 OMVSKERN SYS1      921961 May  5 03:38 RefRuntimeHash.txt
-rwxr-xr-x   1 OMVSKERN SYS1        5029 May  5 03:51 zowe-verify-authenticity.sh
USERNAME:/u/username/hash: >r 153
/u/username/hash/zowe-verify-authenticity.sh /tmp/usr/lpp/zowe /u/username/hash
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

Info: More than 50 differences, no further differences are listed
Info: End of list

Info: Customer  runtime hash file is available in  /u/username/hash/CustRuntimeHash.txt
Info: Reference runtime hash file is available in  /u/username/hash/RefRuntimeHash.txt
USERNAME:/u/username/hash: >
```

This is a worst-case scenario of a bad mismatch.  You can check the [`manifest.json` file](troubleshoot-zowe-release.md#check-the-zowe-release-number) to see whether one of the components is from the wrong release.

The hash files `RuntimeHash.txt` are kept in case you want to use a GUI tool to perform a better file comparison.

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
Info: List of matching files with different hashes

Info: End of list

Info: Customer  runtime hash file is available in 
... /hash/CustRuntimeHash.sort
... /hash/CustRuntimeHash.txt
Info: Reference runtime hash file is available in 
... /hash/RefRuntimeHash.sort
... /hash/RefRuntimeHash.txt
zowe-verify-authenticity.sh ended
```
This is for the POC version of fingerprint.  The new version that will be delivered will have these attributes:

- Self-contained – all parts are present in the runtime directory, including `RefRuntimeHash-V.v.p.txt`.

- How to run it:

  ```
  cd /usr/lpp/zowe/bin 
  zowe-verify-authenticity.sh
  ```

- New parameter format
  ```
  zowe-verify-authenticity.sh [-r <runtime-dir>] [-h <HashPgm-dir>] [-f <HashRef-dir>] [-l <output-dir>]```

- Anti-falsing to ensure integrity

- Download these files to `downloads/hash`.

  ```
  zowe-verify-authenticity.sh 
  HashFiles.class
  RefRuntimeHash-v.r.m.txt
  ```

- Run the script

  ```
  cd downloads/hash
  zowe-verify-authenticity.sh -r /tmp/usr/lpp/zowe -h . –f .
  ```

- Automatically called by `zowe-support.sh`

