# This article was changed and moved

The information that used to be in the article **Configuring Zowe to use PassTickets** has been reorganized and relocated based on your specific use case: 

* **Core Zowe Infrastructure & z/OSMF Setup (Zowe v3.4+)**  
If you are installing or configuring Zowe v3.4.0 or higher with the default SAF authentication provider, configuring PassTickets for z/OSMF is a mandatory system requirement. For more information, see [Addressing z/OSMF PassTicket and authentication requirements](../../user-guide/api-mediation/configuring-passtickets-for-zosmf-authentication.md).

* **Extending Services Setup**  
For detailed information about configuring API ML to generate PassTickets for custom, third-party extending REST API services onboarding onto Zowe, see [Enabling single sign on for extending services via PassTicket configuration](https://docs.zowe.org/stable/user-guide/api-mediation/configuration-extender-passtickets).

* **Service Onboarding Parameters**  
For detailed information about authentication parameters to enable a service to accept a Zowe JWT or client certificate, see [Authentication parameters](https://docs.zowe.org/stable/extend/extend-apiml/onboard-direct-eureka-call/#authentication-parameters) in the article _Onboarding a service with the Zowe API Mediation Layer without an onboarding enabler_.
