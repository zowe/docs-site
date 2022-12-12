
# Error Message Codes

The following error message codes may appear on logs or API responses. Use the following message code references and the corresponding reasons and actions to help troubleshoot issues. 

## API mediation utility messages

### ZWEAM000I

  %s started in %s seconds

  **Reason:**

  The service started.

  **Action:**

  No action required.

## API mediation common messages

### ZWEAO102E

  Gateway not yet discovered. The Transform service cannot perform the request

  **Reason:**

  The Transform service was requested to transform a url, but the Gateway instance was not discovered.

  **Action:**

  Do not begin performing requests until the API Mediation Layer fully initializes after startup. Check that your Discovery service is running and that all services (especially the Gateway) are discovered correctly.

### ZWEAO104W

  GatewayInstanceInitializer has been stopped due to exception: %s

  **Reason:**

  An unexpected exception occurred while retrieving the Gateway service instance from the Discovery Service.

  **Action:**

  Check that both the service and the Gateway can register with Discovery. If the services are not registering, investigate the reason why. If no cause can be determined, create an issue.

### ZWEAO105W

  Gateway HTTP Client per-route connection limit (maxConnectionsPerRoute) of %s has been reached for the '%s' route.

  **Reason:**

  Too many concurrent connection requests were made to the same route.

  **Action:**

  Further connections will be queued until there is room in the connection pool. You may also increase the per-route connection limit via the gateway start-up script by setting the Gateway configuration for maxConnectionsPerRoute.

### ZWEAO106W

  Gateway HTTP Client total connection limit (maxTotalConnections) of %s has been reached.

  **Reason:**

  Too many concurrent connection requests were made.

  **Action:**

  Further connections will be queued until there is room in the connection pool. You may also increase the total connection limit via the gateway start-up script by setting the Gateway configuration for maxTotalConnections.

### ZWEAO401E

  Unknown error in HTTPS configuration: '%s'

  **Reason:**

  An Unknown error occurred while setting up an HTTP client during service initialization, followed by a system exit.

  **Action:**

  Start the service again in debug mode to get a more descriptive message. This error indicates it is not a configuration issue.

## Common service core messages

### ZWEAM100E

  Could not read properties from: '%s'

  **Reason:**

  The Build Info properties file is empty or null.

  **Action:**

  The jar file is not packaged correctly. Please submit an issue.

### ZWEAM101E

  I/O Error reading properties from: '%s' Details: '%s'

  **Reason:**

  I/O error reading `META-INF/build-info.properties` or `META-INF/git.properties`.

  **Action:**

  The jar file is not packaged correctly. Please submit an issue.

### ZWEAM102E

  Internal error: Invalid message key '%s' is provided. Please create an issue with this message.

  **Reason:**

  Message service is requested to create a message with an invalid key.

  **Action:**

  Create an issue with this message.

### ZWEAM103E

  Internal error: Invalid message text format. Please create an issue with this message.

  **Reason:**

  Message service is requested to create a message with an invalid text format.

  **Action:**

  Create an issue with this message.

### ZWEAM104E

  The endpoint you are looking for '%s' could not be located

  **Reason:**

  The endpoint you are looking for could not be located.

  **Action:**

  Verify that the URL of the endpoint you are trying to reach is correct.

### ZWEAM400E

  Error initializing SSL Context: '%s'

  **Reason:**

  An error occurred while initializing the SSL Context.

  **Action:**

  Refer to the specific message to identify the exact problem.
  Possible causes include:
  - Incorrect security algorithm
  - The keystore is invalid or corrupted
  - The certificate is invalid or corrupted

### ZWEAM500W

  The service is not verifying the TLS/SSL certificates of the services

  **Reason:**

  This is a warning that the SSL Context will be created without verifying certificates.

  **Action:**

  Stop the service and set the verifySslCertificatesOfServices parameter to `true`, and then restart the service. Do not use this option in a production environment.

### ZWEAM501W

  Service is connecting to Discovery service using the non-secure HTTP protocol.

  **Reason:**

  The service is connecting to the Discovery Service using the non-secure HTTP protocol.

  **Action:**

  For production use, start the Discovery Service in HTTPS mode and configure the services accordingly.

### ZWEAM502E

  Error reading secret key: '%s'

  **Reason:**

  A key with the specified alias cannot be loaded from the keystore.

  **Action:**

  Ensure that the configured key is present, in the correct format, and not corrupt.

### ZWEAM503E

  Error reading secret key: '%s'

  **Reason:**

  Error reading secret key.

  **Action:**

  Refer to the specific message to identify the exact problem.
  Possible causes include:
  - An incorrect security algorithm
  - The keystore is invalid or corrupted
  - The certificate is invalid or corrupted

