# Zowe server 3.6.0 (November 2026)

Welcome to the Zowe server Version 3.6.0 release for server components!

See [New features and enhancements](#new-features-and-enhancements) for a full list of changes to the functionality. See [Bug fixes](#bug-fixes) for a list of issues addressed in this release.

**Download v3.6.0 build**: Want to try new features as soon as possible? You can download the v3.6.0 build from [Zowe.org](https://www.zowe.org/download.html).

## New features and enhancements

Zowe Version 3.6.0 server components contain the enhancements that are described in the following topics.

### Zowe API Mediation Layer

:::warning Breaking changes

The following changes in API ML 3.6.0 can affect existing deployments. Review each change before you upgrade.

* Actuator endpoints now require authentication. ([#4917](https://github.com/zowe/api-layer/issues/4917))
* Simple requests are no longer allowed for login, which strengthens protection against cross-site request attacks. ([#4823](https://github.com/zowe/api-layer/issues/4823))
* The `apiml.service.allowEncodedSlashes` property has been removed in favor of `enableStrictUrlValidation`. ([#4830](https://github.com/zowe/api-layer/issues/4830))
* Strict URL validation is now kept as the default behavior. ([#4812](https://github.com/zowe/api-layer/issues/4812))

For required configuration changes and mitigation steps, see [API ML v3.6 upgrade and security enhancements](../api-ml-v3.6-upgrade-and-security-enhancements.md). For all breaking changes in Zowe v3, see [Breaking changes](../breaking-changes-v3.md).

:::

#### New features

* Added enhanced logging options for the modulith (single-service) deployment. ([#5002](https://github.com/zowe/api-layer/issues/5002))
* Added an environment variable configuration layer for the Eureka client intervals. ([#4794](https://github.com/zowe/api-layer/issues/4794))
* The API Catalog can now use a client certificate to obtain API documentation from services. ([#4844](https://github.com/zowe/api-layer/issues/4844))
* Added the ability to define a local address binding for outbound connections. ([#4815](https://github.com/zowe/api-layer/issues/4815))
* Implemented an allowlist for URL domains. ([#4656](https://github.com/zowe/api-layer/issues/4656))
* Domain allowlist validations now support IP masks. ([#4898](https://github.com/zowe/api-layer/issues/4898))
* Added a `quiet` logging level. ([#4760](https://github.com/zowe/api-layer/issues/4760))
* Permissions are now required to use debug mode with the modifiable actuator. ([#4820](https://github.com/zowe/api-layer/issues/4820))
* OIDC validation now returns the token claims. ([#4641](https://github.com/zowe/api-layer/issues/4641))
* Added support for Java 25 in API ML v3.x.x. ([#4728](https://github.com/zowe/api-layer/issues/4728))
* Allow both environment variables and zowe.yaml mapped properties to influence the domain allow list. ([#5006](https://github.com/zowe/api-layer/issues/5006))
* Multiple public keys can now be used for signature verification. ([#5015](https://github.com/zowe/api-layer/issues/5015))
* Added a z/OSMF JWT preflight check. ([#4531](https://github.com/zowe/api-layer/issues/4531))
* Added OpenTelemetry log signals for invalid authentication attempts. ([#4551](https://github.com/zowe/api-layer/issues/4551))

## Bug fixes

Zowe server Version 3.6.0 contains the bug fixes that are described in the following topics.

### Zowe API Mediation Layer

#### Security

* Added a content security policy to the API Catalog for enhanced security. ([#4926](https://github.com/zowe/api-layer/issues/4926))
* Updated the default content security policy. ([#4964](https://github.com/zowe/api-layer/issues/4964))
* Made fetch metadata validation more restrictive. ([#4908](https://github.com/zowe/api-layer/issues/4908))
* Forced HSTS to be enabled. ([#4802](https://github.com/zowe/api-layer/issues/4802))
* Set frame options to same origin. ([#4799](https://github.com/zowe/api-layer/issues/4799))
* HTTP requests are now redirected to HTTPS. ([#5036](https://github.com/zowe/api-layer/issues/5036))
* Sanitized the OIDC `returnUrl` to prevent open redirects. ([#4813](https://github.com/zowe/api-layer/issues/4813))
* Fixed the sanitization of HTML code that is injected into the API Catalog web UI. ([#5027](https://github.com/zowe/api-layer/issues/5027))
* Removed unverified LTPA token extraction paths. ([#4816](https://github.com/zowe/api-layer/issues/4816))
* JSON Web Tokens (JWT) are now passed as a header rather than as a request parameter. ([#4818](https://github.com/zowe/api-layer/issues/4818))
* The full JWT is no longer shown in debug messages. ([#5024](https://github.com/zowe/api-layer/issues/5024))
* Passwords are now masked in `toString` methods. ([#4992](https://github.com/zowe/api-layer/issues/4992))
* Eureka credentials are now verified in constant time. ([#4831](https://github.com/zowe/api-layer/issues/4831))
* Basic authentication is now required for `/eureka` when TLS validation is disabled. ([#4734](https://github.com/zowe/api-layer/issues/4734))
* Explicit SnakeYAML constructors are now used for security. ([#4786](https://github.com/zowe/api-layer/issues/4786))
* Updated `markdown-it` to 14.3.0 and `linkify-it` to 5.0.2 to address CVE-2026-48988 and CVE-2026-59887. ([#4875](https://github.com/zowe/api-layer/issues/4875))
* Fixed the security rule in the Caching Service when certificate validation is relaxed. ([#4632](https://github.com/zowe/api-layer/issues/4632))
* Items are now cached only when they come from a trusted proxy. ([#4651](https://github.com/zowe/api-layer/issues/4651))
* The relaxed firewall is now used only for routed requests. ([#4643](https://github.com/zowe/api-layer/issues/4643))
* Added negative tests for the SAF resource check. ([#4889](https://github.com/zowe/api-layer/issues/4889))

#### Allowlists and registration validation

* Added port validation to the allowed domains list. ([#4934](https://github.com/zowe/api-layer/issues/4934))
* Added a default allowlist. ([#4692](https://github.com/zowe/api-layer/issues/4692))
* Added the Broadcom TechDocs domain to the default allowlist. ([#4730](https://github.com/zowe/api-layer/issues/4730))
* Loopback and local addresses are no longer automatically allowed. ([#4892](https://github.com/zowe/api-layer/issues/4892))
* Local IP addresses are now allowed during validation of an onboarding service. ([#4887](https://github.com/zowe/api-layer/issues/4887))
* Added validation of the hostname of a registered service against the allowed list. ([#4833](https://github.com/zowe/api-layer/issues/4833))
* Added validation of the IP address of a registered service against the allowed list. ([#4837](https://github.com/zowe/api-layer/issues/4837))
* Added scheme validation to registration metadata. ([#4835](https://github.com/zowe/api-layer/issues/4835))
* Fixed metadata validation on intermediate segments. ([#4915](https://github.com/zowe/api-layer/issues/4915))
* The API Catalog now validates metadata as well. ([#4922](https://github.com/zowe/api-layer/issues/4922))
* Fixed handling of the metadata validation exception. ([#4888](https://github.com/zowe/api-layer/issues/4888))
* Added a debug message for when registration to the Discovery Service is not allowed. ([#5009](https://github.com/zowe/api-layer/issues/5009))

#### Authentication and CORS

* Added a CSRF token header when one is available. ([#4675](https://github.com/zowe/api-layer/issues/4675))
* Changed the behavior when CORS is disabled. ([#4848](https://github.com/zowe/api-layer/issues/4848))
* Fixed the CORS defaults. ([#4758](https://github.com/zowe/api-layer/issues/4758))
* Restored the default for allow credentials to `true`. ([#4872](https://github.com/zowe/api-layer/issues/4872))
* Improved handling of personal access tokens (PAT). ([#4971](https://github.com/zowe/api-layer/issues/4971))
* Fixed handling of OIDC errors. ([#5018](https://github.com/zowe/api-layer/issues/5018))
* Added a retry for authentication calls routed through the Gateway. ([#4899](https://github.com/zowe/api-layer/issues/4899))
* Added a z/OSMF retry during authentication. ([#4928](https://github.com/zowe/api-layer/issues/4928))
* Added support for both `zOSMF` and `zosmf` as the property name. ([#4903](https://github.com/zowe/api-layer/issues/4903))

#### Infinispan, Eureka, and high availability

* Fixed an Infinispan issue in high availability on Java 21 and later, auto-constructed the initial hosts, and made Infinispan configurable. ([#4731](https://github.com/zowe/api-layer/issues/4731))
* Added recovery from a corrupted Infinispan global state. ([#4827](https://github.com/zowe/api-layer/issues/4827))
* Added a log message for when an Infinispan exception occurs because the cache is corrupted. ([#4867](https://github.com/zowe/api-layer/issues/4867))
* Fixed the caching storage mode validation for the modulith and the Caching Service so that an empty keyring password is accepted. ([#4805](https://github.com/zowe/api-layer/issues/4805))
* Fixed an issue with Eureka replicas when using AT-TLS with high availability. ([#4628](https://github.com/zowe/api-layer/issues/4628))
* Eureka peer communication now uses a host verifier based on the configuration. ([#4633](https://github.com/zowe/api-layer/issues/4633))
* Peer read timeouts are now escalated after the maximum number of retries. ([#4780](https://github.com/zowe/api-layer/issues/4780))
* Stale client connections are now closed when the z/OS TCP/IP stack restarts. ([#4792](https://github.com/zowe/api-layer/issues/4792))
* The Eureka wrapper now calls the correct method. ([#4952](https://github.com/zowe/api-layer/issues/4952))
* Added a check for null entries in the Eureka properties. ([#4829](https://github.com/zowe/api-layer/issues/4829))
* Added a default address constructor. ([#4912](https://github.com/zowe/api-layer/issues/4912))
* The Eureka client now falls back to native IP address discovery when the IP address is not set. ([#4873](https://github.com/zowe/api-layer/issues/4873))
* Fixed a deadlock that could occur during static registration of services. ([#4657](https://github.com/zowe/api-layer/issues/4657))
* The shared connection manager is now used. ([#4883](https://github.com/zowe/api-layer/issues/4883))
* Turbo filters now run only when they are required. ([#4909](https://github.com/zowe/api-layer/issues/4909))

#### Logging and diagnostics

* Added `reason` and `action` fields to 10 log messages. ([#4745](https://github.com/zowe/api-layer/issues/4745))
* Fixed missing OpenTelemetry logs at the info level. ([#4955](https://github.com/zowe/api-layer/issues/4955))
* Reduced logging of conformance criteria violations. ([#4627](https://github.com/zowe/api-layer/issues/4627))

#### API Catalog and other fixes

* Fixed the API Catalog Vite dev server and added HTTPS support. ([#4851](https://github.com/zowe/api-layer/issues/4851))
* Ensured safe behavior when using `BASE` within Vite. ([#4788](https://github.com/zowe/api-layer/issues/4788))
* Removed the tile fields from the onboarding wizard in the API Catalog UI. ([#4987](https://github.com/zowe/api-layer/issues/4987))
* Fixed the validation during generation of the ESM command that defines a distributed identity mapping. ([#5026](https://github.com/zowe/api-layer/issues/5026))
* Added support for wildcards in the SAN during certificate validation by the certificate analyzer. ([#4676](https://github.com/zowe/api-layer/issues/4676))
* Added support for Java 21 by removing the encoding setting. ([#4659](https://github.com/zowe/api-layer/issues/4659))
* Added a check for whether a directory exists. ([#4615](https://github.com/zowe/api-layer/issues/4615))
* Replaced the string matcher with a pattern. ([#4897](https://github.com/zowe/api-layer/issues/4897))
