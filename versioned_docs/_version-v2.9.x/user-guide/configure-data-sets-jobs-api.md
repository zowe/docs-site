# Configuring the Zowe APIs

Review the security considerations for Zowe APIs and learn how to prevent the Denial of Service (DoS) attacks.

The default configuration before Zowe version 1.14.0 contains **Data sets and Unix files** and **Jobs** API microservices which might be vulnerable to DoS attacks in the form of slow https attacks. You can add additional configuration to the start script of these components in order to prevent resource starvation via slow https attacks.

- To update the configuration of the **Data sets and Unix files** component, modify the `start.sh` script within the runtime component directory `/zowe/runtime/components/files-api/bin`.
- To update the configuration of the **Jobs** component, modify the `start.sh` script within the runtime component directory `/zowe/runtime/components/jobs-api/bin`.

Ensure that the `-Dserver.connection-timeout=8000` parameter is set. This parameter specifies how long the component waits to receive all the required information from the client that makes a request.

See a snippet of a configured `start.sh` script for the Jobs component as follows:

```shell
_BPX_JOBNAME=${ZOWE_PREFIX}${COMPONENT_CODE} java -Xms16m -Xmx512m -Dibm.serversocket.recover=true -Dfile.encoding=UTF-8 \
    -Djava.io.tmpdir=/tmp -Xquickstart \
    -Dserver.port=${JOBS_API_PORT} \
    -Dcom.ibm.jsse2.overrideDefaultTLS=true \
    -Dserver.ssl.keyAlias=${KEY_ALIAS} \
    -Dserver.ssl.keyStore=${KEYSTORE} \
    -Dserver.ssl.keyStorePassword=${KEYSTORE_PASSWORD} \
    -Dserver.ssl.keyStoreType=${KEYSTORE_TYPE} \
    -Dserver.compression.enabled=true \
    -Dserver.connection-timeout=8000 \
    -Dconnection.httpsPort=${GATEWAY_PORT} \
    -Dconnection.ipAddress=${ZWE_haInstance_hostname} \
    -Dspring.main.banner-mode=off \
    -Djava.protocol.handler.pkgs=com.ibm.crypto.provider \
    -jar ${ROOT_DIR}/components/jobs-api/bin/jobs-api-server-1.0.0-boot.jar &
```
In version 1.14.0 and later, the preceding snippet reflects the default configuration.
