const LATEST_VERSION = "v2.4.x";
const versionsArray = require("./versions.json");

module.exports = {
  title: "Zowe Docs",
  tagline:
    "Combining the past and the present to build the future of Mainframe",
  url: "https://docs.zowe.org/",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  onDuplicateRoutes: "ignore",
  favicon: "img/zowe-icon.png",
  organizationName: "zowe",
  projectName: "docs-site",
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("esbuild-loader"),
      options: {
        loader: "tsx",
        format: isServer ? "cjs" : undefined,
        target: isServer ? "node12" : "es2017",
      },
    }),
  },
  themeConfig: {
    hideableSidebar: true,
    image: "img/zowe-icon.png",
    navbar: {
      title: "Zowe Docs",
      hideOnScroll: true,
      logo: {
        alt: "Zowe Logo",
        src: "img/zowe-icon.png",
        srcDark: "img/zowe-icon-dark.png",
        href: "/",
      },
      items: [
        {
          type: "doc",
          label: "Get Started",
          docId: "getting-started/overview",
          position: "left",
        },
        {
          type: "doc",
          label: "Setup",
          docId: "user-guide/install-overview",
          position: "left",
        },
        {
          type: "doc",
          label: "Use",
          docId: "user-guide/zowe-getting-started-tutorial",
          position: "left",
        },
        {
          type: "doc",
          label: "Extend",
          docId: "extend/extend-zowe-overview",
          position: "left",
        },
        {
          type: "doc",
          label: "Troubleshoot",
          docId: "troubleshoot/troubleshooting",
          position: "left",
        },
        {
          type: "doc",
          label: "Contribute",
          docId: "contribute/contributing",
          docId: "contribute/roadmap-contribute",
          position: "left",
        },
        {
          type: "doc",
          label: "Reference",
          docId: "appendix/zowe-cli-command-reference",
          position: "left",
        },
         {
           type: "docsVersionDropdown",
           position: "right",
           dropdownActiveClassDisabled: true,
           dropdownItemsAfter: [
             {
               to: "/versions",
               label: "All versions",
             },
           ],
         },
        {
          href: "https://github.com/zowe/docs-site",
          position: "right",
          className: "navbar-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Products",
          items: [
            {
              label: "Download",
              href: "https://www.zowe.org/download.html",
            },
            {
              label: "Try Zowe",
              href: "https://www.openmainframeproject.org/projects/zowe/ztrial",
            },
            {
              label: "Features",
              href: "https://docs.zowe.org/stable/getting-started/overview.html",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Blogs",
              href: "https://medium.com/zowe",
            },
            {
              label: "Videos",
              href: "https://www.youtube.com/playlist?list=PL8REpLGaY9QE_9d57tw3KQdwSVLKuTpUZ",
            },
            {
              label: "Learning",
              href: "https://docs.zowe.org/stable/getting-started/zowe-resources",
            },
            {
              label: "Zowe Conformance Program",
              href: "https://www.openmainframeproject.org/projects/zowe/conformance",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack community",
              href: "https://slack.openmainframeproject.org/",
            },
            {
              label: "Community meetings",
              href: "https://lists.openmainframeproject.org/g/zowe-dev/calendar",
            },
            {
              label: "Zowe GitHub",
              href: "https://github.com/zowe/",
            },
            {
              label: "How to contribute",
              href: "https://docs.zowe.org/stable/contribute/roadmap-contribute.html",
            },
          ],
        },
      ],
      copyright: `© Open Mainframe Project. a Linux Foundation Project. All Rights Reserved. The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks of The Linux Foundation, please see our Trademark Usage page. Please refer to Marketing and Branding Guidelines for name usage guidelines. Linux is a registered trademark of Linus Torvalds. Privacy Policy and Terms of Use`,
    },
    algolia: {
      apiKey: "59ff39ed48d0820010c7e09fc4b677bf",
      indexName: "zowe",
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    prism: {
      additionalLanguages: ["ini", "java", "properties", "groovy", "markup"],
    },
    googleAnalytics: {
      trackingID: "UA-123892882-1",
      anonymizeIP: true,
    },
  },
  customFields: {
    latestVersion: LATEST_VERSION,
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/zowe/docs-site/edit/master/",
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          routeBasePath: "/",
          lastVersion: "current",
          versions: {
            current: {
              path: "stable",
              label: `${LATEST_VERSION}` + " LTS",
            },
            "v2.3.x": {
              label: "v2.3.x LTS",
           },
            "v2.2.x": {
              label: "v2.2.x LTS",
           },
            "v2.1.x": {
               label: "v2.1.x LTS",
            },
            "v2.0.x": {
              label: "v2.0.x LTS",
            },
            "v1.28.x": {
              label: "v1.28.x LTS",
            },
            "v1.27.x": {
              label: "v1.27.x LTS",
            },
            "v1.26.x": {
              label: "v1.26.x LTS",
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/",
            from: ["/stable"],
          },
        ],
        fromExtensions: ["html"],
        //Redirects Vuepress links like "v1-22-x" to "v1.22.x";
        createRedirects: function (existingPath) {
          for (var i = 0; i < versionsArray.length; i++) {
            var x = versionsArray[i];
            if (existingPath.includes(x)) {
              return [
                existingPath.replace(x, x.replace(".", "-").replace(".", "-")),
              ];
            }
          }
        },
      },
    ],
    [
      "@docusaurus/plugin-pwa",
      {
        debug: true, 
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/zowe-icon.png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "#3162ac",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#000",
          },
          {
            tagName: "link",
            rel: "apple-touch-icon",
            href: "img/zowe-icon.png",
          },
          {
            tagName: "link",
            rel: "mask-icon",
            href: "img/zowe-icon.png",
            color: "#3162ac",
          },
          {
            tagName: "meta",
            name: "msapplication-TileImage",
            content: "img/zowe-icon.png",
          },
          {
            tagName: "meta",
            name: "msapplication-TileColor",
            content: "#000",
          },
        ],
      },
    ],
  ],
};
