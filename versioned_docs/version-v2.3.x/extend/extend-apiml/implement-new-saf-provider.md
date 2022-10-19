# Implement a new SAF IDT provider

As a Zowe API ML user, you can use the API Gateway to apply your own SAF Identity Token (IDT) provider by implementing 
an existing interface.

- [How to create a SAF IDT provider](#how-to-create-a-saf-idt-provider)
- [How to integrate your extension with API ML](#how-to-integrate-your-extension-with-api-ml)
- [How to use an existing SAF IDT provider](#how-to-use-an-existing-saf-idt-provider)
- [How to use the SAF IDT provider](#how-to-use-the-saf-idt-provider)

To configure SAF IDT on z/OS, see [Configure signed SAF Identity tokens (IDT)](../../user-guide/configure-zos-system.md#configure-signed-saf-identity-tokens-idt). 

## How to create a SAF IDT provider

To create your own implementation of the SAF IDT provider, follow these steps:

1. Implement the existing `org.zowe.apiml.gateway.security.service.saf.SafIdtProvider` interface. 

```java
public interface SafIdtProvider {
    /**
     * If the current user has the proper rights generate the SAF token on its behalf and return it back.
     *
     * @param username userId
     * @param password or passticket.
     * @param applId   of service requesting the token.
     * @return Either empty answer meaning the user is either unauthenticated or doesn't have the proper rights.
     */
    String generate(String username, char[] password, String applId);

    /**
     * Verify that the provided saf token is valid.
     *
     * @param safToken Token to validate.
     * @param applid   of service validating the token.
     * @return true if the token is valid, false if it is invalid
     */
    boolean verify(String safToken, String applid);
}
```

The `SafIdtProvider` interface contains the `generate` and `verify` methods. The `generate` method can be overridden by your SAF IDT implementation to generate the SAF token on behalf of the specified user. The `verify` method can be overridden to verify that the provided SAF token is valid.

2. Register a bean in order to use the implemented SAF IDT provider.

**Example:**

```java
/*
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */
package org.zowe.apiml.gateway.security.service.saf;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.zowe.apiml.gateway.security.service.AuthenticationService;
import org.zowe.apiml.passticket.PassTicketService;

@Configuration
@RequiredArgsConstructor
public class SafProviderBeansConfig {
    @Bean
    @ConditionalOnProperty(name = "apiml.security.saf.provider", havingValue = "rest")
    public SafIdtProvider restSafProvider(
            RestTemplate restTemplate,
            AuthenticationService authenticationService,
            PassTicketService passTicketService
    ) {
        return new SafRestAuthenticationService(restTemplate, authenticationService, passTicketService);
    }
}
```

You created a SAF IDT provider. 
## How to integrate your extension with API ML

To use your SAF IDT provider as an extension of API ML, see [Create an extension for API ML](create-apiml-extension.md).

## How to use the SAF IDT provider

To use the newly created SAF IDT provider, it is necessary to set the parameter `apiml.authentication.scheme` to `safIdt` in your service configuration.
Your application then properly recognizes the SAF IDT scheme and fills the `X-SAF-Token` header with the token produced by your SAF IDT provider. 

## How to use an existing SAF IDT provider

You can generate and verify an existing SAF token by using an implementation of the SAF IDT provider that utilizes a ZSS solution. 

[SafRestAuthenticationService](https://github.com/zowe/api-layer/blob/master/gateway-service/src/main/java/org/zowe/apiml/gateway/security/service/saf/SafRestAuthenticationService.java) is an example of the SAF IDT provider implementation which uses REST as a method of communication.

To use `SafRestAuthenticationService` ensure that `apiml.security.saf.provider` is set to `rest`. (This is the default value)
Set the following environment parameters in `zowe.yaml`:

* `ZWE_configs_apiml_security_authorization_endpoint_url=https://${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/saf/authenticate`
* `ZWE_configs_apiml_security_authorization_endpoint_url=https://${ZWE_haInstance_hostname}:${GATEWAY_PORT}/zss/api/v1/saf/verify`

These ZSS endpoints are used by the `SafRestAuthenticationService` to generate and validate the SAF token.

<img src={require("../../images/api-mediation/safidt-providers.png").default} alt="SAF IDT providers"/>

The following diagram illustrates how communication using the SAF IDT provider works:

<img src={require("../../images/api-mediation/safidt-diagram.png").default} alt="SAF IDT diagram"/>


