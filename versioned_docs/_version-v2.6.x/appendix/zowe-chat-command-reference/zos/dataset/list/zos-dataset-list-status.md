# zos dataset list status

**[zos](../../zos) > [dataset](../dataset) > [list](list) > [status](zos-dataset-list-status)**

Show status or details of data sets. <!--dataset-list-status-description-->

## Usage

`zos dataset list status [datasetName*] --dsname-level | --dl <dsnamelevel> --volume-serial | --vs <volumeserial> --start | -s <firstDatasetName> --limit <limit>`

## Positional Arguments

- `datasetName*`

    - Specify the data set name to narrow down the results. Wildcard is supported, please refer to the z/OSMF Dataset REST endpoint documentation

## Options 

- `--dsname-level` *(string)*
    - Specify the name or pattern of the data set. Wildcard is supported, please refer to the z/OSMF Dataset REST endpoint documentation.

- `--volume-serial` *(string)*
    - Specify the volume serial (VOLSER) where the data set resides.

- `--start` *(string)*
    - Specify the first data set name to return.

- `--limit` *(number)*
    - Specify the number of the data sets to display.

## Examples

```
@bot zos dataset --dl user.asm
```
```
@bot zos dataset list --dl user.asm
```
```
@bot zos dataset list status --dl user.asm
```
- Show the data set "user.asm".

```
@bot zos dataset list status user.*
```
- Show all data sets of the user "user".