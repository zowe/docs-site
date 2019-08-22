const { path } = require('@vuepress/shared-utils')

module.exports = {
  name: 'sidebar-section',

  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js')
  ],

  globalUIComponents: 'SideBarSection'
}