### ZWEAM504E

  Error reading public key: '%s'

  **Reason:**

  Error reading secret key.

  **Action:**

  Refer to the specific message to identify the exact problem.
  Possible causes include:
  - An incorrect security algorithm
  - The keystore is invalid or corrupted
  - The certificate is invalid or corrupted

### ZWEAM505E

  Error initializing SSL/TLS context: '%s'

  **Reason:**

  Error initializing SSL/TLS context.

  **Action:**

  Refer to the specific message to identify the exact problem.
  Possible causes include:
  - An incorrect security algorithm
  - The keystore is invalid or corrupted
  - The certificate is invalid or corrupted

### ZWEAM506E

  Truststore Password configuration parameter is not defined

  **Reason:**

  Your truststore password was not set in the configuration.

  **Action:**

  Ensure that the parameter server.ssl.trustStorePassword contains the correct password for your truststore.

### ZWEAM507E

  Truststore configuration parameter is not defined but it is required

  **Reason:**

  The truststore usage is mandatory, but the truststore location is not provided.

  **Action:**

  If a truststore is required, define the truststore configuration parameter by editing the server.ssl.truststore, server.ssl.truststorePassword and server.ssl.truststoreType parameters with valid data. If you do not require a truststore, change the trustStoreRequired boolean parameter to `false`.

### ZWEAM508E

  Keystore not found, server.ssl.keyStore configuration parameter is not defined

  **Reason:**

  Your keystore path was not set in the configuration.

  **Action:**

  Ensure that the correct path to your keystore is contained in the parameter server.ssl.keyStore in the properties or yaml file of your service.

### ZWEAM509E

  Keystore password not found, server.ssl.keyStorePassword configuration parameter is not defined

  **Reason:**

  Your keystore password was not set in the configuration.

  **Action:**

  Ensure that the correct password to your keystore in the parameter server.ssl.keyStorePassword is contained in the properties or yaml file of your service.

### ZWEAM510E

  Invalid key alias '%s'

  **Reason:**

  The key alias was not found.

  **Action:**

  Ensure that the key alias provided for the key exists in the provided keystore.

### ZWEAM511E

  There was a TLS request error accessing the URL '%s': '%s'

  **Reason:**

  The Gateway refuses to communicate with the requested service.

  **Action:**

  Possible actions regarding to message content:
  - Message: The certificate is not trusted by the API Gateway.
  Action: Verify trust of the certificate is the issue by disabling certificate verification and retry the request.
  - Message: Certificate does not match any of the subject alternative names.
  Action: Verify that the hostname which the certificate is issued for matches the hostname of the service.
  - Message: Unable to find the valid certification path to the requested target.
  Action: Import the root CA that issued services' certificate to API Gateway truststore.
  - Message: Verify the requested service supports TLS.
  Action: Ensure the requested service is running with TLS enabled.
  - Message: Review the APIML debug log for more information.
  Action: Enable APIML debug mode and retry the request, then review the APIML log for TLS errors.

### ZWEAM600W

  Invalid parameter in metadata: '%s'

  **Reason:**

  An invalid apiInfo parameter was found while parsing the service metadata.

  **Action:**

  Remove or fix the referenced metadata parameter.

### ZWEAM700E

  No response received within the allowed time: %s

  **Reason:**

  No response was received within the allowed time.

  **Action:**

  Verify that the URL you are trying to reach is correct and all services are running.

### ZWEAM701E

  The request to the URL '%s' has failed: %s caused by: %s

  **Reason:**

  The request failed because of an internal error.

  **Action:**

  Refer to specific exception details for troubleshooting. Create an issue with this message.

## Security common messages

### ZWEAT100E

  Token is expired for URL '%s'

  **Reason:**

  The validity of the token is expired.

  **Action:**

  Obtain a new token by performing an authentication request.

### ZWEAT103E

  Could not write response: %s

  **Reason:**

  A message could not be written to the response.

  **Action:**

  Please submit an issue with this message.

### ZWEAT403E

  The user is not authorized to the target resource: %s

  **Reason:**

  The service has accepted the authentication of the user but the user does not have access rights to the resource.

  **Action:**

  Contact your security administrator to give you access.

### ZWEAT409E

  The platform returned error: %s

  **Reason:**

  The platform responded with unknown errno code.

  **Action:**

  Please submit an issue with this message.

### ZWEAT410E

  The platform returned error: %s

  **Reason:**

  The specified password is incorrect.

  **Action:**

  Provide correct password.

