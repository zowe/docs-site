# Issue #4197: zowe.yaml file requirements

**URL:** https://github.com/zowe/docs-site/issues/4197

**Created:** 2025-02-26T13:04:18Z

**Updated:** 2025-03-14T10:59:16Z

**Labels:** type: bug, area: install and config, release: V2, release: V3, Size: M

---

## Is your request for enhancement related to a problem? Please describe.

In customer installations I noticed that if the zowe.yaml file is tagged in an EBCDIC variant (IBM-1146 for example) the installation (`zwe install`) will fail due to not being able to parse the file.
Even if the file is readable, and the file is in a mainframe-native encoding.

The error message that will appear in such a case can be misleading, as it initially complains only about a missing dataset.prefix setting in the zowe.yaml.

## Describe the solution you'd like

Zowe Docs should indicate the required features this file should have:

- zowe.yaml has to be encoded in EBCDIC and the file must be untagged, or tagged in `IBM-1047` codepage)


## Related doc pages

Probably https://docs.zowe.org/stable/appendix/zowe-yaml-configuration/ but it could be also during installation, if it's going to be done manually. If the zowe.yaml is created in z/OSMF workflows it probably doesn't have this issue happening, but it's not verified.


