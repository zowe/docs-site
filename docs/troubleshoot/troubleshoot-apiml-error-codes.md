
# Error Message Codes

The following error message codes may appear on logs or API responses. Use the following message code references and the corresponding reasons and actions to help troubleshoot issues. 

## API mediation common messages

### ZWEAO102E

  Gateway not found yet, transform service cannot perform the request

  **Reason:**

  The Transform service was requested to transform a url, but the Gateway instance was discovered.

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

### ZWEAM000I

  %s has been started in %s seconds

  **Reason:**

  The service has been started

  **Action:**

  No action is needed

### ZWEAM100E

  Could not read properties from: '%s'

  **Reason:**

  The Build Info properties file is empty or null.

  **Action:**

  The jar file is not packaged correctly. Please submit an issue.

### ZWEAM101E

  I/O Error reading properties from: '%s' Details: '%s'

  **Reason:**

  I/O error reading `META-INF/build-info.properties` or `META-INF/git.properties`

  **Action:**

  The jar file is not packaged correctly. Please submit an issue.

### ZWEAM102E

  Internal error: Invalid message key '%s' is provided. Please create an issue with this message.

  **Reason:**

  Message service is requested to create message with an invalid key.

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

  Stop the service and set the verifySslCertificatesOfServices parameter to `true`. Then restart the service. Do not use this option in a production environment.

### ZWEAM501W

  Service is connecting to Discovery service using insecure HTTP protocol.

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

  Thr Gateway does not trust the requested service and refuses to communicate with it. The certificate of the service is missing from the truststore of the API Mediation Layer.

  **Action:**

  Contact your administrator to verify API Mediation Layer truststore configuration.

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

  Request failed because of internal error.

  **Action:**

  Refer to specific exception details for troubleshooting. Create an issue with this message.

## Security common messages

### ZWEAT103E

  Could not write response: %s

  **Reason:**

  A message could not be written to the response

  **Action:**

  Please submit an issue with this message.

### ZWEAT601E

  z/OSMF service name not found. Set parameter apiml.security.auth.zosmfServiceId to your service ID.

  **Reason:**

  The parameter zosmfserviceId was not configured correctly and could not be validated.

  **Action:**

  Ensure that the parameter apiml.security.auth.zosmfServiceId is correctly entered with a valid zosmf service ID.

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

### ZWEAS102E

  Token is expired for URL '%s'

  **Reason:**

  The validity of the token is expired.

  **Action:**

  Obtain new token by performing an authentication request.

### ZWEAS103E

  API Gateway Service is not available by URL '%s' (API Gateway is required because it provides the authentication functionality)

  **Reason:**

  The security client cannot find a Gateway instance to perform authentication. The API Gateway is required because it provides the authentication functionality.

  **Action:**

  Check that both the service and Gateway are correctly registered in the Discovery service. Allow some time after the services are discovered for the information to propagate to individual services.

### ZWEAS104E

  Authentication service is not available by URL '%s'

  **Reason:**

  Authentication service is not available.

  **Action:**

  Make sure that authentication service is running and is accessible by the URL provided in the message.

### ZWEAS105E

  Authentication is required for URL '%s'

  **Reason:**

  Authentication is required.

  **Action:**

  Provide valid authentication.

### ZWEAS120E

  Invalid username or password for URL '%s'

  **Reason:**

  The username or password are invalid.

  **Action:**

  Provide a valid username and password.

### ZWEAS121E

  Authorization header is missing, or request body is missing or invalid for URL '%s'

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

## Discovery service messages

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

  Unable to process static API definition data: '%s'

  **Reason:**

  A problem occurred while parsing a static API definition file.

  **Action:**

  Review the mentioned static API definition file for errors.
  Refer to the specific log message to see what is the exact cause of the problem:
 
  - ServiceId is not defined in the file '%s'. The instance will not be created. Make sure to specify the ServiceId.
  - The `instanceBaseUrls` parameter of %s is not defined. The instance will not be created. Make sure to specify the `InstanceBaseUrl` property.
  - The API Catalog UI tile ID %s is invalid. The service %s will not have an API Catalog UI tile. Specify the correct catalog title ID.
  - One of the instanceBaseUrl of %s is not defined. The instance will not be created. Make sure to specify the InstanceBaseUrl property.
  - The URL %s does not contain a hostname. The instance of %s will not be created. The specified URL is malformed. Make sure to specify valid URL.
  - The URL %s does not contain a port number. The instance of %s will not be created.
  - The specified URL is missing a port number. Make sure to specify a valid URL.
  - The URL %s is malformed. The instance of %s will not be created: The Specified URL is malformed. Make sure to specify a valid URL.
  - The hostname of URL %s is unknown. The instance of %s will not be created: The specified hostname of the URL is invalid. Make sure to specify valid hostname.
  - Invalid protocol. The specified protocol of the URL is invalid. Make sure to specify valid protocol.

