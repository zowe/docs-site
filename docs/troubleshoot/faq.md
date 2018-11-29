# FAQ (To be updated)

## During starting up explorer-server, port 7443 is not initialized

### Error:

E CWPKI0033E: The keystore located at `safkeyringhybrid:///IZUKeyring.IZUDFLT` did not load because of the following error: Errors encountered loading keyring. Keyring could not be loaded as a JCECCARACFKS or JCERACFKS keystore. W CWPKI0809W: There is a failure loading the defaultKeyStore keystore. If an SSL configuration references the defaultKeyStore keystore, then the SSL configuration will fail to initialize.

### Solution:

issue commands: RDEFINE STARTED ZOESVR.\* UACC(NONE) STDATA(USER(IZUSVR) GROUP(IZUADMIN) PRIVILEGED(NO) TRUSTED(NO) TRACE(YES)) and SETROPTS RACLIST(STARTED) REFRESH, the job should be started on user IZUSVR. See also set up script created by John Davies and if on winmvs3b contact John to run this. new-zoe-user-racf.odt

## Error Jobs search failing

### Error:

Search for jobs using SDSF failed for prefix {} and owner {}: exc.sdsf_invocation_failed 8 (Issue does not impace ZD&T boxes)

### Solution:

You must be authorized to use SDSF with REXX on your z/OS system. In order to do this, activate the SDSF RACF class and add the following 3 profiles to your system:

- GROUP.ISFSORIG
- GROUP.ISFSPROG.SDSF
- ISF.CONNECT.

Users must belong to a group that has READ access to these profiles.

This is quite a complex area and you should ask your systems programmer for advice. On most systems, the GROUP.\* profiles are not required and it is sufficient to have the following ISF profile defined:

class profile SDSF ISF.CONNECT.\*\* (G)
