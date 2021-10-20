# Implement new SAF IDT provider

If you want to create your own implementation of the SAF IDT provider, you can implement the `org.zowe.apiml.gateway.security.service.saf.SafIdtProvider` interface. 

## How to create the SAF IDT provider

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

Below is an example of the SAF IDT provider implementation which uses REST as a method of communication. 

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

import com.netflix.zuul.context.RequestContext;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.zowe.apiml.gateway.security.service.AuthenticationService;
import org.zowe.apiml.security.common.token.TokenAuthentication;

import java.net.URI;
import java.util.Optional;

import static org.springframework.util.StringUtils.isEmpty;

/**
 * Authentication provider implementation for the SafIdt Tokens that gets and verifies the tokens across the Restfull
 * interface
 * <p>
 * To work properly the implementation requires two urls:
 * <p>
 * - apiml.security.saf.urls.authenticate - URL to generate token
 * - apiml.security.saf.urls.verify - URL to verify the validity of the token
 */
@RequiredArgsConstructor
@Slf4j
public class SafRestAuthenticationService implements SafIdtProvider {
    private final RestTemplate restTemplate;
    private final AuthenticationService authenticationService;

    @Value("${apiml.security.saf.urls.authenticate}")
    String authenticationUrl;
    @Value("${apiml.security.saf.urls.verify}")
    String verifyUrl;

    @Override
    public Optional<String> generate(String username) {
        final RequestContext context = RequestContext.getCurrentContext();
        Optional<String> jwtToken = authenticationService.getJwtTokenFromRequest(context.getRequest());
        if (!jwtToken.isPresent()) {
            return Optional.empty();
        }

        TokenAuthentication tokenAuthentication = authenticationService.validateJwtToken(jwtToken.get());
        if (!tokenAuthentication.isAuthenticated()) {
            return Optional.empty();
        }

        try {
            Authentication authentication = new Authentication();
            authentication.setJwt(jwtToken.get());
            authentication.setUsername(username);

            ResponseEntity<Token> re = restTemplate.postForEntity(URI.create(authenticationUrl), authentication, Token.class);

            if (!re.getStatusCode().is2xxSuccessful()) {
                return Optional.empty();
            }

            Token responseBody = re.getBody();
            if (responseBody == null) {
                return Optional.empty();
            }

            return Optional.of(responseBody.getJwt());
        } catch (HttpClientErrorException.Unauthorized e) {
            return Optional.empty();
        }
    }

    @Override
    public boolean verify(String safToken) {
        if (isEmpty(safToken)) {
            return false;
        }

        try {
            Token token = new Token();
            token.setJwt(safToken);

            ResponseEntity<String> re = restTemplate.postForEntity(URI.create(verifyUrl), token, String.class);

            return re.getStatusCode().is2xxSuccessful();
        } catch (HttpClientErrorException.Unauthorized e) {
            return false;
        }
    }

    @Data
    public static class Token {
        String jwt;
    }

    @Data
    public static class Authentication {
        String jwt;
        String username;
    }
}

```

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

@Configuration
@RequiredArgsConstructor
public class SafProviderBeansConfig {
    @Bean
    @ConditionalOnProperty(name = "apiml.security.saf.provider", havingValue = "rest")
    public SafIdtProvider restSafProvider(
        RestTemplate restTemplate,
        AuthenticationService authenticationService
    ) {
        return new SafRestAuthenticationService(restTemplate, authenticationService);
    }
}

```

In this case the REST provider `SafRestAuthenticationService` will be used when the `apiml.security.saf.provider` 
Gateway configuration parameter is set to `rest`. 

## How to integrate your extension to API ML

// TODO 
The new implementation can be added to the Gateway classpath by defining...

## How to use the SAF IDT provider

In order to use the new SAF IDT provider that you have created, you need to set the parameter `apiml.authentication.scheme` to `safIdt` in your service configuration.
Your application will then properly recognize the SAF IDT scheme and fill the `X-SAF-Token` header with the token produced by your SAF IDT provider. 