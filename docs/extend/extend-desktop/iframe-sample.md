# Add Iframe App to Zowe

:::tip Github Sample Repo:
[sample-iframe-app](https://github.com/zowe/sample-iframe-app)
:::

This sample app showcases two important abilities of the Zowe Application Framework.
The first is the ability to bring web content into Zowe that is non-native, that is, not developed with Zowe in mind or written around an unsupported framework (As opposed to Angular or other supported frameworks).
This is accomplished by providing a wrapper that brings web content into Zowe by utilizing an iframe wrapped in an Angular shell.
Content within an IFrame interacts with content in a webpage differently than content which isn't in an IFrame, so the second purpose of this App is to show that even when in an IFrame, your content can still accomplish App-to-App communication as made possible by the Zowe Application Framework.

This app presents a few fields which allow you to launch another App, or communicate with an already open App instance, in both cases with some context that the other App may interpret and some action.

:::warning
This App intentionally does not follow the typical dev layout of directories and content described in [the wiki](https://github.com/zowe/zlux/wiki/ZLUX-App-filesystem-structure) in order to demonstrate that you can include content within the Zowe Application Framework that was not intended for Zowe originally.
:::
