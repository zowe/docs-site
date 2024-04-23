module.exports = {
  "whats-new": [
    //id of the sidebar
    "whats-new/zowe-announcements",
    {
      type: "category", // doc(default), 'link'(external links), 'ref'(page without without sidebar)
      label: "Release notes",
      className: "ToCheadercolor",
      link: {type:"doc", id:"whats-new/release-notes/release-notes-overview"},
      items: [
        "whats-new/release-notes/v2_15_0",       
        "whats-new/release-notes/v2_14_0",
        "whats-new/release-notes/v2_13_0",
        "whats-new/release-notes/v2_12_0",
        "whats-new/release-notes/v2_11_0",
        "whats-new/release-notes/v2_10_0",
        "whats-new/release-notes/v2_9_0",
        "whats-new/release-notes/v2_8_0",
        "whats-new/release-notes/v2_7_0",
        "whats-new/release-notes/v2_6_1",
        "whats-new/release-notes/v2_6_0",
        "whats-new/release-notes/v2_5_0",
        "whats-new/release-notes/v2_4_0",
        "whats-new/release-notes/v2_3_1",
        "whats-new/release-notes/v2_3_0",
        "whats-new/release-notes/v2_2_0",
        "whats-new/release-notes/v2_1_0",
        "whats-new/release-notes/v2_0_0",
      ],
    },
    "whats-new/zowe-v3-office-hours",
    "whats-new/breaking-changes-v3",
  ],
  "getting-started": [
    {
      type: "category", // doc(default), 'link'(external links), 'ref'(page without without sidebar)
      label: "Zowe fundamentals",
      className: "ToCheadercolor",
      link: {type:"doc", id:"getting-started/overview"},
      collapsed: false,
      items: [
        "getting-started/zowe-architecture",
        {
          type: "category",
          label: "Zowe security",
          link: {type: "doc", id: "getting-started/zowe-security-overview"},
          items: [
            { type: "doc",
            label: "Glossary of Zowe Security terminology",
            id: "appendix/zowe-security-glossary",
            },
            { type: "doc",
              label: "Digital Certificates",
              id: "getting-started/zowe-certificates-overview",
            },
            { type: "doc",
              label: "User authentication",
              id: "getting-started/zowe-security-authentication",
            }
          ],
        },
        "getting-started/zowe-high-availability"
      ],
    },
    "appendix/zowe-glossary",
    {
      type: "category",
      label: "Zowe FAQ",
      className: "ToCheadercolor",
      link: {type: "doc", id: "getting-started/zowe_faq"},
      items: [
        "getting-started/zowe_v2_faq",
      ],
    },
    "getting-started/zowe-office-hours",
    {
      type: "doc",
      label: "Zowe CLI quick start",
      className: "ToCitemcolor",
      id:"getting-started/cli-getting-started",
    },
    {
      type: "doc",
      label: "Migrating Zowe server component from V1 to V2",
      className: "ToCitemcolor",
      id:"extend/migrate-extensions",
    },
    {
      type: "doc",
      label: "Zowe learning resources",
      className: "ToCitemcolor",
      id:"getting-started/zowe-resources",
    },
  ],
  "setup":[
    "user-guide/install-overview",
    {
      type: "category",
      label: "Installing Zowe server-side components",
      link: {type: "doc", id: "user-guide/install-zos"},
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Preparing for installation",
          link: {type: "doc", id: "user-guide/installandconfig"},
          items: [
            "user-guide/zos-components-installation-checklist",
            "user-guide/systemrequirements-zos",
            "user-guide/install-nodejs-zos",
            "user-guide/address-security-requirements",
            "user-guide/address-authentication-requirements",
            "user-guide/configure-uss",
            "user-guide/address-storage-requirements",
            "user-guide/address-network-requirements",
            "user-guide/address-browser-requirements",
          ]
        },
        {
          type: "category",
          label: "Installing Zowe via SMP/E",
          link: {type:"doc", id: "user-guide/install-zowe-smpe-overview"},
          items: [
            "user-guide/install-zowe-smpe",
          ]
        },
        {
          type: "category",
          label: "Installing Zowe via z/OSMF from PSWI and SMP/E workflow",
          link: {type:"doc", id:"user-guide/zosmf-install"},
          items: [
            "user-guide/install-zowe-pswi-address-requirements",
            "user-guide/systemrequirements-zosmf",
            "user-guide/systemrequirements-zosmf-lite",
            {
              type: "category",
              label: "Installing Zowe via z/OSMF from PSWI",
              link: {type:"doc", id:"user-guide/install-zowe-pswi"},
              items: [
                "user-guide/install-zowe-pswi-acquire",
                "user-guide/install-zowe-pswi-deployment",
              ],
              },
              "user-guide/install-zowe-smpe-zosmf-workflow",
            ],
        },
        "user-guide/install-zowe-zos-convenience-build",
        {
          type: "category",
          label: "Installing Zowe via a containerization build (PAX file)",
          link: {type:"doc", id:"user-guide/k8s-introduction"},
          items: [
            "user-guide/k8s-prereqs",
            "user-guide/k8s-downloading",
            "user-guide/k8s-config",
            "user-guide/k8s-using",
          ],
        },
		    {
          type: "category",
          label: "Configuring",
          link: {type:"doc", id:"user-guide/configuring-overview"},
          items: [
            {
              type: "category",
              label: "Initializing Zowe z/OS runtime",
              link: {type:"doc", id:"user-guide/configure-zowe-runtime"},
              items: [
                "user-guide/initialize-zos-system",
                "user-guide/zwe-init-subcommand-overview",
                "user-guide/configure-zowe-zosmf-workflow",
              ],
            },
            {
              type: "category",
              label: "Configuring security",
              link: {type:"doc", id:"user-guide/configuring-security"},
              items: [
                "user-guide/initialize-security-configuration",
                "user-guide/apf-authorize-load-library",
                "user-guide/configure-zos-system",
                "user-guide/assign-security-permissions-to-users",
                 ],
            },
            {
              type: "category",
              label: "Configuring certificates",
              link: {type:"doc", id:"user-guide/configure-certificates"},
              items: [
                "user-guide/certificates-configuration-questionnaire",
                "user-guide/certificate-configuration-scenarios",
                "user-guide/import-certificates",
                "user-guide/generate-certificates",
                "user-guide/use-certificates",
                "user-guide/certificates-setup",
              ],
            },
            {
              type: "category",
              label: "Configuring the Zowe cross memory server (ZIS)",
              link: {type:"doc", id:"user-guide/configure-xmem-server"},
              items: [],
            }, 
            {
              type: "category",
              label: "Configuring high availability (optional)",
              link: {type:"doc", id:"user-guide/zowe-ha-overview"},
              items: [
                "user-guide/configure-sysplex",
                "user-guide/systemrequirements-zosmf-ha",
                "user-guide/configure-caching-service-ha",
                  ],
            },
              ],
        },
        "user-guide/start-zowe-zos",
        "user-guide/verify-zowe-runtime-install",
        {
          type: "category",
          label: "Advanced server-side configuration",
          items: [
            "user-guide/mvd-configuration",
            "user-guide/configmgr-using",
            "user-guide/install-configure-zos-extensions",
          ],
        },
        {
          type: "category",
          label: "Advanced API Mediation Layer Configuration",
          link: { type: "doc", id: "user-guide/advanced-apiml-configuration" },
          items: [
            {
              type: "category",
              label: "Enabling single sign on for clients",
              link: { type: "doc", id: "user-guide/api-mediation/configuration-single-sign-on-user" },
              items: [
                "user-guide/api-mediation/configuration-client-certificates",
                "user-guide/api-mediation/configuration-personal-access-token",
                "user-guide/api-mediation/configuration-jwt"
                  ],
            },
            {
              type: "category",
              label: "Enabling single sign on for extending services",
              link: { type: "doc", id: "user-guide/api-mediation/configuration-enable-single-sign-on-extenders" },
              items: [
                "user-guide/api-mediation/configuration-extender-jwt",
                "user-guide/api-mediation/configuration-extender-passtickets"
                  ],
            },
            {
              type: "category",
              label: "Customizing routing behavior",
              link: { type: "doc", id: "user-guide/api-mediation/configuration-routing" },
              items: [
                {
                  type: "category",
                  label: "Customizing management of API ML load limits",
                  link: { type: "doc", id: "user-guide/api-mediation/configuration-customizing-management-of-apiml-load-limits" },
                    items: [
                        "user-guide/api-mediation/configuration-connection-limits",
                        "user-guide/api-mediation/configuration-gateway-timeouts"
                      ],
                },
                "user-guide/api-mediation/configuration-cors",
                "user-guide/api-mediation/configuration-url-handling",
                "user-guide/api-mediation/configuration-gateway-retry-policy",
                "user-guide/api-mediation/configuration-unique-cookie-name-for-multiple-zowe-instances",
                "user-guide/api-mediation/configuration-access-specific-instance-of-service",
                "user-guide/api-mediation/configuration-distributed-load-balancer-cache",
                "user-guide/api-mediation/configuration-set-consistent-service-id"
                  ],
            },
            {
              type: "category",
              label: "Configuring authorization for API ML",
              link: { type: "doc", id: "user-guide/api-mediation/configuration-authorization" },
              items: [
                "user-guide/api-mediation/configuration-limiting-access-to-info-or-services-in-api-catalog",
                "user-guide/api-mediation/configuration-saf-resource-checking"
              ],
            },                
            "user-guide/api-mediation/configuration-customizing-the-api-catalog-ui",
            "user-guide/api-mediation/configuration-at-tls"
          ],
          }
        ],
    },    
    {
      type: "category",
      label: "Installing Zowe client-side components",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Zowe CLI",
          link: {type:"doc", id:"user-guide/user-roadmap-zowe-cli"},
          items: [
            "user-guide/systemrequirements-cli",
            "user-guide/cli-install-cli-checklist",
          {
          type: "category",
          label: "Installing Zowe CLI",
          link: {type:"doc", id:"user-guide/cli-installcli"},
          items: [
            "user-guide/cli-configure-scs-on-headless-linux-os",
            "user-guide/cli-configure-cli-on-os-where-scs-unavailable",
            "user-guide/cli-install-cli-nodejs-windows",
          ],
          },
            "user-guide/install-cli-via-proxy",
            "user-guide/cli-updatingcli",
            "user-guide/cli-uninstall",   
            {
              type: "category",
              label: "Advanced Zowe CLI configuration",
              items: [
                "user-guide/cli-configuringcli-ev",
                "user-guide/cli-configuringcli-evfile",
              ],
            }, 
          ],
        },
        {
          type: "category",
          label: "Zowe Explorer",
          link: {type:"doc", id:"getting-started/user-roadmap-zowe-explorer"},
          items: [
            "getting-started/ZE-system-reqs",
            "user-guide/ze-install",
            "user-guide/ze-profiles",
          ],
        },
        {
          type: "category",
          label: "Zowe Chat (Technical Preview)",
          link: {type:"doc", id:"user-guide/zowe-chat/introduction"},
          items: [
            "user-guide/zowe-chat/systemrequirements-chat",
            {
              type: "category",
              label: "Configuring chat platforms",
              link: {type:"doc", id:"user-guide/zowe-chat/chat_configure_chat_platforms"},
              items: [
                {
                  type: "category",
                  label: "Configuring Mattermost",
                  link: {type:"doc", id:"user-guide/zowe-chat/chat_prerequisite_mattermost"},
                  items: [
                    "user-guide/zowe-chat/chat_prerequisite_install_mattermost",
                    "user-guide/zowe-chat/chat_prerequisite_mattermost_admin_account",
                    "user-guide/zowe-chat/chat_prerequisite_mattermost_bot_account",
                    "user-guide/zowe-chat/chat_prerequisite_mattermost_invite_team",
                    "user-guide/zowe-chat/chat_prerequisite_mattermost_invite_channel",
                    "user-guide/zowe-chat/chat_prerequisite_mattermost_enable_connection",
                  ],
                },
                {
                  type: "category",
                  label: "Configuring Microsoft Teams",
                  link: {type:"doc", id:"user-guide/zowe-chat/chat_prerequisite_teams"},
                  items: [
                    "user-guide/zowe-chat/chat_prerequisite_teams_create_app_developer_portal",
                    {
                      type: "category",
                      label: "Creating a bot for Microsoft Teams bot app",
                      link: {type:"doc", id:"user-guide/zowe-chat/chat_prerequisite_teams_create_bot"},
                      items: [
                        "user-guide/zowe-chat/chat_prerequisite_teams_create_bot_framework",
                        "user-guide/zowe-chat/chat_prerequisite_teams_create_bot_azure",
                      ],
                    },
                    {
                      type: "category",
                      label: "Configuring messaging endpoint",
                      link: {type:"doc", id:"user-guide/zowe-chat/chat_prerequisite_teams_configure_endpoint"},
                      items: [
                        "user-guide/zowe-chat/chat_prerequisite_teams_configure_endpoint_framework",
                        "user-guide/zowe-chat/chat_prerequisite_teams_configure_endpoint_azure",
                      ],
                    },
                  ],
                },
                {
                  type: "category",
                  label: "Configuring Slack",
                  link: {type:"doc", id:"user-guide/zowe-chat/chat_prerequisite_slack"},
                  items: [
                    "user-guide/zowe-chat/chat_prerequisite_slack_create_app",
                    {
                      type: "category",
                      label: "Configuring and connecting Slack app",
                      items: [
                        "user-guide/zowe-chat/chat_prerequisite_slack_configure_app",
                        "user-guide/zowe-chat/chat_prerequisite_slack_socket_mode",
                        "user-guide/zowe-chat/chat_prerequisite_slack_http_endpoint",
                      ],
                    },
                    "user-guide/zowe-chat/chat_prerequisite_slack_install",
                    "user-guide/zowe-chat/chat_prerequisite_slack_invite_app_to_channel",
                  ],
                },
              ],
            },
            "user-guide/zowe-chat/chat_install_overview",
            {
              type: "category",
              label: "Configuring Zowe Chat",
              link: {type:"doc", id:"user-guide/zowe-chat/chat_configure_server"},
              items: [
                "user-guide/zowe-chat/chat_configure_mattermost",
                "user-guide/zowe-chat/chat_configure_teams",
                "user-guide/zowe-chat/chat_configure_slack",
              ],
            },
            "user-guide/zowe-chat/chat_start_stop",
            "user-guide/zowe-chat/chat_uninstall",
          ],
        },
        {
          type: "category",
          label: "Zowe IntelliJ Plug-in",
          link: {type:"doc", id:"user-guide/intellij-install"},
          items: [
            "user-guide/intellij-configure",
          ],
        },
  ],
},
  ],             
  "use": [
    "user-guide/zowe-getting-started-tutorial",
    {
      type: "category",
      label: "Zowe server-side components",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Using Zowe Desktop",
          link: {type:"doc", id:"user-guide/mvd-using"},
          items: [
            "user-guide/mvd-editor",
          ],
        },
        {
          type: "category",
          label: "Using Zowe API Mediation Layer",
          link: {type:"doc", id:"user-guide/api-mediation/using-api-mediation-layer"},
          items: [
            "getting-started/user-roadmap-apiml",
            {
              type: "category",
              label: "Using Single Sign On",
              link: {type:"doc", id:"user-guide/api-mediation-sso"},
              items: [
                "user-guide/authenticating-with-jwt-token",
                "user-guide/authenticating-with-client-certificates",
                "user-guide/api-mediation/authenticating-with-personal-access-token",
              ],
            },
            {
              type: "category",
              label: "Using multi-factor authentication (MFA)",
	      link: {type:"doc", id:"user-guide/api-mediation/using-multi-factor-authentication"},
              items: [
              ],
            },
            {
              type: "category",
              label: "API Routing",
              items: [
                "user-guide/api-mediation/routing-requests-to-rest-apis",
                "user-guide/routing-with-websockets",
                "user-guide/api-mediation/use-graphql-api",
                "user-guide/api-mediation/api-mediation-multi-tenancy",
              ],
            },
            {
              type: "category",
              label: "Learning more about APIs",
              items: [
                "user-guide/obtaining-information-about-api-services",
                "user-guide/api-mediation-swagger-try-it-out",
                "user-guide/api-mediation-swagger-code-snippets",
              ],
            },
            {
              type: "category",
              label: "Administrating APIs",
              items: [
                "user-guide/api-mediation-static-api-refresh",
                "user-guide/onboard-wizard",
              ],
            },
            {
              type: "category",
              label: "Using the Caching Service",
              link: {type:"doc", id:"user-guide/api-mediation/api-mediation-caching-service"},
              items: [
              ],
            },
            {
              type: "category",
              label: "Using API Catalog",
              items: [
                "user-guide/api-mediation-view-service-information-and-api-doc",
                "user-guide/api-mediation-change-password-via-catalog",
              ],
            },
            "user-guide/api-mediation/api-mediation-update-password",
            "user-guide/api-mediation-metrics-service",
            "user-guide/api-mediation/api-mediation-smf",
          ],
        },        
      ],
    },
    {
      type: "category",
      label: "Zowe client-side components",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Using Zowe CLI",
          link: {type:"doc", id:"user-guide/cli-using-usingcli"},
          items: [
            "user-guide/cli-using-displaying-help",
            "user-guide/cli-using-command-precedence",
            "user-guide/cli-using-understanding-core-command-groups",
            "user-guide/cli-using-issuing-first-command",
            {
              type: "category",
              label: "Using team profiles",
              link: {type:"doc", id:"user-guide/cli-using-using-team-profiles"},
              items: [
                "user-guide/cli-using-initializing-team-configuration",
                "user-guide/cli-using-test-zosmf-connection",
                "user-guide/cli-using-team-configuration-application-developers",
                "user-guide/cli-using-team-configuration-team-leaders",
                "user-guide/cli-using-sharing-team-config-files",
                "user-guide/cli-using-understand-profiles-configs",
                "user-guide/cli-using-team-managing-credential-security",
                "user-guide/cli-using-global-storing-properties-automatically",
              ],
            },
            {
              type: "category",
              label: "Configuring daemon mode",
              link: {type:"doc", id:"user-guide/cli-using-using-daemon-mode"},
              items: [
                "user-guide/cli-configure-daemon-on-zlinux-os",
              ],
            },
            "user-guide/cli-using-using-profiles-v1",
            "user-guide/cli-using-integrating-apiml",
            "user-guide/cli-using-working-certificates",
            {
              type: "category",
              label: "Using environment variables",
              link: {type:"doc", id:"user-guide/cli-using-using-environment-variables"},
              items: [
                "user-guide/cli-using-formatting-environment-variables",
                "user-guide/cli-using-setting-environment-variables-in-automation-server",
              ],
            },
            "user-guide/cli-using-using-prompt-feature",
            "user-guide/cli-using-writing-scripts",
            {
              type: "category",
              label: "Zowe CLI plug-ins",
              link: {type:"doc", id:"user-guide/cli-extending"},
              items: [
                "user-guide/cli-swreqplugins",
                "user-guide/cli-installplugins",
                "user-guide/cli-cicsplugin",
                {
                  type: "category",
                  label: "IBM® Db2® Database Plug-in for Zowe CLI",
                  link: {type:"doc", id:"user-guide/cli-db2plugin"},
                  items: [
                    "user-guide/cli-db2-install-m1",
                  ],
                },
                "user-guide/cli-ftpplugin",
                "user-guide/cli-imsplugin",
                "user-guide/cli-mqplugin",
                "user-guide/cli-idfplugin",
              ],
            },    
          ],
        },        
        {
          type: "category",
          label: "Using Zowe Explorer",
          link: {type:"doc", id:"user-guide/ze-usage"},
          items: [
            "user-guide/ze-usage-tips",
            "user-guide/ze-working-with-data-sets",
            "user-guide/ze-working-with-uss-files",
            "user-guide/ze-working-with-jobs",
            {
              type: "category",
              label: "Zowe Explorer extensions",
              items: [
                {
                  type: "category",
                  label: "Zowe Explorer CICS Extension",
                  link: {type:"doc", id:"user-guide/ze-install-zowe-explorer-cics-ext"},
                  items: [
                    "user-guide/ze-using-zowe-explorer-cics-ext",
                    "user-guide/ze-create-zowe-explorer-cics-ext-profiles",
                    "user-guide/ze-use-cics-resources",
                    "user-guide/ze-override-tls-certs",
                    "user-guide/ze-cics-usage-tips",
                    "user-guide/ze-provide-feedback-contribute",
                  ],
                },
                {
                  type: "category",
                  label: "Zowe Explorer FTP Extension",
                  link: {type:"doc", id:"user-guide/ze-ftp-install-ze-ftp-ext"},
                  items: [
                    "user-guide/ze-ftp-using-ze-ftp-ext",
                    "user-guide/ze-ftp-supported-functions",
                    "user-guide/ze-ftp-provide-feedback-contribute",
                  ],
                },
              ],
            },
          ],
        },
        "user-guide/zowe-chat/chat_use_interact_methods",
        {
          type: "category",
          label: "Using Zowe IntelliJ Plug-in",
          link: {type:"doc", id:"user-guide/intellij-using"},
          items: [
            "user-guide/intellij-working-sets",
          ],
        },
        "user-guide/sdks-using",        
      ],
    },
  ],
  "extending": [
    "extend/extend-zowe-overview",
    "extend/zowe-conformance-program",  
    {
      type: "category",
      label: "Developing server-side components",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Fundamentals",
          items: [
            "extend/packaging-zos-extensions",
            "extend/server-schemas",
            "extend/component-registries",
            "extend/lifecycling-with-zwesvstc",
            "extend/k8s-extend",
            "extend/k8s-conformance",
          ],
        },
        {
          type: "category",
          label: "Developing for Zowe API Mediation Layer",
          items: [
            "extend/extend-apiml/onboard-overview",
            "extend/extend-apiml/onboard-plain-java-enabler",
            "extend/extend-apiml/onboard-plain-java-enabler-external-configuration",
            "extend/extend-apiml/onboard-direct-eureka-call",
            "extend/extend-apiml/onboard-spring-boot-enabler",
            "extend/extend-apiml/onboard-micronaut-enabler",
            "extend/extend-apiml/onboard-nodejs-enabler",
            "extend/extend-apiml/onboard-static-definition",
            "extend/extend-apiml/create-apiml-extension",
            "extend/extend-apiml/api-mediation-message-service",
            "extend/extend-apiml/custom-metadata",
            "extend/extend-apiml/api-mediation-versioning",
            "extend/extend-apiml/implement-new-saf-provider",
            {
              type: "category",
              label: "Zowe API Mediation Layer Security",
              items: [
                "extend/extend-apiml/zowe-api-mediation-layer-security-overview",
                "extend/extend-apiml/authentication-for-apiml-services",
                "extend/extend-apiml/zaas-client",
                "extend/extend-apiml/certificate-management-in-zowe-apiml",
                "extend/extend-apiml/api-mediation-oidc-authentication",
              ],
            },
            {
              type: "category",
              label: "Implementing routing to API Gateway",
			        link: {type:"doc", id:"extend/extend-apiml/implementing-routing-to-the-api-gateway"},
              items: [
              ],
            },
            {
              type: "category",
              label: "Configuring storage for the Caching service",
              items: [
                "extend/extend-apiml/api-mediation-infinispan",
                "extend/extend-apiml/api-mediation-vsam",
                "extend/extend-apiml/api-mediation-redis",
                "extend/extend-apiml/api-mediation-infinispan",
              ],
            }
          ],
        },
        {
          type: "category",
          label: "Developing for Zowe Application Framework",
          items: [
            "extend/extend-desktop/mvd-extendingzlux",
            "extend/extend-desktop/mvd-plugindefandstruct",
            "extend/extend-desktop/mvd-buildingplugins",
            "extend/extend-desktop/mvd-installplugins",
            "extend/extend-desktop/mvd-embeddingplugins",
            "extend/extend-desktop/mvd-dataservices",
            "extend/extend-desktop/mvd-authentication-api",
            "extend/extend-desktop/mvd-internationalization",
            "extend/extend-desktop/mvd-desktopandwindowmgt",
            "extend/extend-desktop/mvd-configdataservice",
            "extend/extend-desktop/mvd-uribroker",
            "extend/extend-desktop/mvd-apptoappcommunication",
            "extend/extend-desktop/mvd-iframecomm",
            "extend/extend-desktop/mvd-errorreportingui",
            "extend/extend-desktop/mvd-logutility",
            "extend/extend-desktop/mvd-conda",
          ],
        },        
      ],
    },
    {
      type: "category",
      label: "Developing client-side components",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Developing for Zowe CLI",
          link: {type:"doc", id:"extend/extend-cli/cli-devTutorials"},
          items: [
            "extend/extend-cli/cli-setting-up",
            "extend/extend-cli/cli-creating-plug-in-lifecycle-actions",
            "extend/extend-cli/cli-installing-sample-plugin",
            "extend/extend-cli/cli-extending-a-plugin",
            "extend/extend-cli/cli-developing-a-plugin",
            "extend/extend-cli/cli-implement-profiles",
          ],
        },
        
        "extend/extend-ze/ze-extensions",
        "getting-started/user-roadmap-client-sdk",
        "extend/extend-sdks",      
      ],
    },    
  ],
  "troubleshooting": [
    {
      type: "category",
      label: "Troubleshooting overview",
      link: {type:"doc", id:"troubleshoot/troubleshooting"},
      items: [
        "troubleshoot/troubleshoot-zowe-release",
        "troubleshoot/troubleshoot-check-your-zowe-version",
      ],
    },
    {
      type: "category",
      label: "Zowe server-side components",
      collapsed: false,
      items: [
        "troubleshoot/servers/must-gather",
        "troubleshoot/verify-fingerprint",
        "troubleshoot/k8s-troubleshoot",
        "troubleshoot/servers/return-codes",
        "troubleshoot/troubleshoot-zos-certificate",
        {
          type: "category",
          label: "Troubleshooting Zowe API Mediation Layer",
          link: {type:"doc", id:"troubleshoot/troubleshoot-apiml",},
          items: [
            "troubleshoot/troubleshoot-apiml-error-codes",
          ],
        },
        {
          type: "category",
          label: "Troubleshooting Zowe Application Framework",
          link: {type:"doc", id:"troubleshoot/app-framework/app-troubleshoot"},
          items: [
            "troubleshoot/app-framework/app-mustgather",
            "troubleshoot/app-framework/app-issue",
            "troubleshoot/app-framework/appfw-tracing",
            "troubleshoot/app-framework/app-return-codes",
            "troubleshoot/app-framework/appserver-error-codes",
            "troubleshoot/app-framework/zss-error-codes",
            "troubleshoot/app-framework/zis-error-codes",
          ],
        },
        {
          type: "category",
          label: "Troubleshooting Zowe Launcher",
          link: {type:"doc", id:"troubleshoot/launcher/launcher-troubleshoot"},
          items: [
            "troubleshoot/launcher/launcher-error-codes"
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Zowe client-side components",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Troubleshooting Zowe CLI",
          link: {type:"doc", id:"troubleshoot/cli/troubleshoot-cli"},
          items: [
            "troubleshoot/cli/mustgather-cli",
            "troubleshoot/cli/use-individual-troubleshoot-commands",
            "troubleshoot/cli/cli-use-curl-to-troubleshoot",
            "troubleshoot/cli/zosmf-cli",
            "troubleshoot/cli/troubleshoot-cli-credentials",
            "troubleshoot/cli/known-cli",
            "troubleshoot/cli/cli-issue",
          ],
        },
        {
          type: "category",
          label: "Troubleshooting Zowe CLI plug-ins",
          link: {type:"doc", id:"troubleshoot/cli/troubleshoot-cli-plugins"},
          items: [
            "troubleshoot/cli/troubleshoot-ibm-db2-database-plug-in",
          ],
        },
        {
          type: "category",
          label: "Troubleshooting Zowe Explorer",
          link: {type:"doc", id:"troubleshoot/ze/troubleshoot-ze"},
          items: [
            "troubleshoot/ze/known-ze",
            "troubleshoot/ze/ze-known-limits",
            "troubleshoot/ze/ze-issues",
          ],
        },
        "troubleshoot/zowe-chat-troubleshoot/troubleshooting",
        "troubleshoot/troubleshoot-intellij",        
      ],
    }  
  ],
  "contributing": [
    "contribute/roadmap-contribute",
    {
      type: "category",
      label: "Code Guidelines",
      items: [
        "contribute/guidelines-code/categories",
        "contribute/guidelines-code/general",
        "contribute/guidelines-code/code-and-patches",
        "contribute/guidelines-code/documentation",
      ],
    },
    {
      type: "category",
      label: "UI Guidelines",
      link: {type:"doc", id:"contribute/guidelines-ui/ui"},
      items: [
        "contribute/guidelines-ui/colors",
        "contribute/guidelines-ui/typography",
        "contribute/guidelines-ui/grid",
        "contribute/guidelines-ui/icon",
        "contribute/guidelines-ui/appicon",
      ],
    },
    "contribute/contributing",
  ],
  "reference": [
    "appendix/zowe-cli-command-reference",
    "appendix/zowe-api-reference",
    {
      type: "category",
      label: "ZWE Server Command Reference",
      link: {type:"doc", id:"appendix/zwe_server_command_reference_overview"},
      items: [
        {
          type: "autogenerated",
          dirName: "appendix/zwe_server_command_reference"
        }
      ]
    },
    {
      type: "category",
      label: "Zowe Chat command reference",
      link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/zowe-chat-command-reference"},
      items: [
        {
          type: "category",
          label: "zos commands",
          link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/zos-article"},
          items: [
            {
              type: "category",
              label: "zos job",
              link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/job/job-article"},
              items: [
                {
                  type: "category",
                  label: "zos job list",
                  link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/job/list/list-article"},
                  items: [
                    "appendix/zowe-chat-command-reference/zos/job/list/zos-job-list-status",
                  ]
                },
              ]
            },
            {
              type: "category",
              label: "zos dataset",
              link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/dataset/dataset-article"},
              items: [
                {
                  type: "category",
                  label: "zos dataset list",
                  link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/dataset/list/list-article"},
                  items: [
                    "appendix/zowe-chat-command-reference/zos/dataset/list/zos-dataset-list-status",
                    "appendix/zowe-chat-command-reference/zos/dataset/list/zos-dataset-list-member",
                  ]
                },
              ]
            },
            {
              type: "category",
              label: "zos file",
              link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/file/file-article"},
              items: [
                {
                  type: "category",
                  label: "zos file list",
                  link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/file/list/list-article"},
                  items: [
                    "appendix/zowe-chat-command-reference/zos/file/list/zos-file-list-status",
                    "appendix/zowe-chat-command-reference/zos/file/list/zos-file-list-mounts",
                  ]
                },
              ]
            },
            {
              type: "category",
              label: "zos command",
              link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/command/command-article"},
              items: [
                {
                  type: "category",
                  label: "zos command issue",
                  link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/command/issue/issue-article"},
                  items: [
                    "appendix/zowe-chat-command-reference/zos/command/issue/zos-command-issue-console",
                  ]
                },
              ]
            },
            {
              type: "category",
              label: "zos help",
              link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/help/help-article"},
              items: [
                {
                  type: "category",
                  label: "zos help list",
                  link: {type:"doc", id:"appendix/zowe-chat-command-reference/zos/help/list/list-article"},
                  items: [
                    "appendix/zowe-chat-command-reference/zos/help/list/zos-help-list-command",
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
    "appendix/zowe-yaml-configuration",
    "appendix/server-component-manifest",
    "appendix/bill-of-materials",
    {
      type: "link",
      label: "Third Party Software Requirements",
      href: "https://github.com/zowe/docs-site/tree/master/tpsr/tpsr-v2.15.x.md",
    },
  ],
}


// "appendix/tpsr",
//items should be array of only strings, or array of object and strings
//the object should be 'string': array, not 'string': 'string'