### ZWEAD703E

  A problem occurred during reading the static API definition directory: '%s'

  **Reason:**

  There are three possible causes of this error:
  - The specified static API definition folder is empty
  - The definition does not denote a directory
  - An I/O error occurred while attempting to read the static API definition directory.

  **Action:**

  Review the static API definition directory definition and its contents on the storage. The static definition directories are specified as a parameter to launch a Discovery service jar. The property key is: `apiml.discovery.staticApiDefinitionsDirectories`

## Gateway service messages

### ZWEAG700E

  No instance of the service '%s' found. Routing will not be available.

  **Reason:**

  The Gateway could not find an instance of the service from the Discovery Service.

  **Action:**

  Check that the service was successfully registered to the Discovery Service and wait for Spring Cloud to refresh the routes definitions
  
### ZWEAG701W

  Service '%s' does not allow encoded characters by request: '%s'.

  **Reason:**

  The request that was issued to the Gateway contains an encoded character in the URL path. The service that the request was addressing does not allow this pattern.

  **Action:**

  Contact the system administrator and ask to enable encoded characters in the service

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

### ZWEAG100E

  Authentication exception: '%s' for URL '%s'

  **Reason:**

  A generic failure occurred during authentication.

  **Action:**

  Refer to specific authentication exception details for troubleshooting.

### ZWEAG101E

  Authentication method '%s' is not supported for URL '%s'

  **Reason:**

  The HTTP request method is not supported by the URL.

  **Action:**

  Use the correct HTTP request method supported by the URL.

### ZWEAG102E

  Token is not valid

  **Reason:**

  The JWT token is not valid

  **Action:**

  Provide a valid token.

### ZWEAG103E

  Token is expired

  **Reason:**

  The JWT token has expired

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

  Login endpoint is running in the dummy mode. Use credentials user/user to login. Do not use this option in the production environment.

  **Reason:**

  The authentication is running in dummy mode.

  **Action:**

  Do not use this option in the production environment.

### ZWEAG107W

  Incorrect value: apiml.security.auth.provider = '%s'. Authentication provider is not set correctly. Default 'zosmf' authentication provider is used.

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

  The username or password are invalid.

  **Action:**

  Provide a valid username and password.

### ZWEAG121E

  Authorization header is missing, or request body is missing or invalid for URL '%s'

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

## API Catalog messages

### ZWEAC100W

  Could not retrieve all service info from discovery -- %s -- %s -- %s

  **Reason:**

  The response from The Discovery Service about the registered instances returned an error or empty body.

  **Action:**

  Make sure the Discovery service is up and running. If the http response error code refers to a security issue, check that both the Discovery Service and Catalog are running with the https scheme and that security is configured properly.

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

  One or more containers statuses could not be retrieved.

  **Action:**

  Check the status of the message for more information and the health of Discovery Service.

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

  ApiDoc retrieval problem for service %s. %s

  **Reason:**

  ApiDoc for service could not be retrieved from cache.

  **Action:**

  Verify that the service provides a valid ApiDoc.

### ZWEAC705W

  The home page url for service %s was not transformed. %s

  **Reason:**

  The home page url for service was not transformed. The original url will be used.

  **Action:**

  Refer to the specific printed message. Possible causes include:
  - The Gateway was not found. Transform service cannot perform the request. Wait for the Gateway to be discovered.
  - The URI ... is not valid. Ensure the service is providing a valid url.
  - Not able to select a route for url ... of the service ... Original url is used. If this is a problem, check the routing metadata of the service.
  - The path ... of the service URL ... is not valid. Ensure the service is providing the correct path.
 

### ZWEAC706E

  Service not located, %s

  **Reason:**

  The service could not be found.

  **Action:**

  Check if the service is up and registered. If it is not registered, review the onboarding guide to ensure that all steps were completed.

