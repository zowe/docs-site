# zos file list mounts

**[zos](../../zos-article) > [file](../file-article) > [list](./list-article) > [mounts](zos-file-list-mounts)** 

Show status or details of mounted z/OS file systems. <!--file-list-mounts-description-->

## Usage

`zos file list mounts [fileSystemName*] --mount-point | --mp <mount-point-path> --limit <limit>`

## Positional Arguments

- `fileSystemName*`

    - Specify the file system name to narrow down the results. Wildcard character * and ? is supported.

## Options 

- `--mount-point` *(string)*
    - Specify the path that the file system is mounted.

- `--limit` *(number)*
    - Specify the number of the file systems to display.

## Examples

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