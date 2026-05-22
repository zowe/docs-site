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

## Validation Status
**Status:** Still Valid

**Date Validated:** 2025-01-17

**Validator:** Mistral Vibe

**Notes:** 
The documentation in `/home/balda/zowe/docs-site/docs/user-guide/cli-using-integrating-apiml.md` shows examples but lacks clarity on several points raised in the issue:

1. **Port clarification:** The example `https://myapilayerhost:port/ibmzosmf/api/v1` doesn't specify whether "port" is the z/OSMF port or the APIML port (e.g., 7554). This needs explicit clarification.

2. **--reject-unauthorized flag:** When logging in with a client certificate, the user needs to know when/where to specify `--reject-unauthorized false`. This is not clearly documented.

3. **--base-profile visibility:** The user wants the `--base-profile <profile_name>` option to be more visible in the command examples (e.g., shown immediately after `zowe auth login apiml` in bold).

4. **basePath explanation:** The documentation doesn't clearly explain:
   - What exactly is the base path? (The full URL path, just the path part, or something else?)
   - How to know what value to put in basePath
   - Whether "A profile with a base path" is showing what the profile becomes or is a separate example

5. **basePath vs port:** The documentation doesn't explain how replacing port with basePath tells the session which port to use.

6. **Default base profile:** The user asks what the default base profile is called. They mention having both "base" and "base_apiml".

The documentation needs significant clarification on these points.

