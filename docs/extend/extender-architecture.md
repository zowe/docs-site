# Onboarding

Onboarding or extending, which is it to be ?. Well both actually... 

Onboarding is getting your product onboard Zowe and in front of your customers. Extending Zowe means what you as a developer have to do to make that happen. 

So the aim of Onboarding is to allow your product to seemlessly join with the Zowe infrastructure. Considering the four main touch points the first to consider is being able to expose your product and it's services using an industry standard interface to maximise it's availability. In Zowe using Rest API. Next would be able to centralise those services behind the API Gateway which would provide additional functionality such as Single-Sign-On for example that your applications could benefit from. Exploiting your product and services from a command line interface anywhere in the enterprise allows integration with batch and DevOps systems and connectivity with development tools. Ultimately presenting within a graphical UI via a browser or even the Zowe desktop which supports inter-operability between product tiles which maximises the availabilty of your products and services.  

Use the [Onboarding Scenarios](extend-api/existingApp.md) to plan how to integrate products with Zowe and use the [Developing..](extend-api/libertyAPI.md) sections for more comprehensive description and explanation. 
The four main areas to consider when integrating with Zowe...
:::tip Creating API's 
Providing API's is the corner stone to the Zowe environment and this is about building Rest API's that surface functionality for use by other systems.  If an application has existing REST APIs then these can exposed to Zowe by adding the server to be on the southbound edge of the API Gateway,  described more in [Developing for Zowe API Mediation Layer](docs/extend/extend-apiml/onboard-overview.md).  If you wish to introduce a new server to Zowe this can be done with any REST API or else using one of the two architectures included with Zowe itself;  Spring boot with embedded Tomcat or node The choice is yours and there are a number of examples around this site for you to choose. 

:::tip Exposing API's via the API Gateway 
The Gateway is where everything is brought together and becomes centrally accessible.
In the same way as your choice of implementation is flexible different options exist for the integration with the gateway. You can choose to build your API integrating details and information about the Gateway into it, or do it the other way around. Using a simple script you can register your product with the gateway.

Comprehensive details and explanation of how to do this are found in the [Developing for Zowe API Mediation Layer](docs/extend/extend-apiml/onboard-overview.md) <== needs sorting out
:::

:::tip Command Line Interface 
Once you have your API's defined and accessible you can build a CLI profile that will allow your API's to be accessed from anywhere using CLI. Apart from DevOps this presents an excellent way of including your functionality into custom development tools. 

Comprehensive details and explanationof how to do this are found in the [Developing for Zowe CLI](extend-cli/cli-devTutorials.md) section.
:::


:::tip UI's and the Zowe desktop 
API's are obviously consumable by UI's. Everything from a browser to Eclipse can access API's and Zowe also provides it's own Desktop environment.

Comprehensive details and explanation of how to do this are found in the [Developing for Zowe Application Framework](extend-desktop/mvd-extendingzlux.md) section.
:::


<!-- use tip, danger or warning for coloured blocks -->

