# Issue #4822: Add supporting documentation to monitor service usage by the user

**URL:** https://github.com/zowe/docs-site/issues/4822

**Created:** 2025-12-15T10:43:33Z

**Updated:** 2025-12-15T13:13:30Z

---

Add supporting documentation about Monitor service usage, the user, when the service is used and how often.
 
Address doc impact of the following Acceptance criteria for the feature:

**Acceptance criteria:**

When a user makes a valid, authenticated request (HTTP 200) to a registered service, a single OpenTelemetry (OTel) log record is generated.

- Ensure queries regarding "Usage over time" can be run against the timestamp field

If a user provides invalid credentials (e.g., expired JWT or bad password)The log is still created.

- auth.status is set to "Error".

- auth.error_message is populated (e.g., "Token Expired", "Invalid Credentials").

- http.status_code reflects the error (e.g., 401 or 403).

When a request is made to a valid gateway URL but an unknown Service ID (or a service that is down):The log is generated.

- service.response_code records 404 or 503.

- service.id records the attempted service name (if parsable) or "unknown".

If the request does not have a User ID (e.g., an unauthenticated public endpoint):

- The user.id attribute should be recorded as "anonymous", rather than preventing the log generation.
