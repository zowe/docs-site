# User Database Browser Starter App

:::tip Github Sample Repo:
[workshop-starter-app](https://github.com/zowe/workshop-starter-app)
:::

_This sample is included as the first part of a tutorial detailing communication between separate zLUX apps._

**It should be installed on your system before starting the [User Browser Tutorial](../guides/zlux-workshop-user-browser.md)**

The App's scenario is that it has been opened to submit a task report to a set of users who can handle the task.
In this case, it is a bug report. We want to find engineers who can fix this bug, but this App does not hold a directory listing for engineers in the company, so we need to communicate with some App which does provide this information.
In this tutorial, you must build an App which is called by this App in order to list Engineers, is able to be filtered by the office that they work from, and is able to submit a list of engineers which would be able to handle the task.

After installing this app on your system, follow directions in the [User Browser Tutorial](../guides/zlux-workshop-user-browser.md) to enable app to app communication.
