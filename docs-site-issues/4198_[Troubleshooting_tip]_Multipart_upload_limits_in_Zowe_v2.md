# Issue #4198: [Troubleshooting tip] Multipart upload limits in Zowe v2

**URL:** https://github.com/zowe/docs-site/issues/4198

**Created:** 2025-02-26T13:19:06Z

**Updated:** 2025-12-16T10:21:19Z

**Labels:** type: enhancement, area: apiml, priority-medium, release: V2, Size: S

---

### 2. Choose a title

Increase limit on multipart HTTP requests in Zowe API Gateway

### 3. Symptom

API ML may reply to a multipart HTTP request that intends to upload large files with a message such as:

```
org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException: The field fromFile exceeds its maximum permitted size of 1048576 bytes
```

### 4. Solution

Increase the limits in API Gateway to handle large multipart HTTP requests applying the following changes to zowe.yaml:

```yaml
environments:
    SPRING_SERVLET_MULTIPART_MAXFILESIZE: 15MB
    SPRING_SERVLET_MULTIPART_MAXREQUESTSIZE: 15MB
```


