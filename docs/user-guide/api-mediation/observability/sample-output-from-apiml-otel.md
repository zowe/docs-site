# Sample Output from API ML OpenTelemetry

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
            "scopeMetrics": [
                {
                    "scope": {
                        "name": "io.opentelemetry.runtime-telemetry-java8",
                        "version": "2.24.0-alpha"
                    },
                    "metrics": [
                        {
                            "name": "jvm.class.unloaded",
                            "description": "Number of classes unloaded since JVM start.",
                            "unit": "{class}",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "1"
                                    }
                                ],
                                "aggregationTemporality": 2,
                                "isMonotonic": true
                            }
                        },
                        {
                            "name": "jvm.cpu.count",
                            "description": "Number of processors available to the Java virtual machine.",
                            "unit": "{cpu}",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "5"
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        },
                        {
                            "name": "jvm.memory.used_after_last_gc",
                            "description": "Measure of memory used, as measured after the most recent garbage collection event on this pool.",
                            "unit": "By",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "nursery-allocate"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "2987920"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "nursery-survivor"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "11337728"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "tenured-SOA"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "82599640"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "tenured-LOA"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "0"
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        },
                        {
                            "name": "jvm.memory.committed",
                            "description": "Measure of memory committed.",
                            "unit": "By",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "nursery-allocate"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "101777408"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "JIT data cache"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "8388608"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "nursery-survivor"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "11337728"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "class storage"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "385621432"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "tenured-SOA"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "112128000"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "tenured-LOA"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "5902336"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "miscellaneous non-heap storage"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "316341788"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "JIT code cache"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "268435456"
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        },
                        {
                            "name": "jvm.class.loaded",
                            "description": "Number of classes loaded since JVM start.",
                            "unit": "{class}",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "28177"
                                    }
                                ],
                                "aggregationTemporality": 2,
                                "isMonotonic": true
                            }
                        },
                        {
                            "name": "jvm.gc.duration",
                            "description": "Duration of JVM garbage collection actions.",
                            "unit": "s",
                            "histogram": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.gc.action",
                                                "value": {
                                                    "stringValue": "end of minor GC"
                                                }
                                            },
                                            {
                                                "key": "jvm.gc.name",
                                                "value": {
                                                    "stringValue": "scavenge"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "count": "1",
                                        "sum": 0.013,
                                        "bucketCounts": [
                                            "0",
                                            "1",
                                            "0",
                                            "0",
                                            "0"
                                        ],
                                        "explicitBounds": [
                                            0.01,
                                            0.1,
                                            1,
                                            10
                                        ],
                                        "min": 0.013,
                                        "max": 0.013
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        },
                        {
                            "name": "jvm.class.count",
                            "description": "Number of classes currently loaded.",
                            "unit": "{class}",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "28176"
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        },
                        {
                            "name": "jvm.thread.count",
                            "description": "Number of executing platform threads.",
                            "unit": "{thread}",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.thread.daemon",
                                                "value": {
                                                    "boolValue": false
                                                }
                                            },
                                            {
                                                "key": "jvm.thread.state",
                                                "value": {
                                                    "stringValue": "timed_waiting"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "11"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.thread.daemon",
                                                "value": {
                                                    "boolValue": true
                                                }
                                            },
                                            {
                                                "key": "jvm.thread.state",
                                                "value": {
                                                    "stringValue": "timed_waiting"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "51"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.thread.daemon",
                                                "value": {
                                                    "boolValue": true
                                                }
                                            },
                                            {
                                                "key": "jvm.thread.state",
                                                "value": {
                                                    "stringValue": "waiting"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "44"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.thread.daemon",
                                                "value": {
                                                    "boolValue": true
                                                }
                                            },
                                            {
                                                "key": "jvm.thread.state",
                                                "value": {
                                                    "stringValue": "runnable"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "17"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.thread.daemon",
                                                "value": {
                                                    "boolValue": false
                                                }
                                            },
                                            {
                                                "key": "jvm.thread.state",
                                                "value": {
                                                    "stringValue": "runnable"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "3"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.thread.daemon",
                                                "value": {
                                                    "boolValue": false
                                                }
                                            },
                                            {
                                                "key": "jvm.thread.state",
                                                "value": {
                                                    "stringValue": "waiting"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "1"
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        },
                        {
                            "name": "jvm.memory.used",
                            "description": "Measure of memory used.",
                            "unit": "By",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "nursery-allocate"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "40351672"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "JIT data cache"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "8388608"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "nursery-survivor"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "11337728"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "class storage"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "121356744"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "tenured-SOA"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "85335680"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "tenured-LOA"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "0"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "miscellaneous non-heap storage"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "19421080"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "JIT code cache"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "11724384"
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        },
                        {
                            "name": "jvm.cpu.recent_utilization",
                            "description": "Recent CPU utilization for the process as reported by the JVM.",
                            "unit": "1",
                            "gauge": {
                                "dataPoints": [
                                    {
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asDouble": 0.00486721590699673
                                    }
                                ]
                            }
                        },
                        {
                            "name": "jvm.memory.limit",
                            "description": "Measure of max obtainable memory.",
                            "unit": "By",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "nursery-allocate"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "120765440"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "JIT data cache"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "402653184"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "nursery-survivor"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "13452288"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "tenured-SOA"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "502057984"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "tenured-LOA"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "26424320"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "jvm.memory.pool.name",
                                                "value": {
                                                    "stringValue": "JIT code cache"
                                                }
                                            },
                                            {
                                                "key": "jvm.memory.type",
                                                "value": {
                                                    "stringValue": "non_heap"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "268435456"
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        },
                        {
                            "name": "jvm.cpu.time",
                            "description": "CPU time used by the process as reported by the JVM.",
                            "unit": "s",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asDouble": 34.89
                                    }
                                ],
                                "aggregationTemporality": 2,
                                "isMonotonic": true
                            }
                        }
                    ]
                },
                {
                    "scope": {
                        "name": "io.opentelemetry.exporters.otlp-http"
                    },
                    "metrics": [
                        {
                            "name": "otlp.exporter.exported",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "success",
                                                "value": {
                                                    "boolValue": false
                                                }
                                            },
                                            {
                                                "key": "type",
                                                "value": {
                                                    "stringValue": "log"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "13"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "success",
                                                "value": {
                                                    "boolValue": false
                                                }
                                            },
                                            {
                                                "key": "type",
                                                "value": {
                                                    "stringValue": "metric"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "19"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "success",
                                                "value": {
                                                    "boolValue": false
                                                }
                                            },
                                            {
                                                "key": "type",
                                                "value": {
                                                    "stringValue": "span"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "7"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "success",
                                                "value": {
                                                    "boolValue": true
                                                }
                                            },
                                            {
                                                "key": "type",
                                                "value": {
                                                    "stringValue": "span"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "6"
                                    }
                                ],
                                "aggregationTemporality": 2,
                                "isMonotonic": true
                            }
                        },
                        {
                            "name": "otlp.exporter.seen",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "type",
                                                "value": {
                                                    "stringValue": "log"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "13"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "type",
                                                "value": {
                                                    "stringValue": "metric"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "19"
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "type",
                                                "value": {
                                                    "stringValue": "span"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "13"
                                    }
                                ],
                                "aggregationTemporality": 2,
                                "isMonotonic": true
                            }
                        }
                    ]
                },
                {
                    "scope": {
                        "name": "io.opentelemetry.sdk.logs"
                    },
                    "metrics": [
                        {
                            "name": "processedLogs",
                            "description": "The number of logs processed by the BatchLogRecordProcessor. [dropped=true if they were dropped due to high throughput]",
                            "unit": "1",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "dropped",
                                                "value": {
                                                    "boolValue": false
                                                }
                                            },
                                            {
                                                "key": "processorType",
                                                "value": {
                                                    "stringValue": "BatchLogRecordProcessor"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "13"
                                    }
                                ],
                                "aggregationTemporality": 2,
                                "isMonotonic": true
                            }
                        },
                        {
                            "name": "otel.sdk.log.created",
                            "description": "The number of logs submitted to enabled SDK Loggers.",
                            "unit": "{log_record}",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "13"
                                    }
                                ],
                                "aggregationTemporality": 2,
                                "isMonotonic": true
                            }
                        },
                        {
                            "name": "queueSize",
                            "description": "The number of items queued",
                            "unit": "1",
                            "gauge": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "processorType",
                                                "value": {
                                                    "stringValue": "BatchLogRecordProcessor"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "0"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "scope": {
                        "name": "io.opentelemetry.sdk.trace"
                    },
                    "metrics": [
                        {
                            "name": "otel.sdk.span.started",
                            "description": "The number of created spans.",
                            "unit": "{span}",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "otel.span.parent.origin",
                                                "value": {
                                                    "stringValue": "none"
                                                }
                                            },
                                            {
                                                "key": "otel.span.sampling_result",
                                                "value": {
                                                    "stringValue": "RECORD_AND_SAMPLE"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "13"
                                    }
                                ],
                                "aggregationTemporality": 2,
                                "isMonotonic": true
                            }
                        },
                        {
                            "name": "processedSpans",
                            "description": "The number of spans processed by the BatchSpanProcessor. [dropped=true if they were dropped due to high throughput]",
                            "unit": "1",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "dropped",
                                                "value": {
                                                    "boolValue": false
                                                }
                                            },
                                            {
                                                "key": "processorType",
                                                "value": {
                                                    "stringValue": "BatchSpanProcessor"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "7"
                                    }
                                ],
                                "aggregationTemporality": 2,
                                "isMonotonic": true
                            }
                        },
                        {
                            "name": "otel.sdk.span.live",
                            "description": "The number of created spans with recording=true for which the end operation has not been called yet.",
                            "unit": "{span}",
                            "sum": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "otel.span.sampling_result",
                                                "value": {
                                                    "stringValue": "RECORD_AND_SAMPLE"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "0",
                                        "exemplars": [
                                            {
                                                "timeUnixNano": "1772541880626000000",
                                                "asInt": "-1",
                                                "traceId": "c8acdb37219602bf22a2217839335637",
                                                "spanId": "23dda0c6e72ef05f"
                                            },
                                            {
                                                "timeUnixNano": "1772541880452000000",
                                                "asInt": "-1",
                                                "traceId": "675afc75229c3bb33b9afc97e031f4d9",
                                                "spanId": "f17f7974d36fb607"
                                            }
                                        ]
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        },
                        {
                            "name": "queueSize",
                            "description": "The number of items queued",
                            "unit": "1",
                            "gauge": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "processorType",
                                                "value": {
                                                    "stringValue": "BatchSpanProcessor"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "asInt": "0"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "scope": {
                        "name": "io.opentelemetry.spring-webflux-5.3",
                        "version": "2.24.0-alpha"
                    },
                    "metrics": [
                        {
                            "name": "http.server.request.duration",
                            "description": "Duration of HTTP server requests.",
                            "unit": "s",
                            "histogram": {
                                "dataPoints": [
                                    {
                                        "attributes": [
                                            {
                                                "key": "http.request.method",
                                                "value": {
                                                    "stringValue": "POST"
                                                }
                                            },
                                            {
                                                "key": "http.response.status_code",
                                                "value": {
                                                    "intValue": "204"
                                                }
                                            },
                                            {
                                                "key": "http.route",
                                                "value": {
                                                    "stringValue": "/eureka/apps/{appId}"
                                                }
                                            },
                                            {
                                                "key": "url.scheme",
                                                "value": {
                                                    "stringValue": "https"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "count": "4",
                                        "sum": 7.581391481000001,
                                        "bucketCounts": [
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "1",
                                            "1",
                                            "1",
                                            "1",
                                            "0",
                                            "0",
                                            "0"
                                        ],
                                        "explicitBounds": [
                                            0.005,
                                            0.01,
                                            0.025,
                                            0.05,
                                            0.075,
                                            0.1,
                                            0.25,
                                            0.5,
                                            0.75,
                                            1,
                                            2.5,
                                            5,
                                            7.5,
                                            10
                                        ],
                                        "exemplars": [
                                            {
                                                "filteredAttributes": [
                                                    {
                                                        "key": "client.address",
                                                        "value": {
                                                            "stringValue": "192.168.0.1"
                                                        }
                                                    },
                                                    {
                                                        "key": "network.peer.address",
                                                        "value": {
                                                            "stringValue": "192.168.0.1"
                                                        }
                                                    },
                                                    {
                                                        "key": "network.peer.port",
                                                        "value": {
                                                            "intValue": "40306"
                                                        }
                                                    },
                                                    {
                                                        "key": "server.address",
                                                        "value": {
                                                            "stringValue": "hostname"
                                                        }
                                                    },
                                                    {
                                                        "key": "server.port",
                                                        "value": {
                                                            "intValue": "10011"
                                                        }
                                                    },
                                                    {
                                                        "key": "url.path",
                                                        "value": {
                                                            "stringValue": "/eureka/apps/DISCOVERABLECLIENT"
                                                        }
                                                    },
                                                    {
                                                        "key": "user_agent.original",
                                                        "value": {
                                                            "stringValue": "Jersey/3.1.11 (HttpUrlConnection 17.0.10)"
                                                        }
                                                    }
                                                ],
                                                "timeUnixNano": "1772541880452000000",
                                                "asDouble": 0.637613692,
                                                "traceId": "675afc75229c3bb33b9afc97e031f4d9",
                                                "spanId": "f17f7974d36fb607"
                                            },
                                            {
                                                "filteredAttributes": [
                                                    {
                                                        "key": "client.address",
                                                        "value": {
                                                            "stringValue": "192.168.0.1"
                                                        }
                                                    },
                                                    {
                                                        "key": "network.peer.address",
                                                        "value": {
                                                            "stringValue": "192.168.0.1"
                                                        }
                                                    },
                                                    {
                                                        "key": "network.peer.port",
                                                        "value": {
                                                            "intValue": "40307"
                                                        }
                                                    },
                                                    {
                                                        "key": "server.address",
                                                        "value": {
                                                            "stringValue": "hostname"
                                                        }
                                                    },
                                                    {
                                                        "key": "server.port",
                                                        "value": {
                                                            "intValue": "10011"
                                                        }
                                                    },
                                                    {
                                                        "key": "url.path",
                                                        "value": {
                                                            "stringValue": "/eureka/apps/DISCOVERABLECLIENT"
                                                        }
                                                    },
                                                    {
                                                        "key": "user_agent.original",
                                                        "value": {
                                                            "stringValue": "Jersey/3.1.11 (HttpUrlConnection 17.0.10)"
                                                        }
                                                    }
                                                ],
                                                "timeUnixNano": "1772541880626000000",
                                                "asDouble": 0.820471349,
                                                "traceId": "c8acdb37219602bf22a2217839335637",
                                                "spanId": "23dda0c6e72ef05f"
                                            }
                                        ],
                                        "min": 0.637613692,
                                        "max": 3.856180822
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "http.request.method",
                                                "value": {
                                                    "stringValue": "GET"
                                                }
                                            },
                                            {
                                                "key": "http.response.status_code",
                                                "value": {
                                                    "intValue": "200"
                                                }
                                            },
                                            {
                                                "key": "http.route",
                                                "value": {
                                                    "stringValue": "/eureka/apps/delta"
                                                }
                                            },
                                            {
                                                "key": "url.scheme",
                                                "value": {
                                                    "stringValue": "https"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "count": "1",
                                        "sum": 0.020681894,
                                        "bucketCounts": [
                                            "0",
                                            "0",
                                            "1",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0"
                                        ],
                                        "explicitBounds": [
                                            0.005,
                                            0.01,
                                            0.025,
                                            0.05,
                                            0.075,
                                            0.1,
                                            0.25,
                                            0.5,
                                            0.75,
                                            1,
                                            2.5,
                                            5,
                                            7.5,
                                            10
                                        ],
                                        "exemplars": [
                                            {
                                                "filteredAttributes": [
                                                    {
                                                        "key": "client.address",
                                                        "value": {
                                                            "stringValue": "192.168.0.1"
                                                        }
                                                    },
                                                    {
                                                        "key": "network.peer.address",
                                                        "value": {
                                                            "stringValue": "192.168.0.1"
                                                        }
                                                    },
                                                    {
                                                        "key": "network.peer.port",
                                                        "value": {
                                                            "intValue": "40307"
                                                        }
                                                    },
                                                    {
                                                        "key": "server.address",
                                                        "value": {
                                                            "stringValue": "hostname"
                                                        }
                                                    },
                                                    {
                                                        "key": "server.port",
                                                        "value": {
                                                            "intValue": "10011"
                                                        }
                                                    },
                                                    {
                                                        "key": "url.path",
                                                        "value": {
                                                            "stringValue": "/eureka/apps/delta"
                                                        }
                                                    },
                                                    {
                                                        "key": "user_agent.original",
                                                        "value": {
                                                            "stringValue": "Jersey/3.1.11 (HttpUrlConnection 17.0.10)"
                                                        }
                                                    }
                                                ],
                                                "timeUnixNano": "1772541878442000000",
                                                "asDouble": 0.020681894,
                                                "traceId": "aed881e5cca9de3d31bd617b76f3013b",
                                                "spanId": "29b674ab5e4034b1"
                                            }
                                        ],
                                        "min": 0.020681894,
                                        "max": 0.020681894
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "http.request.method",
                                                "value": {
                                                    "stringValue": "PUT"
                                                }
                                            },
                                            {
                                                "key": "http.response.status_code",
                                                "value": {
                                                    "intValue": "404"
                                                }
                                            },
                                            {
                                                "key": "http.route",
                                                "value": {
                                                    "stringValue": "/eureka/apps/{appId}/{instanceId}"
                                                }
                                            },
                                            {
                                                "key": "url.scheme",
                                                "value": {
                                                    "stringValue": "https"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "count": "2",
                                        "sum": 1.560843201,
                                        "bucketCounts": [
                                            "0",
                                            "1",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "1",
                                            "0",
                                            "0",
                                            "0",
                                            "0"
                                        ],
                                        "explicitBounds": [
                                            0.005,
                                            0.01,
                                            0.025,
                                            0.05,
                                            0.075,
                                            0.1,
                                            0.25,
                                            0.5,
                                            0.75,
                                            1,
                                            2.5,
                                            5,
                                            7.5,
                                            10
                                        ],
                                        "exemplars": [
                                            {
                                                "filteredAttributes": [
                                                    {
                                                        "key": "client.address",
                                                        "value": {
                                                            "stringValue": "192.168.0.1"
                                                        }
                                                    },
                                                    {
                                                        "key": "network.peer.address",
                                                        "value": {
                                                            "stringValue": "192.168.0.1"
                                                        }
                                                    },
                                                    {
                                                        "key": "network.peer.port",
                                                        "value": {
                                                            "intValue": "40307"
                                                        }
                                                    },
                                                    {
                                                        "key": "server.address",
                                                        "value": {
                                                            "stringValue": "hostname"
                                                        }
                                                    },
                                                    {
                                                        "key": "server.port",
                                                        "value": {
                                                            "intValue": "10011"
                                                        }
                                                    },
                                                    {
                                                        "key": "url.path",
                                                        "value": {
                                                            "stringValue": "/eureka/apps/DISCOVERABLECLIENT/hostname:discoverableclient:10019"
                                                        }
                                                    },
                                                    {
                                                        "key": "url.query",
                                                        "value": {
                                                            "stringValue": "status=UP&lastDirtyTimestamp=1772541847510"
                                                        }
                                                    },
                                                    {
                                                        "key": "user_agent.original",
                                                        "value": {
                                                            "stringValue": "Jersey/3.1.11 (HttpUrlConnection 17.0.10)"
                                                        }
                                                    }
                                                ],
                                                "timeUnixNano": "1772541879801000000",
                                                "asDouble": 0.005682501,
                                                "traceId": "c72468e1657ab67e73b0b8ef349e14de",
                                                "spanId": "30efef1c7bd813ea"
                                            }
                                        ],
                                        "min": 0.005682501,
                                        "max": 1.5551607
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "http.request.method",
                                                "value": {
                                                    "stringValue": "GET"
                                                }
                                            },
                                            {
                                                "key": "http.response.status_code",
                                                "value": {
                                                    "intValue": "200"
                                                }
                                            },
                                            {
                                                "key": "http.route",
                                                "value": {
                                                    "stringValue": "/application/health"
                                                }
                                            },
                                            {
                                                "key": "url.scheme",
                                                "value": {
                                                    "stringValue": "https"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "count": "2",
                                        "sum": 1.114082399,
                                        "bucketCounts": [
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "1",
                                            "0",
                                            "0",
                                            "1",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0"
                                        ],
                                        "explicitBounds": [
                                            0.005,
                                            0.01,
                                            0.025,
                                            0.05,
                                            0.075,
                                            0.1,
                                            0.25,
                                            0.5,
                                            0.75,
                                            1,
                                            2.5,
                                            5,
                                            7.5,
                                            10
                                        ],
                                        "min": 0.218026817,
                                        "max": 0.896055582
                                    },
                                    {
                                        "attributes": [
                                            {
                                                "key": "http.request.method",
                                                "value": {
                                                    "stringValue": "GET"
                                                }
                                            },
                                            {
                                                "key": "http.response.status_code",
                                                "value": {
                                                    "intValue": "200"
                                                }
                                            },
                                            {
                                                "key": "http.route",
                                                "value": {
                                                    "stringValue": "/eureka/apps/"
                                                }
                                            },
                                            {
                                                "key": "url.scheme",
                                                "value": {
                                                    "stringValue": "https"
                                                }
                                            }
                                        ],
                                        "startTimeUnixNano": "1772541736930323508",
                                        "timeUnixNano": "1772541886939315458",
                                        "count": "1",
                                        "sum": 1.979679354,
                                        "bucketCounts": [
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "0",
                                            "1",
                                            "0",
                                            "0",
                                            "0",
                                            "0"
                                        ],
                                        "explicitBounds": [
                                            0.005,
                                            0.01,
                                            0.025,
                                            0.05,
                                            0.075,
                                            0.1,
                                            0.25,
                                            0.5,
                                            0.75,
                                            1,
                                            2.5,
                                            5,
                                            7.5,
                                            10
                                        ],
                                        "min": 1.979679354,
                                        "max": 1.979679354
                                    }
                                ],
                                "aggregationTemporality": 2
                            }
                        }
                    ],
                    "schemaUrl": "https://opentelemetry.io/schemas/1.37.0"
                }
            ],
            "schemaUrl": "https://opentelemetry.io/schemas/1.24.0"
        }
    ]
}
```
