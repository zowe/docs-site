# Issue #4412: Issue with docs.zowe.org/stable/user-guide/cli-using-integrating-apiml/

**URL:** https://github.com/zowe/docs-site/issues/4412

**Created:** 2025-05-09T06:53:57Z

**Updated:** 2025-06-25T18:36:27Z

**Labels:** area: cli, priority-low

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

It says

https://myapilayerhost:port/ibmzosmf/api/v1


which port .. the zosmf port or the apiml port?
_______________________________________


With  Logging in with a client certificate

because I cannot specify a cacert, I need to specify --reject-unauthorized false ...
Please document when/where I specify this

_______________________________________--

Logging in with a client certificate:  with a --base profile ..

it would be easier to see if the --base-profile <profile_name> was immediately after the zowe auth login apiml  

so I would not have to scroll to see it... so it would be
**zowe auth login apiml --base-profile <profile_name> --host <APIML Host> --port <APIML Port>** --cert-file <PEM Public Certificate Path> --cert-key-file <PEM Private Certificate Path> 

where the bold is see - and the rest of the text off to the right

____________________________-


re basepath

https://myapilayerhost:port/ibmzosmf/api/v1

which port is this z/osmf or apiml ( 7554)

what exacly is the base path?
https://myapilayerhost:port/ibmzosmf/api/v1,   https://myapilayerhost:port  or ibmzosmf/api/v1

_________________________________________

under 
Logging in with username and password
I replace port with A profile with  "basePath": "/ibmzosmf/api/v1"


I do not have to do this when logging on with client  - or do I ?

______________________________________________


Overall I found this page configing. and have not yet managed to get this to work.

I seem to be in a mess - but do not know how to reset and start again.

___________________________________________________

multiple base profiles in the same configuration file, including a default base profile. 

what is the default base profile called?  Ive got base and base_aplim


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

