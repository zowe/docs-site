# Applying role-based access control to application services

To use role-based access control (RBAC) for Zowe service endpoints, enable RBAC for Zowe, and then use a z/OS security product such as RACF to map roles and authorities to Zowe service endpoints.

After you configure RBAC, when a Zowe application wants to access an endpoint the application server sends the current user ID and endpoint identifier URL to the ZSS server. The ZSS server queries the z/OS System Authorization Facility (SAF), which determines whether the access is authorized.

### How it works

Most Zowe functionality is available as services. For example, Zowe Application Framework plug-in services provide the infrastructure for creating web applications. Application plug-in services provide data and services from those application plug-ins. For more information, see Dataservices.

Plug-ins can also have endpoints that control their [configuration](https://zowe.github.io/docs-site/latest/extend/extend-desktop/mvd-configdataservice.html#configuration-dataservice). These endpoints have scope (product/site/instance/user) and the data is stored and retrieved by path name.

#### URLs

Zowe service endpoints are identified by URLs that are formatted like this:

`/<product>/plugins/<plugin id>/services/<service>/<version>/<path>`

For example:

`/ZLUX/plugins/org.zowe.foo/services/baz/_current/users/fred`

Where product is `ZLUX`, plugin id is `org.zowe.foo`, service is `baz`, version is `_current`, and path is `/users/fred`.

To access endpoints when RBAC is enabled, users must have READ access to a corresponding SAF profile in the ZOWE class==?==. SAF profile names have this format:

`<product>.<instance id>.SVC.<pluginid_with_underscores>.<service>.<HTTP method>.<url with forward slashes '/' replaced by periods '.'>`

For example, to issue a POST request to the service endpoint documented above using the default ==Zowe Application Server?== instance, users must have READ access to the following SAF profile:

`ZLUX.DEFAULT.SVC.ORG_ZOWE_FOO.BAZ.POST.USERS.FRED`

Note: "DEFAULT" is the default Zowe instance ID.

Configuration endpoints have SAF profile names with this format:

`<product>.<instance id>.**CFG.<pluginid_with_underscores>.<service>.<HTTP method>.<url with forward slashes '/' replaced by periods '.'>`

==what's with the **CFG?==

For example, using the default instance, users must have access to the following SAF profile to access the instance-scoped configuration element “files”:

`ZLUX.DEFAULT.CFG.ORG_ZOWE_FOO.GET.INSTANCE.FILES`



## Enabling RBAC

By default, RBAC is disabled and all authenticated Zowe users can access all services. To enable RBAC, take the following steps:

1. Open the Zowe Application Server configuration JSON file. In the default server instance, the configuration file is `/zlux-app-server/config/zluxserver.json`.
2. In the `dataserviceAuthentication` object, add `"rbac": true`.



## Configuring basic authorization

We recommend configuring some basic authorization:

- To give administrators access to everything in Zowe, create a `ZLUX.**` profile and give them UPDATE access to it.
- To give non-administrators basic access to the site and product, create a `ZLUX.*.ORG_ZOWE_*`  profile and give them READ access to it.
- To prevent non-administrators from configuring endpoints at the product and instance levels, create a ?? profile and give them no access to it.
- To give non-administrators all access to user, create a ?? profile and give them ?? access to it.



## Creating generic authorization

Some endpoints can generate unlimited numbers of URLs. To apply RBAC to them you must create generic profiles. For example, an endpoint that performs a DELETE action on any file would generate a different URL for each file and users can create an unlimited number of files. So you must create a generic profile to handle access, such as:

`ZLUX.DEFAULT.SVC.ORG_ZOWE_FOO.BAZ.DELETE.**` 

You can create generic profile names using wildcards, such as asterisks (*). For information on generic profile naming, see [IBM documentation](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.icha100/egnoff.htm).



## Limiting endpoint URL length

SAF profile names cannot contain more than 246 characters. If the path section of an endpoint URL is long enough that the profile name exceeds the limit, the path is trimmed to only include elements that do not exceed the limit. For example, imagine that each path section in this endpoint URL contains 64 characters:

`/ZLUX/plugins/org.zowe.zossystem.subsystems/services/data/_current/aa..a/bb..b/cc..c/dd..d` 

So `aa..a` is 64 "a" characters, `bb..b` is 64 "b" characters, and so on. The URL would then map to the following profile name:

`ZLUX.DEFAULT.SVC.ORG_ZOWE_ZOSSYSTEM_SUBSYSTEMS.DATA.GET.AA..A.BB..B`

The URL ends at the `BB..B` section because adding `CC..C` would put it over 246 characters. So in this example, all service endpoints with paths that start with `AA..A.BB..B` are controlled by this one SAF profile.

To avoid this issue, we recommend that you maintain relatively short endpoint URL paths.