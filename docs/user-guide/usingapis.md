# Using APIs

Access and modify your z/OS resources such as jobs, data sets, z/OS UNIX System Services files by using APIs.

## Using explorer server REST APIs

Explorer server REST APIs provide a range of REST APIs through a Swagger defined description, and a simple interface to specify API endpoint parameters and request bodies along with the response body and return code. With explorer server REST APIs, you can see the available API endpoints and try the endpoints within a browser. Swagger documentation is available from an Internet browser with a URL, for example, https://your.host:atlas-port/ibm/api/explorer.

### Data set APIs

Use data set APIs to create, read, update, delete, and list data sets. See the following table for the operations available in data set APIs and their descriptions and prerequisites.

|REST API|Description|Prerequisite|
|--------|-----------|-------------|
|`GET /Atlas/api/datasets/{filter}`|Get a list of data sets by filter. Use this API to get a starting list of data sets, for example, **userid.\*\***.|z/OSMF restfiles|
|`GET /Atlas/api/datasets/{dsn}/attributes`|Retrieve attributes of a data set\(s\). If you have a data set name, use this API to determine attributes for a data set name. For example, it is a partitioned data set.|z/OSMF restfiles|
|`GET /Atlas/api/datasets/{dsn}/members`|Get a list of members for a partitioned data set. Use this API to get a list of members of a partitioned data set.|z/OSMF restfiles|
|`GET /Atlas/api/datasets/{dsn}/content`|Read content from a data set or member. Use this API to read the content of a sequential data set or partitioned data set member. Or use this API to return a checksum that can be used on a subsequent `PUT` request to determine if a concurrent update has occurred.|z/OSMF restfiles|
|`PUT /Atlas/api/datasets/{dsn}/content`|Write content to a data set or member. Use this API to write content to a sequential data set or partitioned data set member. If a checksum is passed and it does not match the checksum that is returned by a previous `GET` request, a concurrent update has occurred and the write fails.|z/OSMF restfiles|
|`POST /Atlas/api/datasets/{dsn}`|Create a data set. Use this API to create a data set according to the attributes that are provided. The API uses z/OSMF to create the data set and uses the syntax and rules that are described in the [z/OSMF Programming Guide](https://www-01.ibm.com/servers/resourcelink/svc00100.nsf/pages/zOSV2R3sc278420?OpenDocument).|z/OSMF restfiles|
|`POST /Atlas/api/datasets/{dsn}/{basedsn}`|Create a data set by using the attributes of a given base data set. When you do not know the attributes of a new data set, use this API to create a new data set by using the same attributes as an existing one.|z/OSMF|
|`DELETE /Atlas/api/datasets/{dsn}`|Delete a data set or member. Use this API to delete a sequential data set or partitioned data set member.|z/OSMF restfiles|

### Job APIs

Use Jobs APIs to view the information and files of jobs, and submit and cancel jobs. See the following table for the operations available in Job APIs and their descriptions and prerequisites.

|REST API|Description|Prerequisite|
|--------|-----------|-------------|
|`GET /Atlas/api/jobs`|Get a list of jobs. Use this API to get a list of job names that match a given prefix, owner, or both.|z/OSMF restjobs|
|`GET /Atlas/api/jobs/{jobName}/ids`|Get a list of job identifiers for a given job name. If you have a list of existing job names, use this API to get a list of job instances for a given job name.|z/OSMF restjobs|
|`GET /Atlas/api/jobs/{jobName}/ids/{jobId}/steps`|Get job steps for a given job. With a job name and job ID, use this API to get a list of the job steps, which includes the step name, the executed program, and the logical step number.|z/OSMF restjobs|
|`GET /Atlas/api/jobs/{jobName}/ids/{jobId}/steps/{stepNumber}/dds`|Get data set definitions \(DDs\) for a given job step. If you know a step number for a given job instance, use this API to get a list of the DDs for a given job step, which includes the DD name, the data sets that are described by the DD, the original DD JCL, and the logical order of the DD in the step.|z/OSMF restjobs|
|`GET /Atlas/api/jobs/{jobName}/ids/{jobId}/files`|Get a list of output file names for a job. Job output files have associated DSIDs. Use this API to get a list of the DSIDs and DD name of a job. You can use the DSIDs and DD name to read specific job output files.|z/OSMF restjobs|
|`GET /Atlas/api/jobs/{jobName}/ids/{jobId}/files/{fileId}`|Read content from a specific job output file. If you have a DSID or field for a given job, use this API to read the output file's content.|z/OSMF restjobs|
|`GET /Atlas/api/jobs/{jobName}/ids/{jobId}/files/{fileId}/tail`|Read the tail of a job's output file. Use this API to request a specific number of records from the tail of a job output file.|z/OSMF restjobs|
|`GET /Atlas/api/jobs/{jobName}/ids/{jobId}/subsystem`|Get the subsystem type for a job. Use this API to determine the subsystem that is associated with a given job. The API examines the JCL of the job to determine if the executed program is CICS®, Db2®, IMS™, or IBM® MQ.|z/OSMF restjobs|
|`POST /Atlas/api/jobs`|Submit a job and get the job ID back. Use this API to submit a partitioned data set member or UNIX™ file.|z/OSMF restjobs|
|`DELETE /Atlas/api/jobs/{jobName}/{jobId}`|Cancel a job and purge its associated files. Use this API to purge a submitted job and the logged output files that it creates to free up space.|z/OSMF Running Common Information Model \(CIM\) server|

### Persistent Data APIs

Use Persistent Data APIs to create, read, update, delete metadata from persistent repository. See the following table for the operations available in Persistent Data APIs and their descriptions and prerequisites.

|REST API|Description|Prerequisite|
|--------|-----------|-------------|
|`PUT /Atlas/api/data`|Update metadata in persistent repository for a given resource and attribute name. With explorer server, you can store and retrieve persistent data by user, resource name, and attribute. A resource can have any number of attributes and associated values. Use this API to set a value for a single attribute of a resource. You can specify the resource and attribute names.|None|
|`POST /Atlas/api/data`|Create metadata in persistent repository for one or more resource/attribute elements. Use this API to set a group of resource or attributes values.|None|
|`GET /Atlas/api/data`|Retrieve metadata from persistent repository for a given resource \(and optional attribute\) name. Use this API to get all the attribute values or any particular attribute value for a given resource.|None|
|`DELETE /Atlas/api/data`|Remove metadata from persistent repository for a resource \(and optional attribute\) name. Use this API to delete all the attribute values or any particular attribute value for a given resource.|None|

### System APIs

Use System APIs to view the version of explorer server. See the following table for available operations and their descriptions and prerequisites.

|REST API|Description|Prerequisite|
|--------|-----------|-------------|
|`GET /Atlas/api/system/version`|Get the current explorer server version. Use this API to get the current version of the explorer server microservice.|None|

### USS File APIs

Use USS File APIs to create, read, update, and delete USS files. See the following table for the available operations and their descriptions and prerequisites.

|REST API|Description|Prerequisite|
|--------|-----------|-------------|
|`POST /Atlas/api/uss/files`|Use this API to create new USS directories and files.|z/OSMF restfiles|
|`DELETE /Atlas/api/uss/files{path}`|Use this API to delete USS directories and files.|z/OSMF resfiles|
|`GET /Atlas/api/files/{path}`|Use this API to get a list of files in a USS directory along with their attributes.|z/OSMF restfiles|
|`GET /Atlas/api/files/{path}/content`|Use this API to get the content of a USS file.|z/OSMF restfiles|
|`PUT /Atlas/api/files/{path}/content`|Use this API to update the content of a USS file.|z/OSMF resfiles|

### z/OS System APIs

Use z/OS system APIs to view information about CPU, PARMLIB, SYSPLEX, and USER. See the following table for available operations and their descriptions and prerequisites.

|REST API|Description|Prerequisite|
|--------|-----------|-------------|
|`GET /Atlas/api/zos/cpu`|Get current system CPU usage. Use this API to get the current system CPU usage and other current system statistics.|None|
|`GET /Atlas/api/zos/parmlib`|Get system PARMLIB information. Use this API to get the PARMLIB data set concatenation of the target z/OS system.|None|
|`GET /Atlas/api/zos/sysplex`|Get target system sysplex and system name. Use this API to get the system and sysplex names.|None|
|`GET /Atlas/api/zos/username`|Get current userid. Use this API to get the current user ID.|None|

## Programming explorer server REST APIs

You can program explorer server REST APIs by referring to the examples in this section.

### Sending a `GET` request in Java

Here is sample code to send a `GET` request to explorer server in Java™.

```
public class JobListener implements Runnable {


    /*
    *   Perform an HTTPs GET at the given jobs URL and credentials
    *   targetURL e.g "https://host:port/Atlas/api/jobs?owner=IBMUSER&prefix=*"         
    *   credentials in the form of base64 encoded string of user:password
    */     
    private String executeGET(String targetURL, String credentials) {
        HttpURLConnection connection = null;         
        try {             
            //Create connection             
            URL url = new URL(targetURL);             
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");             
            connection.setRequestProperty("Authorization", credentials);

            //Get Response               
            InputStream inputStream = connection.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));                             
            StringBuilder response = new StringBuilder();             
            String line;                          

            //Process the response line by line             
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);             
            }              

            //Cleanup             
            bufferedReader.close();              

            //Return the response message             
            return response.toString();         
        } catch (Exception e) {             
            //handle any error(s)         
        } finally {             
            //Cleanup             
            if (connection != null) {                 
                connection.disconnect();             
            }         
        }     
    }
}
```

### Sending a `GET` request in JavaScript

Here is sample code written in JavaScript™ using features from ES6 to send a `GET`request to explorer server.

```
const BASE_URL = 'hostname.com:port/Atlas/api';

// Call the jobs GET api to get all jobs with the userID IBMUSER
function getJobs(){
    let parameters = "prefix=*&owner=IBMUSER";     
    let contentURL = `${BASE_URL}/jobs?${parameters}`;     
    let result = fetch(contentURL, {credentials: "include"})
                    .then(response => response.json())
                        .catch((e) => {                             
                            //handle any error                             
                            console.log("An error occoured: " + e);      
                        });     
     return result;
}
```

### Sending a `POST` request in JavaScript

Here is sample code written in JavaScript™ using features from ES6 to send a `POST` request to explorer server.

```
// Call the jobs POST api to submit a job from a data set (ATLAS.TEST.JCL(TSTJ0001))                
function submitJob(){
    let payload = "{\"file\":\"'ATLAS.TEST.JCL(TSTJ0001)'\"}";
    let contentURL = `${BASE_URL}/jobs`;
    let result = fetch(contentURL,
                    {
                        credentials: "include",
                        method: "POST",
                        body:   payload
                    })
                        .then(response => response.json())
                            .catch((e) => {
                                //handle any error
                                console.log("An error occoured: " + e);
                        });
    return result;
}
```

### Extended API sample in JavaScript

Here is an extended API sample that is written using JavaScript™ with features from ES62015 \(map\).

```
/////////////////////////////////////////////////////////////////////////////
// Extended API Sample
// This Sample is written using Javascript with features from ES62015 (map).
// The sample is also written using JSX giving the ability to return HTML elements
// with Javascript variables embedded. This sample is based upon the codebase of the
// sample UI (see- hostname:port/explorer-mvs) which is written using Facebook's React, Redux,
// Router and Google's material-ui
/////////////////////////////////////////////////////////////////////////////

// Return a table with rows detailing the name and jobID of all jobs matching      
// the specified parameters
function displayJobNamesTable(){
    let jobsJSON = getJobs("*","IBMUSER");
    return  (<table>
                {jobsJSON.map(job => {
                    return <tr><td>{job.name}</td><td>{job.id}</td></tr>
                })}
            </table>);
}

// Call the jobs GET api to get all jobs with the userID IBMUSER
function getJobs(owner, prefix){
    const BASE_URL = 'hostname.com:port/Atlas/api';
    let parameters = "prefix=" + prefix + "&owner=" + owner;     
    let contentURL = `${BASE_URL}/jobs?${parameters}`;     
    let result = fetch(contentURL, {credentials: "include"})                     
                    .then(response => response.json())                         
                        .catch((e) => {                             
                            //handle any error                             
                            console.log("An error occoured: " + e);                                           
                        });     
     return result;
}
```

## Using explorer server WebSocket services
The explorer server provides WebSocket services that can be accessed by using the WSS scheme.
With explorer server WebSocket services, you can view the system log in the System log UI
that is refreshed automatically when messages are written. You can also open a JES
spool file for an active job and view its contents that refresh through a web socket.

|Server Endpoint|Description|Prerequisites|
|--------|-----------|-------------|
|`/api/sockets/jobs/{jobname}/ids/{jobid}/files/{fileid}`|Tail the output of an active job. Use this WSS endpoint to read the tail of an active job's output file in real time.|z/OSMF restjobs|
