# @botname job-stream

This command is used to operate on job stream to show status, jobs, critical jobs or set the status of job streams.

## Syntax

```

1  @*botname*
2.1 job-stream
2.1 js
2.1   list
2.2.1 ?  status? *job\_stream\_name*
2.2.2.1 --engine-name
2.2.2.1 --en
2.2.1 *engine\_name*
2.2.1? 
2.2.2.1 --scheduled-time
2.2.2.1 --st
2.2.1 *yyyy-mm-dd'T'hh:mm:ss.sss'Z'*
2.2.1? 
2.2.2.1 --deadline-time
2.2.2.1 --dt
2.2.1 *yyyy-mm-dd'T'hh:mm:ss.sss'Z'*
2.2.1  job? *job\_name* 
2.2.2.1 --engine-name
2.2.2.1 --en
2.2.1 *engine\_name*? 
2.2.2.1 --job-stream-name
2.2.2.1 --jsn
2.2.1 *job\_stream\_name*? 
2.2.2.1 --scheduled-time
2.2.2.1 --st
2.2.1 *yyyy-mm-dd'T'hh:mm:ss.sss'Z'*? 
2.2.2.1 --job-number
2.2.2.1 --ju
2.2.1 *job\_number*? 
2.2.2.1 --workstation-name
2.2.2.1 --wn
2.2.1 *workstation\_name*? 
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
2.2.1  
2.2.2.1 --critical-job
2.2.2.1 --cj
2.2.1? *job\_name* 
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
2.1   set  status
2.2.1 *complete*
2.2.1 *waiting* 
2.2.1 --engine-name
2.2.1 --en
2.1 *engine\_name* 
2.2.1 --scheduled-time
2.2.1 --st
2.1 *yyyy-mm-dd'T'hh:mm:ss.sss'Z'*  
2.2.1 --deadline-time
2.2.1 --dt
2.1 *yyyy-mm-dd'T'hh:mm:ss.sss'Z'* 
2.2.1 --job-stream-name
2.2.1 --jsn
2.1 *job\_stream\_name*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status, jobs or critical jobs of job streams.

    -   **status**

        Shows the status or details of job streams. To narrow down returned results, you can specify the following positional argument.

        -   **job\_stream\_name**

            This positional argument is OPTIONAL. It specifies the name of the target job stream that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of the target job stream to narrow down the result.

        -   **--scheduled-time\|--st yyyy-mm-dd'T'hh:mm:ss.sss'Z'**

            This option is OPTIONAL. It specifies the scheduled time of the target resource to narrow down the result.

        -   **--deadline-time\|--dt yyyy-mm-dd'T'hh:mm:ss.sss'Z'**

            This option is OPTIONAL. It specifies the deadline time of the target resource to narrow down the result.

        If you want to list a specific job stream, you need specify the following option.

        -   **--engine-name\|--enengine\_name**
        -   **--scheduled-time\|--styyyy-mm-dd'T'hh:mm:ss.sss'Z'**
        -   **--deadline-time\|--dt yyyy-mm-dd'T'hh:mm:ss.sss'Z'**



    -   **job**

        Shows all jobs of the job stream. To narrow down returned results, you can specify the following positional argument.

        -   **job\_name**

            This positional argument is OPTIONAL. It specifies the name of the target job that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of target resource to narrow down the result.

        -   **--job-stream-name\|--jsn job\_stream\_name**

            This option is OPTIONAL. It specifies the job stream name of the target job to narrow down the result.

        -   **--scheduled-time\|--st yyyy-mm-dd'T'hh:mm:ss.sss'Z'**

            This option is OPTIONAL. It specifies the scheduled time of the target job to narrow down the result.

        -   **--job-number\|--ju job\_number**

            This option is OPTIONAL. It specifies the job number of the target job to narrow down the result.

        -   **--workstation-name\|--wn workstation\_name**

            This option is OPTIONAL. It specifies the workstation name of the target job to narrow down the result.

        -   **--job-state\|--js waiting\|ready\|running\|successful\|error\|canceled\|held\|undecided\|blocked\|suppress**

            This option is OPTIONAL. It specifies the job state of the target job to narrow down the result. You can choose among complete, suppressed, started, ready, waiting, held, undecided, blocked, and error.

    -   **critical job**

        Shows all critical jobs of the job stream. To narrow down returned results, you can specify the following positional argument.

        -   **job\_name**

            This positional argument is OPTIONAL. It specifies the name of the target critical job that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of target resource to narrow down the result.

        -   **--job-stream-name\|--jsn job\_stream\_name**

            This option is OPTIONAL. It specifies the job stream name of the target critical job to narrow down the result.

        -   **--scheduled-time\|--st yyyy-mm-dd'T'hh:mm:ss.sss'Z'**

            This option is OPTIONAL. It specifies the scheduled time of the target critical job to narrow down the result.

        -   **--job-number\|--ju job\_number**

            This option is OPTIONAL. It specifies the job number of the target critical job to narrow down the result.

        -   **--workstation-name\|--wn workstation\_name**

            This option is OPTIONAL. It specifies the workstation name of the target critical job to narrow down the result.

        -   **--job-state\|--js waiting\|ready\|running\|successful\|error\|canceled\|held\|undecided\|blocked\|suppress**

            This option is OPTIONAL. It specifies the job state of the target critical job to narrow down the result. You can choose among complete, suppressed, started, ready, waiting, held, undecided, blocked, and error.

        -   **--job-risk\|--jr high\|no\|potential**

            This option is OPTIONAL. It specifies the job risk of the target critical job to narrow down the result. You can choose among high, no, and potential.

-   **Set**

    Sets the job streams.

    -   **status**

        Sets the status of job streams. You must specify the following positional argument.

        -   **complete/waiting**

            This argument is REQUIRED. It specifies the value of job streams status. You can choose among active, offline, and failed.

        You must also specify the following option.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of the job stream.

        -   **--scheduled-time\|--st yyyy-mm-dd'T'hh:mm:ss.sss'Z'**

            This option is REQUIRED. It specifies the scheduled time of the job stream.

        -   **--deadline-time\|--dt yyyy-mm-dd'T'hh:mm:ss.sss'Z'**

            This option is REQUIRED. It specifies the deadline time of the job stream.

        -   **--job-stream-name\|--jsn job\_stream\_name**

            This option is REQUIRED. It specifies the name of the job stream.


## Examples

|Action|Object|Command|Explanation|
|------|------|-------|-----------|
|list|status|`@bnz job-stream list status --engine-name SAT1IWS`|Shows the status of job streams on engine SAT1IWS.|
|`@bnz js list status --en SAT1IWS`|Shows the status of job streams on engine SAT1IWS.|
|`@bnz js list status OPACAPPL1 --en SAT1IWS --st 2020-10-23T23:23:20.000Z --dt 2020-10-23T23:23:23.000Z`|Shows the status of job stream OPACAPPL1 whose scheduled time is 2020-10-23T23:23:20.000Z and deadline time is 2020-10-23T23:23:23.000Z on engine SAT1IWS.|
|`@bnz js list status OPACAPPL* --en SAT1IWS`|Shows the job stream whose name starts with OPACAPPL on engine SAT1IWS.|
|job|`@bnz job-stream list job --engine-name SAT1IWS --workstation-name SAC2 --job-stream-name OPACAPPL1 --job-state error`|Shows the job which is in error state on engine SAT1IWS, workstation SAC2 and job stream OPACAPPL1.|
|`@bnz js list job INGMVE#1 --en SAT1IWS --jsn OPACAPPL1 --st 2020-10-23T23:23:20.000Z --ju 20`|Shows the job INGMVE\#1 whose scheduled time is 2020-10-23T23:23:20.000Z and job number is 20 on engine SAT1IWS and job stream OPACAPPL1.|
|`@bnz js list job INGMVE* --en SAT1IWS`|Shows the job whose name starts with INGMVE on engine SAT1IWS.|
|critical job|`@bnz job-stream list critical-job --engine-name SAT1IWS --workstation-name SAC2 --job-stream-name OPACAPPL1 --job-state error --job-risk high`|Shows critical job which is in error state and has high risk on engine SAT1IWS, workstation SAC2 and job stream OPACAPPL1.|
|`@bnz js list cj INGMVE#1 --en SAT1IWS --jsn OPACAPPL1 --st 2020-10-23T23:23:20.000Z --ju 20`|Shows the critical job INGMVE\#1 whose scheduled time is 2020-10-23T23:23:20.000Z and job number is 20 on engine SAT1IWS and job stream OPACAPPL1.|
|`@bnz js list cj INGMVE* --en SAT1IWS`|Shows the critical job whose name starts with INGMVE on engine SAT1IWS.|
|set|status|`@bnz job-stream set status complete --engine-name SAT1IWS --scheduled-time 2020-10-23T23:23:20.000Z --deadline-time 2020-10-23T23:23:23.000Z --job-stream-name OPACAPPL1`|Sets the status of job stream OPACAPPL1 whose scheduled time is 2020-10-23T23:23:20.000Z, and deadline time is 2020-10-23T23:23:23.000Z on engine SAT1IWS to complete.|
|`@bnz job-stream set status waiting --en SAT1IWS --st 2020-10-23T23:23:20.000Z --dt 2020-10-23T23:23:23.000Z --jsn OPACAPPL1`|Sets the status of job stream OPACAPPL1 whose scheduled time is 2020-10-23T23:23:20.000Z, and deadline time is 2020-10-23T23:23:23.000Z on engine SAT1IWS to waiting.|

