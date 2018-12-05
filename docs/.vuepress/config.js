// load versions list
const ZOWE_VERSIONS = require('./versions.json')
// root base url for all versions
const ROOT_BASE_URL = '/docs-site'
// Due to VuePress limitation, publish url path cannot have dot (.) inside
// so we convert it to dash
const PUBLISH_TARGET_PATH = (process.env.PUBLISH_TARGET_PATH || 'latest').replace(/\./g, '-')

module.exports = {
  title: 'Zowe Docs',
  base: `${ROOT_BASE_URL}/${PUBLISH_TARGET_PATH}/`,
  dest: `.deploy/${PUBLISH_TARGET_PATH}/`,
  description: 'Home of Zowe documentation',
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
        facetFilters: [ `version:${PUBLISH_TARGET_PATH}` ],
      }
    },
    nav: [
      { text: 'Getting Started',
      items: [
                    { text: 'Zowe overview', link: '/getting-started/overview'},
                    { text: 'Release notes', link: '/getting-started/summaryofchanges'}
      ]
      },
      { text: 'User Guide',
      items: [
                    { text: 'Installing Zowe', link: '/user-guide/installandconfig.md' },
                    { text: 'Configuring Zowe', link: '/user-guide/mvd-configuration.md' },
                    { text: 'Using Zowe', link: '/user-guide/using.md' },
                    { text: 'Zowe CLI extensions and plug-ins', link: '/user-guide/cli-extending.md'}
      ]
      },
      { text: 'Extending',
      items: [
                    { text: 'Developing JEE components', link: '/extend/extend-api/libertyAPI.md' },
                    { text: 'Developing for API Mediation Layer', link: '/extend/extend-apiml/api-mediation-onboard-overview.md' },
                    { text: 'Developing for Zowe CLI', link: '/extend/extend-cli/cli-devTutorials.md' },
                    { text: 'Developing for Zowe Application Framework', link: '/extend/extend-desktop/mvd-extendingzlux.md' }
            ]
      },
      { text: 'Troubleshooting', link: '/troubleshoot/troubleshootinstall' },
      { text: 'Contributing', link: '/contributing.html' },
      { tags: ['versions'] }, // versions dropdown placeholder, it should be converted
      { text: 'Zowe.org', link: 'https://zowe.org' }
    ],
    sidebar: {
      '/getting-started/': [
        {
          title: 'What is Zowe?',
          collapsable: false,
          children: [
            'overview'
          ]
        },
        {
          title: 'Release notes',
          collapsable: false,
          children: ['summaryofchanges']
        },
      ],
      '/user-guide/': [
        {
          title: 'Installing Zowe',
          collapsable: true,
          children: [
            'installandconfig',
            'installroadmap',
            'systemrequirements',
            'gettingstarted',
            'install-zos',
            'cli-installcli',
            'uninstall'
          ]
        },
        {
          title: 'Configuring Zowe',
          collapsable: true,
          children: [
            'mvd-configuration',
            'cli-configuringcli'
          ]
        },
        {
          title: 'Using Zowe',
          collapsable: true,
          children: [
            'using',
            'mvd-using',
            'usingapis',
            'api-mediation-api-catalog',
            'cli-usingcli'
          ]
        },
        {
          title: 'Zowe CLI extensions and plug-ins',
          collapsable: true,
          children: [
            'cli-extending',
            'cli-installplugins',
            'cli-cicsplugin',
            'cli-db2plugin',
            'cli-vscodeplugin'
          ]
        }
        ],
      '/extend/': [
        {
          title: 'Developing JEE components',
          collapsable: true,
          children: [
            'extend-api/libertyAPI',
            'extend-api/liberty-api-sample']
        },
        {
          title: 'Developing for API Mediation Layer',
          collapsable: true,
          children: [
            'extend-apiml/api-mediation-onboard-overview',
            'extend-apiml/api-mediation-onboard-a-sprint-boot-rest-api-service',
            'extend-apiml/api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer',
            'extend-apiml/api-mediation-onboard-an-existing-java-jersey-rest-api-service',
            'extend-apiml/api-mediation-onboard-an-existing-rest-api-service-without-code-changes'
          ]
        },
        {
          title: 'Developing for Zowe CLI',
          collapsable: true,
          children: [
            'extend-cli/cli-devTutorials',
            'extend-cli/cli-setting-up',
            'extend-cli/cli-installing-sample-plugin',
            'extend-cli/cli-extending-a-plugin',
            'extend-cli/cli-developing-a-plugin',
            'extend-cli/cli-implement-profiles']
        },
        {
          title: 'Developing for Zowe Application Framework',
          collapsable: true,
          children: [
            'extend-desktop/mvd-extendingzlux',
            'extend-desktop/mvd-creatingappplugins',
            'extend-desktop/mvd-plugindefandstruct',
            'extend-desktop/mvd-dataservices',
            'extend-desktop/mvd-desktopandwindowmgt',
            'extend-desktop/mvd-configdataservice',
            'extend-desktop/mvd-uribroker',
            'extend-desktop/mvd-apptoappcommunication',
            'extend-desktop/mvd-errorreportingui',
            'extend-desktop/mvd-logutility',
            'extend-desktop/zlux-example-server',
            'extend-desktop/zlux-workshop-user-browser',
            'extend-desktop/zlux-tutorials',
            'extend-desktop/starter-intro',
            'extend-desktop/zlux-workshop-starter-app.md',
            'extend-desktop/ui-intro',
            'extend-desktop/iframe-sample',
            'extend-desktop/react-sample',
            'extend-desktop/angular-sample',
            'extend-api/ReactJSUI'
          ]
        }
      ],
      '/troubleshoot/': ['troubleshootinstall'],
      '/contributing.html': ['contributing'],
      '/': ['about']
    }
  }
}
