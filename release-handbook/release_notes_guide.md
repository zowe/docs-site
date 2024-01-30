# Zowe release notes guide

Learn how Zowe release notes are constructed, how to generate and submit release notes. 

## Release notes template

Zowe release notes follow a similar pattern for each release. The following template takes v2.3.0 as an example. 

```
# Version 2.3.0 (September 2022)

Welcome to the Zowe Version 2.3.0 release!

See [New features and enhancements](#new-features-and-enhancements) for a full list of changes to the functionality. See [Bug fixes](#bug-fixes) for a list of issues addressed in this release.

**Download v2.3.0 build**: Want to try new features as soon as possible? You can download the v2.3.0 build from [Zowe.org](https://www.zowe.org/download.html).

## New features and enhancements

Zowe Version 2.3.0 contains the enhancements that are described in the following topics.

:::info find out more
To watch a demo of new enhancements and updated features included in a Zowe minor release, look for the release demo recording in the [Zowe V2 System Demo playlist](https://www.youtube.com/playlist?list=PL8REpLGaY9QGjSTAqZaWxLG_g-jW1qGmo) on YouTube.

System demos are typically held the week after a minor release becomes available. Check the [Open Mainframe Project Calendar](https://lists.openmainframeproject.org/g/zowe-dev/calendar) for the latest schedule.
:::

### Zowe installation and packaging

### Zowe Application Framework

### Zowe API Mediation Layer

### Zowe CLI

#### Zowe CLI (Core)

#### Zowe CLI Imperative Framework

#### CICS Plug-in for Zowe CLI

#### DB2 Plug-in for Zowe CLI

#### MQ Plug-in for Zowe CLI

#### IMS Plug-in for Zowe CLI

### Zowe Explorer

#### Zowe Explorer (Core)

- See the [Zowe Explorer](https://github.com/zowe/vscode-extension-for-zowe/blob/main/packages/zowe-explorer/CHANGELOG.md) changelog for updates included in this release.

#### Zowe Explorer API

- See the [Zowe Explorer API](https://github.com/zowe/vscode-extension-for-zowe/blob/main/packages/zowe-explorer-api/CHANGELOG.md) changelog for updates included in this release.

#### Zowe Explorer FTP Extension

- See the [Zowe Explorer FTP Extension](https://github.com/zowe/vscode-extension-for-zowe/blob/main/packages/zowe-explorer-ftp-extension/CHANGELOG.md) changelog for updates included in this release.

#### Zowe Explorer ESLint Plug-in

- See the [Zowe Explorer ESLint Plug-in](https://github.com/zowe/vscode-extension-for-zowe/blob/main/packages/eslint-plugin-zowe-explorer/CHANGELOG.md) changelog for updates included in this release.

## Bug fixes

Zowe Version 2.3.0 contains the bug fixes that are described in the following topics.

### Zowe installation and packaging

### Zowe Application Framework

### Zowe API Mediation Layer

### Zowe CLI

#### Zowe CLI (Core)

#### Zowe CLI Imperative Framework

#### CICS Plug-in for Zowe CLI

#### DB2 Plug-in for Zowe CLI

#### MQ Plug-in for Zowe CLI

#### IMS Plug-in for Zowe CLI

### Zowe Explorer

#### Zowe Explorer (Core)

- See the [Zowe Explorer](https://github.com/zowe/vscode-extension-for-zowe/blob/main/packages/zowe-explorer/CHANGELOG.md) changelog for updates included in this release.

#### Zowe Explorer API

- See the [Zowe Explorer API](https://github.com/zowe/vscode-extension-for-zowe/blob/main/packages/zowe-explorer-api/CHANGELOG.md) changelog for updates included in this release.

####  Zowe Explorer FTP Extension

- See the [Zowe Explorer FTP Extension](https://github.com/zowe/vscode-extension-for-zowe/blob/main/packages/zowe-explorer-ftp-extension/CHANGELOG.md) changelog for updates included in this release.

#### Zowe Explorer ESLint Plug-in

- See the [Zowe Explorer ESLint Plug-in](https://github.com/zowe/vscode-extension-for-zowe/blob/main/packages/eslint-plugin-zowe-explorer/CHANGELOG.md) changelog for updates included in this release.

### Vulnerabilities fixed

Zowe discloses fixed vulnerabilities in a timely manner giving you sufficient time to plan your upgrades. Zowe does not disclose the vulnerabilities fixed in the latest release as we respect the need for at least 45 days to decide when and how you upgrade Zowe. When a new release is published, Zowe publishes the vulnerabilities fixed in the previous release. For more information about the Zowe security policy, see the [Security page](https://www.zowe.org/security.html) on the Zowe website.

The following security issues were fixed by the Zowe security group in version 2.2.

```

