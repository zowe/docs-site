# @botname mq list queue

List mq queue.

## Usage

`@botname mq list queue \*queuename options`

## Positional arguments

-   **\*queuename**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--queue-manager-name \(qmn\) queue manager name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz mq list queue --queue-manager-name WMQT`**

    List queue of queue-manager WMQT.

-   **`@bnz mq list queue EAP.S1.XMIT.Q1 --qmn WMQT`**

    List queue EAP.S1.XMIT.Q1 of queue-manager WMQT.


