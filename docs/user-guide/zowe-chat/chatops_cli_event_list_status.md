# @botname event list status

List event status.

## Usage

`@botname event list status \*eventSummary options`

## Positional arguments

-   **\*eventSummary**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--component \(c\) zos \| cics \| db2 \| jvm \| ims \| network \| was \| storage \| mq**

    Options are used to specify the location of resource object. You can specify component among zos, cics, db2, jvm, ims, network, was, storage, and mq.


## Examples

-   **`@bnz event list`**

    List event status.

-   **`@bnz event list status`**

    List event status.

-   **`@bnz event list status --component zos`**

    List the status of event from zos.

-   **`@bnz event list status "Sysplex * is not active" --c zos`**

    List the status of event from zos whose event summary starts with Sysplex and ends with "is not active".


