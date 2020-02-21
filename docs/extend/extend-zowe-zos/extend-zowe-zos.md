# Extending Zowe

Zowe was designed and architected to be an extensible tools platform and provides a number of ways that it can be extended and Third Party Independent Software Vendors (ISVs), System Integrators (SIs), as well as others who wish to augment Zowe by creating plugins.  Plugins can be distibuted to customers who have Zowe already installed, and introduce new functionality to an existing Zowe distribution. 

This can be done in a number of ways:

- Extending the Zowe Command Line Interface.
- Adding an API service to the API Mediation Layer. 
- Adding a plugin to the Zowe desktop.

## Adding an API service to the API Mediation Layer

The API mediation layer provided with Zowe includes an API gateway that acts as a reverse proxy server through which API requests can be routed from clients on its northbound edge to z/OS servers on its southbound edge.  The API gateway is extensible so REST APIs for z/OS servers can be added to its list of services.  There are a number of ways to onboard REST APIs which are covered in [API Mediation Onboard Overview of APIs](../extend-apiml/api-mediation-onboard-overview.md#overview-of-apis).  The two main techniques are dynamic (using Springboot where an API server ) or static 

## Adding a plugin to the Zowe desktop

## Adding a z/OS component to Zowe.