### ZWEAT411E

  The platform returned error: %s

  **Reason:**

  The platform returned error, specified in the error message.

  **Action:**

  Contact your security administrator with the message.

### ZWEAT412E

  The platform returned error: %s

  **Reason:**

  The specified password is expired.

  **Action:**

  Contact your security administrator to reset your password.

### ZWEAT413E

  The platform returned error: %s

  **Reason:**

  The new password is not valid.

  **Action:**

  Provide valid password.

### ZWEAT414E

  The platform returned error: %s

  **Reason:**

  The user name access has been revoked.

  **Action:**

  Contact your security administrator to unsuspend your account.

### ZWEAT415E

  The platform returned error: %s

  **Reason:**

  The user name does not exist in the system.

  **Action:**

  Provide correct user name.

### ZWEAT416E

  The platform returned error: %s

  **Reason:**

  The specified user name or password is invalid.

  **Action:**

  Provide correct user name or password.

### ZWEAT601E

  z/OSMF service name not found. Set parameter apiml.security.auth.zosmf.serviceId to your service ID.

  **Reason:**

  The parameter zosmfserviceId was not configured correctly and could not be validated.

  **Action:**

  Ensure that the parameter apiml.security.auth.zosmf.serviceId is correctly entered with a valid z/OSMF service ID.

### ZWEAT602E

  The SAF provider `endpoint` supports only the resource class 'ZOWE', but the current one is '%s'

  **Reason:**

  The parameter `apiml.security.authorization.provider` is set to `endpoint`

  **Action:**

  Change the SAF provider to another one to use this endpoint

### ZWEAT603E

  Endpoint `%s` is not properly configured

  **Reason:**

  The application cannot call the endpoint to check the SAF resource of the user

  **Action:**

  Verify the state of ZSS and IZS, then check if parameters `apiml.security.authorization.endpoint.*` are matching.

### ZWEAT604E

  Passwords do not match

  **Reason:**

  Re-entered password does not match for password update.

  **Action:**

  Enter the same value as the one entered for new password.

### ZWEAT605E

  Invalid body provided in request to create personal access token

  **Reason:**

  The request body is not valid

  **Action:**

  Use a valid body in the request. Format of a message: {validity: int , scopes: [string]}.

### ZWEAT606E

  Body in the HTTP request for Personal Access Token does not contain scopes

  **Reason:**

  The request body is not valid

  **Action:**

  Provide a list of services for which this token will be valid

### ZWEAT607E

  Body in the revoke request is not valid.

  **Reason:**

  The request body is not valid

  **Action:**

  Use a valid body in the request. Format of a message: {userId: string, (optional)timestamp: long} or {serviceId: string, (optional)timestamp: long}.

## Security client messages

### ZWEAS100E

  Authentication exception: '%s' for URL '%s'

  **Reason:**

  A generic failure occurred while authenticating.

  **Action:**

  Refer to the specific message to troubleshoot.

### ZWEAS101E

  Authentication method '%s' is not supported for URL '%s'

  **Reason:**

  The HTTP request method is not supported for the URL.

  **Action:**

  Use the correct HTTP request method that is supported for the URL.

### ZWEAS103E

  API Gateway Service is not available by URL '%s' (API Gateway is required because it provides the authentication functionality)

  **Reason:**

  The security client cannot find a Gateway instance to perform authentication. The API Gateway is required because it provides the authentication functionality.

  **Action:**

  Check that both the service and Gateway are correctly registered in the Discovery service. Allow some time after the services are discovered for the information to propagate to individual services.

### ZWEAS104E

  Authentication service is not available by URL '%s'

  **Reason:**

  The Authentication service is not available.

  **Action:**

  Make sure that the Authentication service is running and is accessible by the URL provided in the message.

### ZWEAS105E

  Authentication is required for URL '%s'

  **Reason:**

  Authentication is required.

  **Action:**

  Provide valid authentication.

### ZWEAS120E

  Invalid username or password for URL '%s'

  **Reason:**

  The username or password is invalid.

  **Action:**

  Provide a valid username and password.

### ZWEAS121E

  Authorization header is missing, or the request body is missing or invalid for URL '%s'

  **Reason:**

  The authorization header is missing, or the request body is missing or invalid.

  **Action:**

  Provide valid authentication.

### ZWEAS123E

  Invalid token type in response from Authentication service.

  **Reason:**

  Could not retrieve the proper authentication token from the Authentication service response.

  **Action:**

  Review your APIML authentication provider configuration and ensure your Authentication service is working.

