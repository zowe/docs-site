# Issue #4181: Add documentation for using an existing keyring and certificate

**URL:** https://github.com/zowe/docs-site/issues/4181

**Created:** 2025-02-12T15:18:18Z

**Updated:** 2025-03-14T11:58:03Z

**Labels:** type: enhancement, area: install and config, release: V3, Size: L

---

## Is your request for enhancement related to a problem? Please describe.
The Zowe docs describe using an existing certificate with the steps to create a new keyring (owned by Zowe's functional user ID) and then connect that to the existing cert together with its CA chain.

After feedback from @colinpaicemq there is another option that we should describe, which is to point `zowe.yaml` at the existing keyring and cert, and do some ESM commands to allow Zowe's functional user ID to access the ring owned by a different ID.

## Describe the solution you'd like
Make this scenario be one of the two preferred paths (so high up in the docs before we talk about pkcs12 and other formats).  We could cover with the sample of making Zowe use the IZUSVR z/OSMF keyring with 


## Related doc pages
A good z/OSMF chapter with the RACF commands is at https://www.ibm.com/docs/en/zos/2.4.0?topic=configurations-configuring-zosmf-server-certificate-key-ring#d97269e717.
Another good chapter is https://www.ibm.com/docs/en/zos/3.1.0?topic=library-usage-notes

## Additional context
<!-- Add any other context or screenshots about the feature request here.-->

