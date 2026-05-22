# Issue #4414: Issue with docs.zowe.org/stable/user-guide/cli-using-initializing-user-configuration/

**URL:** https://github.com/zowe/docs-site/issues/4414

**Created:** 2025-05-09T07:54:46Z

**Updated:** 2025-06-25T18:55:35Z

**Labels:** area: cli, priority-low

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

The help command  zowe config init -h 

 gives

DESCRIPTION
 -----------

   Initialize config files. Defaults to initializing "zowe.config.json" in the
   current working directory unless otherwise specified.

   Use "--user-config" to init "zowe.config.user.json". Use "--global-config" to
   i**nitialize the configuration files in your home "~/.zowe" directory.**

   Use "--no-prompt" to skip prompting for values in a CI environment.


The doc says

The configuration file **zowe.config.user.json is created in the ZOWE_CLI_HOME directory.**

Please sort this out.

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

## Validation Status
**Status:** Still Valid

**Date Validated:** 2025-01-17

**Validator:** Mistral Vibe

**Notes:** 
There is a discrepancy between the CLI help text and the documentation:

- **CLI help (`zowe config init -h`)**: States that `--user-config` initializes "the configuration files in your home ~/.zowe directory" (i.e., ZOWE_CLI_HOME)
- **Documentation** in `/home/balda/zowe/docs-site/docs/user-guide/cli-using-initializing-user-configuration.md`: States that "The configuration file **zowe.config.user.json is created in the ZOWE_CLI_HOME directory.**"

However, looking at the actual documentation content, it says:
- Line 33: "The configuration file `zowe.config.user.json` is created in the `ZOWE_CLI_HOME` directory."
- But earlier it also mentions creating configs in "the current working directory unless otherwise specified"

The issue is that the documentation needs to be consistent and clear about WHERE each type of config file is created based on the flags used (`--global-config`, `--user-config`, or neither). The help text and documentation should align.

