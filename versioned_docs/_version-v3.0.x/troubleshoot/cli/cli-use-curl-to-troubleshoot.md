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
:::note

Some terminals might require single quotes rather than double quotes.

:::


### `--location`

Use `--location` to allow the server to redirect to a different URL, if needed. 

When the server attempts to redirect and `--location` is not included in the command, the server responds with a 3XX status code.

### `--request <API method>`

Use `--request` to identify the API method (such as `POST`, `GET`, `PUT`, `DELETE`). Not necessary when the API method is `GET`.

- `<API method>`

    Specifies the API method used in the request.

### `"https://<host>:<port>/<API>"`

Indicates the protocol and URL.

- `<host>`

    Specifies the host name where the z/OSMF services are running.
- `<port>`

    Specifies the REST port number. If not specified, defaults to 443 for HTTPS.
- `<API>`
    
    Specifies the API endpoint used in the request.

### `--header "X-CSRF-ZOSMF-HEADER;"`

Required to establish communication with z/OSMF. Specifies that the client is sending a cross-site request to the REST interface.

- `;`

    Indicates that the header has no value. (Not all headers require a value.)

    To pass an additional header with a value, use a colon to separate the key and value. For example: `--header "X-IBM-Data-Type: binary"`.

### `--insecure`

Use `--insecure` with a trusted server that does not require verification before a data transfer.

For example, this bypasses SSL certificate verification for servers with self-signed certificates.

### `--user "<ID>:<PASSWORD>"`

Required and displays as plain text. Also possible to [use an environment variable](../../user-guide/cli-using-using-environment-variables.md).

- `<ID>`

    Specifies the z/OSMF user identification.
- `<PASSWORD>`

    Specifies the user password for z/OSMF.

:::note

To be prompted for a password instead of displaying it in plain text, omit the password from the command and enter `--user "<ID>"`.

:::

## Comparing commands

To troubleshoot, run a Zowe API request with Zowe CLI and cURL commands, then compare responses.

When both responses include the same error, that may indicate there could be a problem with z/OSMF.

If an API call fails with the Zowe CLI command but not cURL, this can mean the problem lies with Zowe CLI.

The following APIs illustrate some common examples of comparing commands that you can use to troubleshoot with cURL.

### **z/OSMF Info API**

The [`z/OSMF Info`](https://www.ibm.com/docs/en/zos/2.5.0?topic=service-retrieve-zosmf-information) API uses a `GET` request to obtain basic information from z/OSMF, such as the version, available services, and other details.

#### Submitting the cURL command:

Run the following example command using your information:

```
curl --location --request GET "https://lpar.hostname.net:443/zosmf/info" --header "X-CSRF-ZOSMF-HEADER;" --insecure --user "ibmuser:password"
```
A successful cURL response follows the format below:
```
{"zos_version":"04.28.00","zosmf_port":"443","zosmf_version":"28","zosmf_hostname":"lpar.hostname.net","plugins":{"msgId":"IZUG612E","msgText":"IZUG612E"},"zosmf_saf_realm":"SAFRealm","zosmf_full_version":"28.0","api_version":"1"}
```

#### Submitting the Zowe CLI command:

Run the following example command using your information:

```
zowe zosmf check status --host lpar.hostname.net --port 443 --user ibmuser --password password --reject-unauthorized false
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

### **z/OSMF Files API**

The [`z/OSMF Files`](https://www.ibm.com/docs/en/zos/2.5.0?topic=interface-write-data-zos-data-set-member) API uses a `PUT` request to upload a file to a data set via z/OSMF.

#### Submitting the cURL command:

Run the following example command using your information:

```
curl --location --request PUT "https://lpar.hostname.net:443/zosmf/restfiles/ds/IBMUSER.TEST.PDS(HELLO)" --header "X-CSRF-ZOSMF-HEADER;" --header "X-IBM-Data-Type: binary" --insecure --user "ibmuser:password" --data @hello.txt
```
A successful cURL response is empty without any error messages.

#### Submitting the Zowe CLI command:

Run the following example command using your information:

```
zowe zos-files upload file-to-data-set hello.txt "IBMUSER.TEST.PDS(HELLO)" --binary --host lpar.hostname.net --port 443 --user ibmuser --password password --reject-unauthorized false
```

A successful Zowe CLI response follows the format below:

```
success: true
from:    C:\Users\User\Desktop\hello.txt
to:      IBMUSER.TEST.PDS(HELLO)


file_to_upload: 1
success:        1
error:          0
skipped:        0


Data set uploaded successfully.
```

### **z/OSMF Jobs API**

The [`z/OSMF Jobs`](https://www.ibm.com/docs/en/zos/2.5.0?topic=interface-submit-job) API uses a `PUT` request to submit a job from a data set via z/OSMF.

#### Submitting the cURL command:

Run the following example command using your information:

```
curl --location --request PUT "https://lpar.hostname.net:443/zosmf/restjobs/jobs" --header "X-CSRF-ZOSMF-HEADER;" --insecure --user "ibmuser:password" --header "Content-Type: application/json" --data '{"file": "//''IBMUSER.TEST.IEFBR14''"}'
```
A successful cURL response folllows the format below:
```
{"owner":"IBMUSER","phase":14,"subsystem":"JES2","phase-name":"Job is actively executing","job-correlator":"J000...","type":"JOB","url":"https:\/\/lpar.hostname.net:443\/zosmf\/restjobs\/jobs\/J000...%3A","jobid":"JOB12345","class":"A","files-url":"https:\/\/lpar.hostname.net:443\/zosmf\/restjobs\/jobs\/J000...%3A\/files","jobname":"IEFBR14","status":"ACTIVE","retcode":null}
```

#### Submitting the Zowe CLI command:

Run the following example command using your information:

```
zowe zos-jobs submit data-set "IBMUSER.TEST.IEFBR14" --host lpar.hostname.net --port 443 --user ibmuser --password password --reject-unauthorized false
```

A successful Zowe CLI response follows the format below:

```
jobid:   JOB12345
retcode: null
jobname: IEFBR14
status:  INPUT
```
