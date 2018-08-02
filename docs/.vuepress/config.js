module.exports = {
  title: 'Zowe Docs',
  base: '/docs-site/',
  description: 'Home of Zowe documentation',
  // ga: '',
  themeConfig: {
    docsDir: 'docs',
    repo: 'https://github.com/zowe/docs-site',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub.',
    lastUpdated: 'Last Updated', // string | boolean
    sidebarDepth: 2,
    nav: [
      { text: 'Guides', link: '/guides/intro' },
      { text: 'Samples', link: '/samples/intro' },
      { text: 'User Guide', link: '/user-guide/editionnotice' }
    ],
    sidebar: {
      '/guides/': ['intro', 'creating-angluar-app', 'libertyAPI'],
      '/samples/': ['intro', 'api', 'ui'],
      '/user-guide/': [
        {
          title: 'Edition Notice',
          collapsable: true,
          children: ['editionnotice']
        },
        {
          title: 'About this document',
          collapsable: true,
          children: ['aboutthisbook']
        },
        {
          title: 'Summary of changes',
          collapsable: true,
          children: ['summaryofchanges']
        },
        {
          title: 'Project Zowe Overview',
          collapsable: true,
          children: ['zoe-introduction']
        },
        {
          title: 'Installing Project Zowe',
          collapsable: true,
          children: [
            'installandconfig',
            'installroadmap',
            'planinstall',
            'zoegettingstarted',
            'zoeinstall-zos',
            'cli-installcli',
            'zoeinstalltroubleshoot',
            'uninstall'
          ]
        },
        {
          title: 'Using Project Zowe',
          collapsable: true,
          children: ['using', 'usingmvd', 'usingapis', 'cli-usingcli']
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
            'mvd-logutility'
          ]
        },
        {
          title: 'Extending Zowe CLI',
          collapsable: true,
          children: ['cli-extending', 'cli-installplugins', 'cli-db2plugin']
        },
        {
          title: 'Notices',
          collapsable: true,
          children: [
            'notices_toc',
            'atlas-notices',
            'mvd-zluxlegalnotices',
            'cli-legalnotices'
          ]
        }
      ],
      '/': ['' /* / */, 'about' /* /about.html */]
    }
  }
}
