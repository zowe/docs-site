# Using z/OS Services REST APIs

Access and modify your z/OS resources such as jobs, data sets, z/OS UNIX System Services files by using APIs. Zowe provides a range of REST APIs through a Swagger defined description, and a simple interface to specify API endpoint parameters and request bodies along with the response body and return code.

The APIs are available on the API catalog available for you to try within a browser.  The API catalog links to the swagger documentation.

```https://youhost:apicatalogport/ui/v1/apicatalog/#/dashboard```

From the catalog you will see z/OS Jobs services and z/OS Data Set services.  Selecting these will navigate to the swagger catalog that allows you to view and try out the APIs.

## Programming REST APIs

You can program explorer server REST APIs by referring to the examples in this section.

### Sending a `GET` request in Java

Here is sample code to send a `GET` request to explorer server in Java™.

```
public class JobListener implements Runnable {


    /*
    *   Perform an HTTPs GET at the given jobs URL and credentials
    *   targetURL e.g "https://host:port/api/v1/jobs?owner=IBMUSER&prefix=*"         
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
const BASE_URL = 'hostname.com:port/api/v1';

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
    const BASE_URL = 'hostname.com:port/api/v1';
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
