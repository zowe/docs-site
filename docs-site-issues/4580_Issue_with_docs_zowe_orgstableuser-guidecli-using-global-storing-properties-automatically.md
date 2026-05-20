# Issue #4580: Issue with docs.zowe.org/stable/user-guide/cli-using-global-storing-properties-automatically

**URL:** https://github.com/zowe/docs-site/issues/4580

**Created:** 2025-07-03T09:17:15Z

**Updated:** 2025-07-09T19:19:13Z

**Labels:** area: cli, priority-low

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says
The autoStore property in the zowe.config.json

I believe there are 3 files used for config
zowe.config.json within the current directory

zowe.config.user.json , the global user file in the ZOWE_CLI_HOME environment variable 

zowe.config.json the global file in the ZOWE_CLI_HOME environment variable 

Which zowe.config.json file is the doc talking about?

Please document how I specify it.

Is it within each profile - or in the defaults section? 

for example

   "defaults": {
        "zosmf": "zosmf",
        "tso": "tso",
        "ssh": "ssh",
        "base": "global_base"
    },
    "autoStore": true

There are 3 config files...  is it the usual rules of precedent... if not in the config file in the current directory, then look at the zowe.config.user.json  file.

If so adding

the first autoStore entry in the config heirarchy  is used.
 


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

