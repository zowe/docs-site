# @botname workstation

This command is used to operate on workstation to show status, jobs, critical jobs or set the status of workstations.

## Syntax

```

1  @*botname*
2.1 workstation
2.1   list
2.2.1 ?  status? *workstation\_name*
2.2.2.1 --engine-name
2.2.2.1 --en
2.2.1 *engine\_name*
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
2.2.2.1 critical-job
2.2.2.1 cj
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
2.2.1 *active*
2.2.1 *offline*
2.2.1 *failed* 
2.2.1 --engine-name
2.2.1 --en
2.1 *engine\_name* 
2.2.1 --workstation-name
2.2.1 --wn
2.1 *workstatioin\_id* 
2.2.1 --started-job-status
2.2.1 --sjs
2.2.1 *leave*
2.2.1 *error*
2.2.1 *restart* 
2.2.1 --alternate-workstation
2.2.1 --aw
2.1 *workstation\_name*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status, jobs or critical jobs of workstations.

    -   **status**

        Shows the status or details of workstations. To narrow down returned results, you can specify the following positional argument.

        -   **workstation\_name**

            This positional argument is OPTIONAL. It specifies the name of the target workstation that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of the target workstation to narrow down the result.

    -   **job**

        Shows all jobs of the workstation. To narrow down returned results, you can specify the following positional argument.

        -   **job\_name**

            This positional argument is OPTIONAL. It specifies the name of the target job that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of the target job to narrow down the result.

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

        Shows all critical jobs of the workstation. To narrow down returned results, you can specify the following positional argument.

        -   **job\_name**

            This positional argument is OPTIONAL. It specifies the name of the target critical job that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of the target resource to narrow down the result.

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

    Sets the workstations.

    -   **status**

        Sets the status of workstations. You must specify the following positional argument.

        -   **active/offline/failed**

            This argument is REQUIRED. It specifies the value of workstation status. You can choose among active, offline, and failed.

        You can also specify the following option.

        -   **--engine-name\|--en engine\_name**

            This option is REQUIRED. It specifies the engine name of the workstation.

        -   **--workstation-name\|--wn workstation\_name**

            This option is REQUIRED. It specifies the workstation name of the workstation

        -   **--started-job-status\|--sjs leave\|error\|restart**

            This option is OPTIONAL. It specifies the started job status of the workstation. You can choose among leave, error and restart.

        -   **--alternate-workstation\|--aw workstation\_name**

            This option is OPTIONAL. It specifies which workstation to reroute jobs from the target workstation.


## Examples

|Action|Object|Command|Explanation|
|------|------|-------|-----------|
|list|status|`@bnz workstation list --engine-name SAT1IWS`|Shows the status of workstation on engine SAT1IWS.|
|`@bnz workstation list status --en SAT1IWS`|Shows the status of workstation on engine SAT1IWS.|
|`@bnz workstation list status SAC2 --en SAT1IWS`|Shows the status of workstation whose name is SAC2 on engine SAT1IWS.|
|`@bnz workstation list status SAC* --en SAT1IWS`|Shows the status of workstation whose name starts with SAC on engine SAT1IWS.|
|job|`@bnz workstation list job --engine-name SAT1IWS`|Shows all the jobs on engine SAT1IWS.|
|`@bnz workstation list job --engine-name SAT1IWS --workstation-name SAC2 --job-stream-name OPACAPPL1 --job-state error`|Shows the job which is in error state on engine SAT1IWS, workstation SAC2 and job stream OPACAPPL1.|
|`@bnz workstation list job INGMVE#1 --engine-name SAT1IWS --job-stream-name OPACAPPL1 --scheduled-time 2020-10-23T23:23:20.000Z --job-number 20`|Shows the job INGMVE\#1 whose scheduled time is 2020-10-23T23:23:20.000Z and job number is 20 on engine SAT1IWS and job stream OPACAPPL1.|
|`@bnz workstation list job INGMVE* --en SAT1IWS`|Shows the job whose name starts with INGMVE on engine SAT1IWS.|
|critical job|`@bnz workstation list critical-job --engine-name SAT1IWS`|Shows all the critical jobs on engine SAT1IWS.|
|`@bnz workstation list critical-job --engine-name SAT1IWS --workstation-name SAC2 --job-stream-name OPACAPPL1 --job-state error --job-risk high`|Shows the critical job which is in error state and has high risk on engine SAT1IWS, workstation SAC2 and job stream OPACAPPL1.|
|`@bnz workstation list cj INGMVE#1 --en SAT1IWS --jsn OPACAPPL1 --st 2020-10-23T23:23:20.000Z --ju 20`|Shows the critical job INGMVE\#1 whose scheduled time is 2020-10-23T23:23:20.000Z and job number is 20 on engine SAT1IWS and job stream OPACAPPL1.|
|`@bnz workstation list cj INGMVE* --en SAT1IWS --wn SAC2`|Shows the critical job whose name starts with INGMVE on engine SAT1IWS and workstation SAC2.|
|set|status|`@bnz workstation set status active --engine-name SAT1IWS --workstation-name SAC1 --started-job-status leave`|Sets the status of workstation whose name is SAC1 on engine SAT1IWS to active and the started job status to leave.|
|`@bnz workstation set status offline --engine-name SAT1IWS --workwtation name SAC1 --started-job-status restart --alternate-workstatioin SAC2`|Sets the status of workstation whose name is SAC1 on engine SAT1IWS to offline and the started job status to restart and reroutes the job to workstation SAC2.|

