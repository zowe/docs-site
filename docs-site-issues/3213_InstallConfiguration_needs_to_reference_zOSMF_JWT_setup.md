# Issue #3213: Install>Configuration needs to reference z/OSMF JWT setup

**URL:** https://github.com/zowe/docs-site/issues/3213

**Created:** 2023-10-27T07:33:04Z

**Updated:** 2025-05-13T09:52:46Z

**Labels:** type: enhancement, area: apiml, priority-medium, area: install and config, release: V3, Size: S

---

Somewhere under https://docs.zowe.org/stable/user-guide/configure-zos-system please add a small section which indicates the need to enable JWT in z/OSMF as documented here: https://www.ibm.com/docs/en/zos/2.5.0?topic=configurations-enabling-json-web-token-support. JWT is not enabled in z/OSMF by default.
Also, the z/OSMF doc says the server_override.xml ought to be OK as supplied, but that is only true if z/OSMF is using the default certificate name DefaultzOSMFCert.IZUDFLT. If z/OSMF has been configured to use a different certificate, the element keyAlias in the server_override.xml must be changed to the label of the IZUSVR1's personal certificate.
Also consider updating the Action information in message ZWEAG187W to include a reference to https://www.ibm.com/docs/en/zos/2.5.0?topic=configurations-enabling-json-web-token-support

## Validation Status: ⚠️ PARTIALLY RESOLVED

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is PARTIALLY addressed. There are references to z/OSMF JWT setup in some documentation, but not in all requested locations.

**Current State:** 
- `docs/user-guide/configure-certificates.md:97` contains a reference to [Enabling JSON Web Token support](https://www.ibm.com/docs/en/zos/3.1.0?topic=configurations-enabling-json-web-token-support) for z/OSMF JWT configuration
- `docs/user-guide/upgrade-zos.md:60` also references the same IBM documentation
- `docs/user-guide/install-nodejs-zos.md:146` mentions z/OSMF JWT support requirements

However:
- There is NO section under `docs/user-guide/configure-zos-system.md` referencing z/OSMF JWT setup as requested
- There is NO mention of the `server_override.xml` configuration requirement to match the certificate name (DefaultzOSMFCert.IZUDFLT) vs custom IZUSVR1 certificates
- There is NO reference to the IBM documentation in message ZWEAG187W (this message doesn't appear in the docs at all)

**Recommendation:** Add a section to `docs/user-guide/configure-zos-system.md` about z/OSMF JWT setup, include the server_override.xml certificate matching requirement, and ensure ZWEAG187W message references the IBM documentation.

