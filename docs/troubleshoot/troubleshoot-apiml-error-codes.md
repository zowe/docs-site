
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

  The Message service is requested to create a message with an invalid key.

  **Action:**

  Create an issue with this message.

### ZWEAM103E

  Internal error: Invalid message text format. Please create an issue with this message.

  **Reason:**

  The Message service is requested to create a message with an invalid text format.

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
  - An incorrect security algorithm
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

  The certificate of the service accessed using URL '%s' is not trusted by the API Gateway: %s

  **Reason:**

  The Gateway does not trust the requested service and refuses to communicate with it.

  **Action:**

  Possible actions regarding to message content:
  - Message: Certificate does not match any of the subject alternative names.
  Action: Verify that the hostname which the certificate is issued for matches the hostname of the service. 
  - Message: Unable to find the valid certification path to the requested target.
  Action: Import the root CA that issued services's certificate to API Gateway truststore 

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

### ZWEAT601E

  z/OSMF service name not found. Set parameter apiml.security.auth.zosmfServiceId to your service ID.

  **Reason:**

  The parameter zosmfserviceId was not configured correctly and could not be validated.

  **Action:**

  Ensure that the parameter apiml.security.auth.zosmfServiceId is correctly entered with a valid z/OSMF service ID.

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

  The authorization header was empty or null.

  **Action:**

  Try again with a valid authorization header.

### ZWEAS170E

  An exception occurred while trying to get the token

  **Reason:**

  General exception. There is more information in the message.

  **Action:**

  Log the message from the exception and then handle the exception based on the information provided there. 

### ZWEAS400E

  Unable to generate PassTicket. Verify that the secured signon (PassTicket) function and application ID is configured properly by referring to Using PassTickets in the guide for your security provider

  **Reason:**

  Unable to generate a PassTicket.

  **Action:**

  Verify that the secured signon (PassTicket) function and application ID is configured properly by referring to Using PassTickets in the guide for your security provider.

### ZWEAS401E

  Token is not provided

  **Reason:**

  There was no JWT token provided for the generation of the PassTicket.

  **Action:**

  Ensure that you are passing a JWT token for PassTicker generation.

### ZWEAS404E

  Gateway service is unavailable

  **Reason:**

  The Gateway Service doe not respond.

  **Action:**

  Ensure that the Gateway Service is up and that the path to the gateway service is properly set.

### ZWEAS417E

  The application name wasn't found

  **Reason:**

  The application id provided for the generation of the PassTicket was not recognized by the security provider.

  **Action:**

  Ensure that the security provider recognized the application id.

### ZWEAS130E

  Invalid token provided

  **Reason:**

  The JWT token is not valid.

  **Action:**

  Provide a valid token.

### ZWEAS500E

  There was no path to the trust store.

  **Reason:**

  The Zaas Client configuration does not contain the path to the trust store.

  **Action:**

  Ensure that the configuration contains the trustStorePath and that it points to valid trust store.

### ZWEAS501E

  There was no path to the key store.

  **Reason:**

  The Zaas Client configuration does not contain the path to the key store.

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

  Ensure that both provided paths are resolved to valid trust store and valid key store.

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

  Review the static API definition directories and their setup. The static definition directories are specified as a launch parameter to a Discovery service jar. The property key is: `apiml.discovery.staticApiDefinitionsDirectories`.

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

  Configuration error '%s' when trying to read jwt secret: %s

  **Reason:**

  A problem occurred while trying to read the jwt secret key from the keystore.

  **Action:**

  Review the mandatory fields used in the configuration such as the keystore location path, the keystore and key password, and the keystore type.

### ZWEAG705E

  Failed to load public or private key from key with alias '%s' in the keystore '%s'.

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

  Request to the server instance failed and will not be retried on another instance.

  **Action:**

  Refer to Caused by details for troubleshooting.

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

  Obtain new token by performing an authentication request.

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

  z/OSMF instance '%s' not found or incorrectly configured.

  **Reason:**

  The Gateway could not find the z/OSMF instance from the Discovery Service.

  **Action:**

  Ensure that the z/OSMF instance is configured correctly and that it is successfully registered to the Discovery Service.

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
  - The URI ... is not valid. Ensure the service is providing a valid url.
  - Not able to select a route for url ... of the service ... The original url is used. If this is a problem, check the routing metadata of the service.
  - The path ... of the service URL ... is not valid. Ensure the service is providing the correct path.
 

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


