// load versions list
const ZOWE_VERSIONS = require('./versions.json')
const CURRENT_ZOWE_VERSION = '1.19.1 LTS'
// Due to VuePress limitation, publish url path cannot have dot (.) inside
// so we convert it to dash
const PUBLISH_TARGET_PATH = (process.env.PUBLISH_TARGET_PATH || 'stable').replace(/\./g, '-')
// this holds list of all pages
// IMPORTANT: if you have new pages, please update this constant
//
// Options for page:
// @canHideFirst(Boolean)   if want to hide the link on navbar earlier than regular links
// @hideInPdf(Boolean)      if hide this page/section from PDF side menus
// @hideInSideBar(Boolean) if hide this page from website side bar
// @hideInNavBar(Boolean)   if hide this link from website top navigation bar
const ALL_PAGES = require('./pages.json');

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
          // this is the root of the item
          section: group.text,
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
  base: `/${PUBLISH_TARGET_PATH}/`,
  dest: `.deploy/${PUBLISH_TARGET_PATH}/`,
  description: 'Version 1.19.x LTS',
  extraWatchFiles: [
    '.vuepress/theme/'
  ],
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'FFi0biHTX9XKglMxt3n2NZkB-knrnPxIrgBXpIZqlzc'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ],
  ],
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/google-analytics', {
        'ga': 'UA-123892882-1'
    }],
    './docs/.vuepress/plugins/sidebar-section/index.js',
    './docs/.vuepress/plugins/copy-to-clipboard/index.js',
    ['./docs/.vuepress/plugins/nps-survey/index.js', {
        'offeringId': 'ece49543-bfcc-4d5c-a9c2-64b23b1366c3',
        'timeout': 3600000
    }],
    ['./docs/.vuepress/plugins/hotjar/index.js', {
      'hjid': '1291329',
    }],
  ],
  themeConfig: {
    docsDir: 'docs',
    // define Zowe versions
    versions: ZOWE_VERSIONS,
    repo: `https://github.com/zowe/docs-site`,
    editLinks: true,
    editLinkText: 'Propose content change in GitHub',
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
