# Information roadmap for Zowe Application Framework

This roadmap outlines information resources that are applicable to the various user roles who are interested in Zowe Application Framework. These resources provide information about various subject areas, such as learning basic skills, installation, developing, and troubleshooting for Zowe Application Framework.

The following definition of skill levels about Zowe will help you gather most relevant resources for you. 

* Beginner: You're starting out and want to learn the fundamentals.
* Intermediate: You have some experience but want to learn more in-depth skills. 
* Advanced: You have lots of experience and are looking to learn about specialized topics.

## Fundamentals

> Zowe skill level: Beginner

- [**Zowe Application Framework overview**](overview.md#zowe-application-framework)

   New to Zowe Application Framework? This overview topic introduces what is Zowe Application Framework and the main components and benefits.

- [**Architecture**](zowe-architecture.md#zowe-architecture)

   Review the Zowe architecture to understand how Zowe Application Framework works in the Zowe framework.

- [**An Introduction to the Zowe Virtual Desktop**](https://medium.com/zowe/an-introduction-to-the-zowe-virtual-desktop-6e0140644875)

   This blog gives you an overview of the Zowe Desktop. 

## Installing

> Zowe skill level: Beginner

- [**System requirements**](../user-guide/systemrequirements-zos.md)

   Review this topic to ensure that your system meets the requirements for installing the Zowe Application Framework. Zowe Application Framework is one of the server-side components. 

- [**Planning**](../user-guide/installandconfig.md#planning-the-installation-of-zowe-server-components)

  This article provides details about planning for the installation, the Zowe z/OS launch process, and so on.

- [**Installing Zowe Application Framework**](../user-guide/install-zos.md#z-os-installation-roadmap)

   This article provides an overview of the essential steps involved in installing Zowe Application Framework. If you want to use Docker for the installation, instead follow the link below. 

## Configuring and updating

> Zowe skill level: Intermediate

- [Configuring Zowe Application Framework](../user-guide/mvd-configuration.md)
     
   This information describes how to configure the Zowe Application Framework as a Mediation Layer client, configure connections for the terminal application plug-ins, modify the Zowe Application Server and Zowe System Services (ZSS) configuration, and so on.

## Using Zowe Application Framework

> Zowe skill level: Intermediate

- [**Using the Zowe Desktop**](../user-guide/mvd-using.md)

   Learn about how to navigate the Zowe Desktop and use a list of pre-installed application plug-ins. 

- [**Using the Editor**](../user-guide/mvd-editor.md)

   Learn how to use the Editor application plug-in. 

- [**Tutorial: Getting started tutorial**](../user-guide/zowe-getting-started-tutorial.md)

   This tutorial walks you through the Zowe Desktop with several simple tasks to help you get familiar with it.

## Developing Zowe Desktop plug-ins

> Zowe skill level: Advanced

- [**Developing for Zowe Application Framework**](../extend/extend-desktop/mvd-extendingzlux.md) 

   Learn how you can extend the Zowe Application Framework by adding a plug-in to the Zowe Desktop. 

- [**Zowe Application Framework repository**](https://github.com/zowe/zlux)

   If you want to start working with the code immediately, check out this code repository. 

- [**Zowe App Server scripts**](https://github.com/zowe/zlux-app-server)

   This is the default setup of the Zowe App Server, built upon the zLUX framework. Within, you will find a collection of build, deploy, and run scripts as well as configuration files that will help you to configure a simple App Server and add a few Apps.

### Samples 
- [Sample iframe App](https://github.com/zowe/sample-iframe-app)
- [Sample Angular App](https://github.com/zowe/sample-angular-app/blob/lab/step-1-hello-world/README.md)
- [Sample React App](https://github.com/zowe/sample-react-app/blob/lab/step-1-hello-world/README.md)


## Contributing to Zowe Application Framework

> Zowe skill level: Advanced

- [**Conformance Program**](../extend/zowe-conformance-program.md)
   
  This topic introduces the Zowe Conformance Program. Conformance provides Independent Software Vendors (ISVs), System Integrators (SIs), and end users greater confidence that their software will behave as expected. As vendors, you are invited to submit conformance testing results for review and approval by the Open Mainframe Project. If your company provides software based on Zowe CLI, you are encouraged to get certified today.

- [**Blog: Zowe Conformance Program Explained**](https://medium.com/zowe/zowe-conformance-program-7f1574ade8ea)

   This blog describes the Conformance Program in more details.

## Troubleshooting and support

- [**Troubleshooting Zowe Application Framework**](../troubleshoot/app-framework/app-troubleshoot.md)

   Learn about the tools and techniques that are available to help you troubleshoot and resolve problems. You can also find a list of common issues about Zowe Application Framework.

- [**Submit an issue**](https://github.com/zowe/zlux/issues)

   If you have an issue that is specific to Zowe Application Framework, you can submit an issue against the `zlux` repo.

## Community resources 

- [**Slack channel**](https://openmainframeproject.slack.com/)
   
   Join the Slack channel to ask questions, propose new ideas, and interact with the Zowe community.  <!--which slack channel is appropriate?-->

- [**Zowe WebUI squad meetings**](https://lists.openmainframeproject.org/g/zowe-dev/calendar)

   You can join one of the Zowe WebUI squad meetings to get involved.

- [**Zowe Blogs on Medium**](https://medium.com/zowe) 

   Read a series of blogs about Zowe on Medium to explore use cases, best practices, and more. 

- **Community Forums**

   Look for discussion on Zowe topics on the [Open Mainframe Project Community Forums](https://community.openmainframeproject.org/c/zowe).






