# Dynamic and static registrtion overview

Zowe API Mediation Layer extenders can build and onboard additional API services to the API ML microservices ecosystem. REST APIs can register with the API Mediation Layer, which makes them available in the API Catalog and for routing through the API Gateway.  

To register a z/OS service with the API Mediation Layer, there are two approaches:
- [Dynamic API registration](#dynamic-api-registration)
- [Static API registration](#static-api-registration)

For information about how to onboard REST APIs, see the [Onboarding Overview](extend-apiml/onboard-overview.md).

To streamline the process of onboarding new REST API services to the API Mediation Layer, see [Onboarding a REST API service with the YAML Wizard](../user-guide/onboard-wizard.md).

### Dynamic API registration

Registration of a REST API service to the API ML is performed through a call to the Discovery Service by sending registration data and metadata for the service being registered. Registration requires that the z/OS service must know the web address of the API ML Discovery Service. When Dynamic registration is performed, the service that performs the registration must periodically send heartbeat requests to the Discovery Service for each registered service instance. These heartbeat requests serve to renew the corresponding service instance registration with API ML. These requests enable the Discovery Service to monitor the availability of registered service instances. Services that are registered dynamically display the status of the service in the API Catalog after initial service registration.

For more information about how to build a service which is able to register, see the [Onboarding Overview](extend-apiml/onboard-overview.md).  

### Static API registration

For services that cannot be modified to be dynamically discoverable, it is possible onboard them to the API ML by providing the API ML a static definition file with API service details. This registration method does not require modifications to the existing API service code. For more information, see [Onboard a REST API without code changes required](extend-apiml/onboard-static-definition.md). Unlike services that use Dynamic API registration, the status of services onboarded through Static API registration is not displayed in the API Catalog.
