# Using cURL to troubleshoot Zowe CLI

When a REST API call fails on Zowe CLI, you can use cURL to troubleshoot.

Run a command with cURL and compare its output with what is returned using Zowe CLI. This can help pinpoint whether the problem lies with z/OSMF or Zowe CLI, depending on which command returns an API error.

## Installing cURL

cURL is installed by default on Windows 10 V1803 and later, macOS, and most Linux distributions.

If the cURL command is missing from your system, you can download it from the cURL [Releases and Downloads](https://curl.se/download.html) page.

## Understanding cURL commands

A cURL command using the `https` protocol follows the basic syntax `curl <URL>`.

Add cURL options to establish communication between Zowe CLI and z/OSMF, as in the following example command:

```
curl --location --request <API method> "https://<host>:<port>/<API>" --header "X-CSRF-ZOSMF-HEADER;" --insecure --user "<ID>:<PASSWORD>"
```
**NOTE:** Some terminals may require single quotes rather than double quotes.


### `--location`

Use `--location` to allow the server to redirect to a different URL, if needed. 

When the server attempts to redirect and `--location` is not included in the command, the server responds with a 3XX status code.

### `--request <API method>`

Use `--request` to identify the API method (such as `POST`, `GET`, `PUT`, `DELETE`). Not necessary when the API method is `GET`.

- `<API method>`: Specifies the API method used in the request.

### `"https://<host>:<port>/<API>"`

Indicates the protocol and URL.

- `<host>`: Specifies the host name where the z/OSMF services are running.
- `<port>`: Specifies the REST port number. If not specified, defaults to 443 for HTTPS.
- `<API>`: Specifies the API endpoint used in the request.

### `--header "X-CSRF-ZOSMF-HEADER;"`

Required to establish communication with z/OSMF. Specifies that the client is sending a cross-site request to the REST interface.

- `;`: Indicates that the header has no value. (A value is not required.)

### `--insecure`

Use `--insecure` to bypass SSL certificate validation if you are connecting to a trusted server that has self-signed certificates.

### `--user "<ID>:<PASSWORD>"`

Required and displays as plain text. Also possible to [use an environment variable](../../user-guide/cli-using-using-environment-variables.md).

- `<ID>`: Specifies the z/OSMF user identification.
- `<PASSWORD>`: Specifies the user password for z/OSMF.

**NOTE:** To be prompted for a password instead of displaying it in plain text, omit the password from the command and enter `--user "<ID>"`.

## Comparing commands

To troubleshoot, run a Zowe API request with Zowe CLI and cURL commands, then compare responses.

### z/OSMF Info API

The [`z/OSMF Info`](https://www.ibm.com/docs/en/zos/2.5.0?topic=service-retrieve-zosmf-information) API uses a `GET` request to obtain basic information from z/OSMF, such as the version, available services, and other details.


**Submitting the cURL command:**

Run the following example command using your information:

```
curl --location --request GET "https://lpar.hostname.net:443/zosmf/info" --header "X-CSRF-ZOSMF-HEADER;" --insecure --user "ibmuser:password"
```
A successful cURL response follows the format below:
```
{"zos_version":"04.28.00","zosmf_port":"443","zosmf_version":"28","zosmf_hostname":"lpar.hostname.net","plugins":{"msgId":"IZUG612E","msgText":"IZUG612E"},"zosmf_saf_realm":"SAFRealm","zosmf_full_version":"28.0","api_version":"1"}
```

**Submitting the Zowe CLI command:**

Run the following example command using your information:

```
zowe zosmf check status --host lpar.hostname.net --port 443 --user ibmuser --password password
```

A successful Zowe CLI response follows the format below:

```
The user ibmuser successfully connected to z/OSMF on 'lpar.hostname.net'.
zosmf_port:         443
zosmf_saf_realm:    SAFRealm
zos_version:        04.28.00
zosmf_full_version: 28.0
api_version:        1

z/OSMF Plug-ins that are installed on 'lpar.hostname.net':
msgId:   IZUG612E
msgText: IZUG612E
```
When both responses include a the same error, that may indicate there could be a problem with z/OSMF.

If an API call fails with the Zowe CLI command but not cURL, this can mean the problem lies with Zowe CLI.
