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
        "getting-started/freqaskques",
      ],
    },
    {
      type: "category",
      label: "Release notes",
      items: [
        "getting-started/release-notes/v1_27_3",
        "getting-started/release-notes/v1_27_2",
        "getting-started/release-notes/v1_27_1",
        "getting-started/release-notes/v1_27",
        "getting-started/release-notes/v1_26",
        "getting-started/release-notes/v1_25",
        "getting-started/release-notes/v1_24",
        "getting-started/release-notes/v1_23",
        "getting-started/summaryofchanges",
      ],
    },
    {
      type: "category",
      label: "Zowe quick start",
      items: [
        "getting-started/zowe-getting-started",
        "getting-started/cli-getting-started",
      ],
    },
    {
      type: "category",
      label: "Learning paths",
      items: [
        "getting-started/user-roadmap-apiml",
        "getting-started/user-roadmap-app-framework",
        "getting-started/user-roadmap-zowe-cli",
        "getting-started/user-roadmap-zowe-explorer",
        "getting-started/user-roadmap-client-sdk",
        "getting-started/user-roadmap-zowe-mobile",
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
        "user-guide/installandconfig", 
        "user-guide/configure-uss",
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
              label: "Installing Zowe Docker Bundle",
              items: [
                "user-guide/install-docker",
                "user-guide/install-docker-image",
                "user-guide/configuring-docker",
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
            {
              type: "category",
              label: "Configuring and starting Zowe with script",
              items: [
                "user-guide/configure-zos-system",
                {
                  type: "category",
                  label: "Configuring certificates",
                  items: [
                    "user-guide/configure-certificates",
                    "user-guide/configure-certificates-keystore",
                    "user-guide/configure-certificates-keyring",
                  ],
                },
                "user-guide/configure-xmem-server",
                "user-guide/configure-instance-directory",
                "user-guide/configure-zowe-server",
                "user-guide/api-mediation-standalone",
                "user-guide/configure-auxiliary-address-space",
              ],
            },
            "user-guide/configure-zowe-zosmf-workflow",
          ],
        },
        {
          type: "category",
          label: "High Availability",
          items: [
            "user-guide/install-ha-sysplex",
            "user-guide/configure-sysplex",
            "user-guide/systemrequirements-zosmf-ha",
            "user-guide/configure-caching-service-ha",
            "user-guide/configure-zowe-ha-server",
          ],
        }, 
        "user-guide/verify-zowe-runtime-install",
        "user-guide/stop-zowe-zos",
        "user-guide/upgrade-zos-system",
        "user-guide/zowe-zos-uninstall",       
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
        "user-guide/systemrequirements-cli",
        "user-guide/cli-installing-ssh2-package",
        "user-guide/cli-install-cli-nodejs-windows",
        "user-guide/cli-installcli",
        "user-guide/install-cli-via-proxy",
        "user-guide/cli-updatingcli",
        "user-guide/cli-uninstall",
      ],
    },
    {
      type: "category",
      label: "Installing Zowe CLI @next version (Technical Preview)",
      items: [
        "user-guide/cli-development-roadmap-next",
        {
          type: "category",
          label: "Install Zowe CLI @next",
          items: [
            "user-guide/cli-install-cli-next",
            "user-guide/cli-configure-scs-on-zlinux-os",
            "user-guide/cli-configure-cli-on-os-where-scs-unavailable",
          ],
        },
        {
          type: "category",
          label: "Using Daemon Mode (Technical Preview)",
          items: [
            "user-guide/cli-using-daemon-mode",
            "user-guide/cli-configure-daemon-on-zlinux-os",
          ],
        },        
        "user-guide/cli-using-global-profile-configuration",
              
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
        "user-guide/cli-configuringcli",
        "user-guide/configure-data-sets-jobs-api",
        "user-guide/api-mediation/api-gateway-configuration",
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
        "user-guide/api-mediation-api-catalog",
        "user-guide/api-mediation-metrics-service",
        "user-guide/cli-usingcli",
        {
          type: "category",
          label: "Zowe CLI plug-ins",
          items: [
            "user-guide/cli-extending",
            "user-guide/cli-swreqplugins",
            "user-guide/cli-installplugins",
            "user-guide/cli-cicsplugin",
            "user-guide/cli-db2plugin",
            "user-guide/cli-ftpplugin",
            "user-guide/cli-imsplugin",
            "user-guide/cli-mqplugin",
            "user-guide/cli-scsplugin",
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
    {
      type: "category",
      label: "Overview",
      items: [
        "extend/extend-zowe-overview",
        "extend/packaging-zos-extensions",
        "extend/install-configure-zos-extensions",
        "extend/lifecycling-with-zwesvstc",
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
        "extend/extend-apiml/service-information",
        "extend/extend-apiml/api-mediation-message-service",
        "extend/extend-apiml/api-mediation-security",
        "extend/extend-apiml/api-mediation-routing",
        "extend/extend-apiml/api-mediation-passtickets",
        "extend/extend-apiml/custom-metadata",
        "extend/extend-apiml/websocket",
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
    "extend/k8s-extend",
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
        "troubleshoot/troubleshoot-diagnostics",
        "troubleshoot/verify-fingerprint",
      ],
    },
    "troubleshoot/troubleshoot-zos",
    "troubleshoot/troubleshoot-zos-certificate",
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
        "troubleshoot/app-framework/app-troubleshoot",
        "troubleshoot/app-framework/app-mustgather",
        "troubleshoot/app-framework/app-issue",
      ],
    },
    "troubleshoot/troubleshoot-zos-services",
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
    "appendix/bill-of-materials",
    {
      type: "link",
      label: "Third Party Software Requirements",
      href: "https://github.com/zowe/docs-site/tree/master/tpsr/tpsr-v1.27.x.md",
    },
  ],
};

// "appendix/tpsr",
//items should be array of only strings, or array of object and strings
//the object should be 'string': array, not 'string': 'string'