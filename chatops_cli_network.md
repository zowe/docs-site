# @botname network

This command is used to operate on `network` to show the status or listeners.

## Syntax

```

1  @*botname*
2.1 network
1  list
2.1?  status? *network\_job\_name*
2.1 
2.2.1 listener
2.1? *port\_number*
2.1 
2.2.1 --network-job-name
2.2.1 --njn
2.1 *network\_job\_name*
2.1 
2.2.1 --smf-id
2.2.1 --si
2.1 *smf\_id*
1?  --limit *number*
```



## Usage

-   **list**

    Shows network status or listeners.

    -   **status**

        Shows the status or details of network. To narrow down returned results, you can specify the following positional argument.

        -   **network\_job\_name**

            This argument is OPTIONAL. It specifies the job name of the target network that you want to show. Wildcard character **\*** is supported.

    -   **listener**

        Shows the listeners of network. To narrow down returned results, you can specify the following positional argument.

        -   **port\_number**

            This argument is OPTIONAL. It specifies the port number of the target network that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--network-job-name\|--njn network\_job\_name**

            This option is REQUIRED. It specifies the network job name of target resource to narrow down the result.

        -   **--smf-id\|si smf\_id**

            This option is REQUIRED. It specifies the SMF ID of target resource to narrow down the result.


## Examples

-   **`@bnz network list`**

    Shows the status of network.

-   **`@bnz network list status`**

    Shows the status of network.

-   **`@bnz network list status IBMSM`**

    Shows the status of network job named IBMSM.

-   **`@bnz network list status IB*SM`**

    Shows the status of the network job whose name starts with IB and ends with SM.

-   **`@bnz network list listener --network-job-name IBMSM --smf-id MVST`**

    Shows all listeners of the network job named IBMSM on the system node MVST.

-   **`@bnz network list listener 4035 --njn IBMSM -si MVST`**

    Shows the listener whose port number is 4035 of the network job named IBMSM on the system node MVST.

-   **`@bnz network list listener 403* --njn IBMSM -si MVST`**

    Shows the listener whose port number starts with 403 of the network job named IBMSM on the system node MVST.


