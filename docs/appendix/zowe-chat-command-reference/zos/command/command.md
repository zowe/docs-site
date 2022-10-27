# zos command

**[zos](.././zos) > [command](command)**

Interact with z/OS command related services, including z/OSMF Console services, etc.

## Usage

`zos command issue console <positional argument> <option>`

## Action

- [`issue`](./issue/issue)

## Positional Arguments

- [zos command issue console](./issue/zos-command-issue-console#positional-arguments)

    - `cmdString`

## Options

- [zos command issue console](./issue/zos-command-issue-console#options)

    | Full name  | Alias | Type |
    | :---- | :----  | :---- |
    | --path | p | string |
    | --limit |  | number |

## Examples

```
@bot zos command issue console “d a ,l”
```
- Issue a simple command.

```
@bot zos command issue console "d a,l" --console-name test
```
- Issue a z/OS console command with a console name.
