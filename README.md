# Zowe™ documentation <!-- omit in toc -->

Welcome to the Zowe documentation repository! This repo is the source for [https://docs.zowe.org](https://docs.zowe.org), also known as "Zowe Docs"!

Zowe documentation is completely open-source and we appreciate contributions from the community.

- [Table of contents](#table-of-contents)
- [Providing feedback](#providing-feedback)
- [Contributing to the docs](#contributing-to-the-docs)
- [Understanding the doc branches](#understanding-the-doc-branches)
- [Understanding doc site organization and files](#understanding-doc-site-organization-and-files)
- [Adding DCO signoff to commits](#adding-dco-signoff-to-commits)
- [Building the docs](#building-the-docs)
- [Archiving the docs and creating a new version](#archiving-the-docs-and-creating-a-new-version)

## Providing feedback

Your feedback is essential in shaping the Zowe content experience. There are several ways to provide feedback:

- If you see something incorrect or confusing in the docs, or have an enhancement idea to make the docs better, you can edit a page by clicking "Propose content changes" at the footer to [open a Pull Request](https://docs.zowe.org/stable/contribute/contributing.html#sending-a-github-pull-request). You can also [open a GitHub issue](https://docs.zowe.org/stable/contribute/contributing.html#opening-an-issue-for-the-documentation) for the documentation team.
- You can take an [online survey](https://forms.gle/Ztu9AjgV6HRr1kEs9) and tell us how you think about the docs.
- You can also rate the experience and leave comments when an NPS survey pops up on the doc site.
- If you have a question about docs, you can join the Zowe [#zowe-doc Slack channel](https://openmainframeproject.slack.com/archives/CC961JYMQ) and talk directly with the documentation team and the community.

Only file issues about the Zowe docs in this repository. For issues, questions, new feature requests, or enhancement ideas about a specific component or aspect of Zowe, open an issue in the [corresponding code repository](https://github.com/zowe/community#zowe-sub-projects) or ask in the [community Slack channels](https://github.com/zowe/community#slack).

## Contributing to the docs

You can click the **Fork** button in the upper-right area of the screen to create a copy of this repository in your GitHub account. You can make doc changes in your fork, and when the changes are ready, go to your fork and create a new pull request to send the changes to us.

After that, a Zowe documentation reviewer will review your PR and provide feedback. The doc reviewer might ask for a technical review from a Zowe tech reviewer depending on the specific changes in the PR.

For more information about contributing to the Zowe documentation, see:
- [Zowe documentation style guide](https://docs.zowe.org/stable/contribute/contributing.html#documentation-style-guide)

## Understanding the doc branches

Before you get started with the authoring work, it's necessary that you understand the different branches to work on.
* **[`master`](https://github.com/zowe/docs-site/tree/master/docs)** -  protected branch

  Docs for [https://docs.zowe.org/stable](https://docs.zowe.org/stable). This branch contains the most recent stable release content.
* **[`docs-staging`](https://github.com/zowe/docs-site/tree/docs-staging/docs)** - protected branch

  Docs for the upcoming `vNext` release. When Zowe has a release, its `docs-staging` branch will be merged into `master` and the content will be visible on [https://docs.zowe.org/stable](https://docs.zowe.org/stable).
* **[`active-development`](https://github.com/zowe/docs-site/tree/active-development/docs)** - protected branch

  Docs for a forward-version that includes features not yet included in the Zowe Stable version. Its content is published on [https://docs.zowe.org/active-development](https://docs.zowe.org/active-development) for early validation purpose.
* **`v<v.r>.x`** - protected branches

  Docs for an archived version, where `v` indicates the version, `r` indicates the release number. For example, `v1.0.x`, `v1.1.x`, `v1.6.x`.
* Branches that start with `release-` contain archived patch release documentation for historical tracking.
*
* You can have your own personal branch to work on content for a certain issue or feature. However, be sure to check and remove unused personal branches periodically for easy maintainance. Usually when your branch is merged, you can safely delete it.

## Understanding doc site organization and files

The `docs/.vuepress` folder defines the site organziation, style and table of contents. The following files are important.

- **pages.json**: Defines the high level doc site architecture, including the nav bar (top navigtation) and the side bar (left-hand navigation). If you have a new file to add to the site, modify this file.

- **versions.json**: Controls the **Version** drop down list on the doc site. When there is a new version to publish, modify this file to add a new entry.

- **config.js**: Defines the doc site configuration, such as the version number, the theme, and the Edit in GitHub links.

- **/public**: Contains public assets and files for download.

The `docs/README.md` contains content for the homepage of the doc site.

## Adding DCO signoff to commits

Zowe requires the use of the Developer’s Certificate of Origin 1.1 (DCO). Every commit to this repo and other Zowe repos should be signed off using DCO. Otherwise, the PR could not be merged.

To sign off a commit, add a Signed-off-by line to your commit message. For example, `Signed-off-by: John Doe john.doe@hisdomain.com`.

### Tools for automatic DCO signoff

If you don't want to manually copy/paste your signature in every commit, use one or both of the following tools:

- To enable auto-signoff for local commits, download and enable the [DCO signoff tool](https://github.com/coderanger/dco) on your PC. This method works when committing via command-line or Github Desktop.

    **Tip:** To enable the tool, issue the `dco enable` on each new repository that you clone.

- **(Google Chrome)** To enable auto-signoff for commits made through the GitHub Web UI, install [DCO GitHub UI](https://chrome.google.com/webstore/detail/dco-github-ui/onhgmjhnaeipfgacbglaphlmllkpoijo?hl=en) in your browser.

### What to do if I missed DCO signoff in previous commits?

If you missed DCO sign-off statements in a series of commits, you can retroactively sign commits by following these steps:

1. Check and review all commits that report missing DCO signoff. If you already opened a PR, you can find this information by clicking the **Details** link in the DCO check entry.
2. Create a new text (.txt) file (suggested name is `past_commits_<your name>.txt`) within the `doc_signoffs` folder.
3. Add the following contents to the file. Take a look at [this folder](https://github.com/zowe/docs-site/tree/master/dco_signoffs) for examples.

    ```
    I, <author_name> hereby sign-off-by all of my past commits to this repo subject to the Developer Certificate of Origin (DCO), Version 1.1. In the past I have used emails: <emails>
    <COMMIT HASH> <COMMIT MSG>
    ```

4. Commit this file to the doc site. Remember to include the signoff line in the commit message as well.

## Building the docs

### Previewing or testing the doc site locally

If you want to preview your changes on your local machine, you will need node.js >= 8 and npm installed. Tp install npm, run `npm install`.

Then, follow these steps:
1. cd into the `docs-site` folder.
1. Run `npm run docs:dev`.
1. Once complete, you can preview the site locally at [http://localhost:8080/stable/](http://localhost:8080/stable/). Every time if you modify and save a documentation change, the preview build will be triggered automatically, then you can refresh your browser to see the changes.

#### Errors when running the site locally?

- Stop (CMD + Z) and rerun start script npm run docs:dev
- If still errors, look for '<' in problem file not wrapped in code syntax.
   - Issues with files can be found at the top of red error text.
- Look for images that are being called but do not exist in the file system.
- If you encounter `JavaScript heap out of memory` error with the build command, it could be caused by `max_old_space_size` is too small. Try to define environment variable `NODE_OPTIONS=--max_old_space_size=4096`, or even higher with `NODE_OPTIONS=--max_old_space_size=8192`.


### Building the docs for production

You can build the docs with this command:

```
npm run docs:build
```

All build results will be put under the `.deploy` folder. If you didn't configure special variables for the build, the above command will generate HTML pages and put into `.deploy/stable/` folder.

You can check the generated result and verify the content. You can also host the content in `.deploy` and view the result in browser. The below shows how to start the web server with Docker:

```
docker run --name docs-site-test -p 8080:80 -v $PWD/.deploy:/usr/share/nginx/html:ro --rm nginx
```

Now you are able to visit `http://localhost:8080/stable/` to check the content.

### Testing broken links

You will need `Docker` to run broken links test. Check https://www.docker.com/get-started to install Docker.

After you build the documentation described above, you can run broken links test with this command:

```
npm run test:links:stable
```

Check `Warning of broken links and other issues (source target lines code fragments):` sections for warnings, and Check `Errors of broken links and other issues (source target lines code fragments):` sections for errors.

Errors must be fixed before merge to the `master` branch, otherwise the pull request will be blocked.

_Please note, if we have multiple documentation versions in place, you may see broken links warnings on links to other versions._

### Understanding the link check warning / error message

If you don't see a section of `Error(s) of broken links and other issues` in the job console log, that means you are all good to go! However, there may be a `Warning(s) of broken links and other issues` which includes warnings but it won't fail the build pipeline. The `(source target lines code fragments)` indicates the fields of each warning / error message.

A typical link check *warning* message may look like this:

```
=================================================================================
Warning(s) of broken links and other issues (source target lines code fragments):
- - http://zowe-docs-test-links/v0-9-x/user-guide/cli-installcli.html http://zowe-docs-test-links/v0-9-x/user-guide/cli-usingcli.html "26, 29, 34" "200 OK" "#displaying-zowe-cli-help,#accessing-an-api-mediation-layer"
- http://zowe-docs-test-links/stable/extend/extend-apiml/api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.html http://zowe-docs-test-links/stable/extend/extend-apiml/api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.html "24" "200 OK" "#add-context-listener"
- http://zowe-docs-test-links/stable/extend/extend-apiml/api-mediation-security.html http://zowe-docs-test-links/stable/extend/extend-apiml/api-mediation-security.html "24" "200 OK" "#add-a-service-with-an-existing-certificate-to-api-ml-on-zos,#zowe-runtime-on-zos,#certificates-for-zos-installation-from-the-zowe-pax-file,#trust-a-zosmf-certificate,#generate-a-keystore-and-truststore-for-a-new-service-on-zos"
- http://zowe-docs-test-links/stable/user-guide/systemrequirements.html http://zowe-docs-test-links/stable/user-guide/systemrequirements.html "24" "200 OK" "#zosmf-configuration"
Total 5 warning(s).
```

A typical link check *error* message may look like this:

```
===============================================================================
Error(s) of broken links and other issues (source target lines code fragments):
- http://zowe-docs-test-links/stable/ https://docs.zowe.org/stable/Zowe_Documentation_1.0.0.pdf "26" "404 Not Found" "-"
- http://zowe-docs-test-links/stable/ http://zowe-docs-test-links/stable/... "26" "404 Not Found" "-"
Total 2 error(s).
```

The above warning / error message includes several informations:

- There are 5 warnings found in the docs build result.
- There are 2 errors found in the docs build result.
- Each line starts with `-` is one particular warning / error.
- Each warning / error line includes 5 fields:
  * source
  * target
  * lines, separated by comma (,)
  * code
  * fragments, separated by comma (,)
- For a line like `- http://zowe-docs-test-links/v0-9-x/user-guide/cli-installcli.html http://zowe-docs-test-links/v0-9-x/user-guide/cli-usingcli.html "26, 29, 34" "200 OK" "#displaying-zowe-cli-help,#accessing-an-api-mediation-layer"`, it means:
  * **source**: in page `/v0-9-x/user-guide/cli-installcli.html`,
  * **targe**: has a link to `/v0-9-x/user-guide/cli-usingcli.html`, which is itself,
  * **lines**: at line `26, 29, 34`, which is 3 lines,
  * **code**: received code `200 OK`, which means retreiving target link is successful,
  * **fragments**: however it failed to find 2 target fragments `#displaying-zowe-cli-help,#accessing-an-api-mediation-layer` in the target html page.
- For line `http://zowe-docs-test-links/stable/ https://docs.zowe.org/stable/Zowe_Documentation_1.0.0.pdf "26" "404 Not Found" "-"`, it means:
  * **source**: in page `/stable/`,
  * **targe**: has a link to `https://docs.zowe.org/stable/Zowe_Documentation_1.0.0.pdf`,
  * **lines**: at line `26`,
  * **code**: received error code `404 Not Found`,
  * **fragments**: without fragments defined.

### Previewing the docs in PDF format

You can build the doc site into a PDF document to preview locally. Launch the build script with command `npm run docs:pdf`. The build result will be put into the `.deploy/.pdf/out` folder if there are no errors.

To update what should be included in PDF document, go ahead edit `docs/.vuepress/config.js ALL_PAGES` property.

Check [Build PDF](docs/.pdf/README.md) for detailed explanations.

For published docs, PDFs of different versions are available for download on the doc site homepage.

## Archiving the docs and creating a new version

Check [Build and Archive Legacy Documentation](https://github.com/zowe/docs-site/wiki/How-to#build-and-archive-legacy-documentation) for detailed explanations.
