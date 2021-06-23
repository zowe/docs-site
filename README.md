# Zowe™ documentation

Welcome to the Zowe documentation repository! This repo is the source for [https://docs.zowe.org](https://docs.zowe.org), also known as "Zowe Docs"!

Zowe documentation is completely open-source and we appreciate contributions from the community.


## Providing feedback

Your feedback is essential in shaping the Zowe content experience. There are several ways to provide feedback:

- If you see something incorrect or confusing in the docs, or have an enhancement idea to make the docs better, you can edit a page by clicking **Edit this page** at the top of the page to [open a Pull Request](https://docs.zowe.org/stable/contribute/contributing#sending-a-github-pull-request). You can also [open a GitHub issue](https://docs.zowe.org/stable/contribute/contributing#opening-an-issue-for-the-documentation) for the documentation team by clicking **Open doc issue**.
- You can rate the topic at the bottom of each page to tell us whether it is helpful.
- If you have a question about docs, you can join the Zowe [#zowe-doc Slack channel](https://openmainframeproject.slack.com/archives/CC961JYMQ) to reach out to the Zowe Doc Squad and the community.

Only file issues about Zowe docs in this repository. For issues, questions, new feature requests, or enhancement ideas about a specific component or aspect of Zowe, open an issue in the [corresponding code repository](https://github.com/zowe/community#zowe-sub-projects) or ask in the [community Slack channels](https://github.com/zowe/community#slack).

## Contributing to the docs

You can click the **Fork** button in the upper-right area of the screen to create a copy of this repository in your GitHub account. You can make doc changes in your fork, and when the changes are ready, go to your fork and create a new pull request to send the changes to us.

After that, a Zowe documentation reviewer will review your PR and provide feedback. The doc reviewer might ask for a technical review from a Zowe tech reviewer depending on the specific changes in the PR.

For more information about contributing to the Zowe documentation, see:
- [Zowe documentation style guide](https://docs.zowe.org/stable/contribute/contributing#documentation-style-guide)

### Adding DCO signoff to commits

Zowe requires the use of the Developer’s Certificate of Origin 1.1 (DCO). Every commit to this repo and other Zowe repos should be signed off using DCO. Otherwise, the PR could not be merged.

To sign off a commit, add a Signed-off-by line to your commit message. For example, `Signed-off-by: John Doe john.doe@hisdomain.com`.

#### Tools for automatic DCO signoff

If you don't want to manually copy/paste your signature in every commit, use one or both of the following tools:

- To enable auto-signoff for local commits, download and enable the [DCO signoff tool](https://github.com/coderanger/dco) on your PC. This method works when committing via command-line or Github Desktop.

    **Tip:** To enable the tool, issue the `dco enable` on each new repository that you clone.

- **(Google Chrome)** To enable auto-signoff for commits made through the GitHub Web UI, install [DCO GitHub UI](https://chrome.google.com/webstore/detail/dco-github-ui/onhgmjhnaeipfgacbglaphlmllkpoijo?hl=en) in your browser.

#### What to do if I missed DCO signoff in previous commits?

If you missed DCO sign-off statements in a series of commits, you can retroactively sign commits by following these steps:

1. Check and review all commits that report missing DCO signoff. If you already opened a PR, you can find this information by clicking the **Details** link in the DCO check entry.
2. Create a new text (.txt) file (suggested name is `past_commits_<your name>.txt`) within the `doc_signoffs` folder.
3. Add the following contents to the file. Take a look at [this folder](https://github.com/zowe/docs-site/tree/master/dco_signoffs) for examples.

    ```
    I, <author_name> hereby sign-off-by all of my past commits to this repo subject to the Developer Certificate of Origin (DCO), Version 1.1. In the past I have used emails: <emails>
    <COMMIT HASH> <COMMIT MSG>
    ```

4. Commit this file to the doc site. Remember to include the signoff line in the commit message as well.

## Doc branches

Before you get started with the authoring work, it's necessary that you understand the different branches to work on.
* **[`master`](https://github.com/zowe/docs-site/tree/master/docs)** -  protected branch

  Docs for [https://docs.zowe.org/stable](https://docs.zowe.org/stable). This branch contains the most recent stable release content.

* **[`docs-staging`](https://github.com/zowe/docs-site/tree/docs-staging/docs)** - protected branch

  Docs for the upcoming `vNext` release. When Zowe has a release, its `docs-staging` branch will be merged into `master` and the content will be visible on [https://docs.zowe.org/stable](https://docs.zowe.org/stable).

* (REMOVED TEMPORARILY UNTIL NEW COMPONENT FEATURES ARE AVAILABLE) **[`active-development`](https://github.com/zowe/docs-site/tree/active-development/docs)** - protected branch

  Docs for a forward-version that includes features not yet included in the Zowe Stable version. Its content is published on [https://docs.zowe.org/active-development](https://docs.zowe.org/active-development) for early validation purpose.

* **`v<v.r>.x`** - protected branches

  Docs for an archived version, where `v` indicates the version, `r` indicates the release number. For example, `v1.0.x`, `v1.1.x`, `v1.6.x`.

* Branches that start with `release-` contain archived patch release documentation for historical tracking.
* You can have your own personal branch to work on content for a certain issue or feature. However, be sure to check and remove unused personal branches periodically for easy maintenance. Usually when your branch is merged, you can safely delete it.

## Site organization and files

- `/docs/` - Contains the Markdown files for the docs. Customize the order of the docs sidebar in `sidebars.js`. 
- `/docusaurus.config.js` - A config file containing the site configuration.
- `/sidebar.js` - Specify the order of documents in the sidebar. If you have a new file to add to the site, modify this file.
- `/src/` - Non-documentation files like pages or custom React components.
  - `/src/pages` - Any files within this directory will be converted into a website page.
- `/static/` - Static directory. Any contents inside here will be copied into the root of the final `build` directory.
- `/package.json` - A Docusaurus website is a React app. You can install and use any npm packages you like in them.

## Running the doc site locally

### Prerequisites

You need the following installed locally:

- [Node.js](https://nodejs.org/en/download/) version >= 12.13.0 or above (which can be checked by running `node -v`). You can use [nvm](https://github.com/nvm-sh/nvm) for managing multiple Node versions on a single machine installed
- [Yarn](https://yarnpkg.com/en/) version >= 1.5 (which can be checked by running `yarn --version`). Yarn is a performant package manager for JavaScript and replaces the `npm` client. It is not strictly necessary but highly encouraged.

### Procedure

Before you start, clone this repository and navigate to the directory:

1. In your local command line interface, navigate to the directory in which you want to create your local copy of this repository.
1. Clone this repository by running the following command: `git clone https://github.com/zowe/docs-site`
1. Access the newly-cloned repository by changing directories into it: `cd docs-site`

Once you have this repository set up locally and are in the `docs-site` directory, you can build and run the docs site locally by following the steps below:

1. Run the command to install project dependencies: `npm install`
1. Run `npm start`

Once complete, you can open your browser and view the doc site locally at [http://localhost:3000/](http://localhost:3000/). As you make changes to the source files, the preview build will be triggered automatically, and then you can refresh your browser to see the changes.

## Thank you!

We appreciate your contributions to our documentation!