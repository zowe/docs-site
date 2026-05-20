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