## Release notes process

- Before the release is published, run a tool or script to pull updates from different CHANGELOGs into a Markdown file. 
- Copy and move the content into the release notes document. 
- Review the content, check grammar and style, check formatting. 
- Send it to the community (squad leads) to review. 
- Publish the release notes. 

## How to update the release notes

Zowe release notes build on its components' CHANGELOGs. Each component or area maintains a CHANGELOGs in the GitHub repo. Zowe V1 and V2 tracks a separate set of CHANGELOGs. The following list shows all V2 release CHANGELOGs (keeps updating). 

For recommendations about CHANGELOGs, see [CHANGELOG recommendations](#changelog-recommendations)

- Install and packaging
  > Pull updates in the section that matches Zowe release number like 2.6.0.
  - https://github.com/zowe/zowe-install-packaging/blob/v2.x/rc/CHANGELOG.md    
    
- App Framework
  > Pull updates in the section that matches Zowe release number.
  - https://github.com/zowe/zlux-app-server/blob/v2.x/staging/CHANGELOG.md
  - https://github.com/zowe/zss/blob/v2.x/staging/CHANGELOG.md
  - https://github.com/zowe/zowe-common-c/blob/v2.x/staging/CHANGELOG.md
  - https://github.com/zowe/zlux-app-manager/blob/v2.x/staging/CHANGELOG.md
  - https://github.com/zowe/zlux-server-framework/blob/v2.x/staging/CHANGELOG.md
 
  > Based on change history timestamp, pull updates after last release.
  - https://github.com/zowe/zlux-editor/blob/v2.x/staging/CHANGELOG.md
  - https://github.com/zowe/tn3270-ng2/blob/v2.x/staging/CHANGELOG.md
  - https://github.com/zowe/vt-ng2/blob/v2.x/staging/CHANGELOG.md
  - https://github.com/zowe/sample-angular-app/blob/v2.x/rc/CHANGELOG.md
  - https://github.com/zowe/explorer-uss/blob/v2.x/master/CHANGELOG.md
  - https://github.com/zowe/explorer-mvs/blob/v2.x/master/CHANGELOG.md
  - https://github.com/zowe/explorer-jes/blob/v2.x/master/CHANGELOG.md

- APIML
  > Pull updates in the section that matches Zowe release number.
  - https://github.com/zowe/api-layer/blob/v2.x.x/CHANGELOG.md

- CLI 
  > Based on change history timestamp, pull updates after last release or identify CLI versions included in the release.
  - Core: https://github.com/zowe/zowe-cli/blob/master/packages/cli/CHANGELOG.md
  - Imperative CLI Framework: https://github.com/zowe/imperative/blob/master/CHANGELOG.md
  - CICS plug-in: https://github.com/zowe/zowe-cli-cics-plugin/blob/master/CHANGELOG.md
  - DB2 plug-in: https://github.com/zowe/zowe-cli-db2-plugin/blob/master/CHANGELOG.md
  - FTP Plug-in: https://github.com/zowe/zowe-cli-ftp-plugin/blob/master/CHANGELOG.md

- Zowe Explorer
  > Pull updates in the section that matches Zowe release number.
  - https://github.com/zowe/vscode-extension-for-zowe/blob/master/packages/zowe-explorer/CHANGELOG.md


The following list shows all V1 release CHANGELOGs.

- Install and packaging
  
  - https://github.com/zowe/zowe-install-packaging/blob/v1.x/staging/CHANGELOG.md

- App Framework

  - https://github.com/zowe/zlux-app-server/blob/v1.x/staging/CHANGELOG.md
  - https://github.com/zowe/zss/blob/v1.x/staging/CHANGELOG.md
  - https://github.com/zowe/zlux-editor/blob/v1.x/staging/CHANGELOG.md
  - https://github.com/zowe/zowe-common-c/blob/v1.x/staging/CHANGELOG.md
  - https://github.com/zowe/tn3270-ng2/blob/v1.x/staging/CHANGELOG.md
  - https://github.com/zowe/vt-ng2/blob/v1.x/staging/CHANGELOG.md
  - https://github.com/zowe/zlux-app-manager/blob/v1.x/staging/CHANGELOG.md
  - https://github.com/zowe/zlux-server-framework/blob/v1.x/staging/CHANGELOG.md
  - https://github.com/zowe/sample-angular-app/blob/v1.x/staging/CHANGELOG.md
  - https://github.com/zowe/explorer-uss/blob/v1.x/master/CHANGELOG.md
  - https://github.com/zowe/explorer-mvs/blob/v1.x/master/CHANGELOG.md
  - https://github.com/zowe/explorer-jes/blob/v1.x/master/CHANGELOG.md

- APIML

  - https://github.com/zowe/api-layer/blob/v1.x.x/CHANGELOG.md

- CLI 

  - Core: https://github.com/zowe/zowe-cli/blob/zowe-v1-lts/packages/cli/CHANGELOG.md
  - Imperative CLI Framework: https://github.com/zowe/imperative/blob/zowe-v1-lts/CHANGELOG.md
  - CICS plug-in: https://github.com/zowe/zowe-cli-cics-plugin/blob/zowe-v1-lts/CHANGELOG.md
  - DB2 plug-in: https://github.com/zowe/zowe-cli-db2-plugin/blob/zowe-v1-lts/CHANGELOG.md
  - FTP Plug-in: https://github.com/zowe/zowe-cli-ftp-plugin/blob/zowe-v1-lts/CHANGELOG.md
  - Secure Credential Store Plug-in: https://github.com/zowe/zowe-cli-scs-plugin/blob/master/CHANGELOG.md

- Zowe Explorer

  - https://github.com/zowe/vscode-extension-for-zowe/blob/v1-lts/packages/zowe-explorer/CHANGELOG.md

### Vulnerabilities fixed

As described, when a new release is published, Zowe publishes the vulnerabilities fixed in the **previous** release. 

Follow the steps below to fetch the list of fixes for the previous release. 

1. Go to the [zowe/security-reports](https://github.com/zowe/security-reports) repo. This is a private repo. Contact the security group (Nicholas Kocsis - Slack @Nick) to gain access.
2. Open [https://github.com/zowe/security-reports/blob/master/security-vulnerabilities.md](https://github.com/zowe/security-reports/blob/master/security-vulnerabilities.md). 
3. Locate the previous release section. Then, navigate to the **Fixed** subsection. 
4. Copy the list of fixes and paste them in the release notes.

### CHANGELOG recommendations

Project repos can set up CHANGELOGs to record user-facing changes to the repo. Changelog automation aims to improve the accuracy and consistency of Zowe Release Notes and reduces the overhead for dev/doc engineers.

If a CHANGELOG is set up, ensure that it’s properly formatted. For the doc squad to pick up the updates, the following rules MUST be met.

#### CHANGELOG and release notes formatting

- Include an issue or PR number for each entry. This helps users learn more about the change when needed. 

    Example: 
    ```
    Added the validate only mode of Zowe. This allows you to check whether all the component validation checks of the Zowe installation pass without starting any of the components. #1335 
    ```

- Indicate whether the change is a new feature/enhancement or a bug fix.  This helps users understand quickly what new enhancements are introduced and decide whether to upgrade.

    We recommend one of the following methods to organize content:
    1) For each release, create separate sections for “New features and enhancements” and “Bug fixes” in the CHANGELOG and add updates into the correct section. 

        Example:
        ```
        1.14.0 
        New features and enhancements
        - Added SSO token name and label to convert-env.sh for use with ZSS. #118 
    
        Bug fixes
        - Fixed app server configuration bug where min worker count was ignored when max worker count was not defined #187
        ```

   2) Use tags to label entries.

      Example:
      ``` 
      1.14.0 
      - Feature: Added SSO token name and label to convert-env.sh for use with ZSS. #118 
      - Bugfix: Fixed app server configuration bug where min worker count was ignored when max worker count was not defined #187
      ```

#### Writing style for release notes entries

1. Start the sentence with a verb in past tense.
   - If a new feature or enhancement, can use “Added...”, “Improved...”, “Enhanced...”;
   - If a bug fix, can use “Fixed...”
2. Write from the user’s perspective.
    - If a new feature or enhancement, document why this change matters to users (what this feature or enhancement allows the users to do now) . 

        Example:
        ```
        Added the validate only mode of Zowe. This allows you to check whether all the component validation checks of the Zowe installation pass without starting any of the components. #1335
        ```
   - If a bug fix, state clearly what issue was resolved. 

      Example:
      ```
      Fixed a bug where the cascading position of new windows were wrong when that application was maximized. #102
      ```

3. Use second person “you” instead of “users”.
