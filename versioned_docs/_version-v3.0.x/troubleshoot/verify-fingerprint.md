# Verify Zowe runtime directory

Zowe ships a [`zwe support verify-fingerprints` command](../appendix/zwe_server_command_reference/zwe/support/zwe-support-verify-fingerprints.md) to help you verify authenticity of your runtime directory. This command collects and calculates hashes for all files located in Zowe runtime directory and compare the hashes shipped with Zowe. With this utility, you are able to tell what files are modified, added, or deleted from original Zowe build.

Here is an example for successful verification:


```
#> zwe support verify-fingerprints
===============================================================================
>> VERIFY ZOWE FILE FINGERPRINTS

- Create Zowe directory file list
- Calculate hashes of Zowe files
- Find different files
  * Number of different files: 0
- Find extra files
  * Number of extra files: 0
- Find missing files
  * Number of missing files: 0
-------------------------------------------------------------------------------
>> Zowe file fingerprints verification passed.

#>
```

If this verification fails, the script will exit with code 181 and display error messages like `Number of different files: 1`. You can optionally pass `--debug` or `-v` parameter to instruct this command to verbosely display which files are different.
