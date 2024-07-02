# Frequently Asked Questions about V3

1. When will be Zowe V3 released?
  
   The plan is to release on 09/28/2024. Any change to the plan will be communicated via all available channels.

2. When will Zowe V3 be available for preview. 
  
   The current V3 PAX as well as V3 client side projects are available. 

## Extenders focused

### API Mediation Layer

1. Do we need to move away from the passtickets as the method of authentication from the API Mediation Layer?
    
   No, we don't intend to remove the support, but it would be good to figure out some plan to move of them as setting up of 
   passticket configuration shifts the burden to the user's side who need to properly configure the passtickets on their system for every service using them.

2. With the introduction of the new cloud-gateway, how is the configuration going to change?

   We intend to move the configuration for V3 to the currently used gateway configuration space e.g. zowe.components.gateway 
   therefore the configuration that was Zuul specific will be removed and the one that is Spring Cloud Gateway will be added to this space. 

3. How does the client certificate authentication work in Zowe V3?

   The northbound authentication works by accepting the client certificates. The API Mediation Layer then transforms the client certificate to another method of authentication such as JWT token or SAF IDT or passtickets and these needs to be accepted by the southbound services. We currently don't authenticate with client certificate towards the z/OSMF but it's a possibility for future.

4. Will you mark the usage of deprecated functionality such as passtickets?

   The plan is to do so, we just don't know yet how exactly will we do that.

5. How do you intend to work with the the bypass scheme?

   The bypass scheme remains and you still can claim conformance for services that provides only public endpoints that doesn't require authentication.

6. Do the dependency changes mean that I need Java 17 to run Zowe?

   Yes. Java 17 is required to run the API Mediation Layer in Zowe V3.

### Zowe Explorer for VS Code

1. Will the functionality to convert profiles from profiles to Team Config remain available for V3?

   Yes, unlike the support for the V1 profiles.

2. Will the APIs provided by CLI for the people scripting remain the same?

   Yes, unless they are among the dropped ones in these lists [CLI](https://github.com/zowe/zowe-cli/issues/1694) and [Imperative](https://github.com/zowe/imperative/issues/970)

### Zowe App Framework, ZSS

1. Is it possible to have side by side 32 bits plugin to ZSS with 64 bits ones?

   No, it is not possible right now. It is possible to run just one type of plugins as there is the possibility to run only one ZSS.

2. Are the libraries updated to the currently latest versions?

   Angular 16 is most up-to-date. Webpack 5 is most up to date.

3. What React versions are supported?

   It is possible for the Desktop extensions to bring in different versions of React as the desktop is compatible with React but not built on top of React.

4. Is the ZEN application running on desktop or on z/OS?

   ZEN is running on laptop/desktop and connects to z/OS via standard methods.

5. Is it possible to validate and change the zowe.yaml and job definition within the ZEN?

   Yes

6. What happens if in ZEN you click on the SMP/E?

   You will be guided through the different set of pages that relate to the SMP/E installation.

7. What is the connection between Zowe Store and ZEN?

   It is a different topic and it is not linked other than by sharing the zwe commands.

8. Does the App Store for Zowe handle Zowe upgrades?

   No, it is focused on the server side extensions. 

### Zowe System Installation and Configuration

1. What does Zowe do with respect to the SBOM?

   Zowe provides the SBOMs with V3 in updated SPDX Formats.

## Users focused

### Zowe API Mediation Layer

1. APIML v3 won't support clients with onboarding enabler v2, right?

   The API ML in version 3 supports clients with onboarding enablers from version 2. It also works the other way around the onboarding enablers from version 3 will continue working with Zowe v2

2. For us, as for extenders, the jump to Java 17 means that we have to maintain two separate versions of our application - one with apiml-enabler v2 and another one with v3 to support customers who want to stay with Java 8. Do you have a recommendation or a workaround for supporting both java versions?

   Plain Java Enabler in v2 will work in v3 - you can keep this for 1 - 2 years

   Using Spring Boot, Java 17 requirement comes from SPRING, recommendation is to MOVE if you are using something from SPRING

3. Can you speak about the migration from Zuul to Spring Cloud Gateway? Today there are two separate gateway services in API-ML with separate config.

   The goal is to have one: spring-cloud gateway. The spring-cloud-gateway configuration should move under the component.gateway namespace. We expect to have one cluster od spring cloud gateway ahead of multiple sysplexes and then one cluster on every sysplex. Most of the configuration that was used should remain, new one from Spring Cloud Gateway remains.

4. If you have a legacy gateway deployed will there be migration help? / is the old gateway gone?

   It is gone in V3, but nothing should change from the point of view of the user… if we discover that is not true we will plan to deliver a configuration utility to help with this transition

5. Can you talk us through how a client-side end-user will find and obtain the correct APIML service instance ID for the desired instance of their service?

   Since one service can have multiple instances, living on different LPARS or different Environments how can clients identify a specific service on a specific system?

   TODAY - Clients can use the header instance ID to route to a specific instance / get information from specific services via an API on discovery service, but this part is going to be improved in 2Q 2024

6. Will the LPAR id be available for the clients to obtain?

   It isn't now, but we will work on this functionality in 2Q 2024

7. Regarding Static Onboarding - we're using a template that Zowe upon startup would find through manifest, then read, fill variables and put into the api-defs directory, no manual user action required. Will this still be available?

   It will remain available. The recommendation is through the V3 to move the directory away from Zowe workspace, if it isn't away by now. The zowe.yaml contains parameter specifying where the static definitions directories live components.discovery.alternativeStaticApiDefinitionsDirectories