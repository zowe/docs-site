# Issue #3789: Issue with docs.zowe.org/stable/getting-started/zowe-architecture/ - Inconsistent documentation for API Catalog port

**URL:** https://github.com/zowe/docs-site/issues/3789

**Created:** 2024-07-31T19:53:43Z

**Updated:** 2025-03-14T14:12:56Z

**Labels:** area: apiml, priority-medium, release: V3, Size: M

---

## Description
Zowe Architecture mentioned port for API Catalog as 7552 but the url for link on API Mediation Layer page takes me to something like https://<ZOWE_HOST_IP>:7554/apicatalog/ .. 

![image](https://github.com/user-attachments/assets/050999f7-1c74-4115-825f-c4f4fa00bfa9)

When I try to open https://<ZOWE_HOST_IP>:7552/apicatalog/ I see API Catalog loading with a lot of errors and finally show something like

![image](https://github.com/user-attachments/assets/4a6ec0d5-07eb-4bd8-ba95-3ac3ec72502d)

Please clarify the usage of the ports and what port should be used for calling any rest api endpoints. What ports should an API Users, API Developer and Zowe Admin should care for.  

## Pages to Update
https://docs.zowe.org/stable/getting-started/zowe-architecture/ and all associated page where ports are listed

## Expected behavior
Please designate any internal ports and external ports for Zowe clearly in context of API Developer and Zowe Admin separately.

## Validation Status: ✅ PARTIALLY RESOLVED

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is PARTIALLY addressed. The documentation does contain both port 7552 and 7554, but the distinction between internal and external ports needs clarification.

**Current State:** 
- `docs/user-guide/address-network-requirements.md:36` lists port **7552** as the internal API Catalog port (ZWE1AC) - "Used to view API swagger / openAPI specifications for registered API services in the API Catalog"
- `docs/getting-started/zowe-architecture.md:82,123` uses port **7554** for external API Catalog access URLs like `https://<ZOWE_HOST_ADDRESS>:7554/apicatalog/ui/v1`
- Port 7554 is the API Gateway port (ZWE1AG) which is the **external** northbound port
- Port 7552 is the API Catalog service's **internal** port

The confusion arises because:
1. The API Catalog service runs on internal port 7552
2. But users access it externally through the API Gateway on port 7554 with path `/apicatalog/...`
3. Attempting to access port 7552 directly (as the user did) will fail because it's an internal port

**Recommendation:** Clarify in documentation that:
- **External users** (API Users, API Developers): Use port 7554 (Gateway) with appropriate paths
- **Zowe Admins**: Need to know both internal ports (7552 for API Catalog, etc.) for configuration and internal ports (7554 for Gateway) for client access
- Add a note in `docs/getting-started/zowe-architecture.md` explaining that API Catalog is accessed via Gateway port 7554, not directly on port 7552
- Consider adding a "Ports Summary" table distinguishing internal vs external ports

