# Understanding Zowe release versions
## Zowe releases

Zowe uses *semantic versioning* for its releases, also known as SemVer.  In semantic versioning, each release has a unique ID made up of three numbers that are separated by periods:

```
<Major Version>.<Minor Version>.<Patch Version>
```
Each time a new release is created, the release ID is incremented.  Each number represents the content change since the previous release.  For example:

- `2.5.0` represents the fifth minor release since the first major release.  
- `2.5.1` represents the first patch to the `2.5.0` release.
- `2.6.0` is the first minor release to be created after `2.5.1`.

To see the Zowe release schedule, see [Zowe PI Schedule and Releases](https://github.com/zowe/community/blob/master/Project%20Management/Schedule/Zowe%20PI%20%26%20Sprint%20Cadence.md).

### Major release

Major releases are required for a *"breaking" change*, or a modification that requires updates to avoid disruptions in your applications. Major releases also can be used to indicate to the community a significant content update over and above what would be included in a minor release.

#### Conformance programs

Zowe V1 is associated with the Zowe V1 [conformance program](../extend/zowe-conformance-program.md). Offerings that extend Zowe and achieve the Zowe V1 conformance badge remain compatible with Zowe throughout its Version 1 lifetime. A major release increment because of incompatibility is sometimes referred to as a "breaking" change.

#### SMP/E builds

Each major release has its own SMP/E Functional Module ID (FMID) in the format `AZWE00V`, where `V` represents the major version. The first SMP/E build for Zowe V3 has a Functional Module ID (FMID) of `AZWE003`, which was created with content from the 3.0.0 release.

Subsequent minor and patch releases to V3 are delivered as SMP/E PTF SYSMODs.  Because of the size of the content, two co-requisite PTFs are created for each Zowe release.

### Minor release

A minor release indicates that new functionality is added but the code is compatible with an earlier version.

### Patch

A patch is usually reserved for a bug fix to a minor release.
