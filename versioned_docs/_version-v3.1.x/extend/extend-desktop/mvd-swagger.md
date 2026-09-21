# Documenting your dataservices
Each REST dataservice in your application can and should be documented in OpenAPI spec, previously known as swagger.

The Zowe Application Server can host swagger files per-dataservice such that users can view this documentation at runtime.

To utilize this feature, note the following:

​1. Each dataservice to be documented with swagger must have an individual `.yaml` or `.json` file with the same name as the dataservice, and optionally with the version number to distinguish between revisions of the dataservice.

​2. In the case that a version number is supplied, the format is `name_version`. For example, to document a service named `users`, with version 1.1.0, a valid filename would be `users_1.1.0.yaml`.

​3. The file contents must be valid [OpenAPI 2.0](https://swagger.io/specification/v2/) which defines that dataservice. Zowe validates the file at runtime.

4. Place the swagger file within the `/doc/swagger` of your application directory.

​5. In the event that multiple files are found that match a given dataservice, the server loads one of the swagger files by this order of preference:
* JSON with version
* JSON without version
* YAML with version
* YAML without version


6. At runtime, the server substitutes swagger fields that are known dynamically, such as the hostname and whether the endpoint is accessible via HTTP versus HTTPS.

7. At runtime, the server aggregates together all the dataservices of a plugin such that the swagger documentation can be viewed either per-dataservice or per-plugin.

8. At runtime, the swagger documentation is accessible in a read-only JSON format via two ways:

- Per dataservice at `/ZLUX/plugins/pluginname/catalogs/swagger/servicename`

- Per plugin at `/ZLUX/plugins/pluginname/catalogs/swagger`

9. If any services are not documented, including non-REST services such as websocket services, viewing the per-plugin swagger output will show a stub for that dataservice, alerting users that it exists but without in-depth detail about its capabilities.