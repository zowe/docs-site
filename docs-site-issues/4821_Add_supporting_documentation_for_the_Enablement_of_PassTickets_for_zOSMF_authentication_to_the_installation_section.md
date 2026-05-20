# Issue #4821: Add supporting documentation for the Enablement of PassTickets for z/OSMF authentication to the installation section

**URL:** https://github.com/zowe/docs-site/issues/4821

**Created:** 2025-12-15T10:34:31Z

**Updated:** 2025-12-15T13:42:47Z

---

Default authentication provider was changed to SAF. To continue support of zOSMF REST APIs, API ML generates a static definition with httpBasicPassticket authentication scheme. If API ML is not allowed to generate passtickets, these requests will fail.

The documentation in Zowe Docs covers the need to enable passtickets for z/OSMF.
The details from https://docs.zowe.org/stable/user-guide/api-mediation/configuration-extender-passtickets needs to be moved to the installation guide in general
