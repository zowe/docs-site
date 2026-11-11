# zos dataset

**[zos](.././zos-article.md) > [dataset](dataset-article.md)**

Manages z/OS data sets. <!--dataset-description-->

## Usage 

```zos dataset list status [datasetName*] --dsname-level | --dl <dsnamelevel> --volume-serial | --vs <volumeserial> --start | -s <firstDatasetName> --limit <limit>```

```zos dataset list member [datasetMemberName*] --dataset-name | --dn <datasetName> --limit <limit>```

## Action

- [`list`](./list/list-article.md)

## Positional Arguments

- [zos dataset list status](./list/zos-dataset-list-status.md#positional-arguments)

    - `datasetName*`

- [zos dataset list member](./list/zos-dataset-list-member.md#positional-arguments)

    - `datasetMemberName*`

## Options

- [zos dataset list status](./list/zos-dataset-list-status.md#options)

    | Full name  | Alias | Type |
    | :---- | :----  | :---- |
    | --dsname-level | --dl | string |
    | --volume-serial| --vs | string |
    | --start | -s | string |
    | --limit |  | number |

- [zos dataset list member](./list/zos-dataset-list-member.md#options)

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
