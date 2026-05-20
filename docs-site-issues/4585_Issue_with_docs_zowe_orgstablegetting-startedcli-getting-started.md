# Issue #4585: Issue with docs.zowe.org/stable/getting-started/cli-getting-started/

**URL:** https://github.com/zowe/docs-site/issues/4585

**Created:** 2025-07-04T16:05:19Z

**Updated:** 2025-07-04T16:06:33Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
You need to say or point to how to uninstall zowe.    Google says is should be  npm uninstall -g @zowe/cli@zowe-v3-lts

but this doesnt work

npm list -g --depth=0
 gives

/usr/lib
├── @zowe/cli@8.23.1
├── corepack@0.32.0
└── npm@11.3.0


sudo npm uninstall -g @zowe/cli
  seems to work


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

