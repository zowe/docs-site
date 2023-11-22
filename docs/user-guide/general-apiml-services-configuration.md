# General API ML services configuration

The following configuration options are applicable to all services:

* **apiml.service.hostname**  
This property is used to set the Discovery Service hostname. The value can be set by defining the `ZWE_haInstance_hostname` property in the zowe.yaml file.

    For more information, see [Discovery Service configuration parameters](./api-mediation/discovery-service-configuration/#zowe-runtime-configuration-parameters).

* **apiml.service.port**  
This property is used to set the Discovery Service port. The value can be set by defining the `ZWE_configs_port` property in the zowe.yaml file.

    For more information, see [Discovery Service configuration parameters](./api-mediation/discovery-service-configuration/#api-ml-configuration). 

* **AT-TLS setup**  
The communication server on z/OS provides a functionality to encrypt HTTP communication for on-platform running jobs. This functionality is refered to as Application Transparent Transport Layer Security (AT-TLS). Starting with Zowe version 1.24, it is possible to leverage AT-TLS within the API Mediation Layer. Each API ML component can run with AT-TLS rules applied.  

    For more information, see [AT-TLS](./api-mediation/api-gateway-configuration/#at-tls) in the article Advanced Gateway features configuration.