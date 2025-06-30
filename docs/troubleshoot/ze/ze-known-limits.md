# Known Zowe Explorer limitations today

## Data set pagination and descending sort for PDS members

### Limitation

Zowe Explorer v3.2.0 and higher implements server-side pagination by default when displaying lists of data sets and Partitioned Data Set (PDS) members. This feature divides large lists into separate, more manageable pages.

When sorting PDS members in descending order, members are first paginated alphabetically. Your specified descending sort is then applied to the members *within* each page. Consequently, you might need to navigate through multiple pages (using **Next page**/**Previous page**) to locate a specific member.

:::note
This behavior primarily affects profile types that support listing ranges of PDS members, such as z/OSMF and z/FTP.
:::

### Workarounds

To mitigate this behavior:

- **Disable Data Set List Pagination**

    Set the **Zowe > Ds > Paginate: Max Items Per Page** user setting to `0`. This disables the pagination feature for data set and PDS member lists, loading all items at once. This approach might impact performance for very large PDSs.
- **Refine Member Search Pattern**

    Use a more specific member pattern when searching. This can limit the number of members returned, potentially reducing the need to navigate across multiple pages.

## Mismatched credentials when using Zowe Explorer and Zowe CLI

### Limitation

Mismatching credentials can potentially lock you out from using Zowe CLI and Zowe Explorer in Visual Studio Code with either Windows Subsystem for Linux (WSL) or Remote Secure Shell (SSH).

WSL allows developers to run a Linux environment on Windows without the need for a separate virtual machine or dual booting. When using Zowe Explorer with WSL, two parallel processes take place: VS Code runs on the Windows operating system, while code execution and tooling happen within the Linux environment.

With Remote SSH, the network protocol provides users with a secure connection to a remote computer. When using this protocol with Zowe Explorer, you can securely connect to a remote machine or a remote development environment.

Both WSL and Remote SSH provide more tools for mainframe developers, but they also have limitations when it comes to credentials.

Authentication information used in Zowe Explorer &mdash; such as usernames and passwords, SSH keys, and API Mediation Layer tokens &mdash; resides on the developer’s local machine, provided the developer is not connected to a remote environment through VS Code. If you are connected to a remote environment through VS Code, your secure credentials are stored on the remote system.

Using the VS Code integrated terminal with virtual machines does not include access to the credentials stored by Zowe Explorer in the local machine. Zowe CLI, for example, is not able to retrieve credentials saved on a developer’s PC when accessing the mainframe. Instead, Zowe CLI attempts to use any credentials stored in the virtual machine.

This can lead to confusion and inconsistencies when authenticating and accessing resources.

### Workaround

It is crucial to ensure that credentials are carefully managed between the local machine and the remote server to maintain proper authentication.

To avoid any potential issues (such as being locked out) caused by credential mismatch or discrepancies, credentials in both local and virtual/remote machines must match.
