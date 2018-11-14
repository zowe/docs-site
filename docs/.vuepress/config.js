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
      { text: 'Getting started', link: '/getting-started/overview' },
      { text: 'User Guide', link: '/user-guide/installandconfig' },
      { text: 'Extending', link: '/extend/zlux-example-server' },
      { text: 'Troubleshooting', link: '/troubleshoot/troubleshootinstall' },
      { text: 'Contributing', link: '/contribute/CONTRIBUTING' },
      { tags: ['versions'] }, // versions dropdown placeholder, it should be converted
      { text: 'Zowe.org', link: 'https://zowe.org' }
    ],
    sidebar: {
      '/getting-started/': [
        {
          title: 'Zowe overview',
          collapsable: true,
          children: ['overview']
        },
        {
          title: 'Release notes',
          collapsable: true,
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
          title: 'Zowe extensions and plug-ins',
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
          title: 'The Zowe Extender Environment',
          collapsable: true,
          children: ['zlux-example-server']
        },
        {
          title: 'Developing for Zowe Application Framework (zLUX)',
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
            'mvd-logutility',
            'zlux-example-server',
            'zlux-workshop-user-browser',
            'zlux-tutorials',
            'starter-intro',
            'zlux-workshop-starter-app.md',
            'ui-intro',
            'iframe-sample',
            'react-sample',
            'angular-sample'
          ]
        },
        {
          title: 'Developing for API Mediation Layer',
          collapsable: true,
          children: [
            'api-mediation-onboard-overview',
            'api-mediation-onboard-a-sprint-boot-rest-api-service',
            'api-mediation-onboard-an-existing-java-rest-api-service-without-spring-boot-with-zowe-api-mediation-layer',
            'api-mediation-onboard-an-existing-java-jersey-rest-api-service',
            'api-mediation-onboard-an-existing-rest-api-service-without-code-changes']
        },
        {
          title: 'Developing for Zowe CLI',
          collapsable: true,
          children: [
            'cli-devTutorials',
            'cli-setting-up',
            'cli-installing-sample-plugin',
            'cli-extending-a-plugin',
            'cli-developing-a-plugin',
            'cli-implement-profiles']
        },
        {
          title: 'Developing JEE components',
          collapsable: true,
          children: [
            'libertyAPI',
            'ReactJSUI',
            'api-intro',
            'liberty-api-sample']
        }
      ],
	'/troubleshoot/': [
        {
          title: 'FAQ',
          collapsable: true,
          children: ['troubleshootinstall']
        },
      ],
	'/contribute/': [
        {
          title: 'Contributing to documentation',
          collapsable: true,
          children: ['CONTRIBUTING']
        },
      ],
      '/': ['about']
    }
  }
}
