# Zowe V3 FAQs

## Extender questions

### API Mediation Layer

1. Do we need to move away from PassTickets as the method of authentication to the API Mediation Layer?
    
   No, we will continue to support PassTickets. However, PassTickets are deprecated in Zowe V3, and are no longer recommended due to the inefficiency of configuration wherein users must configure a PassTicket for every service that uses them. 

2. With the introduction of the new cloud gateway, how is the configuration going to change?

   The cloud gateway configuration for V3 has moved to the currently used gateway configuration space (For example, `zowe.components.gateway`). The configuration that was Zuul specific has been removed and replaced with the Spring Cloud Gateway configuration.

3. How does client certificate authentication work in Zowe V3?

   Northbound authentication accepts client certificates. The API Mediation Layer then transforms the client certificate to another method of authentication (such as a JWT token, SAF IDT, or PassTicket). This new method is then accepted by southbound services. Currently, we do not plan to support authentication with client certificates to z/OSMF.

4. Will you identify deprecated functionality such as PassTickets?

   PassTickets will be deprecated in V3, but PassTickets will still be supported, possibly even through to Zowe V4.

   We plan to identify all deprecated functionality. We will announce how this functionality will be identified in the near future.

5. How do you intend to work with the the bypass scheme?

   The bypass scheme will remain. You can still claim conformance for services that only provide public endpoints that do not require authentication.

6. Do the dependency changes mean that I need Java 17 to run Zowe V3?

   Yes, Java 17 is required to run the API Mediation Layer in Zowe V3.

### Zowe Explorer for Visual Studio Code

1. Will the functionality to convert Zowe V1 profiles to team configuration remain available for Zowe V3?

   Yes. However, users will not be able to use Zowe V1 profiles to connect to services on the mainframe.

2. Will the APIs that Zowe CLI provides for extenders remain the same?

   In broad terms, yes. However, some of the functionality that was available in Zowe V2 has been changed (or removed). The changes are included in the [Zowe CLI](https://drive.google.com/file/d/1wbxR-vuXT98XQ4mDb1DyDzQRcCDt5HlU/view?usp=sharing) and [Imperative](https://github.com/zowe/imperative/issues/970) lists of breaking changes.

### Zowe Application Framework, ZSS

1. Is it possible to run 31-bit plug-ins at the same time as 64-bit plug-ins with ZSS?

   No. ZSS runs in either 31-bit or 64-bit mode, which means it can accommodate only one type of plug-in.

2. Have the versions of libraries used in the Desktop changed?

   In Zowe V3, the Application Framework uses Angular 18 with associated libraries such as webpack 5.

3. What _React_ versions are supported by Zowe Desktop?

   Zowe v3's React compatibility has not changed. It is possible for Desktop extensions to use different versions of _React_. While the Desktop is not built on _React_, it is still compatible with extensions that import _React_.

### Zowe System Installation and Configuration

1. Does Zowe provide a Software Bill of Materials (SBOM)?

   SBOMs are available in the SPDX format from the [Bill of Materials](https://docs.zowe.org/stable/appendix/bill-of-materials/) page on Zowe Docs.
  
2. Is the Zowe Server Install Wizard application running on Zowe Desktop or on z/OS?

   The Zowe Server Install Wizard runs on a laptop/desktop and connects to z/OS via standard methods.

3. Is it possible to validate and change the `zowe.yaml` file and job definition within the Zowe Server Install Wizard?

   Yes.

## User questions

### Zowe API Mediation Layer

1. Does Zowe V3 API ML support clients with the V2 onboarding enabler?

   The API ML in Zowe V3 supports clients with onboarding enablers from Zowe V2. It also works the other way around: The onboarding enablers from Zowe V3 continue to work with Zowe V2 API ML.

2. The jump to Java 17 means that we have to maintain two separate versions of our application, one with apiml-enabler V2 and one with V3, to support customers who want to stay with Java 8. Do you have a recommendation or a workaround for supporting both Java versions?

   The plain Java Enabler from Zowe V2 works in Zowe V3. You can keep this until Zowe V4.

   Zowe V4 will only support Spring Boot, which requires Java 17. We recommend building applications for Java 17 to ensure that applications continue to be compatible with API ML.

3. Can you speak about the migration from Zuul to Spring Cloud Gateway? Today there are two separate gateway services in API ML with separate configurations.

   Spring Cloud Gateway is replacing Zuul as the technology to provide the API Gateway. The configuration for the API Gateway remains in the `components.gateway` namespace. If you were using Spring Cloud Gateway in V2 for the multi-tenancy scenario, you need to update the configuration for the Central Gateway (referred as Gateway from v3 onwards) and move this configuration from `components.cloud-gateway` to `components.gateway`.

4. If I have a legacy gateway deployed, how will I migrate to the new gateway? Will the old gateway be removed?

   The old gateway is removed in Zowe V3, but nothing should change from the point of view of the user. However, we may deliver a configuration utility to help with this transition if required.

5. How would a client-side end user find and obtain the correct API ML service instance ID for the desired instance of the user's service?

   In Zowe V2, clients can use the header instance ID to route communications to a specific instance. Clients can get instance IDs for specific services via an API on the Discovery service. We are planning to improve the method for finding service IDs in Zowe V3.

6. Will the LPAR ID be available for the clients to obtain?

   It is not currently available, but we are scheduled to work on this functionality in 2024.

7. API ML static onboarding locates templates that are then used to set variables in the api-defs directory. No manual user action is required. Will this automated process still be available in Zowe V3?

   Static onboarding will continue to be available. The recommendation for Zowe V3 is to move the api-defs directory out of the [Zowe workspace](../appendix/zowe-glossary.md#workspace-directory). The `zowe.yaml` file contains a parameter called `components.discovery.alternativeStaticApiDefinitionsDirectories` that specifies where the directories for static definitions reside.