### ZWEAS130E

  Token is not valid for URL '%s'

  **Reason:**

  The token is not valid.

  **Action:**

  Provide a valid token.

### ZWEAS131E

  No authorization token provided for URL '%s'

  **Reason:**

  No authorization token is provided.

  **Action:**

  Provide a valid authorization token.

## ZAAS client messages

### ZWEAS100E

  Token is expired for URL

  **Reason:**

  The application using the token kept it for longer than the expiration time

  **Action:**

  When this error occurs it is necessary to get a new JWT token. 

### ZWEAS120E

  Invalid username or password

  **Reason:**

  Provided credentials weren't recognized

  **Action:**

  Try with different credentials

### ZWEAS121E

  Empty or null username or password values provided

  **Reason:**

  One of the credentials was null or empty

  **Action:**

  Try with full set of credentials

### ZWEAS122E

  Empty or null authorization header provided

  **Reason:**

  The authorization header was empty or null

  **Action:**

  Try again with a valid authorization header

### ZWEAS170E

  An exception occurred while trying to get the token

  **Reason:**

  General exception. There are more pieces of information in the message

  **Action:**

  Log the message from the exception and then handle the exception based on the information provided there. 

### ZWEAS400E

  Unable to generate PassTicket. Verify that the secured signon (PassTicket) function and application ID is configured properly by referring to Using PassTickets in the guide for your security provider

  **Reason:**

  Unable to generate PassTicket.

  **Action:**

  Verify that the secured signon (PassTicket) function and application ID is configured properly by referring to Using PassTickets in the guide for your security provider

### ZWEAS401E

  Token is not provided

  **Reason:**

  There was no JWT token provided for the generation of the PassTicket

  **Action:**

  Ensure that you are passing JWT token for PassTicker generation

### ZWEAS404E

  Gateway service is unavailable

  **Reason:**

  Gateway service does not respond.

  **Action:**

  Ensure that the Gateway service is up and that the path to the gateway service is properly set.

### ZWEAS417E

  The application name was not found

  **Reason:**

  The application id provided for the generation of the PassTicket was not recognized by the security provider

  **Action:**

  Ensure that the security provider recognized the application id.

### ZWEAS130E

  Invalid token provided

  **Reason:**

  The JWT token is not valid

  **Action:**

  Provide a valid token.

### ZWEAS500E

  There was no path to the trust store.

  **Reason:**

  The Zaas Client configuration does not contain the path to the trust store

  **Action:**

  Ensure that the configuration contains the trustStorePath and that it points to valid trust store.

### ZWEAS501E

  There was no path to the key store.

  **Reason:**

  The Zaas Client configuration does not contain the path to the key store

  **Action:**

  Ensure that the configuration contains the keyStorePath and that it points to valid key store.

### ZWEAS502E

  The configuration provided for SSL is invalid.

  **Reason:**

  The type of the keystore, truststore or the included keys/certs aren't considered valid

  **Action:**

  Ensure that the combination of the configuration is cryptographically valid.

### ZWEAS503E

  The SSL configuration contained invalid path.

  **Reason:**

  There was an invalid path to either trust store or keystore

  **Action:**

  Ensure that both provided paths are resolved to valid trust store and valid key store

## Discovery service messages

### ZWEAD400E

  Cannot notify Gateway on '%s' about new instance '%s'

  **Reason:**

  The Discovery Service tried to notify the Gateway about an instance update, but the REST call failed. The purpose of this call is to update the Gateway caches. The Gateway might be down or a network problem occurred.

  **Action:**

  Ensure that there are no network issues and that the Gateway was not restarted. If the problem reoccurs, contact Broadcom support. 

### ZWEAD401E

  Cannot notify Gateway on '%s' about cancelled registration

  **Reason:**

  The Discovery Service tried to notify the Gateway about service un-registration, but the REST call failed. The purpose of this call is to update the Gateway caches. The Gateway might be down or a network problem occurred.

  **Action:**

  Ensure that there are no network issues and that the Gateway was not restarted. If the problem reoccurs, contact Broadcom support. 

### ZWEAD700W

  Static API definition directory '%s' is not a directory or does not exist

  **Reason:**

  One of the specified static API definition directories does not exist or is not a directory.

  **Action:**

  Review the static API definition directories and their setup. The static definition directories are specified as a launch parameter to a Discovery service jar. The property key is: `apiml.discovery.staticApiDefinitionsDirectories`

### ZWEAD701E

  Error loading static API definition file '%s'

  **Reason:**

  A problem occurred while reading (IO operation) of a specific static API definition file.

  **Action:**

  Ensure that the file data is not corrupted or incorrectly encoded.

