# Release notes for Open Beta

Learn about what is new, changed, removed, and known issues in Open Beta for Zowe.

Zowe Open Beta includes the following releases:

- [Version 0.9.1 (September 2018)](summaryofchanges.html#version-0-9-1-september-2018)
- [Version 0.9.0 (August 2018)](summaryofchanges.html#version-0-9-0-august-2018)

## Version 0.9.1 (September 2018)

Version 0.9.1 contains the following changes since the last version.

### What's new

### What's changed
**Naming**

- MVD is renamed to Zowe Desktop.

### What's removed


## Version 0.9.0 (August 2018)

Version 0.9.0 is the first Open Beta version for Zowe. This version contains the following changes since the last Closed Beta version.

### What's new

**New component - API Mediation Layer**

Zowe now contains a component named API Mediation Layer. You install API Mediation Layer when you install the Zowe runtime on z/OS. For more information, see [API Mediation Layer](overview.html#api-mediation-layer) and [Installing the Zowe Application Framework, explorer server, and API Mediation Layer](install-zos.html#installing-the-zowe-runtime-on-z-os).

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

### Known issues

#### Security message when you open the Zowe Desktop

When you initially open the Zowe Desktop, a security message alerts you that you are attempting to open a site that has an invalid HTTPS certificate. Other applications within the Zowe Desktop might also encounter this message. To prevent this message, add the URLs that you see to your list of trusted sites.

**Note:** If you clear the browser cache, you must add the URL to your trusted sites again.

#### Message ICH408I during runtime

During runtime, the information message ICH408I may present identifying insufficient write authority to a number of resources, these resources may include:

- `zowe/explorer-server/wlp/usr/servers/.pid/Atlas.pid`
- `zowe/zlux-example-server/deploy/site/plugins/`
- `zowe/zlux-example-server/deploy/instance/plugins/`

**Note:** This should not affect the runtime operations of Zowe. This is a known issue and will be addressed in the next build.

#### Zowe Application Framework APIs
Zowe Application Framework APIs exist but are under development. Features might be reorganized if it simplifies and clarifies the API, and features might be added if applications can benefit from them.
