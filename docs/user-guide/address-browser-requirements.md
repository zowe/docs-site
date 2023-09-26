# Address browser requirements

As a system programmer, review the following browser requirements to avoid browser-specific issues when running particular server-side components.

## Zowe Desktop requirements (client PC)

The Zowe Desktop is powered by the Application Framework which has server prereqs depending on where it is installed

- [Zowe Application Framework on z/OS requirements](#zowe-application-framework-on-zos-requirements)
- [Application Framework on Docker prerequisites](#docker-requirements-host)

The Zowe Desktop runs inside of a browser. No browser extensions or plugins are required.
The Zowe Desktop supports Google Chrome, Mozilla Firefox, Apple Safari and Microsoft Edge releases that are at most 1 year old, except when the newest release is older. For Firefox, both the regular and Extended Support Release (ESR) versions are supported under this rule.

If you do not see your browser listed here, please contact the Zowe community so that it can be validated and included.

## Browser limitations in API Catalog

It is recommended to use Google Chrome when you are trying to access API Catalog. Errors might occur if you access API Catalog with Firefox. 
