# Issue #4791: The documentation for AT-TLS in single-service deployment mode lacks detail of the optimal changes needed

**URL:** https://github.com/zowe/docs-site/issues/4791

**Created:** 2025-11-18T09:56:26Z

**Updated:** 2025-11-18T15:21:43Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
The documentation for AT-TLS in single-service deployment mode lacks detail of the optimal changes needed

## Pages to Update
<!--https://docs.zowe.org/configuring-at-tls-for-zowe-server-single-service.md-->

## Screenshots
Not applicable.

## Expected behavior
We need to tune the examples to remove any rules no longer required, and add better wording in some grey areas.

## Additional context

These were the areas identified where more work is required:

1) In the section **AT-TLS configuration for Zowe**, after **Outbound AT-TLS rules (i.e. to make a transparent https call through http)** I removed the section saying **If an API ML-onboarded southbound service needs to support X.509 Client Certificate authentication, we recommend to use the integrated TLS handshake capabilities of API ML. Do not configure an outbound AT-TLS rule for these services.**. This was felt to be in contradiction with our policy of not supporting hybrid AT-TLS/TLS configurations, and we need more complex rules to handle this exclusively with AT-TLS. This part was always lacking, regardless of single-service deployment mode.

2) The section below is in conflict with the statement **Routing to the Discovery Service is disabled by default. Ensure this routing remains disabled in AT-TLS setup to avoid sending the Zowe server certificate during routing from the API Gateway to the Discovery Service.**

<img width="1625" height="152" alt="Image" src="https://github.com/user-attachments/assets/fc00482c-4477-4480-80b5-f9dd6b9ca093" />

We may be able to remove this section from the document and the supporting full file, but we need to test this.
