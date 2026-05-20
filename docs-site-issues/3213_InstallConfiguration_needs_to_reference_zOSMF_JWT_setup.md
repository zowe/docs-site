# Issue #3213: Install>Configuration needs to reference z/OSMF JWT setup

**URL:** https://github.com/zowe/docs-site/issues/3213

**Created:** 2023-10-27T07:33:04Z

**Updated:** 2025-05-13T09:52:46Z

**Labels:** type: enhancement, area: apiml, priority-medium, area: install and config, release: V3, Size: S

---

Somewhere under https://docs.zowe.org/stable/user-guide/configure-zos-system please add a small section which indicates the need to enable JWT in z/OSMF as documented here: https://www.ibm.com/docs/en/zos/2.5.0?topic=configurations-enabling-json-web-token-support. JWT is not enabled in z/OSMF by default.
Also, the z/OSMF doc says the server_override.xml ought to be OK as supplied, but that is only true if z/OSMF is using the default certificate name DefaultzOSMFCert.IZUDFLT. If z/OSMF has been configured to use a different certificate, the element keyAlias in the server_override.xml must be changed to the label of the IZUSVR1's personal certificate.
Also consider updating the Action information in message ZWEAG187W to include a reference to https://www.ibm.com/docs/en/zos/2.5.0?topic=configurations-enabling-json-web-token-support

