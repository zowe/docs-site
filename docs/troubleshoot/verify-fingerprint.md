Verify fingerprint

Verify the hash codes for your Zowe instance runtime folder.
Here’s how:
Obtain the verify tool

Start a USS terminal session with the z/OS system where Zowe is installed.  
Create a new, writable local directory, e.g. `/u/username/hash` 
Navigate to zowe.org and select the hash code file for your version of Zowe. 
Download these files to your local directory `/u/username/hash`  using FTP or a similar file-transfer utility 
* HashFiles.class (binary)
* RefRuntimeHash.txt (text)
For < v1.12, navigate to zowe.org and select the “pre-v1.12” box (TBD) and download the above 2 files, plus
* zowe-verify-authenticity.sh
Note that the` RefRuntimeHash.txt` is specific to your release.

Verify your runtime folder

Now you are ready to verify your runtime folder, e.g. /usr/lpp/zowe/v1.12
This is the folder that contains the following files, which you can check look like this
```
/u/username/hash:>ls /usr/lpp/zowe/v1.12
bin            components     install_log    manifest.json  scripts
```
change to the runtime directory and run zowe-verify-authenticity.sh
```
cd /usr/lpp/zowe/v1.12
scripts/utils/zowe-verify-authenticity.sh /usr/lpp/zowe/v1.12 /u/username/hash
``` 

or, for < v.12, retrospectively;
`/u/username/hash/zowe-verify-authenticity.sh /usr/lpp/zowe/v1.12 /u/username/hash`
This script creates a `CustRuntimeHash.txt` file which it compares with the `RefRuntimeHash.txt` file.  
Results
Example of when files don’t match

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

This is a worst-case scenario of a bad mismatch.  You should check the manifest.json file to see if one of the components is from the wrong release.
The hash files *RuntimeHash.txt are left in case you want to use a GUI tool to perform a better file comparison.

Example of when files match as they should:

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

