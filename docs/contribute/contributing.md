# Contributing to Zowe Documentation

You are welcome to contribute to the Zowe&trade; documentation repository. Anyone can open an issue about documentation, or contribute a change with a pull request (PR) to the [zowe/docs-site GitHub repository](https://github.com/zowe/docs-site/). 

## Before You Get Started

Before contributing a documentation change to the repository, you should be familiar with:

* Git and GitHub: To learn about git and GitHub, refer to the [Github Guides](https://guides.github.com/).
* Slack: The Zowe Documentation team communicates using the Slack application. To learn about Slack, refer to the [Slack Help Center](https://slack.com/help). The Zowe team is part of the [Open Mainframe Project](https://openmainframeproject.slack.com) channel.
* Markdown Language: The Zowe documentation is written in Markdown language. To learn about Markdown, refer to  [The Markdown Guide](https://www.markdownguide.org/).

Contributions to Zowe documentation are reviewed before being committed to the repository. Commits needs to have Developer Certificate of Origin (DCO). Committing changes to the Zowe repository requires additional access rights. See https://github.com/zowe/community/blob/master/COMMITTERS.md. Also see Participating in Zowe Documentation for more details about roles and permissions.

## Getting started checklist

If you are ready to get started contributing to the Zowe Documentation repository:

* Verify that you are familiar with the concepts in [Before You Get Started<a name="start"></a>](#before-you-get-started).
* Familiarize yourself with the [Zowe documentation repository](#the-zowe-documentation-repository).
* Verify that you can open a [pull request and review changes](#sending-a-github-pull-request).
* [Open an issue for Zowe documentation](#opening-an-issue-for-zowe-documentation) if you find a problem.
* Read the [documentation style guide](#documentation-style-guide).

## The Zowe documentation repository

The Zowe documentation is managed in a [GitHub repository](https://github.com/zowe/docs-site).

* Review the site's overall organization and structure
* Review the help files related to your planned changes or addition

## Sending a GitHub Pull Request

You can provide suggested edits to any documentation page by using the **Edit this page** link on top of each page. After you make the changes, you submit updates in a pull request for the Zowe documentation team to review and merge.

Follow these steps:

1. Click **Edit this page** on the page that you want to update.
3. Make the changes to the file.
4. Scroll to the end of the page and enter a brief description about your change.
5. Optional: Enter an extended description.
6. Select **Propose file change**.
7. Select **Create pull request**.

## Opening an issue for Zowe documentation

You can request the documentation to be improved or clarified, report an error, or submit suggestions and ideas by opening an issue in GitHub for the Zowe documentation team to address. The team tracks the issues and works to address your feedback.

Follow these steps:

1. Click the **Open doc issue** link at the top of the page. 
1. Enter the details of the issue.
1. Click **Submit new issue**.

## Documentation style guide

This section gives writing style guidelines for the Zowe documentation.

### Headings and titles

#### Use sentence-style capitalization for headings

Capitalize only the initial letter of the first word in the text and other words that require capitalization, such as proper nouns. Examples of proper nouns include the names of specific people, places, companies, languages, protocols, and products.

Example: Verifying that your system meets the software requirements.

#### For tasks and procedures, use gerunds for headings

Example:

- Building an API response
- Setting the active build configuration

#### For conceptual and reference information, use noun phrases for headings

Example:

- Query language
- Platform and application integration

#### Use headline-style capitalization for only these items

Titles of books, CDs, videos, and stand-alone information units.

Example:

- Installation and User's Guide
- Quick Start Guides or discrete sets of product documentation

### Technical elements

#### Variables

Style:

- Italic when used outside of code examples,

    Example: _myHost_

- If wrap using angle brackets `<>` within code examples, italic font is not supported.

    Example:
    - put &lt;pax-file-name&gt;.pax

    - Where _pax-file-name_ is a variable that indicates the full name of the PAX file you download. For example, zoe-0.8.1.pax.

#### Message text and prompts to the user

Style: Put messages in quotation marks.

Example: "The file does not exist."

#### Code and code examples

Style: Monospace

Example: `java -version`

#### Command names, and names of macros, programs, and utilities that you can type as commands

Style: Monospace

Example: Use the `BROWSE` command.

#### Interface controls

Categories: check boxes, containers, fields, folders, icons, items inside list boxes, labels (such as **Note:**), links, list boxes, menu choices, menu names, multicolumn lists, property sheets, push buttons, radio buttons, spin buttons, and Tabs

Style: Bold

Example: From the **Language** menu, click the language that you want to use. The default selection is **English**.

#### Directory names

Style: Monospace

Example: Move the `install.exe` file into the `newuser` directory.

#### File names, file extensions, and script names

Style: Monospace

Example:

- Run the `install.exe` file.
- Extract all the data from the `.zip` file.

#### Search or query terms

Style: Monospace

Example: In the Search field, enter `Zowe`.

#### Citations that are not links

Categories: Chapter titles and section titles, entries within a blog, references to industry standards, and topic titles in IBM Knowledge Center

Style: Double quotation marks

Example:
- See the "Measuring the true performance of a cloud" entry in the blog.
- For installation information, see "Installing the product".

### Tone

#### Use simple present tense rather than future or past tense, as much as possible

Example:

:heavy_check_mark: The API returns a promise.

:x: The API will return a promise.

#### Use simple past tense if past tense is needed

Example:

:heavy_check_mark: The limit was exceeded.

:x: The limit has been exceeded.

#### Use active voice as much as possible

Example:

:heavy_check_mark: In the Limits window, specify the minimum and maximum values.

:x: The Limits window is used to specify the minimum and maximum values.

Exceptions: Passive voice is acceptable when any of these conditions are true:

- The system performs the action.
- It is more appropriate to focus on the receiver of the action.
- You want to avoid blaming the user for an error, such as in an error message.
- The information is clearer in passive voice.

    Example:

    :heavy_check_mark: The file was deleted.

    :x: You deleted the file.

#### Using second person such as "you" instead of first person such as "we" and "our"

In most cases, use second person ("you") to speak directly to the reader.

#### End sentences with prepositions selectively

Use a preposition at the end of a sentence to avoid an awkward or stilted construction.

Example:

:heavy_check_mark: Click the item that you want to search for.

:x: Click the item for which you want to search.

#### Avoid anthropomorphism

Focus technical information on users and their actions, not on a product and its actions.

Example:

:heavy_check_mark: User focus: On the Replicator page, you can synchronize your local database with replica databases.

:x: Product focus: The Replicator page lets you synchronize your local database with replica databases.

#### Avoid complex sentences that overuse punctuation such as commas and semicolons.

### Release notes

Release notes should be written in a consistent style that is easy to read and provides relevant information to users.

To help ensure these best practices are followed, see [CHANGELOG and release notes formatting](https://github.com/zowe/docs-site/blob/master/release-handbook/release_notes_guide.md#changelog-and-release-notes-formatting) and [Writing style for release notes entries](https://github.com/zowe/docs-site/blob/master/release-handbook/release_notes_guide.md#writing-style-for-release-notes-entries).

### Word usage and punctuation

#### Note headings such as Note, Important, and Tip should be formatted using the lower case and bold format

Examples:
- **Note:**
- **Important!**
- **Tip:**

#### Use of "following"

For whatever list or steps we are introducing, the word "following" should precede a noun.

Examples:
- Before a procedure, use "Follow these steps:"
- The `<component_name>` supports the following use cases:
- Before you install Zowe, review the following prerequisite installation tasks:

Avoid ending the sentence with "following".

Examples:

:heavy_check_mark: Complete the following tasks.

:x: Complete the following.

#### Use a consistent style for referring to version numbers

When talking about a specific version, capitalize the first letter of Version.

Examples:

:heavy_check_mark: Java Version 8.1 or Java V8.1

:x: Java version 8.1, Java 8.1, or Java v8.1


When just talking about version, use "version" in lower case.

Example: Use the latest version of Java.

#### Avoid "may"

Use "can" to indicate ability, or use "might" to indicate possibility.

Examples:

- Indicating ability:

    :heavy_check_mark: You can use the command line interface to update your application."

    :x: "You may use the command line interface to update your application."

- Indicating possibility:

    :heavy_check_mark: "You might need more advanced features when you are integrating with another application. "

    :x: "You may need more advanced features when you are integrating with another application."

#### Use "issue" when you want to say "run"/"enter" a command

Example: At a command prompt, issue the following command:

#### Use of slashes

Avoid spaces when using a slash in between words.

Examples:

- Indicating or (on/off), and or (document/file), per (millions of instructions/second):

    :heavy_check_mark: Save the document/file in your desktop folder.

    :x: Save the document / file in your desktop folder.

#### Punctuation in lists

Use punctuation (periods, commas) in bulleted and numbered lists when appropriate. Do not use conjunctions (and, or) to separate list items.

##### Use periods for list items when the items are complete sentences, or the introductory text is a sentence fragment and each item completes the sentence

|Examples:|
|:---|

:heavy_check_mark: You can obtain IBM SDK for Node.js - z/OS for free in one of the following ways:

- Order the SMP/E edition through your IBM representative if that is your standard way to order IBM software.
- Order the SMP/E edition through IBM Shopz with optional paid support available.
- Download PAX file format at ibm.com/products/sdk-nodejs-compiler-zos. IBM defect Support is not available for this format.

:x: Through customization, you can change attributes such as:

- Enabling or disabling components so you only run what you need
- Changing the network ports Zowe runs on to suit your environment
- Customizing the behavior of a component, such as turning on optional features or logging  
<br/>

##### Use periods for list items when the items are complete sentences, or the introductory text is a sentence fragment and each item completes the sentence

|Examples:|
|:---|

:heavy_check_mark: You can obtain IBM SDK for Node.js - z/OS for free in one of the following ways:

- Order the SMP/E edition through your IBM representative if that is your standard way to order IBM software.
- Order the SMP/E edition through IBM Shopz with optional paid support available.
- Download PAX file format at ibm.com/products/sdk-nodejs-compiler-zos. IBM defect Support is not available for this format.

:x: Through customization, you can change attributes such as:

- Enabling or disabling components so you only run what you need
- Changing the network ports Zowe runs on to suit your environment
- Customizing the behavior of a component, such as turning on optional features or logging

##### Do not use punctuation or conjunctions (and, or) in bullet lists when the list items are not complete sentences, when the bullet item has three or fewer words, or when the bullet items are UI labels, headings, strings, or similar

|Examples:|
|:---|

:heavy_check_mark: The z/OSMF configuration process occurs in three stages, and in the following order:

- Security setup
- Configuration
- Server initialization

:x: The Zowe runtime, which consists of a number of components including:

- Zowe Application Framework.
- Zowe API Mediation Layer.
- Z Secure Services (ZSS).

##### Do not use conjuctions (and, or) in bullet lists

|Examples:|
|:---|

:heavy_check_mark: Integrated development environments:
- VS Code 1.53.2+
- Eclipse Che
- Red Hat CodeReady Workspaces
- Theia 1.18+

:x: Before continuing with the installation, you should be familiar with the following topics:

- Zowe's hardware and software requirements, and
- The `zwe` utility used for installing, configuring, and managing Zowe, and
- The configuration file used for Zowe, `zowe.yaml`.

#### Punctuation in numbered lists

### Abbreviations

#### Do not use an abbreviation as a noun unless the sentence makes sense when you substitute the spelled-out form of the term

Examples:

:heavy_check_mark: The tutorials are available as PDF files.

:x: The tutorials are available as PDFs. [portable document formats]

#### Do not use abbreviations as verbs

Examples:

:heavy_check_mark: You can use the FTP command to send the files to the server.

:x: You can FTP the files to the server.

#### Do not use Latin abbreviations

Use their English equivalents instead. Latin abbreviations are sometimes misunderstood.

Latin  | English equivalent
---|---
e.g.  | for example
etc. | and so on. <br/> When you list a clear sequence of elements such as "1, 2, 3, and so on" and "Monday, Tuesday, Wednesday, and so on." Otherwise, rewrite the sentence to replace "etc." with something more descriptive such as "and other output."
i.e.  | that is

#### Spell out the full name and its abbreviation when the word appears for the first time. Use abbreviations in the texts that follow

Example: Mainframe Virtual Desktop (MVD)

### Structure and format

Add "More information" to link to useful resources or related topics at the end of topics where necessary.

### Word usage

The following table alphabetically lists the common used words and their usage guidelines.

Do  | Don't
---|---
application  | app
Capitalize "Server" when it's part of the product name |
file name | filename (unless it's a property written as one word)
Java  |  java
keyboard shortcut | hotkey
IBM z/OS Management Facility (z/OSMF) <br/> z/OSMF   | zosmf (unless used in syntax)
ID| id
PAX| pax
personal computer <br/> PC <br/> server| machine
later  | higher <br/> Do not use to describe versions of software or fix packs.
macOS| MacOS
Node.js  | node.js <br/> Nodejs
plug-in| plugin
REXX  | Rexx
UNIX System Services <br/> z/OS UNIX System Services  | USS
zLUX  | ZLUX <br/> zLux
