# Implement new SAF IDT provider

API Gateway offers the capability to implement your own SAF Identity Token (IDT) provider, by implementing 
an existing interface.

- [How to create the SAF IDT provider](#how-to-create-the-saf-idt-provider)
- [How to integrate your extension to API ML](#how-to-integrate-your-extension-to-api-ml)
- [How to use the SAF IDT provider](#how-to-use-the-saf-idt-provider)

## How to create the SAF IDT provider

If you want to create your own implementation of the SAF IDT provider, you can implement the existing `org.zowe.apiml.gateway.security.service.saf.SafIdtProvider` interface. 

```java
public interface SafIdtProvider {
    /**
     * If the current user has the proper rights generate the SAF token on its behalf and return it back.
     *
     * @return Either empty answer meaning the user is either unauthenticated or doesn't have the proper rights.
     */
    Optional<String> generate(String username);

    /**
     * Verify that the provided saf token is valid.
     *
     * @param safToken Token to validate.
     * @return true if the token is valid, false if it is invalid
     */
    boolean verify(String safToken);
}
```

The `SafIdtProvider` interface contains the `generate` and `verify` methods, that can be overridden by your SAF IDT implementation
to generate the SAF token, on behalf of the specified user and to verify that the provided SAF token is valid.

[SafRestAuthenticationService](https://github.com/zowe/api-layer/blob/master/gateway-service/src/main/java/org/zowe/apiml/gateway/security/service/saf/SafRestAuthenticationService.java) is an example of the SAF IDT provider implementation which uses REST as a method of communication.

You will have then to register a bean in order to use the implemented SAF IDT provider.

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

In this case the REST provider `SafRestAuthenticationService` will be used when the `apiml.security.saf.provider` 
Gateway configuration parameter is set to `rest`. 

## How to integrate your extension to API ML

To use your SAF IDT provider as an extension of API ML, check [Create extension for API ML](%20create-apiml-extension.md).

## How to use the SAF IDT provider

In order to use the new SAF IDT provider that you have created, you need to set the parameter `apiml.authentication.scheme` to `safIdt` in your service configuration.
Your application will then properly recognize the SAF IDT scheme and fill the `X-SAF-Token` header with the token produced by your SAF IDT provider. 