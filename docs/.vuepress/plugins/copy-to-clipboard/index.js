const { path } = require('@vuepress/shared-utils')

module.exports = (options) => ({
  name: 'copy-to-clipboard',

  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})
