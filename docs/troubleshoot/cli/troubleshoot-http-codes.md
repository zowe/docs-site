# Troubleshooting HTTP status codes

Zowe clients and servers follow HTTP to exchange requests and responses. 

Hypertext Transfer Protocol is a communication system with defined requests and responses.

When there is an issue communicating with an API, HTTP response status codes can help determine where the problem lies. In Zowe CLI, status codes display in the terminal. In Zowe Explorer, status codes display in notification messages.

While HTTP status codes range from the 100s to the 500s, this page lists client error (400s) and server error (500s) codes that might be seen in Zowe.

## 4XX status codes: client error

Status codes in the 400s involve the client.

|Status Code | Definition | Resolution|
|---|---|---|
|400 | Bad Request</br>  Indicates an application issue, rather than a user error. | Confirm that the action you are trying to perform is valid. If valid and error persists, open a GitHub issue in the [Zowe CLI repository](../cli/cli-issue.md) or the [Zowe Explorer repository](../ze/ze-issues.md).|
|401 | Unauthorized</br> Your credentials are either invalid or expired.|Update credentials and retry the request.|
|403 | Forbidden</br> Credentials are valid but you do not have permission to perform the action.| Contact your system administrator.|
|404 | Not Found</br> You are trying to access a resource that does not exist.| Verify that the name of your resource is correct and retry the request.|
|405| Method Not Allowed</br> The server does not have the capability to implement the request.| Contact your system administrator.|
|409| Conflict</br> There  is a conflict between the data on your client computer and the data that resides on the mainframe.| Zowe Explorer presents an option to resolve conflict. For Zowe CLI, download the latest mainframe content and retry your changes.|

## 5XX status codes: server error

Status codes in the 500s involve the server.

|Status Code | Definition | Resolution|
|---|---|---|
|500| Server Error</br> Indicates an unexpect error related to storage, configuration, resources, or a time-out. | Contact your system administrator or the application developer.|
|502 |Gateway Error</br> Indicates a communication problem between servers. | Open a GitHub issue in the [Zowe CLI repository](../cli/cli-issue.md) or the [Zowe Explorer repository](../ze/ze-issues.md).|
|503| Service Unavailable</br> The application is offline. | Restart the service or contact your system administrator.|
|504| Gateway Timeout</br> There is too much traffic on the system processing your request. | Wait and retry. If it continues, contact your system administrator to restart the service.|
 