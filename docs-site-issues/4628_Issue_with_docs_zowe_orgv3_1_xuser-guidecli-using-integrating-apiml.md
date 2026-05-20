# Issue #4628: Issue with docs.zowe.org/v3.1.x/user-guide/cli-using-integrating-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4628

**Created:** 2025-07-27T13:44:20Z

**Updated:** 2025-07-27T13:44:20Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
It says
_Base profiles contain mainframe connection information that is used by the service profiles in your configuration. There can be multiple base profiles in the same configuration file, including a default base profile._

I have not found any examples of using multiple  base profiles.

I'm guessing a base profile has 

 "type": "base",


but I cannot see how to reference a second base outside of the defaults : base.
______________________


It says

_In the preceding configuration, the base profile my_one_base_profile (Lines 10-16) includes connection information to be used by the two z/OSMF service profiles, zosmf_thru_apiml (Lines 17-23) and zosmf_direct (Lines 24-33). Use zosmf_thru_apiml to connect to z/OSMF with API ML and zosmf_direct to connect to z/OSMF directly._

I cant see why the base is used for zosmf_thru_apiml and zosmf_direct.
Why isnt it used for  "tso": as well?

________________________________

I have not been able to find the syntax of the 

_zowe zos-files list data-set COLIN.T*  --base-profile my_one_base_profile_

command where I specify the profile  zosmf_thru_apiml in addition to the base profile.

_________________________________________________


If I want to connect to a service which is not zosmf ( eg one I've created)  what do I specify in the profile?

The schema says
_"properties": {
                        "type": {
                            "description": "Profile type",
                            "type": "string",
                            "enum": [
                                "zosmf",
                                "tso",
                                "ssh",
                                "base"
                            ]
                        },_


and it is none of those!

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

