# Configuring the Zowe APIs

## Security considerations

#### Denial of Service (DoS) prevention
The default configuration prior to version 1.14.0 contains **Data sets and Unix files** and **Jobs** api microservices  which may be vulnerable to DoS attacks in the form of slow https attacks. Additional configuration may be added to the start script of these components in order to prevent resource starvation via slow https attacks.

For updating the configuration of the **Datasets and Unix files** component modify the `start.sh` script within the runtime component directory `/zowe/runtime/components/files-api/bin`.

For updating the **Jobs** components modift the `start.sh` script within the runtime component directory `/zowe/runtime/components/jobs-api/bin`

Ensure the `-Dserver.connection-timeout=8000` parameter is set, the value of this property specifies how long the component will wait to receive all the required information from the client making a request.

A snippet of a configured `start.sh` script for the Jobs componet:
```sh
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
    -Dconnection.ipAddress=${ZOWE_EXPLORER_HOST} \
    -Dspring.main.banner-mode=off \
    -Djava.protocol.handler.pkgs=com.ibm.crypto.provider \
    -jar ${ROOT_DIR}/components/jobs-api/bin/jobs-api-server-1.0.0-boot.jar &
```
In version 1.14.0 and hight the above snippet reflects the default configuration.