# Issue #4413: Issue with docs.zowe.org/stable/appendix/zowe-glossary/

**URL:** https://github.com/zowe/docs-site/issues/4413

**Created:** 2025-05-09T07:10:55Z

**Updated:** 2025-06-26T15:17:11Z

**Labels:** area: cli, priority-low

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
I'm struggling with the teams concept.   I'm happy with the concept of a hierarchy of configurations - and think it is a good idea.
_this method saves team-specific profiles in the zowe.config.json configuration file and user-specific profiles in the zowe.config.user.json configuration file._

zowe.config.json and  zowe.config.user.json  are on my machine.  I own both copies.   My colleague has her own two files - which can be totally different from mine - even though we work in the same team.

If we had a shared disk between all members of the team, we could keep the team version on the common disk, similarly with the global file.
Both of these are on ZOWE_CLI_HOME  (https://docs.zowe.org/stable/user-guide/cli-using-initializing-user-configuration/)   so these cannot be shared.

It would be helpful if you were to have words like 

As a team administator put common service definitions in the zowe.config.json  or ....  zowe.config.json.global ( whatever it is).   Distribute these to the team.   They should be stored in the ZOWE_CLI_HOME directory.
If individuals need their own definitions, they should used... zowe.config.user.json for just their own overrides.   
The team administrator can update and distribute the zowe.config.json file.  User's should then review the entries in their zowe.config.user.json and remove redundant entries. 




## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

