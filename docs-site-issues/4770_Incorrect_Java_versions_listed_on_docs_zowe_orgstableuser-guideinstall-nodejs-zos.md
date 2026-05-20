# Issue #4770: Incorrect Java versions listed on docs.zowe.org/stable/user-guide/install-nodejs-zos

**URL:** https://github.com/zowe/docs-site/issues/4770

**Created:** 2025-11-03T13:13:13Z

**Updated:** 2025-11-03T13:23:54Z

**Labels:** type: bug, area: apiml, area: install and config, release: V2

---

<img width="885" height="259" alt="Image" src="https://github.com/user-attachments/assets/1f4fd51d-b1fd-4426-b861-0b433c38c49e" />
The page https://docs.zowe.org/stable/user-guide/install-nodejs-zos currently reports that zowe v2 only works with Java 11, and zowe v3 works on 17-21.

v3 is correct, but v2 is not.

In v2, the only fully tested, working version of Java is v8.
There's been discussion in the TSC recently on how to state the support of things that are tested by companies, but not by the open source tests & infrastructure. In zowe v2, there's no successful tests of any java other than v8, so v11, v17, and v21 test coverage is currently only known to Broadcom and i[n the future we may need to represent that in tables like have been proposed here ](https://github.com/zowe/docs-site/blob/71488ad225db8fdeea1ab2089587ae9fc5982237/docs/user-guide/systemrequirements-zos.md)

There are tests for v11 in the public testbed, [but they fail when PKCS12 keystores are requested](https://github.com/zowe/zowe-install-packaging/actions/runs/18778668933/job/53579142965), so java 11 would need an asterisk that states something like  "zwe setup cannot create pkcs12 keystores using java11+" and potentially ["when using java11+, safkeyring references must have only 2 slashes, not 4"](https://docs.zowe.org/stable/whats-new/zowe-v3-migration#keyrings)... it would also be good to just [fix the code](https://github.com/zowe/zowe-install-packaging/issues/4564)

I also assume that if Java 21 for v2 is confirmed to work at runtime for APIML, then Java 17 would too, but it's not found in docs so I can't be sure.


Additionally, I'm not sure what we mean by "OpenJDK" as an alternative to IBM's for z/OS.
OpenJDK is common outside of z/OS, but I've never heard of OpenJDK for z/OS, I assume it doesn't exist but if it does I'd love to know.
