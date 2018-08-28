# How to contribute

**First off, thanks for taking the time to contribute!**

The following is a set of guidelines for contributing to Zowe documentation, which are hosted in the [Zowe / docs-site][b5d824b5] on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.


  [b5d824b5]: https://github.com/zowe/docs-site "https://github.com/zowe/docs-site"


  The Zowe documentation is written in Markdown markup language. Not familiar with Markdown? [**Learn the basic syntax**][84fff357].

  You can file issues, edit content, and review changes from others, all from the Github website. You can also use Github’s embedded history and search tools.

  Not all tasks can be done in the Github UI, but these are discussed in the intermediate and advanced docs contribution guides.
  Participating in SIG Docs

  [84fff357]: https://www.markdownguide.org/basic-syntax "https://www.markdownguide.org/basic-syntax"


## Before you get started

xxx

## Documentation Style Guide

This page gives writing style guidelines for the Zowe documentation. These are guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

For additional information on creating new content for the Zowe docs, follow the instructions on using page templates (tbd) and [creating a documentation pull request][8c024bb7].

  [8c024bb7]: https://zowe.github.io/docs-site/user-guide/aboutthisdoc.html#sending-a-github-pull-request "https://zowe.github.io/docs-site/user-guide/aboutthisdoc.html#sending-a-github-pull-request"


## Documentation formatting standards
### Headings and titles

#### Use sentence-style capitalization for headings

Capitalize only the initial letter of the first word in the text and other words that require capitalization, such as proper nouns. Examples of proper nouns include the names of specific people, places, companies, languages, protocols, and products.

Example: Verifying that your system meets the software requirements.

#### For tasks and procedures, use gerunds for headings.
Example:

- Building an API response
- Setting the active build configuration

#### For conceptual and reference information, use noun phrases for headings.
Example:

- Query language
- Platform and application integration

#### Use headline-style capitalization for only these items:

Titles of books, CDs,  videos, and stand-alone information units.

Example:

- Installation and User's Guide
- Quick Start Guides or discrete sets of product documentation

#### Make headings brief, descriptive, grammatically parallel, and, if possible, task oriented.

#### If the subject is a functional overview, begin a heading with words such as Introduction or Overview rather than contriving a pseudo-task-oriented heading that begins with Understanding, Using, Introducing, or Learning.

### Technical elements

#### Variables

Style:
- Italic when used outside of code examples,

    Example: myHost

- Wrap using angle brackets <> within code examples here italic font is not supported.

    Example:   

```
    put <pax-file-name>.pax

    Where _pax-file-name_ is a variable that indicates the full name of the PAX file you download. For example, zoe-0.8.1.pax.
```
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

Example: In the Search field, enter `Brightside`.

#### Citations that are not links

Categories: Chapter titles and section titles, entries within a blog, references to industry standards, and topic titles in IBM Knowledge Center

Style: Double quotation marks

Example:
- See the "Measuring the true performance of a cloud" entry in the Thoughts on Cloud blog.
- See "XML Encryption Syntax and Processing" on the W3C website.
- For installation information, see "Installing the product" in IBM Knowledge Center.

### Tone


#### Use simple present tense rather than future or past tense, as much as possible.

Example:
:heavy_check_mark: The API returns a promise.

:x: The API will return a promise.

#### Use simple past tense if past tense is needed.

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

#### Using second person such as "you" instead of first person such as "we" and "our".

In most cases, use second person ("you") to speak directly to the reader.

#### End sentences with prepositions selectively

Use a preposition at the end of a sentence to avoid an awkward or stilted construction.

Example:

:heavy_check_mark: Click the item that you want to search for.

:x: Click the item for which you want to search.
#### Avoid using "Please", "thank you"

In technical information, avoid terms of politeness such as "please" and "thank you".
"Please" is allowed in UI only when the user is being inconvenienced.

Example: Indexing might take a few minutes. Please wait.


#### Avoid anthropomorphism.

