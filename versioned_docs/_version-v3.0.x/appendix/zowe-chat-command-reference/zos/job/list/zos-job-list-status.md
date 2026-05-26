# zos job list status

**[zos](../../zos-article) > [job](../job-article) > [list](./list-article) > [status](zos-job-list-status)**

Show status or detail of jobs. <!--job-list-status-description-->

## Usage

```zos job list status [jobID] --owner | -o <owner> --prefix | -p <prefix> --limit <limit>``` 

## Positional Arguments

- `jobID`

    - Specify the job ID to narrow down the results.

## Options

- `owner | o` *(string)*
    - Specify the owner of the jobs you want to list. The owner is the individual/user who submitted the job OR the user ID assigned to the job. The command does not prevalidate the owner. You can specify a wildcard according to the z/OSMF Jobs REST endpoint documentation, which is usually in the form "USER*"

- `prefix | p` *(string)*
    - Specify the job name prefix of the jobs you want to list. The command does not prevalidate the owner. You can specify a wildcard according to the z/OSMF Jobs REST endpoint documentation, which is usually in the form "JOB*".

- `--limit` *(number)*
    - Specify the number of the jobs to display.

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