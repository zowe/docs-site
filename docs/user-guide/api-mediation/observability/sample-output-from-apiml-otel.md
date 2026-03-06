# Sample Output from API ML OpenTelemetry

<!-- Note output data also contains attributes coming from the  Spring OpenTelemetry SDK, these are documented in the respective SDK documentation -->

```json
{
    "resourceMetrics": [
        {
            "resource": {
                "attributes": [
                    {
                        "key": "host.arch",
                        "value": {
                            "stringValue": "s390x"
                        }
                    },
                    {
                        "key": "host.name",
                        "value": {
                            "stringValue": "MVSDE66"
                        }
                    },
                    {
                        "key": "mainframe.lpar.name",
                        "value": {
                            "stringValue": "DE66"
                        }
                    },
                    {
                        "key": "os.description",
                        "value": {
                            "stringValue": "z/OS 03.01.00"
                        }
                    },
                    {
                        "key": "os.type",
                        "value": {
                            "stringValue": "zos"
                        }
                    },
                    {
                        "key": "os.version",
                        "value": {
                            "stringValue": "03.01.00"
                        }
                    },
                    {
                        "key": "process.command_line",
                        "value": {
                            "stringValue": "/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/bin/java -Xoptionsfile=/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/options.default -Xlockword:mode=default,noLockword=java/lang/String,noLockword=java/util/MapEntry,noLockword=java/util/HashMap$Entry,noLockword=org/apache/harmony/luni/util/ModifiedMap$Entry,noLockword=java/util/Hashtable$Entry,noLockword=java/lang/invoke/MethodType,noLockword=java/lang/invoke/MethodHandle,noLockword=java/lang/invoke/CollectHandle,noLockword=java/lang/invoke/ConstructorHandle,noLockword=java/lang/invoke/ConvertHandle,noLockword=java/lang/invoke/ArgumentConversionHandle,noLockword=java/lang/invoke/AsTypeHandle,noLockword=java/lang/invoke/ExplicitCastHandle,noLockword=java/lang/invoke/FilterReturnHandle,noLockword=java/lang/invoke/DirectHandle,noLockword=java/lang/invoke/ReceiverBoundHandle,noLockword=java/lang/invoke/DynamicInvokerHandle,noLockword=java/lang/invoke/FieldHandle,noLockword=java/lang/invoke/FieldGetterHandle,noLockword=java/lang/invoke/FieldSetterHandle,noLockword=java/lang/invoke/StaticFieldGetterHandle,noLockword=java/lang/invoke/StaticFieldSetterHandle,noLockword=java/lang/invoke/IndirectHandle,noLockword=java/lang/invoke/InterfaceHandle,noLockword=java/lang/invoke/VirtualHandle,noLockword=java/lang/invoke/PrimitiveHandle,noLockword=java/lang/invoke/InvokeExactHandle,noLockword=java/lang/invoke/InvokeGenericHandle,noLockword=java/lang/invoke/VarargsCollectorHandle,noLockword=java/lang/invoke/ThunkTuple -XX:+EnsureHashed:java/lang/Class,java/lang/Thread -Xjcl:jclse29 -Dcom.ibm.oti.vm.bootstrap.library.path=/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/default:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib -Dsun.boot.library.path=/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/default:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib -Djava.library.path=/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/default:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/default:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/jli:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/j9vm: -Djava.home=/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64 -Duser.dir=/u/users/zowe/zowe-vnightly-v3/runtime/components/apiml -Xms32m -Xmx512m -XX:+ExitOnOutOfMemoryError -Xquickstart -Xshareclasses:name=apiml_shared_classes,nonfatal --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.lang.invoke=ALL-UNNAMED --add-opens=java.base/java.nio.channels.spi=ALL-UNNAMED --add-opens=java.base/java.util=ALL-UNNAMED --add-opens=java.base/java.util.concurrent=ALL-UNNAMED --add-opens=java.base/javax.net.ssl=ALL-UNNAMED --add-opens=java.base/sun.nio.ch=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED -Dapiml.service.externalUrl=https://hostname:10010 -Dotel.resource.attributes.service.namespace=MINIPLEX_IT -Dapiml.cache.storage.location=/u/users/zowe/zowe-vnightly-v3/runtime/instance/workspace/api-mediation/de66 -Dapiml.catalog.customStyle.backgroundColor= -Dapiml.catalog.customStyle.docLink= -Dapiml.catalog.customStyle.fontFamily= -Dapiml.catalog.customStyle.headerColor= -Dapiml.catalog.customStyle.logo= -Dapiml.catalog.customStyle.textColor= -Dapiml.catalog.customStyle.titlesColor= -Dapiml.catalog.hide.serviceInfo=false -Dapiml.connection.idleConnectionTimeoutSeconds=5 -Dapiml.connection.timeout=60000 -Dapiml.connection.timeToLive=10000 -Dapiml.discovery.allPeersUrls=https://hostname:10011/eureka/ -Dapiml.discovery.password=*** -Dapiml.discovery.serviceIdPrefixReplacer= -Dapiml.discovery.staticApiDefinitionsDirectories=/u/users/zowe/zowe-vnightly-v3/runtime/instance/workspace/api-mediation/api-defs -Dapiml.discovery.userid=eureka -Dapiml.gateway.cachePeriodSec=120 -Dapiml.gateway.cookieNameForRateLimit=apimlAuthenticationToken -Dapiml.gateway.maxSimultaneousRequests=20 -Dapiml.gateway.rateLimiterCapacity=20 -Dapiml.gateway.rateLimiterRefillDuration=1 -Dapiml.gateway.rateLimiterTokens=20 -Dapiml.gateway.refresh-interval-ms=30000 -Dapiml.gateway.registry.enabled=false -Dapiml.gateway.registry.metadata-key-allow-list= -Dapiml.gateway.servicesToDisableRetry= -Dapiml.gateway.servicesToLimitRequestRate=discoverableclient -Dapiml.health.protected=false -Dapiml.httpclient.ssl.enabled-protocols=TLSv1.2,TLSv1.3 -Dapiml.internal-discovery.port=10011 -Dapiml.internal-discovery.address=0.0.0.0 -Dapiml.logs.location=/u/users/zowe/zowe-vnightly-v3/runtime/instance/logs -Dapiml.security.allowTokenRefresh=false -Dapiml.security.auth.cookieProperties.cookieName=apimlAuthenticationToken -Dapiml.security.auth.jwt.customAuthHeader= -Dapiml.security.auth.passticket.customAuthHeader= -Dapiml.security.auth.passticket.customUserHeader= -Dapiml.security.auth.provider=saf -Dapiml.security.auth.zosmf.jwtAutoconfiguration=jwt -Dapiml.security.auth.zosmf.serviceId=ibmzosmf -Dapiml.security.authorization.endpoint.enabled=false -Dapiml.security.authorization.endpoint.url=https://hostname:10010/zss/api/v1/saf-auth -Dapiml.security.authorization.provider=native -Dapiml.security.authorization.resourceClass=ZOWE -Dapiml.security.authorization.resourceNamePrefix=APIML. -Dapiml.security.jwtInitializerTimeout=5 -Dapiml.security.oidc.enabled=true -Dapiml.security.oidc.identityMapperUrl=https://hostname:10010/zss/api/v1/certificate/dn -Dapiml.security.oidc.identityMapperUser=ZWESVUSR -Dapiml.security.oidc.jwks.refreshInternalHours=1 -Dapiml.security.oidc.jwks.uri=https://dev-15878923.okta.com/oauth2/v1/keys,http://10.252.121.190:8080/realms/apiml/protocol/openid-connect/certs -Dapiml.security.oidc.registry=keycloak -Dapiml.security.oidc.userIdField=groups.memberOf -Dapiml.security.oidc.userInfo.uri= -Dapiml.security.oidc.validationType=JWK -Dapiml.security.personalAccessToken.enabled=true -Dapiml.security.rauditx.oidcSourceUserPaths=sub -Dapiml.security.rauditx.onOidcUserIsMapped=false -Dapiml.security.saf.provider=rest -Dapiml.security.saf.urls.authenticate=https://hostname:10010/zss/api/v1/saf/authenticate -Dapiml.security.saf.urls.verify=https://hostname:10010/zss/api/v1/saf/verify -Dapiml.security.ssl.nonStrictVerifySslCertificatesOfServices=false -Dapiml.security.ssl.verifySslCertificatesOfServices=true -Dapiml.security.useInternalMapper=true -Dapiml.security.x509.acceptForwardedCert=true -Dapiml.security.x509.certificatesUrls= -Dapiml.security.x509.enabled=true -Dapiml.security.x509.externalMapperUrl=https://hostname:10010/zss/api/v1/certificate/x509/map -Dapiml.security.x509.externalMapperUser=ZWESVUSR -Dapiml.security.x509.registry.allowedUsers= -Dapiml.security.zosmf.applid=IZUDFLT -Dapiml.service.allowEncodedSlashes=true -Dapiml.service.apimlId= -Dapiml.service.corsAllowedMethods=GET,HEAD,POST,PATCH,DELETE,PUT,OPTIONS -Dapiml.service.corsEnabled=false -Dapiml.service.forwardClientCertEnabled=true -Dapiml.service.hostname=hostname -Dapiml.service.port=10010 -Dapiml.zoweManifest=/u/users/zowe/zowe-vnightly-v3/runtime/manifest.json -Dcaching.storage.evictionStrategy=reject -Dcaching.storage.infinispan.initialHosts=localhost[7600] -Dcaching.storage.mode=infinispan -Dcaching.storage.size=10000 -Dcaching.storage.vsam.name= -Deureka.client.serviceUrl.defaultZone=https://hostname:10011/eureka/ -Dfile.encoding=UTF-8 -Dibm.serversocket.recover=true -Djava.io.tmpdir=/tmp -Djava.library.path=:/lib:/usr/lib:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/bin:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/bin/classic:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/bin/j9vm:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/s390x/classic:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/s390x/default:/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/lib/s390x/j9vm:../common-java-lib/bin/ -Djava.protocol.handler.pkgs=com.ibm.crypto.provider -Djavax.net.debug= -Djdk.tls.client.cipherSuites=TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_RSA_WITH_AES_256_GCM_SHA384,TLS_DHE_DSS_WITH_AES_256_GCM_SHA384,TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_DSS_WITH_AES_128_GCM_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_AES_128_GCM_SHA256,TLS_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_CBC_SHA256,TLS_RSA_WITH_AES_128_CBC_SHA256,TLS_RSA_WITH_AES_256_CBC_SHA,TLS_RSA_WITH_AES_128_CBC_SHA,TLS_EMPTY_RENEGOTIATION_INFO_SCSV -Djgroups.bind.address=hostname -Djgroups.bind.port=10016 -Djgroups.keyExchange.port=7601 -Djgroups.tcp.diag.enabled=false -Dloader.path=/u/users/zowe/zowe-vnightly-v3/runtime/instance/workspace/discovery/sharedLibs/,/u/users/zowe/zowe-vnightly-v3/runtime/instance/workspace/gateway/sharedLibs/,../apiml-common-lib/bin/BOOT-INF/lib/,/usr/include/java_classes/IRRRacf.jar -Dlogging.charset.console=UTF-8 -Dotel.exporter.otlp.endpoint=http://collector:4318 -Dotel.exporter.otlp.protocol=http/protobuf -Dotel.logs.exporter=otlp -Dotel.metrics.exporter=otlp -Dotel.traces.exporter=otlp -Dotel.sdk.disabled=false -Dserver.address=0.0.0.0 -Dserver.maxConnectionsPerRoute=100 -Dserver.maxTotalConnections=1000 -Dserver.ssl.ciphers=TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_RSA_WITH_AES_256_GCM_SHA384,TLS_DHE_DSS_WITH_AES_256_GCM_SHA384,TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_DSS_WITH_AES_128_GCM_SHA256,TLS_ECDH_ECDSA_WITH_AES_256_GCM_SHA384,TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384,TLS_ECDH_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDH_RSA_WITH_AES_128_GCM_SHA256,TLS_RSA_WITH_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384,TLS_AES_128_GCM_SHA256,TLS_AES_256_GCM_SHA384,TLS_RSA_WITH_AES_256_CBC_SHA256,TLS_RSA_WITH_AES_128_CBC_SHA256,TLS_RSA_WITH_AES_256_CBC_SHA,TLS_RSA_WITH_AES_128_CBC_SHA,TLS_EMPTY_RENEGOTIATION_INFO_SCSV -Dserver.ssl.enabled-protocols=TLSv1.2,TLSv1.3 -Dserver.ssl.enabled=true -Dserver.ssl.keyAlias=ROOTSTAR -Dserver.ssl.keyPassword=*** -Dserver.ssl.keyStore=safkeyringjce://ZWESVUSR/ZOWERING -Dserver.ssl.keyStorePassword=*** -Dserver.ssl.keyStoreType=JCERACFKS -Dserver.ssl.protocol=TLS -Dserver.ssl.trustStore=safkeyringjce://ZWESVUSR/ZOWERING -Dserver.ssl.trustStorePassword=*** -Dserver.ssl.trustStoreType=JCERACFKS -Dserver.webSocket.asyncWriteTimeout=60000 -Dserver.webSocket.connectTimeout=45000 -Dserver.webSocket.maxIdleTimeout=3600000 -Dspring.cloud.gateway.server.webflux.httpclient.websocket.max-frame-payload-length=3145728 -Dspring.profiles.active=zos -Djava.class.path=/u/users/zowe/zowe-vnightly-v3/runtime/components/apiml/bin/apiml-lite.jar -Dsun.java.command=/u/users/zowe/zowe-vnightly-v3/runtime/components/apiml/bin/apiml-lite.jar -Dsun.java.launcher=SUN_STANDARD -jar /u/users/zowe/zowe-vnightly-v3/runtime/components/apiml/bin/apiml-lite.jar"
                        }
                    },
                    {
                        "key": "process.executable.path",
                        "value": {
                            "stringValue": "/u/sys/java64bt/v17r0m0/usr/lpp/java/J17.0_64/bin/java"
                        }
                    },
                    {
                        "key": "process.pid",
                        "value": {
                            "intValue": "33620070"
                        }
                    },
                    {
                        "key": "process.runtime.description",
                        "value": {
                            "stringValue": "IBM Corporation IBM J9 VM z/OS-Release-17.0.10.0-b01"
                        }
                    },
                    {
                        "key": "process.runtime.name",
                        "value": {
                            "stringValue": "IBM Semeru Runtime Certified Edition for z/OS"
                        }
                    },
                    {
                        "key": "process.runtime.version",
                        "value": {
                            "stringValue": "17.0.10+7"
                        }
                    },
                    {
                        "key": "process.zos.jobname",
                        "value": {
                            "stringValue": "ZWE1AG"
                        }
                    },
                    {
                        "key": "process.zos.userid",
                        "value": {
                            "stringValue": "ZWESVUSR"
                        }
                    },
                    {
                        "key": "service.instance.id",
                        "value": {
                            "stringValue": "hostname:gateway:10010"
                        }
                    },
                    {
                        "key": "service.name",
                        "value": {
                            "stringValue": "apiml:MINIPLEX:10010"
                        }
                    },
                    {
                        "key": "service.namespace",
                        "value": {
                            "stringValue": "MINIPLEX_IT"
                        }
                    },
                    {
                        "key": "service.version",
                        "value": {
                            "stringValue": "3.5.7-PR-4456-3-SNAPSHOT"
                        }
                    },
                    {
                        "key": "telemetry.distro.name",
                        "value": {
                            "stringValue": "opentelemetry-spring-boot-starter"
                        }
                    },
                    {
                        "key": "telemetry.distro.version",
                        "value": {
                            "stringValue": "2.24.0"
                        }
                    },
                    {
                        "key": "telemetry.sdk.language",
                        "value": {
                            "stringValue": "java"
                        }
                    },
                    {
                        "key": "telemetry.sdk.name",
                        "value": {
                            "stringValue": "opentelemetry"
                        }
                    },
                    {
                        "key": "telemetry.sdk.version",
                        "value": {
                            "stringValue": "1.58.0"
                        }
                    },
                    {
                        "key": "zos.smf.id",
                        "value": {
                            "stringValue": "DE66"
                        }
                    },
                    {
                        "key": "zos.sysplex.name",
                        "value": {
                            "stringValue": "MINIPLEX"
                        }
                    }
                ]
            },
        }
    ]
}
```
