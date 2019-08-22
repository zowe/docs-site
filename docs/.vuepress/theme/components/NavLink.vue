<template>
  <router-link
    class="nav-link"
    :to="link"
    v-if="!isExternal(link) && !isVersionLink"
    :exact="exact"
    replace
  >
    <!-- MODIFICATION_FROM_THEME added <img> condition -->
    <img v-if="item.image" :src="imageUrl" :title="item.text" :width="item.imageWidth" :height="item.imageHeight" />
    <span :class="{'not-in-navbar': item.image}">{{ item.text }}</span>
  </router-link>
  <!-- MODIFICATION_FROM_THEME added for listing versions without certain css class and target -->
  <a
    v-else-if="isVersionLink"
    :href="link"
    class="nav-link"
  >
    {{ item.text }}
  </a>
  <a
    v-else
    :href="link"
    class="nav-link external"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
  >
    <!-- MODIFICATION_FROM_THEME added <img> condition -->
    <img v-if="item.image" :src="imageUrl" :title="item.text" :width="item.imageWidth" :height="item.imageHeight" style="vertical-align:top" />
    <span :class="{'not-in-navbar': item.image}">{{ item.text }}</span>
    <!-- MODIFICATION_FROM_THEME removed <OutboundLink/> -->
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '../util'

export default {
  props: {
    item: {
      required: true
    }
  },
  computed: {
    link () {
      return this.item.link && ensureExt(this.item.link) || ''
    },
    // MODIFICATION_FROM_THEME newly added
    isVersionLink () {
      return this.item.tags && this.item.tags.indexOf('versions') > -1
    },
    // MODIFICATION_FROM_THEME newly added
    imageUrl () {
      if (!this.item.image) {
        return ''
      }
      if (this.item.image.match(/^https?/)) {
        return this.item.image
      } else if (this.item.image.match(/^\//)) {
        return this.item.image
      } else {
        return this.$site.base + this.item.image
      }
    },
    exact () {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link)
      }
      return this.link === '/'
    }
  },
  methods: {
    isExternal,
    isMailto,
    isTel
  }
}
</script>
