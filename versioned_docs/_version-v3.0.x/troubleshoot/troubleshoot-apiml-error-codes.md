
# Error Message Codes

The following error message codes may appear on logs or API responses. Use the following message code references and the corresponding reasons and actions to help troubleshoot issues. 

## API mediation utility messages

### ZWEAM000I

  %s started in %s seconds

  **Reason:**

  The service started.

  **Action:**

  No action required.

### ZWEAM001I

  API Mediation Layer started

  **Reason:**

  All key API Mediation Layer services started.

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

### ZWEAO400E

  The structure of the request is invalid: %s

  **Reason:**

  A value in the request is missing or contains an invalid value.

  **Action:**

  Fix the request and try again.

### ZWEAO401E

  Unknown error in HTTPS configuration: '%s'

  **Reason:**

  An Unknown error occurred while setting up an HTTP client during service initialization, followed by a system exit.

  **Action:**

  Start the service again in debug mode to get a more descriptive message. This error indicates it is not a configuration issue.

### ZWEAO402E

  The request has not been applied because it lacks valid authentication credentials.

  **Reason:**

  The accessed resource requires authentication. The request is missing valid authentication credentials or the token expired.

  **Action:**

  Review the product documentation for more details about acceptable authentication. Verify that your credentials are valid and contact security administrator to obtain valid credentials.

### ZWEAO404E

  The service can not find the requested resource.

  **Reason:**

  **Action:**

### ZWEAO405E

  The request method has been disabled and cannot be used for the requested resource.

  **Reason:**

  **Action:**

### ZWEAO415E

  The media format of the requested data is not supported by the service, so the service has rejected the request.

  **Reason:**

  **Action:**

### ZWEAO500E

  The service has encountered a situation it doesn't know how to handle. Please contact support for further assistance. More details are available in the log under the provided message instance ID

  **Reason:**

  **Action:**

### ZWEAO503E

  The server is not ready to handle the request: %s

  **Reason:**

  The service is not ready to handle the request, it is being initialized or waiting for another service to start.

  **Action:**

  Repeat the request later. Please contact support for further assistance.

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

### ZWEAT500E

  Failed to parse the client certificate forwarded from the Gateway. Hostname is %s. Error message is %s. The client certificate was %s

  **Reason:**

  The string sent by the Gateway was not recognized as a valid DER-encoded certificate in the Base64 printable form.

  **Action:**

  Ensure that forwarding of the client certificate is also enabled in the Gateway. Check for any error messages from the Gateway.

### ZWEAT501E

  Failed to get trusted certificates from the Gateway. Unexpected response from %s endpoint. Status code: %s. Response body: %s

  **Reason:**

  The response status code is different from expected 200 OK.

  **Action:**
  
  Ensure that the parameter apiml.security.x509.certificatesUrls is correctly configured with the complete URL to the Gateway certificates endpoint. Test the URL manually.

### ZWEAT502E

  Invalid URL specified to get trusted certificates from the Gateway. URL is %s. Error message: %s
  
  **Reason:**
  
  The parameter apiml.security.x509.certificatesUrls is not correctly configured with the complete URL to the Gateway certificates endpoint.
  
  **Action:**

  Ensure that the parameter apiml.security.x509.certificatesUrl is correctly configured.

### ZWEAT503E

  An error occurred during retrieval of trusted certificates from the Gateway. Certificate endpoint is %s. Error message: %s
  
  **Reason:**

  The communication with the gateway got interrupted or an error occurred during processing the response.

  **Action:**

  Check the provided error message. Contact the support.

### ZWEAT504E

  Failed to parse the trusted certificates provided by the Gateway. Certificate endpoint is %s. Error message %s
  
  **Reason:**
  
  The string sent by the Gateway was not recognized as valid DER-encoded certificates in the Base64 printable form.
  
  **Action:**
  
  Check that the URL configured in apiml.security.x509.certificatesUrls responds with valid DER-encoded certificates in the Base64 printable form.

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

  Use a valid body in the request. Format of a message: `{validity: int , scopes: [string]}`.