### ZWEAD702W

  Unable to process static API definition data: '%s' - '%s'

  **Reason:**

  A problem occurred while parsing a static API definition file.

  **Action:**

  Review the mentioned static API definition file for errors.
  Refer to the specific log message to determine the exact cause of the problem:
 
  - ServiceId is not defined in the file '%s'. The instance will not be created. Make sure to specify the ServiceId.
  - The `instanceBaseUrls` parameter of %s is not defined. The instance will not be created. Make sure to specify the `InstanceBaseUrl` property.
  - The API Catalog UI tile ID %s is invalid. The service %s will not have an API Catalog UI tile. Specify the correct catalog title ID.
  - One of the instanceBaseUrl of %s is not defined. The instance will not be created. Make sure to specify the InstanceBaseUrl property.
  - The URL %s does not contain a hostname. The instance of %s will not be created. The specified URL is malformed. Make sure to specify valid URL.
  - The URL %s does not contain a port number. The instance of %s will not be created.
  - The specified URL is missing a port number. Make sure to specify a valid URL.
  - The URL %s is malformed. The instance of %s will not be created: The Specified URL is malformed. Make sure to specify a valid URL.
  - The hostname of URL %s is unknown. The instance of %s will not be created: The specified hostname of the URL is invalid. Make sure to specify a valid hostname.
  - Invalid protocol. The specified protocol of the URL is invalid. Make sure to specify valid protocol.
  - Additional service metadata of %s in processing file %s could not be created: %s

### ZWEAD703E

  A problem occurred during reading the static API definition directory: '%s'

  **Reason:**

  There are three possible causes of this error:
  - The specified static API definition folder is empty.
  - The definition does not denote a directory.
  - An I/O error occurred while attempting to read the static API definition directory.

  **Action:**

  Review the static API definition directory definition and its contents on the storage. The static definition directories are specified as a parameter to launch a Discovery Service jar. The property key is: `apiml.discovery.staticApiDefinitionsDirectories`

### ZWEAD704E

  Gateway Service is not available so it cannot be notified about changes in Discovery Service

  **Reason:**

  Gateway Service is probably mis-configured or failed to start from another reason.

  **Action:**

  Review the log of Gateway Service and its configuration.

## Gateway service messages

### ZWEAG500E

  Client certificate is missing in request.

  **Reason:**

  No client certificate is present in the HTTPS request.

  **Action:**

  Properly configure client to send client certificate.

### ZWEAG700E

  No instance of the service '%s' found. Routing will not be available.

  **Reason:**

  The Gateway could not find an instance of the service from the Discovery Service.

  **Action:**

  Check that the service was successfully registered to the Discovery Service and wait for Spring Cloud to refresh the routes definitions.

### ZWEAG701E

  Service '%s' does not allow encoded characters in the request path: '%s'.

  **Reason:**

  The request that was issued to the Gateway contains an encoded character in the URL path. The service that the request was addressing does not allow this pattern.

  **Action:**

  Contact the system administrator and request enablement of encoded characters in the service.

### ZWEAG702E

  Gateway does not allow encoded slashes in request: '%s'.

  **Reason:**

  The request that was issued to the Gateway contains an encoded slash in the URL path. Gateway configuration does not allow this encoding in the URL.

  **Action:**

  Contact the system administrator and request enablement of encoded slashes in the Gateway.

### ZWEAG704E

  Configuration error '%s' when trying to read the public and private key for signing JWT: %s

  **Reason:**

  A problem occurred while trying to read the certificate-key pair from the keystore.

  **Action:**

  Review the mandatory fields used in the configuration such as the keystore location path, the keystore and key password, and the keystore type.

### ZWEAG705E

  Failed to load public or private key from key with alias '%s' in the keystore '%s'. Gateway is shutting down.

  **Reason:**

  Failed to load a public or private key from the keystore during JWT Token initialization.

  **Action:**

  Check that the key alias is specified and correct. Verify that the keys are present in the keystore.

### ZWEAG706E

  RequestContext is not prepared for load balancing.

  **Reason:**

  Custom Ribbon load balancing is not in place before calling Ribbon.

  **Action:**

  Contact Broadcom support.

### ZWEAG707E

  The request to the URL '%s' aborted without retrying on another instance. Caused by: %s

  **Reason:**

  The request to the server instance failed and will not be retried on another instance.

  **Action:**

  Refer to 'Caused by' details for troubleshooting.

