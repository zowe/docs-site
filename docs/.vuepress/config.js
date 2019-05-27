// load versions list
const ZOWE_VERSIONS = require('./versions.json')
const CURRENT_ZOWE_VERSION = '1.3.0'
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
  {
    text: 'Zowe CLI quick start',
    link: 'getting-started/cli-getting-started.md'
  },
  {
    text: 'Zowe CLI FAQs',
    link: 'getting-started/freqaskques.md'
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
      'user-guide/install-nodejs-zos.md',
      'user-guide/systemrequirements-zosmf.md',
      'user-guide/systemrequirements-zosmf-lite.md',
      'user-guide/install-zos.md',
      'user-guide/cli-installcli.md',
      'user-guide/cli-updatingcli.md',
      'user-guide/uninstall.md',
    ],
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
      'user-guide/cli-swreqplugins.md',
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
        'extend/extend-apiml/api-mediation-onboard-a-spring-boot-rest-api-service.md',
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
        'extend/extend-desktop/zlux-workshop-user-browser.md',
      ]
    }
  ]
},
{
  text: 'Troubleshooting',
  baseuri: '/troubleshoot/',
  items: [
    {
      text: 'Overview',
      link: 'troubleshoot/troubleshooting.md'
    },
    {
      text: 'API Mediation Layer',
      link: 'troubleshoot/troubleshoot-apiml.md'
    },
    {
      text: 'Zowe Application Framework',
      link: 'troubleshoot/troubleshoot-app-framework.md'
    },
    {
      text: 'Zowe z/OS Services',
      link: 'troubleshoot/troubleshoot-zos-services.md'
    },
    {
      text: 'Zowe CLI',
      link: 'troubleshoot/troubleshoot-cli.md'
    }
    ]
},
{
  text: 'Contributing',
  baseuri: '/contribute/',
  items: [
    {
      text: 'Contributing to documentation',
      items: [
        'contribute/contributing.md'
      ]
    },
    {
      text: 'UI Guidelines',
       items: [
         'contribute/guidelines-ui/ui.md',
         'contribute/guidelines-ui/colors.md',
         'contribute/guidelines-ui/typography.md',
         'contribute/guidelines-ui/grid.md',
         'contribute/guidelines-ui/icon.md',
         'contribute/guidelines-ui/appicon.md'
         ]
     }
  ]
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
  base: `${ROOT_BASE_URL}/${PUBLISH_TARGET_PATH}/`,
  dest: `.deploy/${PUBLISH_TARGET_PATH}/`,
  description: 'Version 1.3.x',
  ga: 'UA-123892882-1',
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'FFi0biHTX9XKglMxt3n2NZkB-knrnPxIrgBXpIZqlzc'
      }
    ],
    // embed NPS Survey code
    ['script', {
      src: 'https://nps.mybluemix.net/survey/nps-survey.js'
    }],
    ['script', { }, `window.ibmNps = {
      offeringId: "ece49543-bfcc-4d5c-a9c2-64b23b1366c3",
      userId: "",
      disableHashing: true,
     deferSurvey:true,
    };`],
    ['script', { }, `setTimeout( function(){showNpsSurvey && showNpsSurvey();}, 1200000);`],
    // embed copy-to-clipboard code
    ['script', {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js'
    }],
    ['script', { }, `window.ensureCopyToClipboard = function() {
      var existing = document.querySelectorAll('pre[class*="language-"] > button.btn-copy-to-clipboard');
      if (existing.length > 0) {
        console.log('copy-to-clipboard already initialized.')
        return false;
      }
      console.log('copy-to-clipboard not initialized yet, continuing ...')

      const copyIcon =
        '<svg width="12" height="12" viewBox="340 364 14 15" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M342 375.974h4v.998h-4v-.998zm5-5.987h-5v.998h5v-.998zm2 2.994v-1.995l-3 2.993 3 2.994v-1.996h5v-1.995h-5zm-4.5-.997H342v.998h2.5v-.997zm-2.5 2.993h2.5v-.998H342v.998zm9 .998h1v1.996c-.016.28-.11.514-.297.702-.187.187-.422.28-.703.296h-10c-.547 0-1-.452-1-.998v-10.976c0-.546.453-.998 1-.998h3c0-1.107.89-1.996 2-1.996 1.11 0 2 .89 2 1.996h3c.547 0 1 .452 1 .998v4.99h-1v-2.995h-10v8.98h10v-1.996zm-9-7.983h8c0-.544-.453-.996-1-.996h-1c-.547 0-1-.453-1-.998 0-.546-.453-.998-1-.998-.547 0-1 .452-1 .998 0 .545-.453.998-1 .998h-1c-.547 0-1 .452-1 .997z" fill-rule="evenodd"/></svg>';
      const clearTooltip = function(e) {
          e.currentTarget.removeAttribute('tooltip');
          e.currentTarget.removeAttribute('tooltip-position');
        },
        showTooltip = function(elem, msg) {
          elem.setAttribute('tooltip', msg);
          elem.setAttribute('tooltip-position', 'left');
        },
        fallbackMessage = function(action) {
          var actionMsg = '';
          var actionKey = (action === 'cut' ? 'X' : 'C');
          if (/iPhone|iPad/i.test(navigator.userAgent)) {
              actionMsg = 'No support :(';
          } else if (/Mac/i.test(navigator.userAgent)) {
              actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
          } else {
              actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
          }
          return actionMsg;
        };
      var snippets = document.querySelectorAll('pre[class*="language-"] > code');
      snippets.forEach(function(snippet) {
        snippet.parentNode.firstChild.insertAdjacentHTML('beforebegin', '<button class="btn-copy-to-clipboard" title="Copy to clipboard" data-clipboard-snippet>'+copyIcon+'</button>')
      });
      var btns = document.querySelectorAll('.btn-copy-to-clipboard');
      for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener('mouseleave', clearTooltip);
          btns[i].addEventListener('blur', clearTooltip);
      }
      var clipboardSnippets = new ClipboardJS('[data-clipboard-snippet]', {
          target: function(trigger) {
              return trigger.parentNode.querySelector('code');
          }
      });
      clipboardSnippets.on('success', function(e) {
          e.clearSelection();
          showTooltip(e.trigger, 'Copied!');
      });
      clipboardSnippets.on('error', function(e) {
          showTooltip(e.trigger, fallbackMessage(e.action));
      });
    };`],
    //embed hotjar
    ['script', { }, `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1291329,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`],   
  ],
  themeConfig: {
    docsDir: 'docs',
    // define Zowe versions
    versions: ZOWE_VERSIONS,
    // expose this to render versioning urls
    rootBaseUrl: ROOT_BASE_URL,
    repo: `https://github.com/zowe${ROOT_BASE_URL}`,
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
        text: 'Feedback',
        canHideFirst: true,
        link: 'https://forms.gle/Ztu9AjgV6HRr1kEs9'
      },
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
