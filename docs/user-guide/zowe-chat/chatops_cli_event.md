# @botname event

This command is used to operate on `event` to show the status.

## Syntax

```

1  @*botname*
2.1 event
1  list
1?  status? ? *event\_summary* 
2.1 --component
2.1 --c
2.1 zos
2.1 cics
2.1 db2
2.1 jvm
2.1 ims
2.1 network
2.1 was
2.1 storage
2.1 mq
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status of event.

    -   **status**

        Shows the status or details of event. To narrow down returned results, you can specify the following positional argument.

        -   **event\_summary**

            This argument is OPTIONAL. It specifies the summary of the target event that you want to show. Wildcard character **\*** is supported.

        You can also specify the following options.

        -   **--component\|--c zos\|cics\|db2\|jvm\|ims\|network\|was\|storage\|mq**

            This option is OPTIONAL. It specifies the name of target component to narrow down the result. You can choose among zos, cics, db2, jvm, ims, network, was, storage, and mq.


## Examples

-   **`@bnz event list`**

    Shows the status of event.

-   **`@bnz event list status`**

    Shows the status of event.

-   **`@bnz event list status --component zos`**

    Shows the status of event from zos.

-   **`@bnz event list status "Sysplex * is not active" --c zos`**

    Shows the status of event from zos whose event summary starts with Sysplex and ends with "is not active".


