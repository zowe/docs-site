# `zos dataset list member`

**[zos](../../zos) > [dataset](../dataset) > [list](./list) > [member](zos-dataset-list-member)**

Show all members of a partitioned data set. <!--dataset-list-member-description-->

## Usage

```zos dataset list member [datasetMemberName*] --dataset-name | --dn <datasetName> --limit <limit>```

## Positional Arguments

- `datasetMemberName*`

    - Specify the member name to narrow down the results. Wildcard character is supported, please refer to the z/OSMF Dataset REST endpoint documentation.

## Options 

- `--dataset-name` *(string)*
    - Specify the name of the data set of which you want to list the members. Wildcard character is supported, please refer to the z/OSMF Dataset REST endpoint documentation.

- `--limit` *(number)*
    - Specify the number of the data set members to display.

## Examples

```
@bot zos dataset list member
```
- List all data set members with default settings. The command returns data set members owned by your HLQ name.

```
@bot dataset list member --dn user.asm
``` 
- Show members of the data set "user.asm".