Focus technical information on users and their actions, not on a product and its actions.

Example:

:heavy_check_mark: User focus: On the Replicator page, you can synchronize your local database with replica databases.

:x: Product focus: The Replicator page lets you synchronize your local database with replica databases.
#### Avoid complex sentences that overuse punctuation such as commas and semicolons.

### Word usage

#### Note headings such as Note, Important, and Tip should be formatted using the lower case and bold format.

Example:
- Note:
- Important!
- Tip:

#### Use of "following"

For whatever list or steps we are introducing, the word "following" should precede a noun.

Example:
- Before a procedure, use "Follow these steps:"
- The <component_name> supports the following use cases:
- Before you intall Zowe, review the following prerequisite installation tasks:

Avoid ending the sentence with "following".

Example:

:x: complete the following.

#### Use a consistent style for referring to version numbers.

When talking about a specific version, capitalize the first letter of Version.

Example:

:heavy_check_mark: Java Version 8.1 or Java V8.1

:x: Java version 8.1, Java 8.1, or Java v8.1


When just talking about version, use "version" in lower case.

Example: Use the latest version of Java.

#### Avoid "may"

Use "can" to indicate ability, or use "might" to indicate possibility.

Example:

- Indicating ability:

    :heavy_check_mark: You can use the command line interface to update your application."

    :x: "You may use the command line interface to update your application."

- Indicating possibility:

    :heavy_check_mark: "You might need more advanced features when you are integrating with another application. "

    :x:  "You may need more advanced features when you are integrating with another application."

#### Use "issue" when you want to say "run/enter" a command.

Example: At a command prompt, type the following command:

### Graphics
- Use graphics sparingly.

    Use graphics only when text cannot adequately convey information or when the graphic enhances the meaning of the text.

- When the graphic contains translatable text, ensure you include the source file for the graphic to the doc repository for future translation considerations.

### Abbreviations

#### Do not use an abbreviation as a noun unless the sentence makes sense when you substitute the spelled-out form of the term.

Example:

✘ The tutorials are available as PDFs. [portable document formats]

✔ The tutorials are available as PDF files.

#### Do not use abbreviations as verbs.

Example:

✘ You can FTP the files to the server.

✔ can use the FTP command to send the files to the server.

#### Do not use Latin abbreviations.
Use their English equivalents instead. Latin abbreviations are sometimes misunderstood.

Latin  | English equivalent
--|--
e.g.  | for example
  etc. | and so on. <br> When you list a clear sequence of elements such as "1, 2, 3, and so on" and "Monday, Tuesday, Wednesday, and so on." Otherwise, rewrite the sentence to replace "etc." with something more descriptive such as "and other output."
i.e.  | that is

#### Spell out the full name and its abbreviation when the word appears for the first time. Use abbreviations in the texts that follow.

Example: Mainframe Virtual Desktop (MVD)

### Structure and format
Add "More information" to link to useful resources or related topics at the end of topics where necessary.

## Word usage

Do  | Don't
--|--
  ✔ data set| ✘ dataset  
✔ Java  | ✘ java
  ✔ PAX| ✘ pax  
  ✔ personal computer <br> ✔ PC <br> ✔ server| ✘ machine
✔ zLUX  | ✘ ZLUX <br> ✘ zLux
✔ z/OSMF  |✘ zosmf (unless used in syntax)  
✔ REXX  | ✘ Rexx
✔ Node.js  | ✘ node.js <br> ✘ Nodejs
✔ application  | ✘ app
  ✔ plug-in| ✘ plugin
✔ Capitalize the word "Server"  | Capitalize Server when it's part of the product name
✔UNIX System Services <br> ✔ z/OS UNIX System Services  | ✘USS  
 ✔ IBM z/OS Managemnt Facility (z/OSMF) |
✔ later  | ✘ higher <br> Do not use to describe versions of software or fix packs.
✔ API Mediation Layer|
✔ Zowe CLI|
✔ macOS|✘ MacOS
✔ ID|✘ id
