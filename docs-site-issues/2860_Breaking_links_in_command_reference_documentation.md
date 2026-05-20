# Issue #2860: Breaking links in command reference documentation

**URL:** https://github.com/zowe/docs-site/issues/2860

**Created:** 2023-05-03T14:41:39Z

**Updated:** 2025-10-28T05:27:15Z

**Labels:** area: docs, release: V3, Size: L

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
Links in the command reference documentation will become broken if a user loads the webpage using a URL that ends with a forward slash (which will be appended to the end of the URL if the user refreshes the page, uses the "back" button in their browser, or navigates to the page from a search engine).

This applies to most, if not all, of the command reference pages in Zowe Docs, e.g.:

- https://docs.zowe.org/stable/appendix/zwe_server_command_reference/zwe/zwe-install/:
  - Clicking on install at the top of the page navigates to https://docs.zowe.org/stable/appendix/zwe_server_command_reference/zwe/zwe-install/zwe-install, which does not exist.  
  - Clicking on zwe navigates to https://docs.zowe.org/stable/appendix/zwe_server_command_reference/zwe/zwe-install/zwe (instead of https://docs.zowe.org/stable/appendix/zwe_server_command_reference/zwe/zwe)
- https://docs.zowe.org/stable/appendix/zowe-chat-command-reference/zos/command/command/


## Pages to Update
Command reference documentation

## Screenshots
Example at https://docs.zowe.org/stable/appendix/zwe_server_command_reference/zwe/zwe-install/. Clicking "zwe" or "install" will navigate to a page that does not exist.
![image](https://user-images.githubusercontent.com/122040687/235938568-0bc73534-30ea-4a69-ab17-643411a28c53.png)

## Expected behavior


## Additional context
The only difference that I noticed with these links relative to other links in Zowe Docs is that other links (that work regardless of a slash at the end of the url) point to URLs ending with ".md". Links for the command reference docs typically do not end in ".md".

