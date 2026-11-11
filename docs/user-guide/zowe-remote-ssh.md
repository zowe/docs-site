# Zowe Remote SSH

Use Zowe Remote SSH to perform actions with data sets, USS files, jobs, and more. 

Zowe Remote SSH offers a compelling set of advantages for developers and system administrators seeking efficient and modern ways to interact with the mainframe:

- **Simplified set-up and deployment**: ZRS provides intuitive set-up wizards within both the Zowe Explorer extension and the Zowe CLI plug-in. ZRS involves little to no server-side configuration and does not require sysadmin assistance. Simplified onboarding accelerates productivity and reduces the barrier to entry for both seasoned mainframers and those new to the platform.

- **Secure and standard communication**: Leveraging the robust and widely-adopted Secure Shell (SSH) protocol for data transmission ensures a secure channel for interacting with your mainframe systems. This commitment to industry-standard security practices provides peace of mind when accessing and managing critical mainframe data.

- **Enhanced user experience within existing Zowe tools**: Zowe Explorer leverages ZRS to provide an alternative communication pathway to mainframe resources with a direct SSH-based stack. By integrating with existing Zowe tools, ZRS provides flexibility for engaging with mainframe capabilities within your preferred workflow. ZRS also maintains a persistent connection with the server so that the user remains authenticated while working in Zowe Explorer.

## Status of Zowe Remote SSH functionality

For the functionality that is currently available, see the following tables.

### Legend

- ✅ Supported
- 🚧 Partially supported
- ❌ Not supported
- ➖ Not applicable
- _italic_ Planned for initial release

## Data Sets

| Operation                | z/OSMF          | FTP | Backend         | Middleware | SDK | CLI | VSCE |
| ------------------------ | --------------- | --- | --------------- | ---------- | --- | --- | ---- |
| _List data sets_         | ✅              | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _List data set members_  | ✅              | ✅  | 🚧 <sup>1</sup> | ✅         | ✅  | ✅  | ✅   |
| _Read data set_          | ✅              | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _Read data set member_   | ✅              | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _Write data set_         | ✅              | ✅  | 🚧 <sup>2</sup> | ✅         | ✅  | ✅  | ✅   |
| _Write data set member_  | ✅              | ✅  | 🚧 <sup>2</sup> | ✅         | ✅  | ✅  | ✅   |
| _Create data set_        | ✅              | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _Create data set member_ | ✅              | ✅  | 🚧 <sup>3</sup> | ✅         | ✅  | ✅  | ✅   |
| _Delete data set_        | ✅              | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _Delete data set member_ | ✅              | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| Recall data set          | 🚧 <sup>4</sup> | ❌  | ✅              | ✅         | ✅  | ✅  | ✅   |
| Migrate data set         | ✅              | ❌  | ❌              | ❌         | ❌  | ❌  | ❌   |
| Delete migrated data set | ✅              | ❌  | ❌              | ❌         | ❌  | ❌  | ❌   |
| Rename data set          | ✅              | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| Rename data set member   | ✅              | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| Copy data set            | ✅              | ❌  | ✅              | ✅         | ❌  | ❌  | ❌   |
| Compress data set        | ➖              | ❌  | ✅              | ❌         | ❌  | ❌  | ❌   |
| Search data sets         | 🚧 <sup>5</sup> | ❌  | 🚧 <sup>5</sup> | ❌         | ✅  | ❌  | ❌   |
| Invoke AMS (VSAM)        | ✅              | ❌  | ❌              | ❌         | ❌  | ❌  | ➖   |

1. Not all attributes are retrieved.
2. RECFM=U (undefined record format) data sets are read-only; write attempts return an error.
3. If the member already exists, this operation causes member contents to be overwritten.
4. Does not support some migration utilities like CA Disk.
5. Limited options compared to ISPF `srchfor`.

## USS Files

