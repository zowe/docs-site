# Summary of changes for Open Beta

Learn about what is new, changed, and removed in Open Beta for Zowe.

## Version 0.9.0 (August 2018)

Version 0.9.0 is the first Open Beta version for Zowe. This version contains the following changes since the last Closed Beta version.

### What's new

**New component - API Mediation Layer**

Zowe now contains a component named API Mediation Layer. You install API Mediation Layer when you install the Zowe runtime on z/OS. For more information, see [API Mediation Layer](introduction.html#api-mediation-layer) and [Installing zLUX, explorer server, and API Mediation Layer](install-zos.html#installing-the-zowe-runtime-on-z-os).

### What's changed

**Naming**

- The project is now named Zowe.
- Zoe Brightside is renamed to Zowe CLI.

**Installation**

- The System Display and Search Facility (SDSF) of z/OS is no longer a prerequisite for installing explorer server.
- The name of the PROC is now ZOWESVR rather than ZOESVR.

**zLUX**

The mainframe account under which the ZSS server runs must have UPDATE permission on the `BPX.DAEMON` and `BPX.SERVER` facility class profiles.

**Explorer server**

The URL to access the explorer server UI is changed from `https://<your.server>:<atlasport>/ui/#/` to the following ones:

   - `https://<your.server>:<atlasport>/explorer-jes/#/`
   - `https://<your.server>:<atlasport>/explorer-mvs/#/`
   - `https://<your.server>:<atlasport>/explorer-uss/#/`

### What's removed

Removed all references to SYSLOG.
