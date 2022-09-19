# @botname job

This command is used to operate on job to show the status or set the status of jobs.

## Syntax

```

1  @*botname*
2.1 job
2.1   list
2.2.1 ?  status? *job\_name*
2.2.2.1 --engine-name
2.2.2.1 --en
2.2.1 *engine\_name*
2.2.1 
2.2.2.1 --job-stream-name
2.2.2.1 --jsn
2.2.1 *job\_stream\_name*
2.2.1 
2.2.2.1 --scheduled-time
2.2.2.1 --st
2.2.1 *yyyy-mm-dd'T'hh:mm:ss.sss'Z'*
2.2.1 
2.2.2.1 --job-number
2.2.2.1 --ju
2.2.1 *job\_number*
2.2.1 
2.2.2.1 --workstation-name
2.2.2.1 --wn
2.2.1 *workstation\_name*
2.2.1 
2.2.2.1 --job-state
2.2.2.1 --js
2.2.2.1 *waiting*
2.2.2.1 *ready*
2.2.2.1 *running*
2.2.2.1 *successful*
2.2.2.1 *error*
2.2.2.1 *canceled*
2.2.2.1 *held*
2.2.2.1 *undecided*
2.2.2.1 *blocked*
2.2.2.1 *suppress*
2.1   set  status
2.2.1 *started*
2.2.1 *ready*
2.2.1 *interrupted*
2.2.1 *error*
2.2.1 *complete* 
2.2.1 --engine-name
2.2.1 --en
2.1 *engine\_name* 
2.2.1 --job-name
2.2.1 --jn
2.1 *job\_name* 
2.2.1 --job-stream_name
2.2.1 --jsn
2.1 *job\_stream\_name* 
2.2.1 --scheduled-time
2.2.1 --st
2.1 *yyyy-mm-dd'T'hh:mm:ss.sss'Z'* 
2.2.1 --job-number
2.2.1 --ju
2.1 *job\_number* ? 
2.2.1 --error-code
2.2.1 --ec
2.1 *error\_code*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status of jobs.

    -   **status**

        Shows the status or details of jobs. To narrow down returned results, you can specify the following positional argument.

        -   **job\_name**

            This positional argument is OPTIONAL. It specifies the name of the target job that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of the target job to narrow down the result.

        -   **--job-stream-name\|--jsn job\_stream\_name**

            This option is OPTIONAL. It specifies the job stream name of the target job to narrow down the result.

        -   **--scheduled-time\|--st yyyy-mm-dd'T'hh:mm:ss.sss'Z'**

            This option is OPTIONAL. It specifies the scheduled time of the target job to narrow down the result.

        -   **--job-number\|--ju job\_number**

            This option is OPTIONAL. It specifies the job number of the target job to narrow down the result.

        -   **--workstation-name\|--wn workstation\_name**

            This option is OPTIONAL. It specifies the workstation of target job to narrow down the result.

        -   **--job-state\|--js waiting\|ready\|running\|successful\|error\|canceled\|held\|undecided\|blocked\|suppress**

            This option is OPTIONAL. It specifies the job state of the target job to narrow down the result. You can choose among complete, suppressed, started, ready, waiting, held, undecided, blocked, and error.

-   **Set**

    Sets the jobs.

    -   **status**

        Sets the status of jobs. You must specify the following positional argument.

        -   **started/ready/interrupted/error/complete**

            This argument is REQUIRED. It specifies the value of job status. You can choose among started, ready, interrupted, error and complete.

        You can also specify the following option.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of the target resource.

        -   **--job-name\|--jn job\_name**

            This option is REQUIRED. It specifies the job name of the target resource.

        -   **--job-stream-name\|--jsn job\_stream\_name**

            This option is REQUIRED. It specifies the job stream name of the target resource.

        -   **--scheduled-time\|--st yyyy-mm-dd'T'hh:mm:ss.sss'Z'**

            This option is REQUIRED. It specifies the scheduled time of the target resource.

        -   **--job-number\|--ju job\_number**

            This option is REQUIRED. It specifies the job number of the target resource.

        -   **--error-code\|--ec error\_code**

            This option is OPTIONAL. It specifies the error code of the target resource.


## Examples

|Action|Object|Command|Explanation|
|------|------|-------|-----------|
|list|status|`@bnz job list status --engine-name SAT1IWS --workstation-name SAC2 --job-stream-name OPACAPPL1 --job-state error`|Shows the status of job which is in error state on engine SAT1IWS, workstation SAC2 and job stream OPACAPPL1.|
|`@bnz job list status INGMVE#1 --engine-name SAT1IWS --job-stream-name OPACAPPL1 --scheduled-time 2020-10-23T23:23:20.000Z --job-number 20`|Shows the job INGMVE\#1 whose scheduled time is 2020-10-23T23:23:20.000Z and job number is 20 on engine SAT1IWS and job stream OPACAPPL1.|
|`@bnz job list status INGMVE* --en SAT1IWS --wn SAC2`|Shows the status of job whose name starts with INGMVE on engine SAT1IWS and workstation SAC2.|
|set|status|`@bnz job set status started --engine-name SAT1IWS --job-name INGMVE#1 --job-stream-name OPACAPPL1 --scheduled-time 2020-10-23T23:23:20.000Z --job-number 10`|Sets the status of job whose name is INGMVE\#1, job number is 10 and scheduled time is 2020-10-23T23:23:20.000Z on engine SAT1IWS and job stream OPACAPPL1 to started.|
|`@bnz job set status error --en SAT1IWS --jn INGMVE#1 --jsn OPACAPPL1 --st 2020-10-23T23:23:20.000Z --ju 10 --ec 321`|Sets the status of job whose name is INGMVE\#1, job number is 10, scheduled time is 2020-10-23T23:23:20.000Z and error code is 321 on engine SAT1IWS and job stream OPACAPPL1 to error.|

