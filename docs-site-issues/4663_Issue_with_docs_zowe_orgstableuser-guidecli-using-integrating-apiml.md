# Issue #4663: Issue with docs.zowe.org/stable/user-guide/cli-using-integrating-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4663

**Created:** 2025-08-13T15:38:55Z

**Updated:** 2025-08-13T15:38:55Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

I do not understand 

_Note the complete path for a z/OSMF instance registered to API ML.

For example:

https://myapilayerhost:port/ibmzosmf/api/v1

The format of base paths can vary based on how API ML is configured at your site.

Using the example in Step 1, access the API ML instance by creating or updating a [service profile](https://docs.zowe.org/stable/user-guide/cli-using-using-team-profiles#zowe-cli-profile-types), or issuing a command, with the base path value of ibmzosmf/api/v1. Your service profile uses the token and credentials stored in your default base profile._
__
I thought to use APIML you must have a base profile.   This seems to be contradicted by  creating or updating a [service profile].
Unless there is an assumption that the service profile has a base_path in it.....  I have a profile with no base_path and it seems to work for some stuff.

_________________

where it says  _base path value of ibmzosmf/api/v1._
is this the value as in

mq2": {
                "type": "mq",
                "properties": {
                    "basePath": "mq2/api/v1"

or is it the _--base-path | --bp (string) The base path for your API mediation layer instance. Specify this option to prepend the base path to all z/OSMF resources when making REST requests_
 
in the zowe cli  options?   If it is this then it should say  with the zowe cli command option  --base-path  value of ibmzosmf/api/v1

____________________________


_Your service profile uses the token and credentials stored in your default base profile._

I thought you could control which base profile it uses.

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

