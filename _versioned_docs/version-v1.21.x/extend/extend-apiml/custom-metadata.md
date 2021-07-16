# Custom Metadata

(Optional) Additional metadata can be added to the instance information that is registered in the Discovery Service in the `customMetadata` section. This information is propagated from the Discovery Service to the onboarded services (clients). In general, additional metadata do not change the behavior of the client. Some specific metadata can configure the functionality of the API Mediation Layer. Such metadata are generally prefixed with the `apiml.` qualifier. We recommend you define your own qualifier, and group all metadata you wish to publish under this qualifier. If use use the Spring enabler, ensure that you include the prefix `apiml.service' before the parameter name.

* **customMetadata.apiml.enableUrlEncodedCharacters**
      
    When this parameter is set to `true`, the Gateway allows encoded characters to be part of URL requests redirected through the Gateway. The default setting of `false` is the recommended setting. Change this setting to `true` only if you expect certain encoded characters in your application's requests.
          
    **Important!**  When the expected encoded character is an encoded slash or backslash (`%2F`, `%5C`), make sure the Gateway is also configured to allow encoded slashes. For  more info see [Installing the Zowe runtime on z/OS](../../user-guide/install-zos.md).
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.enableUrlEncodedCharacters` 

* **customMetadata.apiml.connectTimeout**
    
    The value in milliseconds that specifies a period, in which API ML should establish a single, non-managed connection with this service. If omitted, the default value specified in the API ML Gateway service configuration is used.
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.connectTimeout` 

* **customMetadata.apiml.readTimeout**
    
    The value in milliseconds that specifies the  time of inactivity between two packets in response from this service to API ML. If omitted, the default value specified in the API MLGateway service configuration is used.

    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.readTimeout`

* **customMetadata.apiml.connectionManagerTimeout**
    
    HttpClient employs a special entity to manage access to HTTP connections called by the HTTP connection manager. The purpose of an HTTP connection manager is to serve as a factory for new HTTP connections, to manage the life cycle of persistent connections, and to synchronize access to persistent connections. Internally, it works with managed connections which serve as proxies for real connections. ConnectionManagerTimeout specifies a period, in which managed connections with API ML should be established. The value is in milliseconds. If omitted, the default value specified in the API ML Gateway service configuration is used.

    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.connectionManagerTimeout`

* **customMetadata.apiml.okToRetryOnAllOperations**
    
    Specifies whether all operations can be retried for this service. The default value is `false`. The `false` value allows retries for only GET requests if a response code of `503` is returned. Setting this value to `true` enables retry requests for all methods, which return a `503` response code. Enabling retry can impact server resources resulting from buffering of the request body.
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.okToRetryOnAllOperations`
              
* **customMetadata.apiml.corsEnabled**
    
    When this parameter is set to `true`, CORS is enabled on the service level for all the service routes. 
    For more information, see this article about [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
    
    **Note:** If you use the Spring enabler, use the following parameter name:
    
    `apiml.service.customMetadata.apiml.corsEnabled`    
