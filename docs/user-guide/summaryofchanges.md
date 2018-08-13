# Summary of changes for Open Beta

Learn about what is new, changed, and removed in Open Beta for Zowe.

## Version 0.9.0 (August 2018)

Version 0.9.0 is the first Open Beta version for Zowe. This version contains the following changes since the last Closed Beta version.

### What's new

**New component - API Mediation Layer**

Zowe now contains a component named API Mediation Layer. You install API Mediation Layer when you install the Zowe runtime on z/OS. For more information, see [API Mediation Layer](introduction.md#api-mediation-layer) and [Installing zLUX, explorer server, and API Mediation Layer](install-zos.md#installing-the-zowe-runtime-on-z-os).

### What's changed
**Naming**

- The project is now named Zowe.
- Zoe Brightside is renamed to Zowe CLI.

**zLUX**

The mainframe account under which the ZSS server runs must have UPDATE permission on the `BPX.DAEMON` and `BPX.SERVER` facility class profiles.

**Explorer server**

The System Display and Search Facility (SDSF) of z/OS is no longer a prerequisite for installing explorer server.

### What's removed

Removed all references to SYSLOG.
