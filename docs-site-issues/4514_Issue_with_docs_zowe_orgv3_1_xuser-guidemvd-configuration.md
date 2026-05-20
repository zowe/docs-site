# Issue #4514: Issue with docs.zowe.org/v3.1.x/user-guide/mvd-configuration

**URL:** https://github.com/zowe/docs-site/issues/4514

**Created:** 2025-06-11T11:26:00Z

**Updated:** 2025-06-27T06:19:10Z

**Labels:** area: webui, area: Zowe App Framework

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
it says

_Reduced downtime during unexpected exceptions: The low-downtime characteristic, where only one request is interrupted compared to around 15 seconds of downtime, is compromised._

I do not know what this is saying....
what is l_ow-downtime characteristic_

_where only one request is interrupted._. . .  does this mean it is single user?

What is _around 15 seconds of downtime, is compromised_._  Zowe takes 30 minutes to start for me .... so what it is this 15 seconds.

________________________________________________________


_If the mediation layer is not used, ZSS directly at https://<zowe.externalDomain>:<components.zss.port>/._

bad grammer. does it mean

If the mediation layer is not used, **use**  ZSS directly at https://<zowe.externalDomain>:<components.zss.port>/.
______________________________________________________________


_When you install Zowe™, the App Framework is configured as an API Mediation Layer client by default. This is simpler to administer because the App framework servers are accessible externally through a single port: API ML Gateway port. It is more secure because you can implement stricter browser security policies for accessing cross-origin content._

Its says This is simpler.... what is simpler?   Perhaps it means   _This  API Mediation Layer is simpler_
I thought I had to use the APIML - clearly not.   What are the other options?

Im guessing that this is trying to say something like

You can configure Zowe 
- as an API Mediation Layer.   An application or browser uses the API Mediation Layer port, and the APIML can then use the other Zowe component, such as .... ( ZSS? or z/OSMF) directly
- so the application or browser uses the components: port directly, for example the ZSS port. If you want to use z/OSMF you will need to use the z/OSMF port.
- Both of the above

The APIML is simpler, and is more secure as you can use browser security policies, such as accessing cross-origin content._  See https://en.wikipedia.org/wiki/Cross-origin_resource_sharing



 


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

