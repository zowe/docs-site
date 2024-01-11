# Release handbook

Learn how to handle the documentation for Zowe releases.

- [Release schedule](#release-schedule)
- [Preparing documentation for a new release](#preparing-documentation-for-a-new-release)
    - [Before you begin](#before-you-begin)
    - [Part 1: Sync the doc branches](#part-1-sync-the-doc-branches)
    - [Part 2: Archive the previous release doc](#part-2-archive-the-previous-release-doc)
    - [Part 3: Bump the release version](#part-3-bump-the-release-version)
    - [Part 4: Prepare new release files](#part-4-prepare-new-release-files)
    - [Part 5: Continue syncing branches](#part-5-continue-syncing-branches)
    - [Part 6: Ask squads to review draft release notes](#part-6-ask-squads-to-review-draft-release-notes)
    - [Part 7: Check the release checklist](#part-7-check-the-release-checklist)
    - [Part 8: Update the TPSRs](#part-8-update-the-tpsrs)
    - [Part 9: Publish documentation for a new release](#part-9-publish-documentation-for-a-new-release)
    - [Part 10: Post-publication tasks](#part-10-post-publication-tasks)
- [Release checklist](#release-checklist)
- [Removing an archived version](#removing-an-archived-version)
- [Zowe CLI: Update web help and type doc](#zowe-cli-update-web-help-and-type-doc)
## Release schedule 

For each release, Zowe documentation follows a doc delivery schedule with several key checkpoints:

|Checkpoint | Due Date | Details
|--|--|--|
|Doc Prep Start | Code Freeze | Doc Squad preps, stages vNext content |
|Release Notes Freeze | 3 days before GA | Zowe squad leads review notes |
|Doc Freeze | 1 day before GA | Doc Squad finalizes vNext content |
|Doc Publish | GA day | vNext content published to Zowe Docs |

Code Freeze is the day the Doc Squad starts to prepare and stage content for the vNext release. We define a freeze date for release notes which is usually 3 days before the GA date to allow time for squad leads' review. The doc usually freezes 1 day before the GA date to allow time for doc build testing and issue fixing.

The following schedule takes release version 2.4 as an example:

|Checkpoint | Date | Details
|--|--|--|
|Doc Prep Start |2022/10/04 | Code Freeze |
|RC Build | 2022/10/05 ||
|Release Note Freeze | 2022/10/14| 3 days before GA, 2 days for review |
|Doc Freeze | 2022/10/16| 1 day before GA|
|Doc Publish | 2022/10/17| GA day |

### Release communication

The Zowe community communicates the release schedule in several ways. 
- [Zowe release cadence document](https://github.com/zowe/community/blob/master/Project%20Management/Schedule/Zowe%20PI%20%26%20Sprint%20Cadence.md) 
- [#zowe-release](https://openmainframeproject.slack.com/archives/G01M2C8QB3K) Slack channel
  - Private for only release leads. Contact the CI/CD Squad lead for invitation and access.

Release contacts are as follows:  

- Release engineer: Mark Ackert (Slack @Mark Ackert)

## Preparing documentation for a new release

This information guides you to archive the documentation of the previous version and create the necessary files to make way for a new version.

### Branching strategy

The vNext release documentation is hosted in the `docs-staging` branch. The `docs-staging` branch is merged to the `master` branch when a release is published. 

Once the Code Freeze for a new release takes place, the `docs-staging` branch must be updated to get prepared for the next release. The updates include but are not limited to the following activities:

- Archiving the previous version documentation
- Bumping the release version number to vNext
- Creating placeholder files and folders for the vNext release

The following steps takes v1.25 release preparation as an example. Preparation should start the day Code Freeze takes place.
### **Part 1: Sync the doc branches**

Summary: Update the `docs-staging` branch so it includes all updates made to the `master` branch.

**Procedure**
1. Create and publish a new (temporary) branch based off the `master` branch.

2. Create a PR to merge the temporary branch into the `docs-staging` branch.
  
    This syncs both branches so that `docs-staging` is updated with all the edits made to the `master` branch since the branches were synched last.

3. Create a local build to confirm the updated `docs-staging` branch has no errors.

    1. Run `npm install`.
    2. Run `npm start` to build the site locally and clear any errors.

4. Using the **Create a merge commit** option in GitHub, merge the pull request so that `docs-staging` matches the `master` branch.

    **Important**: When merging *any* PRs that sync content between the `master` and `docs-staging` branches, avoid using the **Squash and merge** option to help prevent merge conflicts in future releases.

Next: Archive the content for the current version (v1.24 in our example).

### **Part 2: Archive the previous release doc**

Summary: Create new directories to archive content. Relocate content files for the *current* release (v1.24.x) so they become content files for the *previous* release.

**Procedure**

1. Create and publish a new (temporary) branch based off the `master` branch. (This branch should be different than the branch in [Part 1](#part-1-sync-the-doc-branches).)

    You will use this temporary branch to archive the content from the previous release in `master`.
2. Open your temporary branch in Visual Studio Code.
3. In the Terminal window, run the following command:
   
   ```npm run docusaurus docs:version <version>```

   In the preceding command, *\<version>* is the version number of the previous release. In our example, this is `v1.24.x`, so the command looks like this:

   ```npm run docusaurus docs:version v1.24.x```

   When it completes, you’ll see this message:
   
    `[docs]: version v1.24.x created!`

    By doing this, the document versioning mechanism takes the following steps:

    * Copies the full `docs/` folder contents into a new `versioned_docs/version-<version>/` folder.
    * Creates a versioned `sidebars` file based from your current sidebar configuration. The file is saved as `versioned_sidebars/version-<version>-sidebars.json`.
    * Appends the new version number to the `versions.json` file.

4. Archive the `/static` files.
    
   1. Go to the `/static` folder.
   2. Create an empty directory with the name of the previous version in `/static`. For example: `static/v1.24.x`.
   3. Copy all contents of the `/static/stable` directory and paste them in the previous version's empty directory in the step above. For example: `/static/v1.24.x`.

5. Update a set of links in the archived documentation to ensure that they refer to the correct location.

    To do this, switch to the archived directory. In our example, `versioned_docs/version-v1.24.x`.
  
    Update several locations in the archived docs to refer to the correct release, the 1.24 release (in our example case).

   **Tip**: Use the Find function of Visual Studio Code editor to make the updates. In our example, you can right-click the `versioned_docs/version-v1.24.x` folder and then select **Find in Folder**.

   ![Find in files in VSCode](images/vscode-find.png)

   * Search all instances of `<a href="/stable/web_help/index.html" target="_blank">` and replace `stable` in the link with the previous version before adding the new version. Example: `<a href="/v1.24.x/web_help/index.html" target="_blank">`.
   
     ![Update CLI web help](images/update-cli-web-help.png)

   * Search all instaces of `<a href="/stable/CLIReference_Zowe.pdf" target="_blank">` and replace `stable` with the previous version before adding the new version. Example: `<a href="/v1.24.x/CLIReference_Zowe.pdf" target="_blank">`.

     ![Update CLI reference PDF](images/update-cli-reference.png)

   * Search all instaces of `<a href="/stable/zowe_web_help.zip" target="_blank">` and replace `stable` with the previous version before adding the new version. Example: `<a href="/v1.24.x/zowe_web_help.zip" target="_blank">`. 

     ![Update CLI web help ZIP](images/update-cli-help-zip.png)

6. Verify that the archived version works:
    1. Run `npm install`.
    2. Run `npm start` to build the site locally and clear any errors.

        ![Verify the archived doc](images/verify-archive.png)

        **NOTE:** When local build displays in your web browser, expect to see the previous minor release version listed twice in the Zowe Docs version drop-down menu. You will fix this in Part 3.

7. In GitHub, create a pull request to merge the content in your temporary branch into the `docs-staging` branch.

8. Using the **Create a merge commit** option, merge the pull request.

    **Important**: When merging *any* PRs between the `master` and `docs-staging` branches, avoid using the **Squash and merge** option to help prevent merge conflicts in future releases.

    Once the PR is merged, an archive of the content for the previous release (v1.24, in our example) is created in the `docs-staging` branch.

Next: Bump the version of docs to a new version (example: v1.25).

### **Part 3: Bump the release version**

Summary: Using Visual Studio Code, update the necessary files to add the next release to the Zowe Docs site.

**Procedure**

1. Create and publish a new (temporary) branch based off the `docs-staging` branch.
2. Open your branch branch in Visual Studio Code.
3. Navigate to the `/docusaurus.config.js` file.
4. Change the `LATEST_VERSION` variable present in Line 1 of the `/docusaurus.config.js` file to a new version.
5. Locate the presets: `> @docusaurus/preset-classic" > docs > versions` in the `/docusaurus.config.js` file to include the previous version in the list.
    
    1. Create an entry label for the previous version.
    
        Example: If version v1.24.x docs is getting updated to v1.25.x, then v1.24.x will be appended between `current` and `v1.23.x` in the following format:

        ```
        presets: [
            [
              "@docusaurus/preset-classic",
              {
                docs: {
                  path: "docs",
                  sidebarPath: require.resolve("./sidebars.js"),
                  editUrl: "https://github.com/zowe/docs-site/edit/master/",
                  showLastUpdateAuthor: false,
                  showLastUpdateTime: true,
                  routeBasePath: "/",
                  lastVersion: "current",
                  versions: {
                    current: {
                      path: "stable",
                      label: `${LATEST_VERSION}` + " LTS",
                    },
                    "v1.24.x": {
                      label: "v1.24.x LTS",
                    },
                    "v1.23.x": {
                      label: "v1.23.x LTS",
                    },
        ```

5. Open the `versions.json` file. Confirm that the previous release version number was added to the top of the list. (This is typically done automatically by the command issued in Part 2, Step 3.) If not, manually add the version number. For example:

    ```
      [
      "v1.24.x",
      "v1.23.x",
      "v1.22.x",
      "v1.21.x",
      "v1.20.x",
      "v1.19.x"
      ]
      ```

Next: Create placeholder files to prep for vNext release notes and TPSRs.
### **Part 4: Prepare new release files**

Summary: Using Visual Studio Code, create placeholder files for the next release's release notes and TPSRs. Finish the staging process by merging your PR in GitHub.

**Procedure**

1. In Visual Studio Code, add the release notes placeholder file for the new version to the temporary branch you created in [Part 3](#part-3-bump-the-release-version).
    1. Go to `/docs/whats-new/release-notes`.
    2. Create a file for the new version and add the outline to the document. For example: `/docs/whats-new/release-notes/v1_25.md`

       To insert the outline, copy and paste the template from the [Release Notes guide](release_notes_guide.md). Ensure that you update the release version number in the template.

    3. Open the `sidebars.js` file and add the new topic to the release notes section.
        ```
        {
          type: "category",
          label: "Release notes",
          items: [
            "whats-new/release-notes/v1_25",
            "whats-new/release-notes/v1_24",
            "whats-new/release-notes/v1_23",
          ],
        },
        ```

2. Add the TPSR placeholder file. 
    1. Go to the `/tpsr` directory. 
    2. Add a new file for the new version. For example: `/tpsr/tpsr-v1.25.x.md`.
    3. Update the TPSR file URL the `sidebar.js` file:

        ```
        {
          type: "link",
          label: "Third Party Software Requirements",
          href: "https://github.com/zowe/docs-site/tree/master/tpsr/tpsr-v1.25.x.md",
        },
        ```

        **Note:** This is just a placeholder file. The day before GA, this file should be updated to include the information for the new release.

3. Remove the content for the *current* version's oldest *release*. See [Removing an archived version](#removing-an-archived-version) for instructions.

    This helps avoid build failures due to RAM limits in the Docusaurus build process.

4. Create a local build to confirm everything works in your temporary branch.

    1. Run `npm install`.
    2. Run `npm start` to build the site locally and clear any errors.

5. Once you confirm that everything works in your temporary branch build, merge the pull request to the `docs-staging` branch in GitHub.

    The site setup for the new release version is now complete.

6. Inform the Doc Squad and Zowe community that the branch for the vNext release is ready for vNext content. Post an announcement in the Slack channel [#zowe-doc](https://openmainframeproject.slack.com/archives/CC961JYMQ).

    Remind Doc Squad members they can start adding content specific to the vNext release to the `docs-staging` branch, including:

    - Release notes
    - Articles on new features
    - Updated Zowe CLI web help, type doc
    
Next: Continue to sync the `docs-staging` branch with `master`.

### **Part 5: Continue syncing branches**

Summary: Periodically sync the `docs-staging` branch with `master` to ensure that important changes are incorporated into the next release.

The live site goes through continuous editing, so expect that changes *will* be made from the time you initially synced the `master` and `docs-staging` branches to the day of vNext doc publication. These updates can range from:

- Late-coming doc changes that go to the `master` branch directly after the GA.

   For example, a feature doc for v1.24 didn't catch the GA date and two days after the v1.24 GA, the doc was published directly to master. In this case, it should be synchronized back to the docs-staging branch as these changes also apply to the next release.
- Doc fixes into the `master` branch, such as broken links, typos, doc edits.
- Doc enhancements into the `master` branch, such as refactoring, edits, new troubleshooting tips, etc.

**Procedure**

Repeat the steps in [Part 1](#part-1-sync-the-doc-branches).

Next: Inform squad leads that release notes are ready for review.

### **Part 6: Ask squads to review draft release notes**

Summary: Let squad leads know they should review release notes.

**Procedure**

1. Three days before GA, ask squad leads to review their release notes.

2. Post an announcement in [#zowe-doc](https://openmainframeproject.slack.com/archives/CC961JYMQ) and [#zowe-release](https://openmainframeproject.slack.com/archives/G01M2C8QB3K) with a link to the release notes file in the `docs-staging` branch.

3. If any changes are needed, create a temporary branch off the `docs-staging` branch. Once you have made and committed your edits, merge your temporary branch to the `docs-staging` branch in GitHub.

Next: Confirm all release tasks for documentation are completed.

### **Part 7: Check the release checklist**

Summary: Make sure all the doc tasks for the vNext release have been completed.

**Procedure**

1. About two days before the GA date, review the [release checklist](#release-checklist) to ensure all tasks are complete.

2. To make updates, create a temporary branch off the `docs-staging` branch. Once you have made and committed your edits, merge your temporary branch to the `docs-staging` branch in GitHub.

Next: Update the TPSRs.

### **Part 8: Update the TPSRs**

Summary: When the TPSRs are ready, update the TPSR placeholder file.

**Procedure**

1. The day before GA, check with the CI/CD Squad to find out if the vNext TPSRs are ready.

    **Note**: While a TPSR file for the vNext release could be available earlier, it may not yet be finalized. It's better to upload the TPSR file closer to the GA date to give the CI/CD Squad time to update the TPSR file if needed.

2. When the TPSRs are ready, create and publish a new (temporary) branch based off the `docs-staging` branch.

3. Open your temporary branch in Visual Studio Code.

4. Go to the `/tpsr` directory and open the vNext markdown file you created in [Part 4](#part-4-prepare-new-release-files).

5. With a web browser, go to the location for release licenses:

    https://zowe.jfrog.io/zowe/libs-release-local/org/zowe/licenses/.

6. Navigate to the release folder and download the `zowe_licenses_full.zip` file.

7. Extract the file and open the `zowe_full_dependency_list` markdown file.

8. Copy the content from the `zowe_full_dependency_list` file and paste it into the placeholder TPSR file.

9. Create a local build to confirm everything works in your temporary branch.

    1. Run `npm install`.
    2. Run `npm start` to build the site locally and clear any errors.

10. Once you confirm that everything works in your build, create a pull request in GitHub to merge your temporary branch to the `docs-staging` branch.

Next: Publish the staged doc to the live site!

### **Part 9: Publish documentation for a new release**

Summary: Publish the documentation for the new release the day the release goes GA.

**Procedure**

1. The day before the GA date of the new release, create and publish a new (temporary) branch based off the `docs-staging` branch.

2. Create a local build to confirm the updated `docs-staging` branch has no errors.

    1. Run `npm install`.
    2. Run `npm start` to build the site locally and clear any errors.

3. Create a PR to merge the temporary branch into the `master` branch.

    In your PR, do the following:

    - Add the Zowe release engineer to the reviewer list. 
    - Add Zowe Doc Squad maintainers to the reviewer list.
    - Check the build status and send build issues to the doc squad.

4. Notify the release engineer that the PR has been created and needs review. It is the engineer who will merge the PR once the new release is published.

    **Important**: Remind the engineer to merge the PR by selecting the **Create a merge commit** option.
    The engineer should **NOT** commit with a **Squash and merge**, which can lead to merge conflicts for later releases.

Next: Check Zowe Docs for errors and announce the new release doc.
### **Part 10: Post-publication tasks**

Summary: Confirm that the Zowe Docs site works and announce the new doc to the Zowe community.

**Procedure**

1. After the vNext content is live, create and publish a PDF of the content for the current release version (v1.25 in our example).
    
    1. Follow the instructions in [Steps to manually generate PDF](pdf_generation_guide.md#steps-to-manually-generate-pdf-recommended).
    2. Create a new temporary branch to add the PDF to the `master` branch. Create and merge a PR in GitHub.

2. Check Zowe Docs to confirm the site works as expected. Confirm the following items:
    - The version dropdown menu includes all available versions
    - Release notes are current
    - The correct TPSRs are linked
    - The PDF for the current release can be downloaded and viewed
    - The Search functionality returns correct results

3. Announce the updated doc in the [#zowe-doc](https://openmainframeproject.slack.com/archives/CC961JYMQ) Slack channel.
### **Release checklist**

|Checkpoint | Due Date | Details
|--|--|--|
|New version doc setup               | vNext Code Freeze |See the [Preparing documentation for a new release](#preparing-documentation-for-a-new-release) on the `docs-staging` branch |  
|Relnotes: CHANGELOG update cutoff   | 3 days before GA | Doc squad to work with squads to complete review |
|Relnotes: Draft review              | 3 days before GA | First run of release notes. Squad leads review the draft. Post in [#zowe-release](https://openmainframeproject.slack.com/archives/G01M2C8QB3K) Slack channel. |
|Zowe CLI: Update web help and type doc | Before Doc Freeze | Completed by Zowe CLI Squad doc writer. See [Update web help and type doc](#zowe-cli-update-web-help-and-type-doc) for how-to.
|Update TPSRs                        | 1 day before GA | Work with CI/CD squad. See [Update the TPSRs](#part-8-update-the-tpsrs) for how-to.
|Doc Freeze, PR for publish ready    | 1 day before GA | All vNext content merged to `docs-staging`. Action: Inform CI/CD squad of the doc PR number. Add the release engineer as reviewer of the PR.
|Doc publish                         | GA day | Release engineer merges the doc PR.
|Doc validation                      | 1 hour within publish | Check that the doc site has been refreshed correctly. 
|Build and upload new release PDF file | 1 hour within publish | See [PDF generation guide](https://github.com/zowe/docs-site/blob/master/release-handbook/pdf_generation_guide.md#steps-to-manually-generate-pdf-recommended) for how-to. It's recommended that you run the manual build and then create a PR against the `master` branch to upload the PDF file. 
|Release promotion                   | GA day  | Announce release in Slack channels. TSC members will make announcements in LinkedIn, Twitter, etc.
|System demo                         |  | See the [OMP Calendar](https://lists.openmainframeproject.org/g/zowe-dev/calendar) for details.  
|~~Write release blog, upload release demo video~~                  |  | ~~Convert the system demo recording into a blog.~~ This is no longer done. Leaving this in case we can do this step again in the future.
|~~Add release demo video and blog link back in the release notes~~ | ~~Once the video and blog is published~~ | ~~Go to the release notes and add the links. For example, `Release demo: Check out the Zowe demo video for v1.24.0 to see a demo of what's new in this release. Release blog: Read this blog Zowe 1.24 Release Highlights written by Joe Winchester for a deeper dive of the major enhancements and changes for this release.`~~ This is no longer done. Leaving this in case we can do this step again in the future.

## Removing an archived version

Removing archived version is necessary once two new versions are released to reduce total deploy and build time. It is advisable to keep latest **8-9 versions only** in the `master` branch to avoid build failure.

- Remove the specific version from `/versions.json` file.
- Delete the specific complete version folder from `/versioned_docs` directory. Example: `versioned_docs/version-v1.17.x.`
- Delete the versioned sidebars JSON file from `/versioned_sidebars`. Example: `versioned_sidebars/version-v1.17.x-sidebars.json`.
- Delete the specific version's static files from `/static` directory. Example: `static/v1.17.x`.
- Add the specific version entry in `versionsArchived.json` file. Example: `"v1.17.x LTS": "https://zowe-archived-docs.netlify.app/v1.17.x/getting-started/overview"`.
- Navigate to the `/docusaurus.config.js` file and locate the `presets:` > `@docusaurus/preset-classic"` > `docs` > `versions`.
  Delete the definition of that version which is specified in the following format:

  ```
   "v1.17.x": {
     label: "v1.17.x LTS",
   },
  ```

## Zowe CLI: Update web help and type doc

Note: Instructions use Visual Studio Code and GitHub Desktop. Replace version numbers in examples with the correct version.

1. Create your own branch and, in Visual Studio Code, open the folder for the `docs-site` repository.
2. In the **Side Bar**, navigate to the `scripts` directory.
3. To work on the CLI web help, select the `updateWebHelp.sh` file.
4. Open a new Terminal.
5. Select **Git Bash** from the Terminal **+** dropdown menu.
6. In the Terminal, enter the command in **Line 2** of the **Editor** tab. Include everything after the colon:

    `bash scripts/updateWebHelp.sh <zoweVersion> [<outputDir>]`

7. Replace `<zoweVersion>` with the correct version in the following format:
    1.28.2
8. Replace `[<outputDir>]` with the correct directory:
    - For the next version: static/stable
    - For an older version: static/v1.28.x 
9. For the type doc, repeat Steps 3-8 using the `updateTypedoc.sh` file and command.
10. In GitHub Desktop, commit your updates to your branch.
11. Merge your branch to `docs-staging`.

