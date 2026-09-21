# zos help list command

**[zos](../../zos-article.md) > [help](../help-article.md) > [list](./list-article.md) > [command](zos-help-list-command.md)**

List help information of the command.

## Usage

`zos help list command [resourceName]`

## Positional Arguments

- `fileName`

    - Specify the command resource to narrow down the results.

## Examples

```
@bot zos help
```
```
@bot zos help list
```
```
@bot zos help list command
```
- All three commands can list all supported Zowe Chat commands.

```
@bot zos help list command job
```
- Show usage and examples of job commands.