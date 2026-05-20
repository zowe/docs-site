# Issue #4659: Issue with docs.zowe.org/stable/extend/extend-apiml/onboard-static-definition

**URL:** https://github.com/zowe/docs-site/issues/4659

**Created:** 2025-08-12T12:47:24Z

**Updated:** 2025-09-03T12:09:08Z

**Labels:** area: apiml

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Description
<!-- A clear and concise description of what the error is.-->
I'm trying to define a resource, and I'm getting back

 services: 
   - serviceId: mq 
     title: Zowe Colinsmq        (ZSS) 
     description: 'Colins MQ' 
     catalogUiTileId: colinmq.aa 


additionalServiceMetadata": {},
    "errors": [
        {
            "convertedText": "Unable to process static API definition data: '/u/tmp/zowec/workspace/api-mediation/api-defs/mq.yml' - 'The API Catalog UI tile ID colinmq.aa is invalid. The service mq will not have API Catalog UI tile'",
            "messageTemplate": {

so we are missing some words from the doc to say what values are valid.


## Pages to Update
<!--https://docs.zowe.org/...-->

## Screenshots
<!--Add screenshots to help explain your problem, if needed.-->

## Expected behavior
<!--A clear and concise description of what you expect to happen.-->

## Additional context
<!--Add any other context about the documentation error here.-->

