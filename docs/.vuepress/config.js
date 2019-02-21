// load versions list
const ZOWE_VERSIONS = require('./versions.json')
const CURRENT_ZOWE_VERSION = '1.0.0'
// root base url for all versions
const ROOT_BASE_URL = '/docs-site'
// Due to VuePress limitation, publish url path cannot have dot (.) inside
// so we convert it to dash
const PUBLISH_TARGET_PATH = (process.env.PUBLISH_TARGET_PATH || 'latest').replace(/\./g, '-')
// this holds list of all pages
// IMPORTANT: if you have new pages, please update this constant
// 
// Options for page:
// @canHideFirst(Boolean)   if want to hide the link on navbar earlier than regular links
// @hideInPdf(Boolean)      if hide this page/section from PDF side menus
// @hideInSideBar(Booelean) if hide this page from website side bar
// @hideInNavBar(Boolean)   if hide this link from website top navigation bar
const ALL_PAGES = [{
  text: 'Getting Started',
  baseuri: '/getting-started/',
  items: [{
    text: 'Zowe overview',
    items: ['getting-started/overview.md', 'getting-started/zowe-architecture.md']
  },
  {
    text: 'Release notes',
    link: 'getting-started/summaryofchanges.md'
  },
  ],
},
{
  text: 'User Guide',
  baseuri: '/user-guide/',
  items: [{
    text: 'Installing Zowe',
    items: [
      'user-guide/installandconfig.md',
      'user-guide/systemrequirements.md',
      'user-guide/install-zos.md',
      'user-guide/cli-installcli.md',
      'user-guide/uninstall.md',
    ]
  },
  {
    text: 'Configuring Zowe',
    items: [
      'user-guide/mvd-configuration.md',
      'user-guide/cli-configuringcli.md',
    ]
  },
  {
    text: 'Using Zowe',
    items: [
      'user-guide/mvd-using.md',
      'user-guide/api-mediation-api-catalog.md',
      'user-guide/cli-usingcli.md',
    ]
  },
  {
    text: 'Zowe CLI extensions and plug-ins',
    items: [
      'user-guide/cli-extending.md',
      'user-guide/cli-installplugins.md',
      'user-guide/cli-cicsplugin.md',
      'user-guide/cli-db2plugin.md',
      'user-guide/cli-vscodeplugin.md',
    ]
  }
  ]
},
{
  text: 'Extending',
  baseuri: '/extend/',
  items: [
    {
      text: 'Developing for API Mediation Layer',
      items: [
        'extend/extend-apiml/api-mediation-onboard-overview.md',
        'extend/extend-apiml/api-mediation-security.md',
        'extend/extend-apiml/api-mediation-onboard-a-sprint-boot-rest-api-service.md',
        'extend/extend-apiml/api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer.md',
        'extend/extend-apiml/api-mediation-onboard-an-existing-java-jersey-rest-api-service.md',
        'extend/extend-apiml/api-mediation-onboard-an-existing-rest-api-service-without-code-changes.md',
      ]
    },
    {
      text: 'Developing for Zowe CLI',
      items: [
        'extend/extend-cli/cli-devTutorials.md',
        'extend/extend-cli/cli-setting-up.md',
        'extend/extend-cli/cli-installing-sample-plugin.md',
        'extend/extend-cli/cli-extending-a-plugin.md',
        'extend/extend-cli/cli-developing-a-plugin.md',
        'extend/extend-cli/cli-implement-profiles.md',
      ]
    },
    {
      text: 'Developing for Zowe Application Framework',
      items: [
        'extend/extend-desktop/mvd-extendingzlux.md',
        'extend/extend-desktop/mvd-creatingappplugins.md',
        'extend/extend-desktop/mvd-plugindefandstruct.md',
        'extend/extend-desktop/mvd-dataservices.md',
        'extend/extend-desktop/mvd-desktopandwindowmgt.md',
        'extend/extend-desktop/mvd-configdataservice.md',
        'extend/extend-desktop/mvd-uribroker.md',
        'extend/extend-desktop/mvd-apptoappcommunication.md',
        'extend/extend-desktop/mvd-errorreportingui.md',
        'extend/extend-desktop/mvd-logutility.md',
        'extend/extend-desktop/zlux-app-server.md',
        'extend/extend-desktop/zlux-tutorials.md',
        'extend/extend-desktop/starter-intro.md',
        'extend/extend-desktop/zlux-workshop-starter-app.md',
        'extend/extend-desktop/zlux-workshop-user-browser.md',
        'extend/extend-desktop/ui-intro.md',
        'extend/extend-desktop/iframe-sample.md',
        'extend/extend-desktop/angular-sample.md',
      ]
    }
  ]
},
{
  text: 'Troubleshooting',
  baseuri: '/troubleshoot/',
  items: [
    {
    text: 'Troubleshooting installation',
    items: [
      'troubleshoot/troubleshootinstall.md'
    ]
  },
  {
    text: 'Troubleshooting API Mediation Layer (API ML)',
    items: [
      'troubleshoot/troubleshootingknownissues.md'
    ]
  }],
},
{
  text: 'Contributing',
  baseuri: '/contributing.html',
  link: 'contributing.md',
},
{
  text: 'Appendix',
  hideInPdf: true,
  canHideFirst: true,
  baseuri: '/appendix/',
  items: [
    {
    text: 'Bill of Materials',
    items: [
      'appendix/bill-of-materials.md'
    ]
  },
  {
    text: 'Third-Party Software Requirements',
    items: [
      'appendix/tpsr.md'
    ]
  }],
},
];

