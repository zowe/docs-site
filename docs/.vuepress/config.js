module.exports = {
  title: 'Zowe Docs',
  base: '/docs-site/',
  description: 'Home of Zowe documentation',
  ga: 'UA-123892882-1',
  themeConfig: {
    docsDir: 'docs',
    repo: 'https://github.com/zowe/docs-site',
    editLinks: true,
    editLinkText: 'Propose content change in GitHub.',
    lastUpdated: 'Last Updated', // string | boolean
    sidebarDepth: 2,
    activeHeaderLinks: false,
    displayAllHeaders: true, // Default: false
    nav: [
      { text: 'Zowe Extenders', link: '/extender-guides/architecture' },
      // { text: 'Developer Tutorials', link: '/guides/intro' },
      { text: 'Samples', link: '/samples/intro' },
      { text: 'User Guide', link: '/user-guide/aboutthisdoc' },
      { text: 'Zowe.org', link: 'https://zowe.org' }
    ],
    sidebar: {
      '/extender-guides/': [
        {
          title: 'Zowe Extenders Guide',
          collapsable: false,
          children: ['architecture','onboarding',
            'moreinfo','deliver']
        },
        {
          title: 'Onboarding Examples',
          collapsable: true,
          children: ['libertyAPI','ReactJSUI', 'api-mediation-usingapiml','zlux-example-server', 'zlux-workshop-user-browser']
        },
        {
          title: 'Virtual Desktop Examples',
          collapsable: true,
          children: ['starter-intro', 'zlux-workshop-starter-app.md', 'ui-intro',
          'iframe-sample',
          'react-sample',
          'angular-sample']
        },   
        {
          title: 'Developing for Zowe CLI',
          collapsable: true,
          children: ['cli-devTutorials', 'cli-setting-up', 'cli-installing-sample-plugin', 'cli-extending-a-plugin', 'cli-developing-a-plugin',
          'cli-implement-profiles']
        }        
      ],
      // '/guides/': [
      //   'intro',
      //   {
      //     title: 'Getting Started with zLUX',
      //     collapsable: true,
      //     children: ['zlux-example-server', 'zlux-workshop-user-browser']
      //   },
      //   {
      //     title: 'Provide Liberty APIs',
      //     collapsable: true,
      //     children: ['libertyAPI', 'ReactJSUI']
      //   },
      //   {
      //     title:
      //       'Onboard Spring Boot REST API services using Zowe API Mediation Layer',
      //     collapsable: true,
      //     children: ['api-mediation-usingapiml']
      //   },
      //   {
      //     title: 'Coming Soon',
      //     collapsable: true,
      //     children: ['cli-developPlugins']
      //   }
      // ],
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
          children: ['download-pdf', 'aboutthisdoc']
        },
        {
          title: 'Summary of changes',
          collapsable: true,
          children: ['summaryofchanges']
        },
        {
          title: 'Zowe Overview',
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
          children: ['mvd-zluxconfiguration', 'cli-configuringcli']
        },
        {
          title: 'Using Zowe',
          collapsable: true,
          children: [
            'using',
            'usingzlux',
            'usingapis',
            'api-mediation-api-catalog',
            'cli-usingcli'
          ]
        },
        {
          title: 'Extending zLUX',
          collapsable: true,
          children: [
            'mvd-extendingzlux',
            'mvd-creatingzluxappplugins',
            'mvd-zluxplugindefandstruct',
            'mvd-zluxdataservices',
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
          children: ['cli-extending', 'cli-installplugins', 'cli-cicsplugin', 'cli-db2plugin']
        }
      ],
      '/': ['about']
    }
  }
}
