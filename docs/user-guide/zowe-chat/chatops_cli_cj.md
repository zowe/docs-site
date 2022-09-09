# @botname critical-job

This command is used to operate on critical job to show the status.

## Syntax

```

1  @*botname*
2.1 critical-job
2.1 cj
2.1   list
2.2.1 ?  status? *job\_name*
2.2.2.1 --engine-name
2.2.2.1 --en
2.2.1 *engine\_name*
2.2.1? 
2.2.2.1 --job-stream-name
2.2.2.1 --jsn
2.2.1 *job\_stream\_name*
2.2.1? 
2.2.2.1 --scheduled-time
2.2.2.1 --st
2.2.1 *yyyy-mm-dd'T'hh:mm:ss.sss'Z'*
2.2.1? 
2.2.2.1 --job-number
2.2.2.1 --ju
2.2.1 *job\_number*
2.2.1? 
2.2.2.1 --workstation-name
2.2.2.1 --wn
2.2.1 *workstation\_name*
2.2.1? 
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
2.2.1? 
2.2.2.1 --job-risk
2.2.2.1 --jr
2.2.2.1 *high*
2.2.2.1 *no*
2.2.2.1 *potential*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status of critical jobs.

    -   **status**

        Shows the status or details of critical jobs. To narrow down returned results, you can specify the following positional argument.

        -   **job\_name**

            This positional argument is OPTIONAL. It specifies the name of the target critical job that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of the target resource to narrow down the result.

        -   **--job-stream-name\|--jsn job\_stream\_name**

            This option is OPTIONAL. It specifies the job stream name of the target resource to narrow down the result.

        -   **--scheduled-time\|--st yyyy-mm-dd'T'hh:mm:ss.sss'Z'**

            This option is OPTIONAL. It specifies the scheduled time of the target resource to narrow down the result.

        -   **--job-number\|--ju job\_number**

            This option is OPTIONAL. It specifies the job number of the target resource to narrow down the result.

        -   **--workstation-name\|--wn workstation\_name**

            This option is OPTIONAL. It specifies the workstation name of the target resource to narrow down the result.

        -   **--job-state\|--js waiting\|ready\|running\|successful\|error\|canceled\|held\|undecided\|blocked\|suppress**

            This option is OPTIONAL. It specifies the job state of the target resource to narrow down the result. You can choose among complete, suppressed, started, ready, waiting, held, undecided, blocked, and error.

        -   **--job-risk\|--jr high\|no\|potential**

            This option is OPTIONAL. It specifies the job risk of the target critical job to narrow down the result. You can choose among high, no, and potential.


## Examples

|Action|Object|Command|Explanation|
|------|------|-------|-----------|
|list|status|`@bnz critical-job list status --engine-name SAT1IWS --workstation-name SAC2 --job-stream-name OPACAPPL1 --job-state error --job-risk high`|Shows the status of critical job which is in error state and has high risk on engine SAT1IWS, workstation SAC2 and job stream OPACAPPL1.|
|`@bnz cj list status INGMVE#1 --engine-name SAT1IWS --job-stream-name OPACAPPL1 --scheduled-time 2020-10-23T23:23:20.000Z --job-number 20`|Shows the status of critical job INGMVE\#1 whose scheduled time is 2020-10-23T23:23:20.000Z and job number is 20 on engine SAT1IWS and job stream OPACAPPL1.|
|`@bnz cj list status INGMVE* --en SAT1IWS --wn SAC2`|Shows the status of critical job whose name starts with INGMVE on engine SAT1IWS and workstation SAC2.|