| Operation                | z/OSMF | FTP | Backend         | Middleware | SDK | CLI | VSCE |
| ------------------------ | ------ | --- | --------------- | ---------- | --- | --- | ---- |
| _List files/directories_ | ✅     | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _Read USS file_          | ✅     | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _Write USS file_         | ✅     | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _Create file/directory_  | ✅     | ✅  | 🚧 <sup>1</sup> | ✅         | ✅  | ✅  | ✅   |
| _Delete file/directory_  | ✅     | ✅  | ✅              | ✅         | ✅  | ✅  | ✅   |
| Copy file/directory      | ✅     | ❌  | ✅              | ✅         | ✅  | ✅  | ✅   |
| Move file/directory      | ✅     | ✅  | ✅              | ✅         | ✅  | ❌  | ✅   |
| _`chmod` file/directory_ | ✅     | ❌  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _`chown` file/directory_ | ✅     | ❌  | ✅              | ✅         | ✅  | ✅  | ✅   |
| _`chtag` USS file_       | ✅     | ❌  | ✅              | ✅         | ✅  | ✅  | ✅   |
| Issue UNIX command       | ✅     | ✅  | ✅              | ❌         | ✅  | ❌  | ❌   |
| Invoke `extattr`         | ✅     | ❌  | ❌              | ❌         | ❌  | ➖  | ➖   |
| Get ACL entries          | ✅     | ❌  | ❌              | ❌         | ❌  | ➖  | ➖   |
| Set ACL entries          | ✅     | ❌  | ❌              | ❌         | ❌  | ➖  | ➖   |
| Link file/directory      | ✅     | ❌  | ❌              | ❌         | ❌  | ➖  | ➖   |
| Unlink file/directory    | ✅     | ❌  | ❌              | ❌         | ❌  | ➖  | ➖   |
| List z/OS file systems   | ✅     | ❌  | ❌              | ❌         | ❌  | ❌  | ➖   |
| Create z/OS file system  | ✅     | ❌  | ❌              | ❌         | ❌  | ❌  | ➖   |
| Delete z/OS file system  | ✅     | ❌  | ❌              | ❌         | ❌  | ❌  | ➖   |
| Mount file system        | ✅     | ❌  | ❌              | ❌         | ❌  | ❌  | ➖   |
| Unmount file system      | ✅     | ❌  | ❌              | ❌         | ❌  | ❌  | ➖   |

1. Recursive option is not supported.

## Jobs

| Operation          | z/OSMF | FTP | Backend | Middleware | SDK | CLI | VSCE            |
| ------------------ | ------ | --- | ------- | ---------- | --- | --- | --------------- |
| _Get job status_   | ✅     | ✅  | ✅      | ✅         | ✅  | ✅  | ✅              |
| _List jobs_        | ✅     | ✅  | ✅      | ✅         | ✅  | ✅  | ✅              |
| _List spool files_ | ✅     | ✅  | ✅      | ✅         | ✅  | ✅  | ✅              |
| _Read spool file_  | ✅     | ✅  | ✅      | ✅         | ✅  | ✅  | ✅              |
| _Get job JCL_      | ✅     | ❌  | ✅      | ✅         | ✅  | ✅  | ✅              |
| _Submit job_       | ✅     | ✅  | ✅      | ✅         | ✅  | ✅  | ✅              |
| _Delete job_       | ✅     | ✅  | ✅      | ✅         | ✅  | ✅  | ✅              |
| Cancel job         | ✅     | ❌  | ✅      | ✅         | ✅  | ✅  | ✅ <sup>1</sup> |
| Hold job           | ✅     | ❌  | ✅      | ✅         | ✅  | ✅  | ➖ <sup>2</sup> |
| Release job        | ✅     | ❌  | ✅      | ✅         | ✅  | ✅  | ➖ <sup>2</sup> |
| Change job class   | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ➖              |

1. Does not support force, restart, dump, or purge.
2. Zowe Explorer does not support the Job Hold/Release operation.

## Console

| Operation                | z/OSMF | FTP | Backend         | Middleware | SDK | CLI | VSCE |
| ------------------------ | ------ | --- | --------------- | ---------- | --- | --- | ---- |
| Issue MVS command        | ✅     | ❌  | ✅ <sup>1</sup> | ❌         | ✅  | ❌  | ❌   |
| Get MVS command response | ✅     | ❌  | ❌              | ❌         | ❌  | ❌  | ❌   |
| Get MVS detect result    | ✅     | ❌  | ❌              | ❌         | ❌  | ➖  | ➖   |

1. Requires APF authorization.
<!-- 2. You must manually deploy/symlink `zoweax` -->

## TSO

| Operation                | z/OSMF | FTP | Backend | Middleware | SDK | CLI | VSCE |
| ------------------------ | ------ | --- | ------- | ---------- | --- | --- | ---- |
| Start TSO address space  | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ❌   |
| Start TSO app            | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ➖   |
| Issue TSO command        | ✅     | ❌  | ✅      | ✅         | ✅  | ✅  | ✅   |
| Get TSO command response | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ❌   |
| Send TSO message         | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ❌   |
| Send TSO app message     | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ➖   |
| Ping TSO address space   | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ❌   |
| Receive TSO message      | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ❌   |
| Receive TSO app message  | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ➖   |
| Stop TSO address space   | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ❌   |

## Other

| Operation            | z/OSMF | FTP | Backend | Middleware | SDK | CLI | VSCE |
| -------------------- | ------ | --- | ------- | ---------- | --- | --- | ---- |
| Read system log      | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ➖   |
| Get server status    | ✅     | ❌  | ❌      | ❌         | ❌  | ❌  | ❌   |
| Change user password | ✅     | ❌  | ❌      | ❌         | ❌  | ➖  | ➖   |
| Issue SSH command    | ❌     | ❌  | ❌      | ❌         | ✅  | ❌  | ❌   |
