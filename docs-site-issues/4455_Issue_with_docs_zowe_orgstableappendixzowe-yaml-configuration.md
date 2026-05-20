# Issue #4455: Issue with docs.zowe.org/stable/appendix/zowe-yaml-configuration

**URL:** https://github.com/zowe/docs-site/issues/4455

**Created:** 2025-05-15T07:45:58Z

**Updated:** 2025-05-21T15:05:16Z

**Labels:** certificates

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->

I'm not sure where the following information should go.

You need to connect the CA used by z/OSMF to the Zowe keyring.  Without this services will fail to connect to  z/OSMF for internal processing.

I also got into problems with 
 ((o.z.a.z.s.s.z.AbstractZosmfService)) 
 ResourceAccessException accessing 
 https://127.0.0.1:10443/zosmf/info 
                                                                                         
 org.springframework.web.client.ResourceAccessException: I/O 
 error on GET request for 
 "https://127.0.0.1:10443/zosmf/info": Certificate for 
 <127.0.0.1> doesn't match any of the subject alternative 
 names: [] 
           

So we need some words about the z/OSMF certificate and how to set this up ( you may have to change it!)  Can we disable "verifyCertificates:strict" for the zaas component.??                                                                              

## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

