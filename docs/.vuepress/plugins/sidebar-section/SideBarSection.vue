<template>
  <div class="sidebar-section" v-if="sectionTitle">{{ sectionTitle }}</div>
</template>

<script>
import { isActive } from '../../theme/util'

export default {
  name: 'SidebarSection',

  props: ['items'],

  data () {
    return {
      sectionTitle: '',
    }
  },

  created () {
    this.refreshIndex()
  },

  watch: {
    '$route' () {
      this.refreshIndex()
    }
  },

  methods: {
    refreshIndex () {
      if (!this.items) {
        return
      }

      const index = resolveOpenGroupIndex(
        this.$route,
        this.items
      )
      if (index > -1) {
        this.sectionTitle = this.items[index].section
      } else {
        this.sectionTitle = ''
      }
    },

    isActive (page) {
      return isActive(this.$route, page.path)
    }
  }
}

function resolveOpenGroupIndex (route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type === 'group' && item.children.some(c => c.type === 'page' && isActive(route, c.path))) {
      return i
    }
  }
  return -1
}
</script>

<style lang='stylus'>
.sidebar
  .sidebar-section
    background-color #f0f0f0
    color #333
    font-size 1.25em
    font-weight bold
    margin 1.2rem 0.8rem -1rem 1rem
    padding 0.8rem 1rem
    border-radius 5px
</style>
