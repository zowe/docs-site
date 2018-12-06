# Extending and Deploying

This section is all about exposing functionality to customers and end users so by Extending Zowe you as a developer you make that happen. 

So the aim is to allow your product to seemlessly join with the Zowe infrastructure. Considering the four main touch points the first to consider is being able to expose your product and it's services using an industry standard interface to maximise it's availability. In Zowe using Rest API. Next would be able to centralise those services behind the API Gateway which would provide additional functionality such as Single-Sign-On for example that your applications could benefit from. Exploiting your product and services from a command line interface anywhere in the enterprise allows integration with batch and DevOps systems and connectivity with development tools. Ultimately presenting within a graphical UI via a browser or even the Zowe desktop which supports inter-operability between product tiles which maximises the availabilty of your products and services.  

Use the [Deploying Scenarios](extend-api/existingApp.md) to plan how to integrate products with Zowe and use the [Developing..](extend-api/libertyAPI.md) sections for more comprehensive description and explanation. 
The four main areas to consider when integrating with Zowe...
:::tip Creating API's 
Providing API's is the corner stone to the Zowe environment and this is about building Rest API's that surface functionality for use by other systems. This can be achieved using anything from a Tomcat or Liberty JEE war file a Spring Boot application or node based app. The choice is yours and there are a number of examples around this site for you to choose. 

Comprehensive details and explanation of how to do this are found in the [Developing JEE components](extend-api/libertyAPI.md) section.
:::

:::tip Exposing API's via the API Gateway 
The Gateway is where everything is brought together and becomes centrally accessible.
In the same way as your choice of implementation is flexible different options exist for the integration with the gateway. You can choose to build your API integrating details and information about the Gateway into it, or do it the other way around. Using a simple script you can register your product with the gateway.

Comprehensive details and explanation of how to do this are found in the [Developing for Zowe API Mediation Layer](extend-apiml/api-mediation-onboard-overview.md) <== needs sorting out
:::

:::tip Command Line Interface 
Once you have your API's defined and accessible you can build a CLI profile that will allow your API's to be accessed from anywhere using CLI. Apart from DevOps this presents an excellent way of including your functionality into custom development tools. 

Comprehensive details and explanationof how to do this are found in the [Developing for Zowe CLI](extend-cli/cli-devTutorials.md) section.
:::


:::tip UI's and the Zowe desktop 
API's are obviously consumable by UI's. Everything from a browser to Eclipse can access API's and Zowe also provides it's own Desktop environment.

Comprehensive details and explanation of how to do this are found in the [Developing for Zowe Application Framework](extend-desktop/mvd-extendingzlux.md) section.
:::


:::warning Other ways to exploit Zowe
 Teams are already exploiting Zowe in other weays. For example CLI based solutions are finding themselves into third party editors. The Zowe community supports the notion of BYOE (Bring your own editor) and already we are seeing "Dataset and Jobs views" appearing as plugins in editor platforms. Which is a great example of the Zowe community working.
:::
<!-- use tip, danger or warning for coloured blocks -->

