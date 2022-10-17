# Zowe Chat command reference

Welcome to Zowe Chat!

Zowe Chat currently supports users to perform interactions with the following Zowe Chat commands.

## Help 

<!--short description for "Help", e.g., Request help guide.-->
Request help guide. 

### help plugin **list status**[scopeName]
- Description: 
    issue help plugin **list status**[scopeName], where [scopeName] is one of the following:

- Scopes:
        - z/OS

- zos help **list status**

    - Description:

    - Usage:

### Examples
- help plugin **list statuss** [z/OS]
    
## z/OS job

- zos job **list status** [jobId] --owner |  &lt;owner&gt; --prefix | p &lt;prefix&gt;
## z/OS data set

- zos dataset **list status** [datasetName*] --dsname-level | dl &lt;dsnamelevel&gt; --volume-serial | vs &lt;volumeserial&gt; --start | s &lt;firstDatasetName&gt;

- zos dataset list member [datasetMemberName*] --dataset-name | dn &lt;datasetName&gt; --start | s &lt;firstMemberName&gt;

## z/OS USS file

- zos file **list status** [fileName*] --path | p &lt;path&gt;

- zos file list mounts [fileSystemName*] --mount-point | mp &lt;mount-point-path&gt;

## z/OS error code

- zos code **list status** &lt;errorCode&gt;

## z/OS console commands

- zos command **issue console** &lt;command&gt; --console-name | cn &lt;consoleName&gt; --system-name | sn &lt;systemName&gt; --solicited-keyword | sk &lt;solicitedKeyword&gt;