### ZWEAG708E

  The request to the URL '%s' failed after retrying on all known service instances. Caused by: %s

  **Reason:**

  Request to the server instance could not be executed on any known service instance.

  **Action:**

  Verify the status of the requested instance.

### ZWEAG709E

  Service is not available at URL '%s'. Error returned: '%s'

  **Reason:**

  The service is not available.

  **Action:**

  Make sure that the service is running and is accessible by the URL provided in the message.

### ZWEAG710E

  Load balancer does not have available server for client: %s

  **Reason:**

  The service is not available. It might be removed by the Circuit Breaker or by requesting specific instance that is not available.

  **Action:**

  Try the request later, or remove the request for the specific instance.

### ZWEAG711E

  The principal '%s' is missing queried authorization.

  **Reason:**

  The principal does not have the queried access to the resource name within the resource class.

  **Action:**

  No action is needed.

### ZWEAG712E

  The URI '%s' is an invalid format

  **Reason:**

  The URI does not follow the format /{serviceId}/{type}/{version}/{endpoint} or /{type}/{version}/{serviceId}/{endpoint}.

  **Action:**

  Use a properly formatted URI.

### ZWEAG713E

  Configuration error when trying to establish JWT producer. Events: %s

  **Reason:**

  A problem occurred while trying to make sure that there is a valid JWT producer available. A possible cause of the problem is that API ML does not recognize the authentication type used by z/OSMF.

  **Action:**

  Based on the specific information in the message, verify that the key configuration is correct, or alternatively, that z/OSMF is available. If z/OSMF is available, specify the authentication type used by z/OSMF in your configuration settings.

  Use the following configuration format:
  ```
  apiml:
    security:
        auth: 
            zosmf:
                jwtAutoconfiguration: 
  ```
  Apply one of the following values:
  
  * **auto**  
  Signifies that API ML is enabled to resolve the JWT producer
  
  * **jwt**  
  Signifies that z/OSMF supports JWT (APAR PH12143 is applied)
  
  * **ltpa**  
  Signifies that z/OSMF does not support JWT

### ZWEAG714E

  Unknown error occurred while retrieving the used public key

  **Reason:**

  An unknown problem occurred when retrieving the used public key. This should never occur.

  **Action:**

  Try again later.

### ZWEAG715E

  The wrong amount of keys retrieved. The amount of retrieved keys is: %s

  **Reason:**

  There are too many keys in the JWK set. As such, it is not possible to choose the correct one.

  **Action:**

  Verify the configuration of the z/OSMF to make sure that z/OSMF provides only one used key.

### ZWEAG716E

  The system does not know what key should be used.

  **Reason:**

  Typically z/OSMF is either unavailable or offline.

  **Action:**

  Verify that z/OSMF is available, accessible by the Gateway service, and online.

### ZWEAG717E

  The service id provided is invalid: '%s'

  **Reason:**

  The provided id is not valid under conformance criteria.

  **Action:**

  Verify the conformance criteria, provide valid service id.

### ZWEAG100E

  Authentication exception: '%s' for URL '%s'

  **Reason:**

  A generic failure occurred during authentication.

  **Action:**

  Refer to the specific authentication exception details for troubleshooting.

### ZWEAG101E

  Authentication method '%s' is not supported for URL '%s'

  **Reason:**

  The HTTP request method is not supported by the URL.

  **Action:**

  Use the correct HTTP request method supported by the URL.

### ZWEAG102E

  Token is not valid

  **Reason:**

  The JWT token is not valid.

  **Action:**

  Provide a valid token.

### ZWEAG103E

  The token has expired

  **Reason:**

  The JWT token has expired.

  **Action:**

  Obtain a new token by performing an authentication request.

### ZWEAG104E

  Authentication service is not available at URL '%s'. Error returned: '%s'

  **Reason:**

  The authentication service is not available.

  **Action:**

  Make sure that the authentication service is running and is accessible by the URL provided in the message.

### ZWEAG105E

  Authentication is required for URL '%s'

  **Reason:**

  Authentication is required.

  **Action:**

  Provide valid authentication.

### ZWEAG106W

  Login endpoint is running in dummy mode. Use credentials '%s'/'%s' to log in. Do not use this option in the production environment.

  **Reason:**

  The authentication is running in dummy mode.

  **Action:**

  Ensure that this option is not being used in a production environment.

### ZWEAG107W

  Incorrect value: apiml.security.auth.provider = '%s'. The authentication provider is not set correctly. The default 'zosmf' authentication provider is being used.

  **Reason:**

  An incorrect value of the apiml.security.auth.provider parameter is set in the configuration.

  **Action:**

  Ensure that the value of apiml.security.auth.provider is set either to 'dummy' if you want to use dummy mode, or to 'zosmf' if you want to use the z/OSMF authentication provider.

