module.exports = {
  "getting-started": [
    //id of the sidebar
    {
      type: "category", // doc(default), 'link'(external links), 'ref'(page without without sidebar)
      label: "Zowe fundamentals",
      collapsed: false,
      items: [
        "getting-started/overview", //folder_name/file_name
        "getting-started/zowe-architecture",
      ],
    },
    {
      type: "category",
      label: "FAQ",
      items: [
        "getting-started/zowe_faq",
        "getting-started/zowe_v2_faq",
      ],
    },
    {
      type: "category",
      label: "Release notes",
      items: [
        "getting-started/release-notes/v2_4_0",
        "getting-started/release-notes/v2_3_1",
        "getting-started/release-notes/v2_3_0",
        "getting-started/release-notes/v2_2_0",
        "getting-started/release-notes/v2_1_0",
        "getting-started/release-notes/v2_0_0",
        "getting-started/zowe-office-hours"
      ],
    },
    {
      type: "category",
      label: "Quick start",
      items: [
        "getting-started/cli-getting-started",
      ],
    },
    {
      type: "category",
      label: "Migrating from V1 to V2",
      items: [
        "extend/migrate-extensions",
      ],
    },
    "getting-started/zowe-resources",
  ],

  "setup": [
    "user-guide/install-overview",
    {
      type: "category",
      label: "Installing Zowe z/OS components",
      items: [
        "user-guide/install-zos",
        {
          type: "category",
          label: "Planning",
          items: [
            "user-guide/installandconfig",
            "user-guide/configure-uss",
          ],
        },
        {
          type: "category",
          label: "System requirements",
          items: [
            "user-guide/systemrequirements-zos",
            "user-guide/install-nodejs-zos",
            "user-guide/systemrequirements-zosmf",
            "user-guide/systemrequirements-zosmf-lite",
          ],
        },
        {
          type: "category",
          label: "Installing",
          items: [
            "user-guide/install-zowe-zos-convenience-build",
            {
              type: "category",
              label: "Installing Zowe SMP/E build",
              items: [
                "user-guide/install-zowe-smpe",
                "user-guide/install-zowe-smpe-zosmf-workflow",
              ],
            },
            {
              type: "category",
              label: "Installing Zowe Portable Software Instance",
              items: [
                "user-guide/install-zowe-pswi",
                "user-guide/install-zowe-pswi-address-requirements",
                "user-guide/install-zowe-pswi-acquire",
                "user-guide/install-zowe-pswi-deployment",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Configuring",
          items: [
            "user-guide/initialize-zos-system",
            "user-guide/initialize-mvs-datasets",
            "user-guide/initialize-security-configuration",
            "user-guide/configure-zos-system",
            "user-guide/grant-user-permission-zosmf",
            "user-guide/apf-authorize-load-library",
            {
              type: "category",
              label: "Configuring certificates",
              items: [
                "user-guide/configure-certificates-keystore",
                "user-guide/configure-certificates-keyring",
                "user-guide/certificates-setup",
              ],
            },
            "user-guide/initialize-vsam-dataset",
            "user-guide/install-stc-members",
            "user-guide/configure-xmem-server",
            "user-guide/configure-auxiliary-address-space",
            "user-guide/configure-zowe-zosmf-workflow",
            "user-guide/configmgr-using"
          ],
        },
        {
          type: "category",
          label: "High Availability",
          items: [
            "user-guide/zowe-ha-overview",
            "user-guide/configure-sysplex",
            "user-guide/systemrequirements-zosmf-ha",
            "user-guide/configure-caching-service-ha",
          ],
        },
        "user-guide/start-zowe-zos",
        "user-guide/verify-zowe-runtime-install",
      ],
    },
    {
      "type": "category",
      "label": "Installing Zowe Containers",
      "items": [
        "user-guide/k8s-introduction",
        "user-guide/k8s-prereqs",
        "user-guide/k8s-downloading",
        "user-guide/k8s-config",
        "user-guide/k8s-using"
      ],
    },
    {
      type: "category",
      label: "Installing Zowe CLI",
      items: [
        "user-guide/cli-install-cli-checklist",
        "user-guide/user-roadmap-zowe-cli",
        "user-guide/systemrequirements-cli",
        {
          type: "category",
          label: "Install CLI",
          items: [
            "user-guide/cli-installcli",
            "user-guide/cli-configure-scs-on-headless-linux-os",
            "user-guide/cli-configure-cli-on-os-where-scs-unavailable",
            "user-guide/cli-install-cli-nodejs-windows",
          ],
        },
        "user-guide/install-cli-via-proxy",
        "user-guide/cli-updatingcli",
        "user-guide/cli-uninstall",
      ],
    },

    {
      type: "category",
      label: "Installing Zowe Explorer",
      items: [
        "getting-started/user-roadmap-zowe-explorer",
        "user-guide/ze-install",
        "user-guide/ze-profiles",
      ],
    },
    {
      type: "category",
      label: "Installing Zowe Chat (Technical Preview)",
      items: [
        "user-guide/zowe-chat/introduction",
        {
          type: "category",
          label: "Planning for Zowe Chat",
          items: [
            "user-guide/zowe-chat/systemrequirements-chat",
            {
              type: "category",
              label: "Configuring chat platforms",
              items: [
                {
                  type: "category",
                  label: "Configuring Mattermost",
                  items: [
                    "user-guide/zowe-chat/chat_prerequisite_mattermost",
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
                  items: [
                    "user-guide/zowe-chat/chat_prerequisite_teams",
                    "user-guide/zowe-chat/chat_prerequisite_teams_create_app_developer_portal",
                    {
                      type: "category",
                      label: "Creating a bot for Microsoft Teams bot app",
                      items: [
                        "user-guide/zowe-chat/chat_prerequisite_teams_create_bot",
                        "user-guide/zowe-chat/chat_prerequisite_teams_create_bot_framework",
                        "user-guide/zowe-chat/chat_prerequisite_teams_create_bot_azure",
                      ],
                    },
                    {
                      type: "category",
                      label: "Configuring messaging endpoint",
                      items: [
                        "user-guide/zowe-chat/chat_prerequisite_teams_configure_endpoint",
                        "user-guide/zowe-chat/chat_prerequisite_teams_configure_endpoint_framework",
                        "user-guide/zowe-chat/chat_prerequisite_teams_configure_endpoint_azure",
                      ],
                    },
                  ],
                },
                {
                  type: "category",
                  label: "Configuring Slack",
                  items: [
                    "user-guide/zowe-chat/chat_prerequisite_slack",
                    {
                      type: "category",
                      label: "Creating and installing Slack app",
                      items: [
                        "user-guide/zowe-chat/chat_prerequisite_slack_create_app",
                        {
                          type: "category",
                          label: "Creating and installing Slack app",
                          items: [
                            "user-guide/zowe-chat/chat_prerequisite_slack_configure_app",
                            "user-guide/zowe-chat/chat_prerequisite_slack_socket_mode",
                            "user-guide/zowe-chat/chat_prerequisite_slack_http_endpoint",
                          ],
                        },
                        "user-guide/zowe-chat/chat_prerequisite_slack_install",
                      ],
                    },
                    "user-guide/zowe-chat/chat_prerequisite_slack_invite_app_to_channel",
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Installing Zowe Chat",
          items: [
            "user-guide/zowe-chat/chat_install_overview",
          ],
        },
        {
          type: "category",
          label: "Configuring Zowe Chat",
          items: [
            "user-guide/zowe-chat/chat_configure_server",
            {
              type: "category",
              label: "Configuring Chat Tools",
              items: [
                "user-guide/zowe-chat/chat_configure_mattermost",
                "user-guide/zowe-chat/chat_configure_teams",
                "user-guide/zowe-chat/chat_configure_slack",
              ]
            },
          ],
        },
        "user-guide/zowe-chat/chat_start_stop",
        "user-guide/zowe-chat/chat_uninstall",
      ],
    },
    {
      type: "category",
      label: "Installing Zowe IntelliJ Plug-in",
      items: [
        "user-guide/intellij-install",
        "user-guide/intellij-configure",
      ],
    },
    {
      type: "category",
      label: "Advanced Zowe configuration",
      items: [
        "user-guide/mvd-configuration",
        "user-guide/cli-configuringcli-ev",
        {
          type: "category",
          label: "API Mediation Layer",
          items: [
            "user-guide/configure-data-sets-jobs-api",
            "user-guide/api-mediation/api-gateway-configuration",
            "user-guide/api-mediation/discovery-service-configuration",
            "user-guide/api-mediation/api-mediation-internal-configuration",
            "extend/extend-apiml/api-mediation-passtickets",
          ],
        },
      ],
    },
  ],

  "use": [
    "user-guide/zowe-getting-started-tutorial",
    {
      type: "category",
      label: "Using Zowe Desktop",
      items: [
        "user-guide/mvd-using",
        "user-guide/mvd-editor",
      ],
    },
    {
      type: "category",
      label: "Using Zowe API Mediation Layer",
      items: [
        "user-guide/api-mediation/using-api-mediation-layer",
        {
          type: "category",
          label: "Using API Catalog",
          items: [
            "user-guide/api-mediation-view-service-information-and-api-doc",
            "user-guide/api-mediation-swagger-try-it-out",
            "user-guide/api-mediation-swagger-code-snippets",
            "user-guide/api-mediation-static-api-refresh",
            "user-guide/api-mediation-change-password-via-catalog",
            "user-guide/onboard-wizard",
          ],
        },
        "user-guide/api-mediation-metrics-service",
        "extend/extend-apiml/api-mediation-routing",
        "extend/extend-apiml/service-information",
        "extend/extend-apiml/websocket",
        "user-guide/api-mediation/api-mediation-personal-access-token",
      ],
    },
    {
      type: "category",
      label: "Using Zowe CLI",
      items: [
        "user-guide/cli-using-usingcli",
        "user-guide/cli-using-displaying-help",
        "user-guide/cli-using-understanding-core-command-groups",
        "user-guide/cli-using-issuing-first-command",
        {
          type: "category",
          label: "Configuring daemon mode",
          items: [
            "user-guide/cli-using-using-daemon-mode",
            "user-guide/cli-configure-daemon-on-zlinux-os",
          ],
        },
        "user-guide/cli-using-using-profiles",
        {
          type: "category",
          label: "Configuring team profiles",
          items: [
            "user-guide/cli-using-using-team-profiles",
            "user-guide/cli-using-initializing-team-configuration",
            "user-guide/cli-using-team-configuration-application-developers",
            "user-guide/cli-using-team-configuration-team-leaders",
            "user-guide/cli-using-sharing-team-config-files",
            "user-guide/cli-using-team-managing-credential-security",
            "user-guide/cli-using-global-storing-properties-automatically",
          ],
        },
        "user-guide/cli-using-integrating-apiml",
        "user-guide/cli-using-working-certificates",

        {
          type: "category",
          label: "Using environment variables",
          items: [
            "user-guide/cli-using-using-environment-variables",
            "user-guide/cli-using-formatting-environment-variables",
            "user-guide/cli-using-setting-environment-variables-in-automation-server",
          ],
        },
        "user-guide/cli-using-using-prompt-feature",
        "user-guide/cli-using-writing-scripts",


      ],
    },
    {
      type: "category",
      label: "Zowe CLI plug-ins",
      items: [
        "user-guide/cli-extending",
        "user-guide/cli-swreqplugins",
        "user-guide/cli-installplugins",
        "user-guide/cli-cicsplugin",
        {
          type: "category",
          label: "IBM® Db2® Database Plug-in for Zowe CLI",
          items: [
            "user-guide/cli-db2plugin",
            "user-guide/cli-db2-install-m1",
          ],
        },
        "user-guide/cli-ftpplugin",
        "user-guide/cli-imsplugin",
        "user-guide/cli-mqplugin",
      ],
    },
    {
      type: "category",
      label: "Using Zowe Explorer",
      items: [
        "user-guide/ze-usage",
        "user-guide/ze-use-cases",
      ],
    },
    {
      type: "category",
      label: "Zowe Explorer extensions",
      items: [
        {
          type: "category",
          label: "Zowe Explorer CICS Extension",
          items: [
            "user-guide/ze-using-zowe-explorer-cics-ext",
            "user-guide/ze-install-zowe-explorer-cics-ext",
            "user-guide/ze-create-zowe-explorer-cics-ext-profiles",
            "user-guide/ze-use-cics-resources",
            "user-guide/ze-override-tls-certs",
            "user-guide/ze-usage-tips",
            "user-guide/ze-provide-feedback-contribute",
          ],
        },
        {
          type: "category",
          label: "Zowe Explorer FTP Extension",
          items: [
            "user-guide/ze-ftp-install-ze-ftp-ext",
            "user-guide/ze-ftp-using-ze-ftp-ext",
            "user-guide/ze-ftp-supported-functions",
            "user-guide/ze-ftp-provide-feedback-contribute",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Using Zowe Chat",
      items: [
        "user-guide/zowe-chat/chat_use_interact_methods",
      ],
    },
    "user-guide/sdks-using",
    "user-guide/intellij-using",
  ],
  extending: [
    "extend/extend-zowe-overview",
    {
      type: "category",
      label: "Developing server components",
      items: [
        "extend/packaging-zos-extensions",
        "extend/server-schemas",
        "extend/install-configure-zos-extensions",
        "extend/lifecycling-with-zwesvstc",
        "extend/k8s-extend",
        "extend/k8s-conformance",
      ],
    },
    {
      type: "category",
      label: "Developing for Zowe CLI",
      items: [
        "extend/extend-cli/cli-devTutorials",
        "extend/extend-cli/cli-setting-up",
        "extend/extend-cli/cli-installing-sample-plugin",
        "extend/extend-cli/cli-extending-a-plugin",
        "extend/extend-cli/cli-developing-a-plugin",
        "extend/extend-cli/cli-implement-profiles",
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
        "extend/extend-apiml/api-mediation-sso",
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
          ],
        },
        {
          type: "category",
          label: "Caching service",
          items: [
            "extend/extend-apiml/api-mediation-caching-service",
            "extend/extend-apiml/api-mediation-vsam",
            "extend/extend-apiml/api-mediation-redis",
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
    "extend/extend-ze/ze-extensions",
    "extend/extend-sdks",
    "extend/zowe-conformance-program",
  ],
  troubleshooting: [
    {
      type: "category",
      label: "Overview",
      items: [
        "troubleshoot/troubleshooting",
        "troubleshoot/troubleshoot-zowe-release",
      ],
    },
    {
      type: "category",
      label: "Zowe Servers",
      items: [
        "troubleshoot/servers/must-gather",
        "troubleshoot/verify-fingerprint",
        "troubleshoot/k8s-troubleshoot",
        //"troubleshoot/troubleshoot-zos-certificate",
        {
          type: "category",
          label: "Zowe API Mediation Layer",
          items: [
            "troubleshoot/troubleshoot-apiml",
            "troubleshoot/troubleshoot-apiml-error-codes",
          ],
        },
        {
          type: "category",
          label: "Zowe Application Framework",
          items: [
            "troubleshoot/app-framework/app-troubleshoot",
            "troubleshoot/app-framework/app-mustgather",
            "troubleshoot/app-framework/app-issue",
            "troubleshoot/app-framework/zss-error-codes",
          ],
        },
        {
          type: "category",
          label: "Zowe Launcher",
          items: [
            "troubleshoot/launcher/launcher-troubleshoot",
            "troubleshoot/launcher/launcher-error-codes"
          ],
        },
        "troubleshoot/verify-fingerprint",
      ],
    },
    {
      type: "category",
      label: "Zowe CLI",
      items: [
        "troubleshoot/cli/troubleshoot-cli",
        "troubleshoot/cli/mustgather-cli",
        "troubleshoot/cli/use-individual-troubleshoot-commands",
        "troubleshoot/cli/zosmf-cli",
        "troubleshoot/cli/known-cli",
        "troubleshoot/cli/cli-issue",
      ],
    },
    {
      type: "category",
      label: "Zowe Explorer",
      items: [
        "troubleshoot/ze/troubleshoot-ze",
        "troubleshoot/ze/known-ze",
        "troubleshoot/ze/ze-issues",
      ],
    },
    "troubleshoot/zowe-chat-troubleshoot/troubleshooting",
    "troubleshoot/troubleshoot-intellij",
  ],
  contributing: [
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
      items: [
        "contribute/guidelines-ui/ui",
        "contribute/guidelines-ui/colors",
        "contribute/guidelines-ui/typography",
        "contribute/guidelines-ui/grid",
        "contribute/guidelines-ui/icon",
        "contribute/guidelines-ui/appicon",
      ],
    },
    "contribute/contributing",
  ],
  reference: [
    "appendix/zowe-cli-command-reference",
    "appendix/zowe-api-reference",
    {
      type: "category",
      label: "ZWE Server Command Reference",
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
      items: [
        "appendix/zowe-chat-command-reference/zos/zowe-chat-command-reference",
        {
          type: "category",
          label: "zos",
          items: [
            {
              type: "category",
              label: "job",
              items: [
                {
                  type: "category",
                  label: "list",
                  items: [
                    "appendix/zowe-chat-command-reference/zos/job/list/zos-job-list-status",
                  ]
                },
              ]
            },
            {
              type: "category",
              label: "dataset",
              items: [
                {
                  type: "category",
                  label: "list",
                  items: [
                    "appendix/zowe-chat-command-reference/zos/dataset/list/zos-dataset-list-status",
                    "appendix/zowe-chat-command-reference/zos/dataset/list/zos-dataset-list-member",
                  ]
                },
              ]
            },
            {
              type: "category",
              label: "file",
              items: [
                {
                  type: "category",
                  label: "list",
                  items: [
                    "appendix/zowe-chat-command-reference/zos/file/list/zos-file-list-status",
                    "appendix/zowe-chat-command-reference/zos/file/list/zos-file-list-mounts",
                  ]
                },
              ]
            },
            {
              type: "category",
              label: "command",
              items: [
                {
                  type: "category",
                  label: "issue",
                  items: [
                    "appendix/zowe-chat-command-reference/zos/command/issue/zos-command-issue-console",
                  ]
                },
              ]
            },
            {
              type: "category",
              label: "help",
              items: [
                {
                  type: "category",
                  label: "list",
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
      href: "https://github.com/zowe/docs-site/tree/master/tpsr/tpsr-v2.1.x.md",
    },
  ],
};

// "appendix/tpsr",
//items should be array of only strings, or array of object and strings
//the object should be 'string': array, not 'string': 'string'
