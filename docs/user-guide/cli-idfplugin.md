# IDF Plug-in for Zowe CLI

The IDF Plug-in for Zowe CLI lets you extend Zowe CLI such that it can make it easier to map mainframe users with an identity provided by an external identity provider.

The Plug-in is designed to work with the ESMs: IBM RACF, Broadcom ACF/2 and Broadcom Top Secret.

## Use case

As a system administrator for the Zowe API Mediation Layer, the IDF Plug-in for Zowe CLI can be leveraged to facilitate the mapping of an external identity from a distributed identity provider to mainframe users administered by the system ESM.

## Commands

The Plug-in provides the `map` command, see [Usage](#usage) for details on how to use it.

**Note:** The Plug-in help command includes Zowe-profiles specific parameters which are not used.

## Software requirements

Before you install the plug-in, meet the software requirements in [Software requirements for Zowe CLI plug-ins](cli-swreqplugins.md).

## Installing

Use one of the following methods to install or update the plug-in:

- [Installing plug-ins from an online registry](cli-installplugins.md#installing-plug-ins-from-an-online-registry)

- [Installing plug-ins from a local package](cli-installplugins.md#installing-plug-ins-from-a-local-package)

The instructions described before can be used to install the CLI Plug-in, using the following Plug-in ID:

    | Plug-in | Syntax |
    |---------|-----------------------------|
    | IDF Plugin for Zowe CLI | `@zowe/zowe-cli-id-federation-plugin` |

## Usage

At this stage, the Plug-in does not interface with the mainframe system, so no Zowe CLI profile configuration is required.

Use `zowe idf map --help` to get the most up-to-date details of the required parameters.

`zowe idf map "$CSV" --esm "$ESM" --system "$SYSTEM" --registry "$REGISTRY"`

- `$CSV`: Path to the input CSV-formatted file, see below for the details of the format.
- `$ESM`: Identifier of the target ESM, one of ACF2, TSS or RACF.
- `$SYSTEM`: Optional parameter, system identifier for JCL purposes.
- `REGISTRY`: Registry to identify the distributed identity provider, for example LDAP `ldap://12.34.56.78:389`

### CSV Format

The CSV input file must have te following format for the Plug-in to work properly, without header:

```csv
name, dist_id, mf_id
```

Where:

- `name`: The descriptive name of the user.
- `dist_id`: The distributed identity of the user.
- `mf_id`: The mainframe id of the user.

### Output

The `map` command generates an output file with a valid JCL, the output file name has the following pattern:

`idf_$ESM$SYSTEM.jcl`

Where `$SYSTEM` is ommited if it is not provided.
