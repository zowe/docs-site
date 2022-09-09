# @botname netview-domain list canzlog

List netview-domain canzlog.

## Usage

`@botname netview-domain(nd) list canzlog \*message options`

**Note:** You can type either `netview-domain` or `nd` in the command.

## Positional arguments

-   **\*message**

    Positional arguments are used to specify the name of resource object.


## Options

-   **--domain-name \(dn\) domain-name**

    Options are used to specify the location of resource object. Options are required for this command.


## Examples

-   **`@bnz netview-domain list canzlog --domain-name CNM19`**

    List the canzlog of netview-domain CMN19.

-   **`@bnz nd list canzlog --dn CNM19`**

    List the canzlog of netview-domain CMN19.

-   **`@bnz nd list canzlog IEC070I ICFCAT.VCAN001 --dn CNM19`**

    List the canzlog which message is IEC070I ICFCAT.VCAN001 of netview-domain CNM19.

-   **`@bnz nd list canzlog IEC070I* --dn CNM19`**

    List the canzlog which message startes with IEC070I of netview-domain CNM19.


