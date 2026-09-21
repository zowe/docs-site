# Zowe Application Framework overview

You can create application plug-ins to extend the capabilities of the Zowe&trade; Application Framework. An application plug-in is an installable set of files that present resources in a web-based user interface, as a set of RESTful services, or in a web-based user interface and as a set of RESTful services.

Read the following topics to get started with extending the Zowe Application Framework.

## How Zowe Application Framework works

Read the following topics to learn how Zowe Application Framework works:

- [Creating application plug-ins](mvd-buildingplugins.md)
- [Plug-ins definition and structure](mvd-plugindefandstruct.md)
- [Dataservices](mvd-dataservices.md)
- [Zowe Desktop and window management](mvd-desktopandwindowmgt.md)
- [Configuration Dataservice](mvd-configdataservice.md)
- [URI Broker](mvd-uribroker.md)
- [Application-to-application communication](mvd-apptoappcommunication.md)
- [Error reporting UI](mvd-errorreportingui.md)
- [Logging utility](mvd-logutility.md)

## Tutorials

The following tutorials are available in Github.

- **Stand up a local version of the Example Zowe Application Server**

  :::tip Github Repo:
  [zlux-app-server](https://github.com/zowe/zlux-app-server/tree/staging/README.md)
  :::

- **Internationalization in Angular Templates in Zowe Application Server**

  :::tip Github Sample Repo:
  [sample-angular-app (Internationalization)](https://github.com/zowe/sample-angular-app/blob/lab/step-2-i18n-complete/README.md)
  :::

- **App to app communication**

  :::tip Github Sample Repo :
  [sample-angular-app (App to app communication)](https://github.com/zowe/sample-angular-app/blob/lab/step-3-app2app-complete/README.md)
  :::

- **Using the Widgets Library**

  :::tip Github Sample Repo:
  [sample-angular-app (Widgets)](https://github.com/zowe/sample-angular-app/blob/lab/step-4-widgets-complete/README.md)
  :::

- **Configuring user preferences (configuration dataservice)**

  :::tip Github Sample Repo:
  [sample-angular-app (configuration dataservice)](https://github.com/zowe/sample-angular-app/blob/lab/step-5-config-complete/README.md)
  :::

## Samples

Zowe allows extensions to be written in any UI framework through the use of an Iframe, or Angular and React natively. In this section, code samples of various use-cases will be provided with install instructions.

:::warning Troubleshooting Suggestions:

If you are running into issues, try these suggestions:

- Restart the Zowe Server/ VM.
- Double check that the name in the plugins folder matches your identifier in `pluginDefinition.json` located in the Zowe root.
- After logging into the Zowe desktop, use the Chrome or Firefox developer tools and navigate to the "network" tab to see what errors you are getting.
- Check each file with `cat <filename>` to be sure it wasn't corrupted while uploading. If files were corrupted, try uploading using a different method like SCP or SFTP.

:::

### Sample Iframe App

:::tip Github Sample Repo:
[sample-iframe-app](https://github.com/zowe/sample-iframe-app)
:::

### Sample Angular App

:::tip Github Sample Repo:
[sample-angular-app](https://github.com/zowe/sample-angular-app/blob/lab/step-1-hello-world/README.md)
:::

### Sample React App

:::tip Github Sample Repo:
[sample-react-app](https://github.com/zowe/sample-react-app/blob/lab/step-1-hello-world/README.md)
:::

### User Browser Workshop Starter App

:::tip Github Sample Repo:
[workshop-starter-app](https://github.com/zowe/workshop-starter-app)
:::

_This sample is included as the first part of a tutorial detailing communication between separate Zowe apps._

**It should be installed on your system before starting the [User Browser Workshop App Tutorial](https://github.com/zowe/workshop-user-browser-app/blob/master/README.md)**

The App's scenario is that it has been opened to submit a task report to a set of users who can handle the task.
In this case, it is a bug report. We want to find engineers who can fix this bug, but this App does not contain a directory listing for engineers in the company, so we need to communicate with some App that does provide this information.
In this tutorial, you must build an App which is called by this App in order to list engineers, is able to be filtered by the office that they work from, and is able to submit a list of engineers which would be able to handle the task.

After installing this app on your system, follow directions in the [User Browser Workshop App Tutorial](https://github.com/zowe/workshop-user-browser-app/blob/master/README.md) to enable app-to-app communication.
