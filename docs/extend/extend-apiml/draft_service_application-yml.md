# In the following sample API ML onboarding configuration, properties commented with ### (3 hashtags) 
# indicate that their value must be provided externally to the deploymet package. On a MF environment this can be done 
# using the -Dsystem.property.key=PROPERTY_VALUE notation to provde the property value on the JAVA command line.
# The -Dsystem.property.key must be the same as the flattened path of the YAML property which is commented out with ###.
# These properties must not be defined (uncommented) in your default service YAML configuration file.
#
# Example:
#     apiml:
#         service:
#             ### hostname: 
#
# For MF deploymnet provide -Dapiml.service.hostname=YOUR-MAINFRAME-HOSTNAME-VALUE on
# the java execution command line when the application service is run on the MF. 
# Since this value is provided on the java execution command line, leave the property commented out in the `application.yml`.
#
# For development purposes you can replace or add any property by providing the same configuration structure in an external 
# YAML configuration file. When running your application, provide the name of the external/additional configuration file 
# on the command line by using:
# `-Dspring.config.additional-location=PATH_TO_YOUR_EXTERNAL_CONFIG_FILE`
# 
#
# A property notation in the format -Dproperty.key=PROPERTY_VALUE can be used
# in two different ways:
#
#    - To provide a run-time value for any `YAML` property if
#    ${property.key} is used as its value (after ':') in the YAML configuration
#    file.
#    Example:
#    ```  
#        some_property_path:    
#            property:
#                key: ${property.key}
#    ```
#
#    - To add a property to configuration 
#    (if the property does not already exist).
#    Example:        
#
#    ```
#        property:
#            key: PROPERT_VALUE
#    ```
# NOTE: System properties provided with -D on the command line will not replace properties defined 
# in any of the YAML configuration files.
#
# TODO: Remove the obvious comments and place them as information above the sample config.
#############################################################################################################################

spring:
    application:
        name: ${apiml.service.id}           # Same name as for `apiml.service.serviceId`

apiml:
    enabled: true                           
    enableUrlEncodedCharacters: true        
    service:                                # The root of API ML onboarding configuration
    
        serviceId: ${apiml.service.id}      
        title: ${service.title}             
        description: ${service.description} 

        scheme: https               
        ### hostname:                                # Hostname must be defined by -Dapiml.service.hostname on MF or external application.yml property for development
        ### port:                                    # Port must be defined by -Dapiml.service.port on MF or external application.yml property for development
        serviceIpAddress: ${apiml.service.ipAddress} # serviceIpAddress must be provided by -Dapiml.service.ipAddress on MF or external application.yml property for development

        baseUrl: ${apiml.service.scheme}://${apiml.service.hostname}:${apiml.service.port}
        contextPath: /${apiml.service.id}            # By default the contextPath is set to be the same as apiml.service.serviceId

        homePageRelativeUrl: ${apiml.service.contextPath}
        statusPageRelativeUrl: ${apiml.service.contextPath}/application/info
        healthCheckRelativeUrl: ${apiml.service.contextPath}/application/health

        ### discoveryServiceUrls:                   # discoveryServiceUrls must be defined by -Dapiml.service.discoveryServiceUrls on MF or external application.yml property for development  
                
        routes:
            -   gateway-url: "ui/v1"
                service-url: ${apiml.service.contextPath}         
            -   gateway-url: "api/v1"
                service-url: ${apiml.service.contextPath}/api/v1
            -   gateway-url: "ws/v1"
                service-url: ${apiml.service.contextPath}/ws
        apiInfo:
            -   apiId: org.zowe.discoverableclient
                version: 1.0.0
                gatewayUrl: api/v1
                swaggerUrl: ${apiml.service.scheme}://${apiml.service.hostname}:${apiml.service.port}${apiml.service.contextPath}/v2/api-docs
                documentationUrl: https://www.zowe.org
        catalog:
            tile:
                id: cademoapps                                    
                title: Sample API Mediation Layer Applications
                description: Applications which demonstrate how to make a service integrated to the API Mediation Layer ecosystem
                version: 1.0.1
        ssl:
            enabled: ${server.ssl.enabled}
            verifySslCertificatesOfServices: ${apiml.security.verifySslCertificatesOfServices} #true
            ciphers: ${server.ssl.ciphers}
            protocol: ${server.ssl.protocol}
            enabled-protocols: ${server.ssl.protocol}
            keyStoreType: ${server.ssl.keyStoreType}
            trustStoreType: ${server.ssl.trustStoreType}

            keyAlias: ${server.ssl.keyAlias}
            keyPassword: ${server.ssl.keyPassword}
            keyStore: ${server.ssl.keyStore}
            keyStorePassword: ${server.ssl.keyStorePassword}
            trustStore: ${server.ssl.trustStore}
            trustStorePassword: ${server.ssl.trustStorePassword}

server:
    scheme: ${apiml.service.scheme}                 # Java application server address scheme - http or https
    hostname: ${apiml.service.hostname}             # Java application server hostname 
    port: ${apiml.service.port} #10012              # Java application server port 
    address: ${apiml.service.ipAddress}             # address must be provided by -Dapiml.service.ipAddress on MF or external application.yml property for development
  
    servlet:
        contextPath: /${apiml.service.contextPath}  # Must be the same as the apiml.service.contextPath

    ssl:
        ### enabled:                                # `enabled` must be defined by -Dserver.ssl.enabled on MF or external application.yml property for development
        protocol: TLSv1.2
        enabled-protocols: TLSv1.2
        ciphers: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384
        keyStoreType: PKCS12
        trustStoreType: PKCS12
