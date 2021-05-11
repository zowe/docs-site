const LATEST_VERSION = "v1.22.x";

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Zowe Docs",
  tagline:
    "Combining the past and the present to build the future of Mainframe",
  url: "https://zowe-docs.netlify.app/", //FIXME:
  baseUrl: "/",
  //FIXME: baseUrl: "/zowe-docs/",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",
  onDuplicateRoutes: "ignore",
  favicon: "img/zowe-icon.png",
  organizationName: "zowe",
  projectName: "docs-site",
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
          label: "Getting Started",
          to: "/getting-started/overview",
          // to: "getting-started/overview", //Remove this (to) to remove onClick
          position: "left",
          items: [
            {
              label: "Doc 1",
              to: "getting-started/introductions/doc1",
            },
            {
              label: "Doc 2",
              to: "getting-started/doc2",
            },
            {
              label: "Doc 3",
              to: "getting-started/doc3",
            },
            {
              label: "Doc 4",
              to: "getting-started/release-notes",
            },
          ],
        },
        {
          label: "Extend",
          to: "getting-started/doc2/",
          position: "left",
          items: [
            {
              label: "A",
              to: "getting-started/overview",
            },
            {
              label: "B",
              to: "getting-started/doc2",
            },
            {
              label: "C",
              to: "getting-started/doc3",
            },
            {
              label: "D",
              to: "getting-started/release-notes",
            },
          ],
        },
        {
          to: "user-guide",
          label: "User Guide",
          position: "left",
          items: [
            {
              label: "A",
              to: "getting-started/overview",
            },
            {
              label: "B",
              to: "getting-started/doc2",
            },
            {
              label: "C",
              to: "getting-started/doc3",
            },
            {
              label: "D",
              to: "getting-started/release-notes",
            },
          ],
        },
        {
          to: "troubleshooting",
          label: "Troubleshooting",
          position: "left",
          items: [
            {
              label: "A",
              to: "getting-started/overview",
            },
            {
              label: "B",
              to: "getting-started/doc2",
            },
            {
              label: "C",
              to: "getting-started/doc3",
            },
            {
              label: "D",
              to: "getting-started/release-notes",
            },
          ],
        },
        {
          to: "contributing",
          label: "Contributing",
          position: "left",
          items: [
            {
              label: "Code Guidelines",
              to: "contribute/guidelines-code/categories",
            },
            { label: "UI Guidelines", to: "contribute/guidelines-ui/ui" },
            {
              label: "Contributing to Documentation",
              to: "contribute/contributing",
            },
          ],
        },
        {
          to: "references",
          label: "References",
          position: "left",
          items: [
            {
              label: "A",
              to: "getting-started/overview",
            },
            {
              label: "B",
              to: "getting-started/doc2",
            },
            {
              label: "C",
              to: "getting-started/doc3",
            },
            {
              label: "D",
              to: "getting-started/release-notes",
            },
          ],
        },
        {
          // TODO: https://v2.docusaurus.io/docs/api/themes/configuration#navbar-docs-version-dropdown
          type: "docsVersionDropdown",
          position: "right",
          // dropdownItemsBefore: [],
          // dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          // Do not add the link active class when browsing docs.
          dropdownActiveClassDisabled: true,
          // docsPluginId: "default",
        },
        // {
        //   type: "localeDropdown",
        //   position: "right",
        //   dropdownItemsBefore: [],
        //   dropdownItemsAfter: [
        //     {
        //       href: 'https://my-site.com/help-us-translate',
        //       label: 'Help us translate',
        //     },
        //   ],
        // },
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
      // logo: {
      //   alt: "Zowe Logo",
      //   src: "img/zowe-icon-dark.png",
      //   href: "https://www.zowe.org/",
      // },
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
              label: "Zowe Conformance Program",
              href: "https://www.openmainframeproject.org/projects/zowe/conformance",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Join us on Slack",
              href: "https://slack.openmainframeproject.org/",
            },
            {
              label: "Join community meetings",
              href: "https://lists.openmainframeproject.org/g/zowe-dev/calendar",
            },
            {
              label: "GitHub",
              href: "https://github.com/zowe/",
            },
            {
              label: "Contribute",
              href: "https://docs.zowe.org/stable/contribute/roadmap-contribute.html",
            },
          ],
        },
      ],
      copyright: `© Open Mainframe Project. a Linux Foundation Project. All Rights Reserved.`,
    },
    announcementBar: {
      id: "support_us", // Any value that will identify this message.
      content:
        '<a target="_blank" rel="noopener noreferrer" href="https://github.com/zowe/docs-site/issues/new/choose">Let us know</a> what you think about the new Zowe docs experience!',
      backgroundColor: "#fafbfc", // Defaults to `#fff`.
      textColor: "#091E42", // Defaults to `#000`.
      isCloseable: true,
    },
    algolia: {
      //FIXME:
      apiKey: "aa",
      indexName: "aaa",
      contextualSearch: true,
      searchParameters: {
        // facetFilters: [`version:${PUBLISH_TARGET_PATH}`],
      },
    },
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    googleAnalytics: {
      trackingID: "UA-195765847-1",
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  customFields: {
    latestVersion: LATEST_VERSION,
  },
  presets: [
    [
      //For reference: https://v2.docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#configuration
      //Plugins are written in form of presets
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs", //Path to data on filesystem relative to site dir.
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/zowe/docs-site/edit/zowe-docs-v2/", //FIXME:
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          // showReadingTime: true,
          routeBasePath: "/", //Default is docs/
          lastVersion: "current",
          versions: {
            current: {
              path: "stable", //TODO: stable
              label: `${LATEST_VERSION}`,
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        // pages: {},
        // sitemap: {},
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-pwa",
      {
        debug: true, // isDeployPreview
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
            href: "/manifest.json", // your PWA manifest
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