### ZWEAT606E

  Body in the HTTP request for Personal Access Token does not contain scopes

  **Reason:**

  The request body is not valid

  **Action:**

  Provide a list of services for which this token will be valid

### ZWEAT608E

  Error mapping between distributed and mainframe identity. Reason: %s %s

  **Reason:**

  Unexpected error occurred when mapping between distributed and mainframe identity

  **Action:**

  Contact Broadcom support.

### ZWEAT609W

  Mapping between distributed and mainframe identity failed. Reason: %s

  **Reason:**

  Mapping between distributed and mainframe identity failed.

  **Action:**

### ZWEAT610E

  Missing registry name configuration.

  **Reason:**

  The registry name configuration is required to correctly map distributed user name from the OIDC access token.

  **Action:**

  Make sure that 'components.gateway.apiml.security.oidc.registry' is correctly set in 'zowe.yaml'.

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

### ZWEAG111E

  The service has encountered a situation it doesn't know how to handle. Please contact support for further assistance. More details are available in the log under the provided message instance ID

  **Reason:**

  **Action:**

### ZWEAG501E

  The connection is not secure.

  **Reason:**

  AT-TLS is not properly configured.

  **Action:**

  Review AT-TLS documentation and make sure your configuration is correct for this service.

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

### ZWEAG717E

  The service id provided is invalid: '%s'

  **Reason:**

  The provided id is not valid under conformance criteria.

  **Action:**

  Verify the conformance criteria, provide valid service id.

### ZWEAG718E

  Cannot retrieve metadata: '%s'

  **Reason:**

  Metadata aren't accessible

  **Action:**

  Verify that the metadata are accessible and not empty

### ZWEAG719I

  The service is not conformant: %s

  **Reason:**

  The provided service does not satisfy the conformance criteria and is therefore not valid.

  **Action:**

  Verify the conformance criteria.

### ZWEAG101E

  Authentication method '%s' is not supported for URL '%s'

  **Reason:**

  The HTTP request method is not supported by the URL.

  **Action:**

  Use the correct HTTP request method supported by the URL.

### ZWEAG105E

  Authentication is required for URL '%s'

  **Reason:**

  Authentication is required.

  **Action:**

  Provide valid authentication.

### ZWEAG167E

  No client certificate provided in the request

  **Reason:**

  The X509 client certificate was not provided with the request

  **Action:**

  Configure your client to provide valid certificate.

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

### ZWEAT403E

  The user is not authorized to the target resource: %s

  **Reason:**

  The service has accepted the authentication of the user but the user does not have access rights to the resource.

  **Action:**

  Contact your security administrator to give you access.

### ZWEAG510E

  Request to the resource ended with unexpected status code.

  **Reason:**

  The service did not respond properly.

  **Action:**

  Verify that the target service is healthy.

### ZWESG100W

  Cannot receive information about services on API Gateway with apimlId '%s' because: %s

  **Reason:**

  Cannot connect to the Gateway service.

  **Action:**

  Make sure that the external Gateway service is running and the truststore of the both Gateways contain the corresponding certificate.

### ZWESG101E

  An internal exception occurred in ZAAS service %s.

  **Reason:**

  ZAAS cannot process authentication required to finish the request.

  **Action:**

  Make sure that the ZAAS is configured well and check all security requirements.

### ZWESG429E

  Request was denied access.

  **Reason:**

  Connections limit exceeded.

  **Action:**

  Wait for the number of active connections to decrease before retrying your request.

## API Catalog messages

### ZWEAC100W

  Could not retrieve information about service %s from the Discovery Service. Requested URL: %s. Response received: status code: %s, body: %s

  **Reason:**

  The response from The Discovery Service about the registered service instances returned an error or empty body.

  **Action:**

  Make sure the Discovery Service and requested service are up and running. If the HTTP response error code refers to a security issue, make sure that security configuration is correct.

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

### ZWEAC105W

  API Documentation not retrieved for service '%s' due to communication error, %s

  **Reason:**

  Unable to fetch API documentation.

  **Action:**

  Make sure the service documentation url or server transport encoding is configured correctly.

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

