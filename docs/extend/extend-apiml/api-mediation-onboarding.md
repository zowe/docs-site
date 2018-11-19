# Zowe Gateway 

Zowe is a simple flexible architecture that allows easy onboarding of new or existing applications. The following items describe tutorials and samples that can be used to assist the process. 

## Onboard a REST API using the API gateway (reverse proxy) 

The concept of the Zowe Gateway is a core element of Zowe that brings together services from multiple servers so consumers are able to access these services from one point. 
<!-- Not only that but using Single Sign-on (SSO) the consumer will only have to authenticate once. -->

Internally the Gateway uses a catalog to maintain information about the end services being made available. 

<img src="../images/api-mediation/Gateway1.jpg" alt="view" align=center/>
<!-- 
``The Gateway is not restricted just to z/OS but can access services elsewhere on other servers etc.`` -->

When considering onboarding there are two mechanisms that allow you to take either an existing (or yet to be built) Rest service and expose services through the Gateway.  

### Static Registration

The first approach to this is use a static registration service that specifies a configuration script describing the services along with "swagger" information about the API's themselves. Registering like this can be performed without changing the back end server or services at the other end although it is useful to create an endpoint on the backend server that can provide basic health check information. i.e. is the service Up or Down.

<img src="../images/api-mediation/Gateway2.jpg" alt="view" align=center/>

You can find an example of how to do this in the [To Be decided sample](./libertyAPI.md)
The static approach is more applicable to central services which may be third party provided. Zosmf for example. 

### Dynamic Registration

The alternative to the static approach is to include the configuration and swagger information as resources contained in the services you are developing. "Burned in" as it is sometimes known.
When your end services are started they use references to the gateway catalog to register itself along with it's swagger definitions.

<img src="../images/api-mediation/Gateway3.jpg" alt="view" align=center/>

You can find examples of how to do this here: [Spring Boot application](./api-mediation-usingapiml.md) and one [for JEE Liberty](./libertyAPI.md)

The dynamic approach is more flexible and allows load balancing functions of the gateway to be employed supporting multiple instances of the ssrvices. It is envisaged that these would appeal to more bespoke services within an Enterprise.

### Without a current REST API but with existing z/OS function

For examples of developing functionality from scratch the following samples demonstrate the complete development cycle including dynamically adding to Gateway, 
[Spring Boot application](./api-mediation-usingapiml.md) and [for JEE Liberty](./libertyAPI.md)
 
###  With existing web page wanting to be on the virtual desktop (iFrame)

### With a command line interface

<!-- ### 1.2 Without a current REST API but with existing z/OS function
This pattern considers the situation where you have z/OS functionality available on your server which you want to expose via REST.
#### :white_check_mark: 1.2.1 JEE server based 
The following link is to a tutorial which will take you through the process to develop your own Zowe API's with Swagger notation. Although the resulting War file is "dropped into" a Liberty server, the same principles can be applied for other JEE servers. [Liberty API](libertyAPI.md) 

#### :construction: 1.2.2 SpringBoot example 
This specific pattern is known to work but no tutorial is available yet. -->

### So what were my application onboarding choices again? 

You can connect function on servers delivered via Node, Tomcat, Liberty, Spring Boot or anything really providing it is a HTTP server.

<img src="../images/api-mediation/onflow1.png" alt="view" align=center/>

## 2. Onboarding a Socket server 
Websockets can also be exposed via the Gateway