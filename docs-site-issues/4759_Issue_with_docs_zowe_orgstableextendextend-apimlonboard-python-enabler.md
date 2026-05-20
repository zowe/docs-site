# Issue #4759: Issue with docs.zowe.org/stable/extend/extend-apiml/onboard-python-enabler/

**URL:** https://github.com/zowe/docs-site/issues/4759

**Created:** 2025-10-22T19:08:39Z

**Updated:** 2025-10-22T19:08:39Z

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
My primary issue isn't necessarily an issue with the doc itself, but the python package listed as a dependency within it; [zowe-apiml-onboarding-enabler-python](zowe-apiml-onboarding-enabler-python). When I try to register my API service following the [instructions found within the doc](https://docs.zowe.org/stable/extend/extend-apiml/onboard-python-enabler#registering-your-service-with-api-ml)and the python [pypi instructions](https://pypi.org/project/zowe-apiml-onboarding-enabler-python/), I get the following error;

` ERROR:zowe_apiml_onboarding_enabler_python.registration:Error during registration: Cannot run the event loop while another loop is running
`
My other issue _is_ specifically with the doc. In the [Configuring your service](https://docs.zowe.org/stable/extend/extend-apiml/onboard-python-enabler#configuring-your-service) section, I think it would be a lot more helpful if more instruction/details were provided here. For example, I'm not sure which ipAddress/ipAddr to put the remote host that runs the existing API service, and my local host where I'm testing a new service. I'm also not sure on how to configure the ports, or the authentication. Some examples or tips would be very helpful


## Pages to Update
<!--https://docs.zowe.org/...-->
https://docs.zowe.org/stable/extend/extend-apiml/onboard-python-enabler

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

