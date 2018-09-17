# REST Clients

Imperative CLI Framework contains a package that lets you consume REST APIs. There are many packages that can call REST APIs. However, the REST Client package that is built into the framework lets you perform the following tasks:

- Log HTTP(s) calls automatically
- Encapsulate and promisify Node.js http(s) runtime methods
- Capture node-report for unexpected errors
- Work with the "session" management package to store and use cookies for repeated REST calls

To call a rest API using the Rest Client, you define a Session that controls connection information for items such as the following:
- hostname
- port
- http / https
- no, basic, or token auth

After you create a *Session*, you invoke `RestClient` with the proper HTTP verb method and according to whether a string or JSON response is expected. The following examples illustrate how to use the HTTP verbs.

**Example 1:**

The following syntax illustrates how to use the HTTP GET verb to get string content from a public API:

```typescript
import { Session, RestClient } from "imperative-cli";

// define "session" (e.g. how to connect) for non-authenticated endpoint
const session = new Session({ hostname: "jsonplaceholder.typicode.com" });

// REST GET - call "/users" URI / endpoint - on fulfilled, "users" will contain text user response
const users = await RestClient.getExpectString(session, "/users");
```

**Example 2:**

The following syntax illustrates how to use the HTTP POST verb with payload to get JSON responses from a public API:

```typescript
import { Session, RestClient, Logger } from "imperative-cli";

// describe server input & response object
interface IPost {
    id?: number;
    userId: number;
    title: string;
    body: string;
}

// basic auth session example
const session = new Session({ hostname: "jsonplaceholder.typicode.com", type: "basic", user: "someUser", password: "somePass" });

// input POST data
const postData: IPost = { userId: 1, title: "some title", body: "some content" };

// REST POST - provide payload and an extra HTTP header
const postResponse = await RestClient.postExpectJSON<IPost>(session, "/posts", [{ "Content-Type": "application/json" }], postData);

// log server response id
Logger.getConsoleLogger().debug("Id is: " + postResponse.id);
```
