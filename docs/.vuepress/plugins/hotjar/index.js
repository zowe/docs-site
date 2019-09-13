const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  define () {
    const { siteConfig = {}} = context
    const hjid = options.hjid || siteConfig.hjid
    const HOTJAR_ID = hjid || false
    return { HOTJAR_ID }
  },

  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
})
