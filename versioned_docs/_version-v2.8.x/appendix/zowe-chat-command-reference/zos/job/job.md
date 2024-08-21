# zos job

**[zos](../zos) > [job](job)**

Manage z/OS jobs.  <!--job-description-->

## Usage

`zos job list status [jobID] --owner | -o <owner> --prefix | -p <prefix> --limit <limit>`

## Action

- [`list`](./list/list)

## Positional Arguments

-  [zos job list status](./list/zos-job-list-status#positional-arguments)

    - `jobID`

## Options

- [zos job list status](./list/zos-job-list-status#options)

    | Full name  | Alias | Type |
    | :---- | :----  | :---- |
    | --owner | -o | string |
    | --prefix | -p | string |
    | --limit |  | number |

## Examples
```
@bot zos job 
```
```
@bot zos job list
```
```
@bot zos job list status
```

- All three commands can list all jobs with default settings. The command returns jobs owned by your user ID with any job name.

```
@bot zos job -o zow* -p myjo*
```
```
@bot zos job list status -o zow* -p myjo*
``` 

- Both the two commands can list all jobs owned by the users who have IDs starting with 'zow' and job names starting with 'myjo'.

```
@bot zos job list status TSU15026
```
   
 - Show the job with job ID "TSU15026".