### ZWEAG108E

  z/OSMF instance '%s' not found or incorrectly configured. Gateway is shutting down.

  **Reason:**

  The Gateway could not find the z/OSMF instance from the Discovery Service or it could not communicate with the provided z/OSMF instance.

  **Action:**

  Ensure that the z/OSMF instance is configured correctly and that it is successfully registered to the Discovery Service and that the API Mediation Layer can communicate with the provided z/OSMF instance. The default timeout is 5 minutes. On a slower system, add the variable components.gateway.apiml.security.jwtInitializerTimeout:... and the value in minutes into Zowe's configuration to override this value.

### ZWEAG109E

  z/OSMF response does not contain field '%s'.

  **Reason:**

  The z/OSMF domain cannot be read.

  **Action:**

  Review the z/OSMF domain value contained in the response received from the 'zosmf/info' REST endpoint.

### ZWEAG110E

  Error parsing z/OSMF response. Error returned: '%s

  **Reason:**

  An error occurred while parsing the z/OSMF JSON response.

  **Action:**

  Check the JSON response received from the 'zosmf/info' REST endpoint.

### ZWEAG120E

  Invalid username or password for URL '%s'

  **Reason:**

  The username and/or password are invalid.

  **Action:**

  Provide a valid username and password.

### ZWEAG121E

  Authorization header is missing, or the request body is missing or invalid for URL '%s'

  **Reason:**

  The authorization header is missing, or the request body is missing or invalid.

  **Action:**

  Provide valid authentication.

### ZWEAS123E

  Invalid token type in response from Authentication service.

  **Reason:**

  Could not retrieve the proper authentication token from the Authentication service response.

  **Action:**

  Review your APIML authentication provider configuration and ensure your Authentication service is working.

### ZWEAG130E

  Token is not valid for URL '%s'

  **Reason:**

  The token is not valid.

  **Action:**

  Provide a valid token.

### ZWEAG131E

  No authorization token provided for URL '%s'

  **Reason:**

  No authorization token is provided.

  **Action:**

  Provide a valid authorization token.

### ZWEAG140E

  The 'applicationName' parameter name is missing.

  **Reason:**

  The application name is not provided.

  **Action:**

  Provide the 'applicationName' parameter.

### ZWEAG141E

  The generation of the PassTicket failed. Reason: %s

  **Reason:**

  An error occurred in the SAF Auth Service. Review the reason in the error message.

  **Action:**

  Supply a valid user and application name, and check that corresponding permissions have been set up.

### ZWEAG150E

  SAF IDT generation failed. Reason: %s

  **Reason:**

  An error occurred during SAF verification. Review the reason in the error message.

  **Action:**

  Verify the Identity Token configuration.

### ZWEAG151E

  SAF IDT is not generated because authentication or authorization failed. Reason: %s

  **Reason:**

  The user credentials were rejected during SAF verification. Review the reason in the error message.

  **Action:**

  Provide a valid username and password.

### ZWEAG160E

  No authentication provided in the request

  **Reason:**

  The JWT token or client certificate was not provided with the request

  **Action:**

  Configure your client to provide valid authentication.

### ZWEAG161E

  No user was found

  **Reason:**

  It was not possible to map provided token or certificate to the mainframe identity.

  **Action:**

  Ask your security administrator to connect your token or client certificate with your mainframe user.

### ZWEAG162E

  Gateway service failed to obtain token.

  **Reason:**

  Authentication request to get token failed.

  **Action:**

  Contact your administrator.

### ZWEAG163E

  Error occurred while parsing X509 certificate.

  **Reason:**

  %s

  **Action:**

  Configure your client to provide valid x509 certificate.

### ZWEAG164E

  Error occurred while validating X509 certificate. %s

  **Reason:**

  X509 certificate cannot be validated or the certificate cannot be used for client authentication.

  **Action:**

  Configure your client to provide valid x509 certificate.

### ZWEAG165E

  X509 certificate is missing the client certificate extended usage definition

  **Reason:**

  X509 certificate cannot be used for client authentication.

  **Action:**

  Configure your client to provide valid x509 certificate.

### ZWEAG166E

  ZOSMF authentication scheme is not supported for this API ML instance.

  **Reason:**

  z/OSMF is not used as security provider for API ML.

  **Action:**

  Contact your administrator.

### ZWEAG167E

  No client certificate provided in the request

  **Reason:**

  The X509 client certificate was not provided with the request

  **Action:**

  Configure your client to provide valid certificate.

