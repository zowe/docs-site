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
      { text: 'Developer Tutorials', link: '/guides/intro' },
      { text: 'Samples', link: '/samples/intro' },
      { text: 'User Guide', link: '/user-guide/aboutthisdoc' },
      { tags: ['versions'] }, // versions dropdown placeholder, it should be converted
      { text: 'Zowe.org', link: 'https://zowe.org' }
    ],
    sidebar: {
      '/guides/': [
        'intro',
        {
          title: 'Getting Started with zLUX',
          collapsable: true,
          children: ['zlux-example-server', 'zlux-workshop-user-browser', 'zlux-tutorials']
        },
        {
          title: 'Providing Liberty APIs',
          collapsable: true,
          children: ['libertyAPI', 'ReactJSUI']
        },
        {
          title: 'Onboard REST APIs to the API Mediation Layer',
          collapsable: true,
          children: [
            'api-mediation-onboard-an-existing-rest-api-service-without-code-changes', 
            'api-mediation-onboard-a-sprint-boot-rest-api-service', 
            'api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer', 
            'api-mediation-onboard-an-existing-java-jersey-rest-api-service', 
            'api-mediation-onboard-an-existing-rest-api-service-without-code-changes']
        },
        {
          title: 'Developing for Zowe CLI',
          collapsable: true,
          children: ['cli-devTutorials', 'cli-setting-up', 'cli-installing-sample-plugin', 'cli-extending-a-plugin', 'cli-developing-a-plugin',
          'cli-implement-profiles']
        }
      ],
      '/samples/': [
        'intro',
        {
          title: 'Starter App Samples',
          collapsable: true,
          children: ['starter-intro', 'zlux-workshop-starter-app.md']
        },
        {
          title: 'API Extension Samples',
          collapsable: true,
          children: ['api-intro', 'liberty-api-sample']
        },
        {
          title: 'zLUX Samples',
          collapsable: true,
          children: [
            'ui-intro',
            'iframe-sample',
            'react-sample',
            'angular-sample'
          ]
        }
      ],
      '/user-guide/': [
        {
          title: 'About this documentation',
          collapsable: true,
          children: ['aboutthisdoc']
        },
        {
          title: 'Release notes',
          collapsable: true,
          children: ['summaryofchanges']
        },
        {
          title: 'Zowe overview',
          collapsable: true,
          children: ['overview']
        },
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
            'troubleshootinstall',
            'uninstall'
          ]
        },
        {
          title: 'Configuring Zowe',
          collapsable: true,
          children: ['mvd-configuration', 'cli-configuringcli']
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
          title: 'Extending the Zowe Application Framework',
          collapsable: true,
          children: [
            'mvd-extendingzlux',
            'mvd-creatingappplugins',
            'mvd-plugindefandstruct',
            'mvd-dataservices',
            'mvd-desktopandwindowmgt',
            'mvd-configdataservice',
            'mvd-uribroker',
            'mvd-apptoappcommunication',
            'mvd-errorreportingui',
            'mvd-logutility'
          ]
        },
        {
          title: 'Extending Zowe CLI',
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
      '/': ['about']
    }
  }
}
