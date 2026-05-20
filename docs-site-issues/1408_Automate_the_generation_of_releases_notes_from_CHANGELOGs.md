# Issue #1408: Automate the generation of releases notes from CHANGELOGs

**URL:** https://github.com/zowe/docs-site/issues/1408

**Created:** 2020-09-10T15:23:40Z

**Updated:** 2025-03-14T15:09:41Z

**Labels:** type: enhancement, area: site-infrastructure, Size: L

---

## What's the expectation

Now we have a list of CHANGELOGs in different GitHub repos under Zowe. We want to pick up the changes applicable to the new release from different changelogs into a single Markdown file for download. This file can be used as input for the Zowe release notes, better to have exact format with release notes. Take v1.14 release notes for example: https://docs.zowe.org/stable/getting-started/summaryofchanges.html#new-features-and-enhancements

## What need to be done

To do this: 

- Need to identify the applicable changes based on timestamp of the CHANGELOG change history or the version number if we know which to pick for the new release. 
- Need to identify the tags in the CHANGELOG entries and format the pulled text into required sections in Markdown based on the tag. 
   - Entries labeled [Bugfix], or bugfix should go to the Bug fixes section. See a sample section in the release notes: https://docs.zowe.org/stable/getting-started/summaryofchanges.html#bug-fixes 
   - Entries labled [enhancement], [feature] should go to the New features and enhancement section in the release notes. See an example https://docs.zowe.org/stable/getting-started/summaryofchanges.html#new-features-and-enhancements. 
- Need to further classify pulled text into component specific sections. 

## Available CHANGELOGs

### APIML
https://github.com/zowe/api-layer/blob/master/CHANGELOG.md

>> **Version:** Consistent with Zowe release version. Check if the new release version title (for example, 1.15.0) exists, if yes, pull the content in the section.  
>> **Tag:** For entries labeled with `Feature`, move entries to **New features and enhancements**. For `Bugfix`, move entries to the **Bug fix** section. 

   - For example, v1.14 was published on Aug 13. When we pull v1.15 changes, need to capture the changes in the CHNAGELOG that starts from Aug 14. Some might contain changes while some might not have any updates in this release. 
   - For CHANGELOGs such as APIML one, can simply check if there is the new version number (e.g v1.15.0) there. CLI CHANGELOGs need more effort to handle. 

### Zowe CLI

>> **Version:** CLI specific version numbers so need to check the timestamp of changes. If changes made after the previous Zowe release date, pull the content. Notice that there might be multiple versions of Zowe CLI and their CHANGELOG content all need to be counted. 
>> **Tag:** For entries labeled with `Feature`, `Enhancement:`, move entries to **New features and enhancements**. For `Bugfix`, `BugFix`, move entries to the **Bug fix** section. 

**Core CLI Changelogs:**
- Zowe CLI :  https://github.com/zowe/zowe-cli/blob/master/CHANGELOG.md
- Imperative CLI Framework : https://github.com/zowe/imperative/blob/master/CHANGELOG.md
- Secure Credential Store Plug-in : https://github.com/zowe/zowe-cli-scs-plugin/blob/master/CHANGELOG.md

**CLI Plug-in Changelogs:**
- IBM CICS Plug-in : https://github.com/zowe/zowe-cli-cics-plugin/blob/master/CHANGELOG.md
- IBM DB2 Plug-in - v4.0.6 : https://github.com/zowe/zowe-cli-db2-plugin/blob/master/CHANGELOG.md
- IBM FTP Plug-in : https://github.com/zowe/zowe-cli-ftp-plugin/blob/master/CHANGELOG.md
- IBM IMS Plug-in : https://github.com/zowe/zowe-cli-ims-plugin/blob/master/CHANGELOG.md
- IBM MQ Plug-in : https://github.com/zowe/zowe-cli-mq-plugin/blob/master/CHANGELOG.md

### Zowe Explorer
https://github.com/zowe/vscode-extension-for-zowe/blob/master/packages/zowe-explorer/CHANGELOG.md

>> **Version:** Zowe Explorer specific version numbers so need to check the timestamp of changes or understand the reelase that's being packcaged into Zowe. If changes made after the previous Zowe release date, pull the content. 
>> **Tag:** For entries labeled with `Feature`, `Enhancement:`, move entries to **New features and enhancements**. For `Bugfix`, `BugFix`, move entries to the **Bug fix** section. If no labels, all move to **New features and enhancements**.

### Zowe JES/MVS/USS Explorers 
(Need to identify branches) take v1.15 for example: 
- https://github.com/zowe/explorer-jes/tree/v1.0.5
- https://github.com/zowe/explorer-mvs/tree/v1.0.6
- https://github.com/zowe/explorer-uss/tree/v1.0.5

### Zowe Application Framework (NOT BEING USED NOW, SO SKIP)
- zlux-app-server https://github.com/zowe/zlux-app-server/blob/master/CHANGELOG.md
- zowe common c https://github.com/zowe/zowe-common-c/blob/master/CHANGELOG.md
- zss https://github.com/zowe/zss/blob/master/CHANGELOG.md
- tn3270 ng2 https://github.com/zowe/tn3270-ng2/blob/master/CHANGELOG.md
- vt ng2 https://github.com/zowe/vt-ng2/blob/master/CHANGELOG.md
- zlux editor https://github.com/zowe/zlux-editor/blob/master/CHANGELOG.md
- zlux app manager https://github.com/zowe/zlux-app-manager/blob/staging/CHANGELOG.md
- zlux server framework https://github.com/zowe/zlux-server-framework/blob/master/CHANGELOG.md

### Zowe installation
https://github.com/zowe/zowe-install-packaging/blob/staging/CHANGELOG.md

>> **Version:** Consistent with Zowe release version. Pull the content in the new release section. 
>> **Tag:** For entries labeled with `Feature`, `Enhancement:`, move entries to **New features and enhancements**. For `Bugfix`, `BugFix`, move entries to the **Bug fix** section. If no labels, all move to **New features and enhancements**.

