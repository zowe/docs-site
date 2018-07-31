module.exports = {
  title: 'Zowe Docs',
  base: '/docs-site/',
  description: 'Docs site for Zowe.',
  // ga: '',
  themeConfig: {
    docsDir: 'docs',
    repo: 'https://github.com/zowe/docs-site',
    editLinks: true,
    editLinkText: 'Edit this page on github.',
    lastUpdated: 'Last Updated', // string | boolean
    sidebarDepth: 2,
    nav: [
      { text: 'Guides', link: '/guides/creating-angluar-app' },
      { text: 'Examples', link: '/examples/api' },
      { text: 'User Guide', link: '/user-guide/editionnotice' }
    ],
    sidebar: {
      '/guides/': ['creating-angluar-app'],
      '/examples/': ['api', 'ui'],
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
          title: 'Project Zoe Overview',
          collapsable: true,
          children: ['zoe-introduction']
        },
        {
          title: 'Installing Project Zoe',
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
          title: 'Using Project Zoe',
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
