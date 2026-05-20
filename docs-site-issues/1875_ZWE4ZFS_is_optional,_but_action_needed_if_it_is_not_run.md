# Issue #1875: ZWE4ZFS is optional, but action needed if it is not run

**URL:** https://github.com/zowe/docs-site/issues/1875

**Created:** 2021-10-27T12:01:55Z

**Updated:** 2025-03-14T14:51:39Z

**Labels:** type: bug, area: zos-install-upgrade, release: V3, Size: S

---

The documentation clearly states that ZWE4ZFS is optional. While this is true, we found that if it is not run, directories need to be created manually. This can be achieved by running the following commands in OMVS or an alternative Unix client:

cd [installdir]
mkdir -p usr/lpp/zowe
