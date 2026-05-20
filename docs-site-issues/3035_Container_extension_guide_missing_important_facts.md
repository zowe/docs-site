# Issue #3035: Container extension guide missing important facts

**URL:** https://github.com/zowe/docs-site/issues/3035

**Created:** 2023-07-27T14:10:40Z

**Updated:** 2025-03-14T14:42:50Z

**Labels:** area: misc, release: V3, Size: L

---

After struggling through some regressions on the app-server container, I realized the reason for the regressions was a few undocumented facts needed to be successful in containers.

I'm writing this here so I don't forget, but the whole container extension sections of zowe server docs do need review by dev and improvement.

Here's what I learned:
* You cannot read zowe.yaml literally in containers, unfortunately. Some properties are misleading or missing versus zOS

In particular:
* zowe.externalDomains can be used for finding the gateway on zOS, but it cannot be used this way on containers. The addresses here may be inaccessible to containers, yet accessible to the browser - the main purpose of this field.
* Instead, ZWE_GATEWAY_HOST is an env var that can be used to find the gateway. But what if there are multiple gateways?
* The accessible hostname for discovery ALSO is not the same as the one for gateway, and ALSO is not zowe.externalDomains.
* For some reason, it's still ZWE_GATEWAY_HOST
* zowe.externalPort also can't be accessed. you need component.gateway.port for gateway.

If you need to make decisions dependent upon platform, there are environment variables available.
* ZWE_RUN_IN_CONTAINER="true" means you are in a container
* ZWE_RUN_IN_ZOS="true" means you are not in a container, it is "" in a container.
