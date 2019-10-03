# Add a React app to Zowe

:::tip Github Sample Repo:
[basic-react](https://github.com/zowe/webui-scenarios/tree/master/basic-react)
:::

For this section we have provided a react sample (through an Iframe), which connects to the API defined in the API extension sample.

::: tip
Make sure that you first expose an API to connect to before following the steps below. To use the sample provided, first complete the steps listed in [API extension sample](../extend-api/liberty-api-sample.md).
:::

## To Install

1.  Point your project to the server that is hosting your API.
    - In the sample this can be defined in the `Constants.js` file.
    - The default is: `localhost:7443`, but otherwise point to your hardware address.
2.  Create a minified version of your project.
    - Generate minified version using `npm run build`
3.  Create a folder for the project and create a new `web` folder inside it.
    - EX: `/Desktop/<Your_Project_Name>` and `Desktop/<Your_Project_Name>/web`
4.  Copy the built project into `Desktop/<Your_Project_Name>/web`
    - If you are using the sample, copy `app.min.js` , `index.html` , `icon.png` and `css` into to `/Desktop/<Your_Project_Name>/web/`
5.  Create a `pluginDefinition.json` [following the guide](../extend-api/ReactJSUI.html#configuring-your-app-for-zowe) and copy it to `Desktop/<Your_Project_Name>/`
    - If you are using the sample, this is included within the project. Copy to `Desktop/<Your_Project_Name>/`
6.  Copy the project from `/Desktop` to `<zowe_base>/`
    - Use `scp <userID>@<server> /Users/path/to/files <zowe_base>/`
7.  Create a new file within the plugins folder (`<zowe_base>/zlux-app-server-plugins`) called `com.<Your_Project_Name>.json`
    - `touch com.<Your_Project_Name>.json`
8.  Edit this folder (using vi) to read:

```json
{
  "identifier": "com.<Your_Project_Name>",
  "pluginLocation": "../../<Your_Project_Name>"
}
```

9.  Run `./deploy.sh` found in `<zowe_base>/zlux-build`
10. Run `./zowe-stop.sh` found in `<zowe_base>/scripts`
11. Run `./zowe-start.sh` found in `<zowe_base>/scripts`

## Verify the Install

Upon restarting the server, navigate to the Zowe&trade; Application Server.

- This can be found at: `https://<base>:<port>/ZLUX/plugins/org.zowe.zlux.bootstrap/web/`

Make sure that your new plug-in was added and that it can interact with the server.

If it is not able to interact with the server and you are getting CORS errors, you might need to update the server to accept all connections.

::: warning
Note: This is for development purposes only.
:::

To update the server:

- Navigate to `<zowe-base>/explorer-server/wlp/usr/servers/Atlas/server.xml`
- Open to the file with vi and paste in the following code.

```javascript
<!-- FOR TESTING ONLY -->
    <cors allowCredentials="true" allowedMethods="GET, DELETE, POST, PUT, OPTIONS" allowedOrigins="*" allowedHeaders="*" domain="/"/>
<!-- /FOR TESTING ONLY -->
```
