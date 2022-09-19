# @botname mq

This command is used to operate on `MQ` to show the status or queues.

## Syntax

```

1  @*botname*
2.1 mq
1  list
2.1?  status? *queue\_manager\_name*
2.1 
2.2.1 queue
2.1? *queue\_name*
2.1 
2.2.1 --queue-manager-name
2.2.1 --qmn
2.1 *queue\_manager\_name*
2.1 
2.2.1 --smf-id
2.2.1 --si
2.1 *smf\_id*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status or queues of MQ.

    -   **status**

        Shows the status or details of MQ. To narrow down returned results, you can specify the following positional argument.

        -   **queue\_manager\_name**

            This argument is OPTIONAL. It specifies the name of the target queue manager that you want to show. Wildcard character **\*** is supported.

    -   **queue**

        Shows the queues of MQ. To narrow down returned results, you can specify the following positional argument.

        -   **queue\_name**

            This argument is OPTIONAL. It specifies the name of the target queue that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--queue-manager-name\|--qmn queue\_manager\_name**

            This option is REQUIRED. It specifies the queue manager name of target resource to narrow down the result.

        -   **--smf-id\|si smf\_id**

            This option is REQUIRED. It specifies the SMF ID of target resource to narrow down the result.


## Examples

-   **`@bnz mq list`**

    Shows the status of MQ.

-   **`@bnz mq list status`**

    Shows the status of MQ.

-   **`@bnz mq list status WMQT`**

    Shows the status of the MQ whose queue manager name is WMQT.

-   **`@bnz mq list status WM*`**

    Shows the status of the MQ whose queue manager name starts with WM.

-   **`@bnz mq list queue --queue-manager-name WMQT --smf-id MVST`**

    Shows the queue of the queue manager whose name is WMQT on the system node MVST.

-   **`@bnz mq list queue EAP.S1.XMIT.Q1 --qmn WMQT --si MVST`**

    Shows the queue whose name is EAP.S1.XMIT.Q1 of the queue manager whose name is WMQT on the system node MVST.

-   **`@bnz mq list queue EA* --qmn WMQT --si MVST`**

    Shows the queue whose name starts with EA of the queue manager whose name is WMQT on the system node MVST.


