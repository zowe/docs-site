/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Zowe Docs",
  tagline:
    "Combining the past and the present to build the future of Mainframe",
  url: "https://covalentbond.github.io", //FIXME:
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
    algolia: {
      //FIXME:
      apiKey: "aa",
      indexName: "aaa",
      contextualSearch: true,
      searchParameters: {
        // facetFilters: [`version:${PUBLISH_TARGET_PATH}`],
      },
    },
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
          // Prepends the baseUrl to href values.
          to: "/getting-started/overview",
          // to: "getting-started/overview", //Remove this (to) to remove onClick
          position: "right",
          items: [
            {
              label: "Doc 1",
              to: "getting-started/introductions/doc1",

              //activeBaseRegex: 'docs/(next|v8)'
              // See docs: https://v2.docusaurus.io/docs/api/themes/configuration#navbar-items
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
          to: "extend/",
          position: "right",
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
          position: "right",
        },
        { to: "troubleshooting", label: "Troubleshooting", position: "right" },
        {
          to: "contributing",
          label: "Contributing",
          position: "right",
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
        // { to: "references", label: "References", position: "right" },
        //versioning
        {
          // TODO: https://v2.docusaurus.io/docs/api/themes/configuration#navbar-docs-version-dropdown
          type: "docsVersionDropdown",
          position: "right",
          // dropdownItemsBefore: [],
          // dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          // Do not add the link active class when browsing docs.
          dropdownActiveClassDisabled: true,
          docsPluginId: "default",
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
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
      //   alt: 'Zowe Logo',
      //   src: 'img/zowe-icon-dark.png',
      //   href: 'https://www.zowe.org/',
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
              href:
                "https://docs.zowe.org/stable/getting-started/overview.html",
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
              href:
                "https://www.youtube.com/playlist?list=PL8REpLGaY9QE_9d57tw3KQdwSVLKuTpUZ",
            },
            {
              label: "Zowe Conformance Program",
              href:
                "https://www.openmainframeproject.org/projects/zowe/conformance",
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
              href:
                "https://lists.openmainframeproject.org/g/zowe-dev/calendar",
            },
            {
              label: "GitHub",
              href: "https://github.com/zowe/",
            },
            {
              label: "Contribute",
              href:
                "https://docs.zowe.org/stable/contribute/roadmap-contribute.html",
            },
          ],
        },
      ],
      copyright: `© Open Mainframe Project. a Linux Foundation Project. All Rights Reserved.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
