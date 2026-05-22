# Issue #4405: Issue with docs.zowe.org/stable/user-guide/cli-configuringcli-ev/

**URL:** https://github.com/zowe/docs-site/issues/4405

**Created:** 2025-05-08T07:19:30Z

**Updated:** 2025-06-18T19:17:27Z

**Labels:** area: cli, priority-low

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Setting the log level to TRACE or ALL might result in sensitive data being logged. For example, command line arguments are logged when TRACE is set.

ALL is not listed in the trace options.
______________________

Please explain what ZOWE_IMPERATIVE_LOG_LEVEL is.
______________________________________


I used
export ZOWE_APP_LOG_LEVEL="TRACE"
zowe zos-files list data-set "COLIN.TRACE*" --host 10.1.1.2 --port 10443


but got no trace output... 
am I missing something?



## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

## Validation Status
**Status:** Partially Valid

**Date Validated:** 2025-01-17

**Validator:** Mistral Vibe

**Notes:** 
The documentation in `/home/balda/zowe/docs-site/docs/user-guide/cli-configuringcli-ev.md` has been improved:
- ✓ Warning about TRACE/ALL logging sensitive data is now present
- ✓ ZOWE_IMPERATIVE_LOG_LEVEL is now explained in the table
- ⚠ **Still missing:** The log level table lists `OFF`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL` but does NOT include `ALL` which the user expects to see

Additionally, the user reports that setting `ZOWE_APP_LOG_LEVEL="TRACE"` and running a command produced no trace output, suggesting there may be a usage issue or missing configuration step that should be documented.

The `ALL` log level option should be added to the documentation for completeness.

