# zos file list status

**[zos](../../zos) > [file](../file) > [list](./list) > [status](zos-file-list-status)** 

Show status or details of USS files. <!--file-list-status-description-->

## Usage

`zos file list status [fileName*] --path | -p <path> --limit <limit>`

## Positional Arguments

- `fileName*`

    - Specify the file name to narrow down the results. Wildcard character * and ? is supported.

## Options 

- `--path` *(string)*
    - Specify the directory that contains the files and directories to be listed.

- `--limit` *(number)*
    - Specify the number of the files to display.

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
