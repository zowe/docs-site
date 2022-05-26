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
    //    "getting-started/migrate-instance",  //Not ready yet, need to check
        "extend/migrate-extensions",
        {
          type: "link",
          label: "Migrating Zowe CLI from V1 to V2",
          href: "../user-guide/cli-updatingcli#updating-to-the-zowe-cli-v2-long-term-support-v2-lts-version",
        },
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
        //    "user-guide/configure-zowe-server", //out of date, v1 info included
            "user-guide/configure-auxiliary-address-space",
            "user-guide/configure-zowe-zosmf-workflow",
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
    //    "user-guide/upgrade-zos-system",
    //    "user-guide/zowe-zos-uninstall",       
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
        "user-guide/ze-install",
        "user-guide/ze-profiles",
      ],
    },
    {
      type: "category",
      label: "Advanced Zowe configuration",
      items: [
        "user-guide/mvd-configuration",
        "user-guide/cli-configuringcli-ev",
        "user-guide/configure-data-sets-jobs-api",
        "user-guide/api-mediation/api-gateway-configuration",
        "user-guide/api-mediation/discovery-service-configuration",
        "user-guide/api-mediation/api-mediation-internal-configuration",
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
            "user-guide/api-mediation-api-catalog",
            "user-guide/api-mediation-metrics-service",
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
            "user-guide/cli-using-completing-advanced-tasks",
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
            "user-guide/ze-install",
          ],
        },
        "user-guide/ze-usage",
         {
          type: "category",
          label: "Zowe Explorer extensions",
          items: [
            "user-guide/ze-cics",
            "user-guide/ze-ftp",
          ],
        },
        "user-guide/sdks-using",
  ],
  extending: [
    "extend/extend-zowe-overview",
    {
      type: "category",
      label: "Developing server components",
      items: [
        "extend/packaging-zos-extensions",
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
        "extend/extend-apiml/onboard-wizard",
        "extend/extend-apiml/api-mediation-sso",
        "extend/extend-apiml/service-information",
        "extend/extend-apiml/websocket",
        "extend/extend-apiml/create-apiml-extension",
        "extend/extend-apiml/api-mediation-message-service",
        "extend/extend-apiml/api-mediation-security",
        "extend/extend-apiml/api-mediation-routing",
        "extend/extend-apiml/api-mediation-passtickets",
        "extend/extend-apiml/custom-metadata",
        "extend/extend-apiml/api-mediation-versioning",
        "extend/extend-apiml/implement-new-saf-provider", 
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
    //    "troubleshoot/troubleshoot-diagnostics",
        "troubleshoot/verify-fingerprint",
      ],
    },
    //"troubleshoot/troubleshoot-zos",
    //"troubleshoot/troubleshoot-zos-certificate",
    "troubleshoot/k8s-troubleshoot",
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
    //    "troubleshoot/app-framework/app-troubleshoot", //still refers to instance.env
    //    "troubleshoot/app-framework/app-mustgather", //still refers to instance.env
        "troubleshoot/app-framework/app-issue", 
        "troubleshoot/app-framework/zss-error-codes",
      ],
    },
    //"troubleshoot/troubleshoot-zos-services", //still refers to old STC names
    {
      type: "category",
      label: "Zowe CLI",
      items: [
        "troubleshoot/cli/troubleshoot-cli",
        "troubleshoot/cli/mustgather-cli",
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
    {
      type: "category",
      label: "Zowe Launcher",
      items: [
        "troubleshoot/launcher/launcher-troubleshoot",
        "troubleshoot/launcher/launcher-error-codes"
      ],
    },
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
    "appendix/zowe-yaml-configuration", 
    "appendix/server-component-manifest",     
    "appendix/bill-of-materials",
    {
      type: "link",
      label: "Third Party Software Requirements",
      href: "https://github.com/zowe/docs-site/tree/master/tpsr/tpsr-v2.0.x.md",
    },
  ],
};

// "appendix/tpsr",
//items should be array of only strings, or array of object and strings
//the object should be 'string': array, not 'string': 'string'