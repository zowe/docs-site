# Zowe Documentation

## Development

### Prepare Development Environment

You will need node.js and npm installed on your local computer.

To prepare your local development environment, run this command:

```
npm install
```

You can test out the documentation while you working on the changes. Run

```
npm run docs:dev
```

Then you can access the documentation with URL `http://localhost:8080/docs-site/latest/`. Every time if you modify and save a documentation file, the local development build will be triggered automatically, then you can refresh your browser to see the changes.

### Test Your Modifications

You will need `Docker` to run broken links test. Check https://www.docker.com/get-started to install Docker.

You can test broken links with these commands. First compile the documentation with command:

```
npm run docs:build
```

Then run broken links test with this command:

```
npm run test:links:latest
```

Check `Warning of broken links and other issues (source target lines code fragments):` sections for warnings, and Check `Errors of broken links and other issues (source target lines code fragments):` sections for errors.

Errors must be fixed before merge to master branch, otherwise the pull request will be blocked.

_Please note, if we have multiple documentation versions in place, you may see broken links warnings on links to other versions._

### Understand The Link Check Warning / Error Message

If you don't see a section of `Error(s) of broken links and other issues` in the job console log, that means you are all good to go! However, there may be a `Warning(s) of broken links and other issues` which includes warnings but it won't fail the build pipeline. The `(source target lines code fragments)` indicates the fields of each warning / error message.

A typical link check *warning* message may looks like this:

```
=================================================================================
Warning(s) of broken links and other issues (source target lines code fragments):
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/mvd-using.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/mvd-using.html "16, 20, 24, 25" "200 OK" "#api-mediation-layer-architecture"
- http://zowe-docs-test-links/docs-site/v0-9-x/getting-started/summaryofchanges.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-usingcli.html "24" "200 OK" "#accessing-an-api-mediation-layer"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/systemrequirements.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/systemrequirements.html "24" "200 OK" "#zosmf-configuration"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-installcli.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-installcli.html "24, 33" "200 OK" "#testing-zowe-cli-connection-to-zosmf"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-installcli.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-usingcli.html "26, 29, 34" "200 OK" "#displaying-zowe-cli-help,#accessing-an-api-mediation-layer"
- http://zowe-docs-test-links/docs-site/v0-9-x/getting-started/overview.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/mvd-using.html "16, 20, 24" "200 OK" "#using-zowe-framework-application-plug-ins"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-usingcli.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-installcli.html "29, 46, 74" "200 OK" "#testing-zowe-cli-connection-to-zosmf,#Creating-a-profile-to-access-an-API-Mediation-Layer"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-usingcli.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-usingcli.html "24, 28, 47" "200 OK" "#displaying-zowe-cli-help,#Understanding-command-option-order-of-precedence"
- http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-apiml/api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.html http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-apiml/api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.html "24" "200 OK" "#add-context-listener"
- http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-desktop/zlux-app-server.html http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-desktop/zlux-app-server.html "24" "200 OK" "#7-connect-in-a-browser,#3-set-the-server-configuration,#5-deploy-server-configuration-files,#1-acquire-the-source-code,#2-acquire-external-components,#0-optional-install-git-for-zos,#6-run-the-server,#4-build-application-plug-ins"
- http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-cli/cli-devTutorials.html http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-cli/cli-devTutorials.html "16, 20, 24" "200 OK" "#why-create-a-zowe-cli-plug-in"
- http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-cli/cli-implement-profiles.html http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-cli/cli-devTutorials.html "16, 20, 24, 88" "200 OK" "#Imperative-CLI-Framework-documentation"
- http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-apiml/api-mediation-security.html http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-apiml/api-mediation-security.html "24" "200 OK" "#add-a-service-with-an-existing-certificate-to-apiml-on-zos,#generating-keystore-and-truststore-for-a-new-service-on-zos,#certificates-for-zos-installation-from-the-zowe-pax-file,#zowe-runtime-on-zos,#authentication-1,#trust-zosmf-certificate"
- http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-apiml/api-mediation-onboard-an-existing-java-jersey-rest-api-service.html http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-apiml/api-mediation-onboard-an-existing-java-jersey-rest-api-service.html "24" "200 OK" "#validate-discovery-of-the-api-service-by-the-discovery-service"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/install-zos.html http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-apiml/api-mediation-security.html "86" "200 OK" "#trust-zosmf-certificate"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/install-zos.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/install-zos.html "24, 74" "200 OK" "#starting-and-stopping-the-zowe-runtime-on-zos,#how-the-install-script-zowe-installsh-works,#installing-the-zowe-runtime-on-zos"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/installroadmap.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-installcli.html "24" "200 OK" "#testing-zowe-cli-connection-to-zosmf"
- http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-desktop/zlux-workshop-user-browser.html http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-desktop/zlux-workshop-user-browser.html "24, 300, 409" "200 OK" "#defining-your-first-plugin,#constructing-an-app-skeleton,#adding-your-dataservice-to-the-app,#adding-your-app-to-the-desktop,#calling-back-to-the-starter-app,#packaging-your-web-app"
- http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-desktop/mvd-apptoappcommunication.html http://zowe-docs-test-links/docs-site/v0-9-x/extend/extend-desktop/mvd-apptoappcommunication.html "24" "200 OK" "#why-application-to-application-communication"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-cicsplugin.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-cicsplugin.html "24, 31" "200 OK" "#setting-up-profiles,#get-cics-resources"
- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-db2plugin.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-db2plugin.html "24, 46" "200 OK" "#executing-an-sql-statememnt,#setting-up-profiles,#license"
- http://zowe-docs-test-links/docs-site/latest/user-guide/cli-cicsplugin.html http://zowe-docs-test-links/docs-site/latest/user-guide/cli-installcli.html "24, 27" "200 OK" "#installing-zowe-cli-from-local-package"
- http://zowe-docs-test-links/docs-site/latest/user-guide/cli-usingcli.html http://zowe-docs-test-links/docs-site/latest/user-guide/cli-installcli.html "29, 50" "200 OK" "#creating-a-zowe-cli-profile,#testing-zowe-cli-connection-to-zosmf"
- http://zowe-docs-test-links/docs-site/latest/extend/extend-apiml/api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.html http://zowe-docs-test-links/docs-site/latest/extend/extend-apiml/api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.html "24" "200 OK" "#add-context-listener"
- http://zowe-docs-test-links/docs-site/latest/extend/extend-apiml/api-mediation-security.html http://zowe-docs-test-links/docs-site/latest/extend/extend-apiml/api-mediation-security.html "24" "200 OK" "#add-a-service-with-an-existing-certificate-to-api-ml-on-zos,#zowe-runtime-on-zos,#certificates-for-zos-installation-from-the-zowe-pax-file,#trust-a-zosmf-certificate,#generate-a-keystore-and-truststore-for-a-new-service-on-zos"
- http://zowe-docs-test-links/docs-site/latest/user-guide/systemrequirements.html http://zowe-docs-test-links/docs-site/latest/user-guide/systemrequirements.html "24" "200 OK" "#zosmf-configuration"
- http://zowe-docs-test-links/docs-site/latest/user-guide/install-zos.html http://zowe-docs-test-links/docs-site/latest/user-guide/install-zos.html "24, 75, 110, 175" "200 OK" "#installing-the-zowe-cross-memory-server-on-zos,#verifying-z-os-services-installationn,#installing-the-zowe-runtime-on-zos,#starting-and-stopping-the-zowe-cross-memory-server-on-zos,#how-the-install-script-zowe-installsh-works,#starting-and-stopping-the-zowe-runtime-on-zos"
- http://zowe-docs-test-links/docs-site/latest/user-guide/install-zos.html http://zowe-docs-test-links/docs-site/latest/extend/extend-apiml/api-mediation-security.html "88" "200 OK" "#trust-zosmf-certificate"
- http://zowe-docs-test-links/docs-site/latest/extend/extend-desktop/zlux-app-server.html http://zowe-docs-test-links/docs-site/latest/extend/extend-desktop/zlux-app-server.html "24, 46" "200 OK" "#2-acquire-external-components,#0-optional-install-git-for-zos,#6-run-the-server,#4-build-application-plug-ins,#5-deploy-server-configuration-files,#1-acquire-the-source-code,#7-connect-in-a-browser,#3-set-the-server-configuration"
Total 29 warning(s).
```

