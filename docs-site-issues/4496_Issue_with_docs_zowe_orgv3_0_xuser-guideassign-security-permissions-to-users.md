# Issue #4496: Issue with docs.zowe.org/v3.0.x/user-guide/assign-security-permissions-to-users/

**URL:** https://github.com/zowe/docs-site/issues/4496

**Created:** 2025-05-25T09:48:19Z

**Updated:** 2025-05-26T12:24:31Z

**Labels:** area: install and config, area: zwe

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says

_Assign users (ZWESVUSR and ZWESIUSR) and the ZWEADMIN security group permissions required to perform specific tasks._

I think this should be saying 
Assign the started task userids  (ZWESVUSR and ZWESIUSR) and the ZWEADMIN security group permissions required to perform specific tasks._

What permissions do I need to specify?

Should this sentence be ...

This section describes the permissions required to perform specific tasks for the started task userids  (ZWESVUSR and ZWESIUSR) and the ZWEADMIN security group.

But later it says

Each TSO user ID that logs on to Zowe and uses Zowe services that use z/OSMF requires permission to access these z/OSMF services. I

so I am a little confused as to what this section does.

Perhaps two pages would be better ( and clearer)
started task userids  (ZWESVUSR and ZWESIUSR) and the ZWEADMIN security group permissions
Zowe end user userids permissions

________________________________________

It is not best practice to giver userids access.  You should give groups access.   For example with groups, when someone joins or leaves the department You just remove or add the userid to the groups.

If you give individual userid access to a resource , it is a lot of work, to remove (add) the userid to all the resouces.

The list of those user IDs will typically be the operators, administrators, developers, or anyone else in the z/OS environment who is logging in to Zowe.

Perhaps the following would be better.
For the groups of users, such as operators, administrators, developers, they will need access to resources.








## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

