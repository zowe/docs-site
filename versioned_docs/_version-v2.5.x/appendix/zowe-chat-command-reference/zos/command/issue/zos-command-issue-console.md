# zos command issue console

**[zos](../../zos) > [command](../command) > [issue](./issue) > [console](zos-command-issue-console)**

Issue a z/OS console command and print the response. In general, when issuing a z/OS console command, z/OS applications route responses to the originating console. Zowe Chat attempts to get the solicited messages immediately after the command is issued. If there is no message available within a certain time interval, approximately 3 seconds if your system workload is not high, Zowe Chat returns null. Usually it means that there is no command response. However, it is possible that the command response arrives after 3 seconds. In this case, you can click the command response URL in the response to retrieve the command response.

## Usage

`zos command issue console [commandString] --console-name | --cn <consoleName> --system-name | --sn <systemName>`

## Positional Arguments

- `commandString`

    - The z/OS console command to issue.

## Options

- `--console-name` *(null|string)*
    - The name of the z/OS extended MCS console to direct the command. The name must be between 2 and 8 characters long and cannot start with a digit. Characters are alphanumeric and can also include symbols like #, $, and @.

- `--system-name` *(null|string)*
    - Specify the z/OS system name in the current SYSPLEX (where your target z/OSMF resides) to route the z/OS console command. Default is the local system.

## Examples

```
@bot zos command issue console “d a,l”
```
- Issue a simple command.

```
@bot zos command issue console "d a,l" --console-name test
```
- Issue a z/OS console command with a console name.