### ZWEAG168E

  Invalid authentication provided in request

  **Reason:**

  The JWT token or client certificate is not valid

  **Action:**

  Configure your client to provide valid authentication.

### ZWEAT607E

  Body in the revoke request is not valid.

  **Reason:**

  The request body is not valid

  **Action:**

  Use a valid body in the request. Format of a message: {userId: string, (optional)timestamp: long} or {serviceId: string, (optional)timestamp: long}.

## API Catalog messages

### ZWEAC100W

  Could not retrieve all service info from discovery -- %s -- %s -- %s

  **Reason:**

  The response from The Discovery Service about the registered instances returned an error or empty body.

  **Action:**

  Make sure the Discovery Service is up and running. If the http response error code refers to a security issue, check that both the Discovery Service and Catalog are running with the https scheme and that security is configured properly.

### ZWEAC101E

  Could not parse service info from discovery -- %s

  **Reason:**

  The response from the Discovery Service about the registered instances could not be parsed to extract applications.

  **Action:**

  Run debug mode and look at the Discovery Service potential issues while creating a response. If the Discovery Service does not indicate any error, create an issue.

### ZWEAC102E

  Could not retrieve containers. Status: %s

  **Reason:**

  One or more containers could not be retrieved.

  **Action:**

  Check the status of the message for more information and the health of the Discovery Service.

### ZWEAC103E

  API Documentation not retrieved, %s

  **Reason:**

  API documentation was not found.

  **Action:**

  Make sure the service documentation is configured correctly.

### ZWEAC104E

  Could not retrieve container statuses, %s

  **Reason:**

  The status of one or more containers could not be retrieved.

  **Action:**

  Check the status of the message for more information and the health of the Discovery Service.

### ZWEAC700E

  Failed to update cache with discovered services: '%s'

  **Reason:**

  Cache could not be updated.

  **Action:**

  Check the status of the Discovery Service.

### ZWEAC701W

  API Catalog Instance not retrieved from Discovery service

  **Reason:**

  An error occurred while fetching containers information.

  **Action:**

  The jar file is not packaged correctly. Please submit an issue.

### ZWEAC702E

  An unexpected exception occurred when trying to retrieve an API Catalog instance from the Discovery Service: %s

  **Reason:**

  An unexpected error occurred during API Catalog initialization. The API Catalog was trying to locate an instance of itself in the Discovery Service.

  **Action:**

  Review the specific message for more information. Verify if the Discovery Service and service registration work as expected.

### ZWEAC703E

  Failed to initialize API Catalog with discovered services

  **Reason:**

  The API Catalog could not initialize running services after several retries.

  **Action:**

  Ensure services are started and discovered properly.

### ZWEAC704E

  ApiDoc retrieval problem for '%s' service. %s

  **Reason:**

  ApiDoc for service could not be retrieved.

  **Action:**

  Verify that the service provides a valid ApiDoc.

### ZWEAC705W

  The home page url for service %s was not transformed. %s

  **Reason:**

  The home page url for service was not transformed. The original url will be used.

  **Action:**

  Refer to the specific printed message. Possible causes include:
  - The Gateway was not found. The Transform service cannot perform the request. Wait for the Gateway to be discovered.
  - The URI is not valid. Ensure the service is providing a valid URL.
  - Not able to select a route for the URL of the specific service. The original URL is used. If necessary, check the routing metadata of the service.
  - The path of the service URL is not valid. Ensure the service is providing the correct path.
 

### ZWEAC706E

  Service not located, %s

  **Reason:**

  The service could not be found.

  **Action:**

  Check if the service is up and registered. If it is not registered, review the onboarding guide to ensure that all steps were completed.

### ZWEAC707E

  Static API refresh failed, caused by exception: %s

  **Reason:**

  The Static API refresh could not be performed because of exception.

  **Action:**

  Check the specific exception for troubleshooting.

### ZWEAC708E

  The API base path for service %s was not retrieved. %s

  **Reason:**

  The API base path for service was not retrieved. An empty path will be used.

  **Action:**

  Refer to the specific printed message. Possible causes include:
  - The URI is not valid. Ensure the service is providing a valid URL.
  - Not able to select a route for the URL of the specific service. The original URL is used. If necessary, check the routing metadata of the service.
  - The path of the service URL is not valid. Ensure the service is providing the correct path.
 

### ZWEAC709E

  Static definition generation failed, caused by exception: %s

  **Reason:**

  The Static definition generation could not be performed because of exception.

  **Action:**

  Check the specific exception for troubleshooting.

