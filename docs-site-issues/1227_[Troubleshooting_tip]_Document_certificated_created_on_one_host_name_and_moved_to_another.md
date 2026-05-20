# Issue #1227: [Troubleshooting tip] Document certificated created on one host name and moved to another

**URL:** https://github.com/zowe/docs-site/issues/1227

**Created:** 2020-05-21T11:04:04Z

**Updated:** 2025-03-14T15:11:29Z

**Labels:** area: zos-install-upgrade, type: troubleshoot, release: V3, Size: M

---

## Validation Status: ✅ RESOLVED

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is addressed in the current documentation. The troubleshooting guide `docs/troubleshoot/known-issues-with-apiml.md` contains detailed information about certificate hostname mismatches, including:

- Error messages for missing z/OSMF host name in subject alternative names
- Error messages for invalid z/OSMF host name in subject alternative names
- Solution to re-create the Zowe keystore by deleting it and re-creating it
- References to certificate configuration documentation

The documentation now includes specific error messages like: "Certificate for <ABC12.slv.broadcom.net> doesn't match any of the subject alternative names" and provides step-by-step solutions including keystore recreation.

**Documentation Location:** `docs/troubleshoot/known-issues-with-apiml.md` (lines 154-206)

---

### 2. Choose a title
Certificate mismatch when host name changes

### 3. Symptom
Customers who create a certificate using one host name and then move to another host (or use a different host name) 

### 4. Solution
Re-create the keystore directory.
We should include the kind of browser error message or log messages that customers are encountering