const navbarLinks = (allPages => {
  let result = [];

  for (let group of allPages) {
    if (group.hideInNavBar) {
      continue;
    }

    let converted = {};

    if (group.text) {
      converted.text = group.text;
    }
    if (group.link) {
      converted.link = `/${group.link}`;
    } else if (group.items) {
      converted.items = [];
      group.items.forEach(item => {
        if (item.hideInNavBar) {
          return;
        }

        let convertedItem = {};

        if (item.text) {
          convertedItem.text = item.text;
        }
        if (item.link) {
          convertedItem.link = `/${item.link}`;
        } else if (item.items && item.items[0]) {
          convertedItem.link = `/${item.items[0]}`;
        }

        converted.items.push(convertedItem);
      });
    }
    if (group.canHideFirst) {
      converted.canHideFirst = group.canHideFirst;
    }

    result.push(converted);
  }

  return result;
})(ALL_PAGES);

const sidebarLinks = (allPages => {
  let result = {};

  const convertLink = (link, baseuri) => `/${link}`
    .replace(baseuri, '')
    .replace(/\.(md|html)/, '')
    .replace(/^\//, '');

  for (let group of allPages) {
    if (group.hideInSideBar) {
      continue;
    }

    let converted = [];
    const baseuri = group.baseuri;

    if (group.link) {
      let convertedItem = convertLink(group.link, baseuri);
      converted.push(convertedItem);
    } else if (group.items) {
      for (let item of group.items) {
        if (item.hideInSideBar) {
          return;
        }

        let convertedItem = {
          title: item.text,
          collapsable: false,
          children: []
        };

        if (item.link) {
          convertedItem.children.push(convertLink(item.link, baseuri));
        } else if (item.items) {
          for (let subitem of item.items) {
            convertedItem.children.push(convertLink(subitem, baseuri));
          }
        }
        convertedItem.collapsable = convertedItem.children.length > 1;

        converted.push(convertedItem);
      }
    }

    result[baseuri] = converted;
  }

  return result;
})(ALL_PAGES);

const pdfLinks = (allPages => {
  let result = [];

  for (let group of allPages) {
    if (group.hideInPdf) {
      continue;
    }

    result.push(group);
  }

  return result;
})(ALL_PAGES);

module.exports = {
  title: 'Zowe Docs',
  version: CURRENT_ZOWE_VERSION,
  base: `${ROOT_BASE_URL}/${PUBLISH_TARGET_PATH}/`,
  dest: `.deploy/${PUBLISH_TARGET_PATH}/`,
  description: 'Version 1.0.x',
  ga: 'UA-123892882-1',
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'FFi0biHTX9XKglMxt3n2NZkB-knrnPxIrgBXpIZqlzc'
      }
    ]
  ],
  themeConfig: {
    docsDir: 'docs',
    // define Zowe versions
    versions: ZOWE_VERSIONS,
    // expose this to render versioning urls
    rootBaseUrl: ROOT_BASE_URL,
    repo: `https://github.com/zowe${ROOT_BASE_URL}`,
    editLinks: true,
    editLinkText: 'Propose content change in GitHub.',
    lastUpdated: 'Last Updated', // string | boolean
    sidebarDepth: 2,
    algolia: {
      apiKey: '59ff39ed48d0820010c7e09fc4b677bf',
      indexName: 'zowe',
      algoliaOptions: {
        facetFilters: [`version:${PUBLISH_TARGET_PATH}`],
      }
    },
    nav: [
      // IMPORTANT: if you have new pages, please update ALL_PAGES constant defined above
      ...navbarLinks,
      // MODIFICATION_FROM_THEME versions dropdown placeholder, it will be converted when rendering
      { tags: ['versions'] },
      {
        text: 'Zowe.org',
        link: 'https://zowe.org',
        // MODIFICATION_FROM_THEME newly added to support image link
        image: 'assets/zowe-logo.png',
        imageWidth: 20,
        imageHeight: 20
      }
    ],
    // IMPORTANT: if you have new pages, please update ALL_PAGES constant defined above
    sidebar: sidebarLinks
  },
  // pages tree used by generating PDF
  pdf: pdfLinks,
}
