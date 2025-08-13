# Generate PDF

The Zowe Docs uses the [docs-to-pdf](https://github.com/jean-humann/docs-to-pdf) to generate a downloadable PDF file. This document describes how to generate the PDF file by running some commands.

## Before you begin

- The PDF file contains all the content on the published doc site. 
- The PDF files are available for download in the landing/welcome page of the Zowe doc site. You can switch the version number and download the PDF file. 
  ![PDF download section](images/zowe-docs-download.png)
- The PDF file is generated after a new release is published and doc site is refreshed.
- Follow the naming rules of the PDF files:
   - If it's the PDF file for the latest version, use `zowe-docs.pdf`. 
   - For other versions, add the release number as suffix. For example, `zowe-docs-v2.3.x.pdf` or `zowe-docs-v1.28.x.pdf`. 

## Steps to manually generate PDF [Recommended]

We generate PDFs when either a:
- latest release goes GA.
- patch release goes GA.

Instructions for each case are listed in the sections below.

### Generating the PDF for the latest release with GitHub Actions

1. In the docs-site repo, select the [**Actions** tab](https://github.com/zowe/docs-site/actions).
2. Select the **Generate PDF** workflow.
3. Open the **Run workflow** drop-down menu.
    - Leave the **Use workflow from** drop-down menu set to `Branch: master`.
    - Configure the release version for the PDF:
        - For the latest release, leave the second field as `stable`. 
        - For a previous release, enter the release version in the second field. For example, `v2.18.x`.
    - Update the PDF title to reflect the release version. For example, `Zowe Version 3.3 Documentation`.
4. Check the **Use the live docs.zowe.org site** option.
5. Select the **Run workflow** button.
6. Refresh the browser window to see the workflow in the Actions page.
7. Once the PDF is generated, select the **Generate PDF** link to open the build status page. Select the artifact file to download the ZIP file.
8. Extract the PDF. Rename the file, if necessary.
9. Open a pull request to upload the PDF to the docs-site repo and publish it to the Zowe Docs site.


### Generating the PDF for the latest release with a script

1. Create a temporary branch based off the `master` branch.

2. In Visual Studio Code, go to your local branch and rename the existing `zowe-docs.pdf` file (in the static folder) to include the version number for the previous release.

    For example, if you are generating the site PDF for Zowe v2.11, rename the file `zowe-docs.pdf` to `zowe-docs-v2.10.x.pdf`.
3. Open a new terminal and run the command to install project dependencies: `npm install`
4. Select the **bash** option from the **+** drop-down menu in the terminal.
5. Paste the following command:
    ```
    npx docs-to-pdf --initialDocURLs="https://docs.zowe.org/stable/whats-new/zowe-announcements,https://docs.zowe.org/stable/getting-started/overview,https://docs.zowe.org/stable/user-guide/install-overview,https://docs.zowe.org/stable/user-guide/zowe-getting-started-tutorial,https://docs.zowe.org/stable/extend/extend-zowe-overview,https://docs.zowe.org/stable/troubleshoot/troubleshooting,https://docs.zowe.org/stable/contribute/roadmap-contribute,https://docs.zowe.org/stable/appendix/zowe-cli-command-reference" --cssStyle=":root{--ifm-font-size-base: 80%;}" --contentSelector="article" --paginationSelector=".pagination-nav__link--next" --excludeSelectors=".no-pdf,.announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar" --coverImage="https://docs.zowe.org/img/zowe-icon.png" --coverTitle="Zowe Documentation" --outputPDFFilename="static/zowe-docs.pdf" --protocolTimeout=1800000 
    ```

    This command generates the PDF by using a script that fetches pages from https://docs.zowe.org and scans the content in each page to save it.

6. In the command, go to the `--coverTitle="Zowe Documentation"` line and add the Zowe Version number to the PDF title.

    For example: `--coverTitle="Zowe Version 2.11 Documentation"`

7. Press `Enter` to run the command and generate the PDF.

8. Commit your updates to your temporary branch, create a pull request, and merge your branch to `master`.

    Once the branches are merged, the PDF for the new release is published to the live site.

### Generating the PDF for a previous release

1. Create a temporary branch based off the `master` branch.

2. In Visual Studio Code, open a new terminal and run the command to install project dependencies: `npm install`
3. Select the **bash** option from the **+** drop-down menu in the terminal.
4. Paste the following command, updating the version and patch numbers as necessary:

    ```
    npx docs-to-pdf --initialDocURLs="https://docs.zowe.org/v1.28.x/whats-new/zowe-announcements,https://docs.zowe.org/v1.28.x/getting-started/overview,https://docs.zowe.org/v1.28.x/user-guide/install-overview,https://docs.zowe.org/v1.28.x/user-guide/zowe-getting-started-tutorial,https://docs.zowe.org/v1.28.x/extend/extend-zowe-overview,https://docs.zowe.org/v1.28.x/troubleshoot/troubleshooting,https://docs.zowe.org/v1.28.x/contribute/roadmap-contribute,https://docs.zowe.org/v1.28.x/appendix/zowe-cli-command-reference" --cssStyle=":root{--ifm-font-size-base: 80%;}" --contentSelector="article" --paginationSelector=".pagination-nav__link--next" --excludeSelectors=".no-pdf,.announcementBar_UUUQ,nav.navbar,.docSidebarContainer_3pwe,.docMainContainer_2pgU .col.col--3,footer.footer,.docItemContainer_2szM > .margin-vert--xl > .row > .col:first-child,.pagination-nav,.docsRating,.navbar__inner,.thin-scrollbar" --coverImage="https://docs.zowe.org/img/zowe-icon.png" --coverTitle="Zowe Version 1.28.x Documentation" --outputPDFFilename="static/zowe-docs-v1.28.x.pdf" --protocolTimeout=1800000 
    ```
    For example, if you're generating the site PDF for a previous minor release, you will need to replace all mentions of `1.28.x` with the correct release version number. If you're updating the v1.28.x PDF to include content for the latest patch release, there is no need to edit the command.

5. In the command, go to the `--coverTitle="Zowe Documentation"` line and add the Zowe Version number to the PDF title.

    For example: `--coverTitle="Zowe Version 1.28 Documentation"`

6. Press `Enter` to run the command and generate the PDF.

7. Commit your updates to your temporary branch, create a pull request, and merge your branch to `master`.

    Once the branches are merged, the PDF for the release is published to the live site.

## ~~Steps to automatically generately PDF [Potential Issue]~~

NOTE (9/19/2023): We no longer use this method, but leaving these instructions in case we want to fix the issue and use this method in the future.

1. Run the command to install project dependencies: `npm install`
2. Run `npm start` to view the site locally
3. Run `npm run docs:pdf` to pass the local site & generate PDF. 

    NOTE: A [community plugin](https://github.com/kohheepeace/mr-pdf) is being used to generate the PDFs, which contain some bugs.
    Currently internal links within the PDF are redirecting to the online site if PDF generated uses online deployed links.
    If local build is passed to generate the PDF. The internal links redirect to localhost://3000/page .

    Related issue: https://github.com/kohheepeace/mr-pdf/issues/18
Once this issue has been resolved we shall use Jenkins to leverage the PDF pipeline.

