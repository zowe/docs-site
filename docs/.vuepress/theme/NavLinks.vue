<template>
  <nav class="nav-links" v-if="userLinks.length || repoLink">
    <!-- user links -->
    <div
      :class="['nav-item', {'can-hide-first': item.canHideFirst }]"
      v-for="item in userLinks"
      :key="item.link">
      <DropdownLink v-if="item.type === 'links'" :item="item"/>
      <NavLink v-else :item="item"/>
    </div>
    <!-- repo link -->
    <a v-if="repoLink"
      :href="repoLink"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer">
      <!-- MODIFICATION_FROM_THEME: repoLabel text link is replaced with img tag below -->
      <img v-if="repoLabel == 'GitHub'" :src="githubLogo" width="20" height="20" style="vertical-align:top" :title="repoLabel" />
      <span v-else>{{ repoLabel }}</span>
      <!-- MODIFICATION_FROM_THEME removed <OutboundLink/> -->
    </a>
  </nav>
</template>

<script>
import DropdownLink from './DropdownLink.vue'
import { resolveNavLinkItem } from './util'
import NavLink from './NavLink.vue'

export default {
  components: { NavLink, DropdownLink },
  computed: {
    userNav () {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },
    nav () {
      // parse versions settings
      const versionsIndex = this.userNav.findIndex(one => one.tags && one.tags.indexOf('versions') > -1)
      if (versionsIndex > -1) {
        // FIXME: text by locales
        this.userNav[versionsIndex].text = 'Versions'
        this.userNav[versionsIndex].items = this.$site.themeConfig.versions.map(one => {
          return {
            text: one.text,
            link: `${this.$site.themeConfig.rootBaseUrl}/${one.link}`,
            tags: ['versions']
          }
        })
        if (this.userNav[versionsIndex].items.length === 1) {
          // we only have one version, remove the versions dropdown
          this.userNav.splice(versionsIndex, 1)
        }
      }

      // parse locales settings
      const { locales } = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const text = themeLocales[path] && themeLocales[path].label || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        }
        return [...this.userNav, languageDropdown]
      }
      return this.userNav
    },
    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },
    // MODIFICATION_FROM_THEME, newly added
    githubLogo () {
      return this.$site.base + 'assets/Github-Mark-32px.png'
    },
    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
    },
    repoLabel () {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .nav-item
    cursor pointer
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
  .repo-link
    margin-left 1.5rem

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>
