# Understanding the Zowe release

## Zowe releases

Zowe uses semantic versioning for its releases, also known as SemVer.  Each release has a unique ID made up of three numbers that are separated by periods.

```
<Major Version>.<Minor Version>.<Patch Version>
```
Each time a new release is created, the release ID is incremented.  Each number represents the content change since the previous release.  For example, 
- `2.5.0` represents the fifth minor release since the first major release.  
- `2.5.1` represents the first patch to the `2.5.0` release.
- `2.6.0` is the first minor release to be created after `2.5.1`.

### Patch
A patch is usually reserved for a bug fix to a minor release.

### Minor release
A minor release indicates that new functionality is added but the code is compatible with an earlier version.  The Zowe community works on two-week sprints and creates a minor release at the end of these, typically once per month although the frequency might vary.

### Major release
A major release is required if changes are made to the public API and the code is no longer compatible with an earlier version.  

When Zowe is version one, it is associated with the Zowe v1 [conformance program](../extend/zowe-conformance-program.md). Offerings that extend Zowe and achieve the Zowe v1 conformance badge will remain compatible with Zowe throughout its version 1 lifetime. A major release increment because of incompatibility is sometimes referred to as a "breaking" change.

The first SMP/E build for Zowe v2 has a Functional Module ID (FMID) of AZWE002, which was created with content from the 2.0.0 release. Each major release will be its own SMP/E FMID where the last digit is updated, for example AZWE00V where V represents the major version.

Subsequent minor and patch releases to V2 are delivered as SMP/E PTF SYSMODs.  Because of the size of the content, two co-requisite PTFs are created for each Zowe release.

While Major releases are required for a "breaking" change, they also can be used to indicate to the community a significant content update over and above what would be included in a minor release.

## Check the Zowe release number

To see the release number of Zowe, look at the `manifest.json` file.  This is included in the top-level [directory of where a Zowe convenience build is expanded to](../user-guide/install-zowe-zos-convenience-build.md), the top-level directory of a Zowe runtime `<RUNTIME_DIR>`.

To see the version of a Zowe release, use the `zwe version` command.

```
> zwe version
```

will return a single line with the Zowe release number. For example,
```
Zowe v2.0.0
```

You can pass `debug` or `trace` mode argument to this command to show more information. For example,

```
> zwe version --debug
Zowe v2.0.0
build and hash: (HEADdetachedfrom4dd7c20c)#2 (c295c516259df909cf241f1818b359645276a96a)
> zwe version --trace
Zowe v2.0.0
build and hash: (HEADdetachedfrom4dd7c20c)#2 (c295c516259df909cf241f1818b359645276a96a)
Zowe directory: /SYSTEM/var/zowe/runtime
```

You can see in `trace` mode, it also tells you where is the Zowe runtime directory where `zwe` command you are running.
