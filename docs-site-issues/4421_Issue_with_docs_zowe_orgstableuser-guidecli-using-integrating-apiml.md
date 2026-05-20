# Issue #4421: Issue with docs.zowe.org/stable/user-guide/cli-using-integrating-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4421

**Created:** 2025-05-10T06:55:57Z

**Updated:** 2026-04-16T18:54:47Z

**Labels:** area: cli, priority-medium

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

Logging in with a client certificate:
zowe auth login apiml --host <APIML Host> --port <APIML Port> --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Certificate Path> --base-profile <profile_name>

I used the base-profile, I do not see why I need I need to specify _--host <APIML Host> --port <APIML Port> --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Certificate Path>_  all over again.  I was expecting to do 

**zowe zos-files list data-set "COLIN.C.*" --base-profile global_base  --reject-unauthorized false** 
and have it remember  the host,port and certificate.

Please add more explaination.. on what this section is telling me.  Also please explain what I need to do to get my
**zowe zos-files list data-set "COLIN.C.*" --base-profile global_base  --reject-unauthorized false** 

to work.






## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

