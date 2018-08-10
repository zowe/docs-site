module.exports = {
  title: 'Zowe Docs',
  base: '/docs-site/',
  description: 'Home of Zowe documentation',
  // ga: '',
  themeConfig: {
    docsDir: 'docs',
    repo: 'https://github.com/zowe/docs-site',
    editLinks: true,
    editLinkText: 'Propose content change in GitHub.',
    lastUpdated: 'Last Updated', // string | boolean
    sidebarDepth: 2,
    nav: [
      { text: 'Developer Tutorials', link: '/guides/intro' },
      { text: 'Samples', link: '/samples/intro' },
      { text: 'User Guide', link: '/user-guide/aboutthisdoc' }
    ],
    sidebar: {
      '/guides/': [
        {
          title: 'Developer Tutorials',
          collapsable: true,
          children: ['intro']
        },
        {
          title: 'Build Angular App',
          collapsable: true,
          children: ['creating-angluar-app']
        },
        {
          title: 'Provide Liberty APIs',
          collapsable: true,
          children: ['libertyAPI', 'ReactJSUI']
        }
      ],
      '/samples/': [
        {
          title: 'Code Samples',
          collapsable: true,
          children: ['intro']
        },
        {
          title: 'Provide Liberty API Sample',
          collapsable: true,
          children: ['api']
        },
        {
          title: 'The UI Samples',
          collapsable: true,
          children: ['ui']
        }
      ],
      '/user-guide/': [
        {
          title: 'About this documentation',
          collapsable: true,
          children: ['aboutthisdoc']
        },
        {
          title: 'Zowe Overview',
          collapsable: true,
          children: ['introduction']
        },
        {
          title: 'Installing Zowe',
          collapsable: true,
          children: [
            'installandconfig',
            'installroadmap',
            'planinstall',
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
          children: [
            'mvd-zluxconfiguration',
            'cli-configuringcli'
           ]
        },
        {
          title: 'Using Zowe',
          collapsable: true,
          children: [
            'using',
            'usingmvd',
            'usingapis',
            'cli-usingcli',
            'api-mediation-usingapiml'
           ]
        },
        {
          title: 'Extending zLUX',
          collapsable: true,
          children: [
            'mvd-extendingzlux',
            'mvd-plugincreateappplugin',
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
          children: ['cli-extending', 'cli-installplugins', 'cli-db2plugin']
        },
      ],
      '/': ['' /* / */, 'about' /* /about.html */]
    }
  }
}
