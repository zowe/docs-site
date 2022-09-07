# @botname jvm

This command is used to operate on `Java virtual machine`\(JVM\) to show the status or lock utilizations.

## Syntax

```

1  @*botname*
2.1 jvm
1  list
2.1?  status? *job\_name*
2.1 
2.2.1 lock
2.1? *job\_name*
2.1 
2.2.1 --jvm-process-id
2.2.1 --jpi
2.1 *jvm\_process\_id*
2.1 
2.2.1 --collector-id
2.2.1 --ci
2.1 *collector\_id*
2.1 
2.2.1 --smf-id
2.2.1 --si
2.1 *smf\_id*
1?  --limit *number*
```



## Usage

-   **list**

    Shows the status or lock utilizations of JVM.

    -   **status**

        Shows the status or details of JVM. To narrow down returned results, you can specify the following positional argument.

        -   **job\_name**

            This argument is OPTIONAL. It specifies the name of the target job that you want to show. Wildcard character **\*** is supported.

    -   **lock**

        Shows the lock utilizations of JVM. To narrow down returned results, you can specify the following positional argument.

        -   **job\_name**

            This argument is OPTIONAL. It specifies the name of the target job that you want to show. Wildcard character **\*** is supported.

        You can also specify the following option.

        -   **--jvm-process-id\|--jpi jvm\_process\_id**

            This option is REQUIRED. It specifies the JVM process ID of target resource to narrow down the result.

        -   **--collector-id\|ci collector\_id**

            This option is REQUIRED. It specifies the JVM collector ID of target resource to narrow down the result.

        -   **--smf-id\|si smf\_id**

            This option is REQUIRED. It specifies the SMF ID of target resource to narrow down the result.


## Examples

-   **`@bnz jvm list`**

    Shows the status of JVM.

-   **`@bnz jvm list status`**

    Shows the status of JVM.

-   **`@bnz jvm list status ING3`**

    Shows the status of the JVM whose job name is ING3.

-   **`@bnz jvm list status ING*`**

    Shows the status of the JVM whose job name starts with ING.

-   **`@bnz jvm list lock --jvm-process-id 121273 --collector-id KJMA --smf-id MVST`**

    Shows the lock utilization whose JVM process ID is 121273 for JVM collector KJMA on the system node MVST.

-   **`@bnz jvm list lock ING3 --jpi 121273 --ci KJMA --si MVST`**

    Shows the lock utilization whose job name is ING3 and the JVM process ID is 121273 for JVM collector KJMA on the system node MVST.

-   **`@bnz jvm list lock ING* --jpi 121273 --ci KJMA --si MVST`**

    Shows the lock utilization whose JVM process ID is 121273 and job name starts with ING for JVM collector KJMA on the system node MVST.


