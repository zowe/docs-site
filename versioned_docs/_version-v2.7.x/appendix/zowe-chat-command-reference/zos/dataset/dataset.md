# zos dataset

**[zos](.././zos) > [dataset](dataset)**

Manages z/OS data sets. <!--dataset-description-->

## Usage 

```zos dataset list status [datasetName*] --dsname-level | --dl <dsnamelevel> --volume-serial | --vs <volumeserial> --start | -s <firstDatasetName> --limit <limit>```

```zos dataset list member [datasetMemberName*] --dataset-name | --dn <datasetName> --limit <limit>```

## Action

- [`list`](./list/list)

## Positional Arguments

- [zos dataset list status](./list/zos-dataset-list-status#positional-arguments)

    - `datasetName*`

- [zos dataset list member](./list/zos-dataset-list-member#positional-arguments)

    - `datasetMemberName*`

## Options

- [zos dataset list status](./list/zos-dataset-list-status#options)

    | Full name  | Alias | Type |
    | :---- | :----  | :---- |
    | --dsname-level | --dl | string |
    | --volume-serial| --vs | string |
    | --start | -s | string |
    | --limit |  | number |

- [zos dataset list member](./list/zos-dataset-list-member#options)

    | Full name  | Alias | Type |
    | :---- | :----  | :---- |
    | --dataset-name | --dn | string |
    | --limit |  | number |

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

```
@bot dataset list member --dn user.asm
``` 
- Show members of the data set "user.asm".