A typical link check *error* message may looks like this:

```
===============================================================================
Error(s) of broken links and other issues (source target lines code fragments):
- http://zowe-docs-test-links/docs-site/latest/ https://zowe.github.io/docs-site/latest/Zowe_Documentation_1.0.0.pdf "26" "404 Not Found" "-"
- http://zowe-docs-test-links/docs-site/latest/ http://zowe-docs-test-links/docs-site/latest/... "26" "404 Not Found" "-"
Total 2 error(s).
```

The above warning / error message includes several informations:

- There are 29 warnings found in the docs build result.
- There are 2 errors found in the docs build result.
- Each line starts with `-` is one particular warning / error.
- Each warning / error line includes 5 fields:
  * source
  * target
  * lines, separated by comma (,)
  * code
  * fragments, separated by comma (,)
- For line `- http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-installcli.html http://zowe-docs-test-links/docs-site/v0-9-x/user-guide/cli-usingcli.html "26, 29, 34" "200 OK" "#displaying-zowe-cli-help,#accessing-an-api-mediation-layer"`, it means:
  * **source**: in page `/docs-site/v0-9-x/user-guide/cli-installcli.html`,
  * **targe**: has a link to `/docs-site/v0-9-x/user-guide/cli-usingcli.html`, which is itself,
  * **lines**: at line `26, 29, 34`, which is 3 lines,
  * **code**: received code `200 OK`, which means retreiving target link is successful,
  * **fragments**: however it failed to find 2 target fragments `#displaying-zowe-cli-help,#accessing-an-api-mediation-layer` in the target html page.
- For line `http://zowe-docs-test-links/docs-site/latest/ https://zowe.github.io/docs-site/latest/Zowe_Documentation_1.0.0.pdf "26" "404 Not Found" "-"`, it means:
  * **source**: in page `/docs-site/latest/`,
  * **targe**: has a link to `https://zowe.github.io/docs-site/latest/Zowe_Documentation_1.0.0.pdf`,
  * **lines**: at line `26`,
  * **code**: received error code `404 Not Found`,
  * **fragments**: without fragments defined.

### Build PDF

Launch the build script with command `npm run docs:pdf`. The build result will be put into `.deploy/.pdf/out` folder if there are no errors.

To update what should be included in PDF document, go ahead edit `docs/.vuepress/config.js` `ALL_PAGES` property.

Check [Build PDF](docs/.pdf/README.md) for details explanations.

