# Using GraphQL APIs

GraphQL is a query language for APIs that provides descriptions of the data in your APIs and allows for specific queries to facilitate API development. Routing for such APIs is possible within the Zowe ecosystem. For more information, see [Implementing routing to the Gateway](./extend-apiml/implementing-routing-to-the-api-gateway)
) and [Routing Requests to REST API](user-guide/api-mediation/routing-requests-to-rest-apis.md). 

For information about how to use GraphQL, see the product documentation. 

## How GraphQL Works

GraphQL operates through the type system you define for your data and uses the following structure:

- **Schema Definition**  
Define a 'schema' or a model of the data that can be queried through the API. This schema acts as a contract between the client and the server.
- **Query**  
Clients send queries to your GraphQL server. These queries specify what data the client needs.
- **Resolving Queries**  
The server processes these queries according to the schema and returns the appropriate results.

## Key Concepts of GraphQL

- **Queries and Mutations**  
In GraphQL, queries are used for reading data, while mutations are used for writing data. This clear separation makes understanding and maintaining the API simpler.
- **Real-time Data with Subscriptions**  
GraphQL also supports subscriptions, which allow clients to subscribe to real-time updates, essential for dynamic content applications.
- **Strongly Typed**  
GraphQL APIs are strongly typed so that every operation is checked and validated against the schema, leading to more reliable and predictable APIs.

## Difference to traditional REST APIs

REST APIs  operate on the principle of resource-based endpoints. 
Each endpoint in a REST API corresponds to a specific resource (like a user or product), and the type of request (GET, POST, PUT, DELETE) 
dictates the operation performed on that resource. This approach leads to a straightforward and uniform interface but often results 
in over-fetching or under-fetching of data. Over-fetching occurs when the fixed data structure of an endpoint returns more information 
than the client needs, while under-fetching happens when the client must make additional requests to gather all the necessary data. 
Additionally, REST APIs rely heavily on HTTP status codes for error handling and utilize standard HTTP methods for caching and statelessness.

By contrast, GraphQL offers a more flexible and efficient way of working with data. Unlike REST, which 
uses multiple endpoints, GraphQL uses a single endpoint through which clients can make versatile queries. These queries 
are tailored to retrieve exactly the data required, eliminating over-fetching and under-fetching issues inherent in REST. 
GraphQL's strongly typed system, defined by a schema, ensures that the data conforms to a specific structure, providing a 
contract between the server and client. This approach simplifies data retrieval for complex, nested data and allows for 
more precise error handling within the responses. However, GraphQL's flexibility can lead to more complex queries and 
demands careful consideration regarding performance, especially in designing how queries are resolved on the server side.

## Limitations for the API Mediation Layer

The API Catalog currently does not support visualization of GraphQL APIs. As such, we recommend for the extenders to provide 
link to the GraphQL endpoint via the Open API for the API Catalog. 
