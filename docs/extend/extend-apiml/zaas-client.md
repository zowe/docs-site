# ZAAS Client

The ZAAS client is a plain Java library that provides authentication through a simple unified interface without the need
for detailed knowledge of the REST API calls presented in this section. The Client function has only a few dependencies including Apache HTTP Client, Lombok, and their associated dependencies. The client contains methods to perform the following actions:

- To obtain a JWT token
- To validate and get details from a JWT token
- To invalidate the JWT token
- To obtain a PassTicket

This article contains the following topics:

* [Pre-requisites](#pre-requisites)
* [API Documentation](#api-documentation)
    * [Obtain a JWT token (`login`)](#obtain-a-jwt-token-login)
    * [Validate and get details from the token (`query`)](#validate-and-get-details-from-the-token-query)
    * [Invalidate a JWT token (`logout`)](#invalidate-a-jwt-token-logout)
    * [Obtain a PassTicket (`passTicket`)](#obtain-a-passticket-passticket)
* [Getting Started (Step by Step Instructions)](#getting-started-step-by-step-instructions)
## Pre-requisites

- Java SDK version 1.8.
- An active instance of the API ML Gateway Service.
- A property file which defines the keystore or truststore certificates.

## API Documentation

The plain java library provides the `ZaasClient` interface with following public methods:

```java
public interface ZaasClient {
    String login(String userId, String password) throws ZaasClientException;
    String login(String authorizationHeader) throws ZaasClientException;
    ZaasToken query(String token) throws ZaasClientException;
    ZaasToken query(HttpServletRequest request) throws ZaasClientException;
    ZaasOidcValidationResult validateOidc(String token) throws ZaasClientException;
    String passTicket(String jwtToken, String applicationId) throws ZaasClientException, ZaasConfigurationException;
    void logout(String token) throws ZaasClientException, ZaasConfigurationException;
}
```

This Java code enables your application to add the following functions:

- **Obtain a JWT token (`login`)**
- **Validate and get details from the token (`query`)**
- **Invalidate a JWT token (`logout`)**
- **Obtain a PassTicket (`passTicket`)**

### Obtain a JWT token (`login`)

To integrate login, call one of the following methods for login in the `ZaasClient` interface:

- If the user provides credentials in the request body, call the following method from your API:

  ```java
  String login(String userId, String password) throws ZaasClientException;
  ```

- If the user provides credentials as Basic Auth, use the following method:

    ```java
    String login(String authorizationHeader) throws ZaasClientException;
    ```

These methods return the JWT token as a String. This token can then be used to authenticate the user in subsequent APIs.

:::note
Both methods automatically use the truststore file to add a security layer, which requires configuration in the `ConfigProperties` class.
:::

### Validate and get details from the token (`query`)

Use the `query` method to get the details embedded in the token. These details include creation time of the token, expiration time of the token, and the user who the token is issued to.

Call the `query` method from your API in the following format:

```java
ZaasToken query(String token) throws ZaasClientException;
```

In return, you receive the `ZaasToken` Object in JSON format.

This method automatically uses the truststore file to add a security layer, which you configured in the `ConfigProperties` class.

The `query` method is overloaded, so you can provide the `HttpServletRequest` object that contains the token in the `apimlAuthenticationToken`
cookie or in an Authorization header. You then receive the `ZaasToken` Object in JSON format.

```java
ZaasToken query(HttpServletRequest request) throws ZaasClientException;
```

### Validate the OIDC token (`validateOidc`)

Use the `validateOidc` method to get the validity information about the OIDC token.

Call the `validateOidc` method from your API in the following format:

```java
ZaasOidcValidationResult validateOidc(String token) throws ZaasClientException;
```

In return, you receive the `ZaasOidcValidationResult` Object in JSON format.

This method automatically uses the truststore file to add a security layer, which you configured in the `ConfigProperties` class.


### Invalidate a JWT token (`logout`)

The `logout` method is used to invalidate the JWT token. The token must be provided in the Cookie header and must follow the format accepted by the API ML. 

Call the `logout` method from your API in the following format:

```java
void logout(String token) throws ZaasClientException, ZaasConfigurationException;   
```

If the token is successfully invalidated, you receive a `204` HTTP status code in return. 

### Obtain a PassTicket (`passTicket`)

The `passTicket` method has an added layer of protection. To use this method, call the method of the interface, and provide
a valid APPLID of the application and JWT token as input.

The APPLID is the name of the application (up to 8 characters) that is used by security products to differentiate certain security operations (like PassTickets) between applications.

This method has an added layer of security, whereby you do not have to provide an input to the method since you already initialized the `ConfigProperties` class. As such, this method automatically fetches the truststore and keystore files as an input.

In return, this method provides a valid pass ticket as a String to the authorized user.

:::tip
For additional information about PassTickets in API ML see [Enabling single sign on for extending services via PassTicket configuration](../../user-guide/api-mediation/configuration-extender-passtickets.md).
:::

## Getting Started (Step by Step Instructions)

To use this library, use the procedure described in this section.

**Follow these steps:**

1. Add `zaas-client` as a dependency in your project.  
You will need to specify the version of the `zaas-client` you want. `zaas-client` versioning following the semantic versioning format of `major.minor.patch`. For example, `1.22.0`.

    <details>
    <summary>Click here for procedural details using Gradle.</summary>

    **Gradle:**

    1. Create a `gradle.properties` file in the root of your project if one does not already exist.

    2. In the `gradle.properties` file, set the URL of the specific Artifactory containing the _SpringEnabler_ artifact.

    ```
    # Repository URL for getting the enabler-java artifact
    artifactoryMavenRepo=https://zowe.jfrog.io/zowe/libs-release/
    ```

    3. Add the following _Gradle_ code block to the `repositories` section of your `build.gradle` file:

    ```gradle
    repositories {
        ...

        maven {
                url artifactoryMavenRepo
        }
    }
    ```

    4. Add the following _Gradle_ dependency:

    ```groovy
    dependencies {
        compile 'org.zowe.apiml.sdk:zaas-client:{{version}}'
    }
    ```

    </details>

    <details>
    <summary>Click here for procedural details using Maven.</summary>

    **Maven:**

    1. Add the following _XML_ tags within the newly created `pom.xml` file:

    ```xml
    <repositories>
        <repository>
            <id>libs-release</id>
            <name>libs-release</name>
            <url>https://zowe.jfrog.io/zowe/libs-release/</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
    ```
    
    **Tip:** If you want to use snapshot version, replace libs-release with libs-snapshot in the repository url and change snapshots->enabled to true.
      
    2. Then add the following _Maven_ dependency:
    
    ```xml
    <dependency>
                <groupId>org.zowe.apiml.sdk</groupId>
                <artifactId>zaas-client</artifactId>
                <version>{{version}}</version>
    </dependency>
    ```

    </details>

2. In your application, create your Java class which will be used to create an instance of `ZaasClient`, which enables you to use its method to login, query, and to issue a PassTicket.

3. To use `zaas-client`, provide a property file for configuration.

    **Tip:** Check `org.zowe.apiml.zaasclient.config.ConfigProperites` to see which properties are required in the property file.

   **Configuration Properties:**

    ```java
    public class ConfigProperties {
        private String apimlHost;
        private String apimlPort;
        private String apimlBaseUrl;
        private String keyStoreType;
        private String keyStorePath;
        private String keyStorePassword;
        private String trustStoreType;
        private String trustStorePath;
        private String trustStorePassword;
        private boolean httpOnly;
    }
    ```
    
    **Note:** If `httpOnly` property is set to true, the ZAAS Client will access the API ML via HTTP protocol without TLS. 
    This meant for z/OS configuration with AT-TLS that will ensure that TLS and the required client certificates are used.

4. Create an instance of `ZaasClient` in your class and provide the `configProperties` object.

   **Example:**

    ```java
    ZaasClient zaasClient = new ZaasClientImpl(getConfigProperties());
    ```

You can now use any method from `ZaasClient` in your class.

**Example:**

For login, use the following code snippet:

```java
   String zaasClientToken = zaasClient.login("user", "password");
 ```

The following codeblock is an example of a `SampleZaasClientImplementation`.

**Example:**

```java
import org.zowe.apiml.zaasclient.config.ConfigProperties;
import org.zowe.apiml.zaasclient.exception.ZaasClientException;
import org.zowe.apiml.zaasclient.exception.ZaasConfigurationException;
import org.zowe.apiml.zaasclient.service.ZaasClient;

public class SampleZaasClientImplementation {

    /**
     * This method is used to fetch token from zaasClient
     * @param username
     * @param password
     * @return valid JWT token returned from the authentication service
     */
    public String login(String username, String password) {
        try {
            ZaasClient zaasClient = new ZaasClientImpl(getConfigProperties());
            String zaasClientToken = zaasClient.login(username, password);
            //Use this token  in subsequent calls
            return zaasClientToken;
        } catch (ZaasClientException | ZaasConfigurationException exception) {
            exception.printStackTrace();
        }
    }

    private ConfigProperties getConfigProperties() {
        // Load the values for configuration properties
     }
}
```
