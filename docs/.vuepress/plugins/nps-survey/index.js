const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  define () {
    const { siteConfig = {}} = context
    const offeringId = options.offeringId || siteConfig.offeringId
    const NPS_OFFERING_ID = offeringId || false
    const timeout = options.timeout || siteConfig.timeout
    const NPS_POPUP_TIMEOUT = timeout || 1000
    
    return { NPS_OFFERING_ID, NPS_POPUP_TIMEOUT }
  },

  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
})
