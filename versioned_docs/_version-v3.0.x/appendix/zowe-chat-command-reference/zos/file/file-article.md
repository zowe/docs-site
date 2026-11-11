# `zos file`

**[zos](.././zos-article) > [file](file-article)**

Manage USS files in a z/OS system. <!--file-description-->

## Usage

```zos file list status [fileName*] --path | -p <path> --limit <limit>```

```zos file list mounts [fileSystemName*] --mount-point | --mp <mount-point-path> --limit <limit>```

## Action

- [`list`](./list/list-article)

## Positional Argument

- [zos file list status](./list/zos-file-list-status#positional-arguments)

    - `fileName*`

- [zos file list mounts](./list/zos-file-list-mounts#positional-arguments)

    - `fileSystemName*`
## Option

- [zos file list status](./list/zos-file-list-status#options)

    | Full name  | Alias | Type |
    | :---- | :----  | :---- |
    | --path | -p | string |
    | --limit |  | number |

- [zos file list mounts](./list/zos-file-list-mounts#options)

    | Full name  | Alias | Type |
    | :---- | :----  | :---- |
    | --mount-point | --mp | string |
    | --limit |  | number |

## Examples

```
@bot zos file -p '/u/user'
```
```
@bot zos file list -p '/u/user'
```
```
@bot zos file list status -p '/u/user'
```
- Show the files and directories in path '/u/user'.

```
@bot zos file list status clean* -p '/u/user'
```
- Show the files and directories whose names start with clean in path '/u/user'.

```
@bot zos file list mounts
```
- Show all mounted filesystems.

```
@bot zos file list mounts --mp '/a/ibmuser'
```
- Show filesystems which are mounted to a specific path.

```
@bot zos file list mounts sac*
```
- Show mounted filesystems with name starting with 'sac'.