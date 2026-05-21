# Issue #3896: Document default ciphers used by Zowe

**URL:** https://github.com/zowe/docs-site/issues/3896

**Created:** 2024-09-30T21:13:18Z

**Updated:** 2025-06-11T18:59:11Z

**Labels:** type: enhancement, area: cli, area: apiml, area: webui, priority-low, release: V3, Size: M

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

We should document all default ciphers used/supported by Zowe.
Having it in a central location will be ideal.

## Pages to Update
<!--https://docs.zowe.org/...-->
https://docs.zowe.org/stable/user-guide/api-mediation/configuration-at-tls/#ciphers
https://docs.zowe.org/stable/user-guide/mvd-configuration#defining-the-at-tls-rule

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. No central documentation exists for all default ciphers used by Zowe.

**Current State:** 
Cipher documentation is scattered across multiple files:
- `docs/extend/extend-apiml/zowe-api-mediation-layer-security-overview.md:133-144` - Lists default ciphers for API ML services (TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, etc.)
- `docs/user-guide/tls-configuration.md:61-88` - Shows example ciphers for Zowe servers (TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256) but notes they change regularly
- `docs/user-guide/configuring-at-tls-for-zowe-server.md` and `docs/user-guide/configuring-at-tls-for-zowe-server-single-service.md` - Contain cipher examples for AT-TLS rules
- Various other references in troubleshooting docs

The requested central location with ALL default ciphers does NOT exist. The issue references URLs that don't have consolidated cipher documentation:
- `https://docs.zowe.org/stable/user-guide/api-mediation/configuration-at-tls/#ciphers` - This path doesn't exist
- `https://docs.zowe.org/stable/user-guide/mvd-configuration#defining-the-at-tls-rule` - This exists but doesn't have a dedicated ciphers section

**Recommendation:** Create a central documentation page (e.g., `docs/user-guide/zowe-default-ciphers.md`) that consolidates:
- Default ciphers for API ML services
- Default ciphers for Zowe servers (app-server, zss, etc.)
- Default ciphers for CLI
- How ciphers are determined and updated
- Links to IANA cipher references

