# Troubleshooting

To isolate and resolve Zowe&trade; problems, you can use the troubleshooting and support information in this section.

**Topics**
- [Troubleshooting Zowe z/OS startup](troubleshoot-zos.md)
- [Troubleshooting API Mediation Layer](troubleshoot-apiml.md)
- [Troubleshooting Zowe Application Framework](./app-framework/app-troubleshoot.md)
- [Troubleshooting z/OS Services](troubleshoot-zos-services.md)
- [Troubleshooting Zowe CLI](./cli/troubleshoot-cli.md)
- [Troubleshooting Zowe using Diagnostics Data Script](troubleshoot-diagnostics.md)

## Zowe releases

Zowe uses semantic versioning for its releases, also known as Semver.  Each release has a unique ID made up of three numbers separted by periods.

```
Major Version. Minor Version. Patch.
```
Each time a newer release is created the release ID is incremented.  Each number represents the content change since the previous release.  For example, `1.5.0` represents the first minor release since the first major release.  `1.5.1` represents the first patch to the `1.5.0` release, and `1.6.0` is the first minor release to be created after `1.5.1`.

### Patch
A patch is usually reserved for a bug fix to a minor release.

### Minor release
A minor release indicates that functionality has been added but the code is backwards compatible.  The Zowe community work on two week sprints and creates a minor release at the end of these, typically once per month although the frequency may vary.

### Major release
A major release is required if changes have been made to the public API and the code is no longer backwards compatible.  Currently Zowe is version one.  This is associated with the Zowe v1 conformance program, see [Zowe conformance program](../extend/zowe-conformance-program.md), such that offerings that extend Zowe and achieve the Zowe v1 conformance badge will remain compatible with Zowe throughout its version 1 lifetime. A major release increment because of incompatability is sometimes refered to as a "breaking" change.

The first SMP/E build for Zowe v1 has a Functional Module ID (FMID) of AZWE001, which was created with content from the 1.9 release. Each major release will be its own SMP/E FMID where the last digit is updated, for example AZWE00V where V represents the major version. Within a Zowe release

Subsequent minor and patch releases to V1 are delivered as SMP/E PTF SYSMODs.  Because of the size of the content two co-requisite PTFs are created for each Zowe release.

While Major releases are required for a "breaking" change, they also may be used to indicate to the community a significant content update over and above what would be included in a minor release.

## manifest.json
To see the release number of Zowe look at the `manifest.json` file.  This is included in the top level directory of where a Zowe convenience build is expanded to, see [Installing Zowe runtime from a convenience build](../user-guide/install-zowe-zos-convenience-build.md), the top level directory of a Zowe runtime `<ROOT_DIR>`, and for a Zowe instance directory `<INSTANCE_DIR>/workspace`, see [Creating and configuring the Zowe instance directory](../user-guide/configure-instance-directory.md).

To see the version of a Zowe release use the Unix grep command in a directory containing a `manifest.json` file.

```
>cat manifest.json | grep version | head -1
```
will return a single line with the Zowe release ID number, for example
```
"version": "1.10.0",
```
