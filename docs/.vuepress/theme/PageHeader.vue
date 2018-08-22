<template>
    <div class="page-edit">
      <div class="header-title">
        <h1>{{ title }}</h1>
      </div>
      <div class="last-updated" v-if="lastUpdated">
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
      <div class="edit-link" v-if="editLink">
        <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
        <OutboundLink/>
      </div>
      <div class="header-underline"></div>
    </div>
</template>

<script>
import { normalize, outboundRE, endingSlashRE } from './util'

export default {
  computed: {
    title() {
      if (this.$page.title) {
        return this.$page.title
      }
    },
    lastUpdated() {
      if (this.$page.lastUpdated) {
        return new Date(this.$page.lastUpdated).toLocaleString(this.$lang)
      }
    },
    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },
    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path)
      }
    },
    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  },
  methods: {
    logIt() {
      console.log(this.$page)
    },
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo
        return (
          base.replace(endingSlashRE, '') +
          `/${docsBranch}` +
          (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`

      return (
        base.replace(endingSlashRE, '') +
        `/edit/${docsBranch}` +
        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
        path
      )
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl';
@require './styles/wrapper.styl';

.page-edit {
    @extend $wrapper;
    padding-top: ($navbarHeight + 4rem);
    padding-bottom: 0rem;
    margin-bottom: -0.5rem;
    overflow: auto;

    .header-title {
        padding-bottom: 1rem;
    }

    .edit-link {
        display: inline-block;

        a {
            color: lighten($textColor, 25%);
            margin-right: 0.25rem;
        }
    }

    .last-updated {
        float: right;
        font-size: 0.9em;

        .prefix {
            font-weight: 500;
            color: lighten($textColor, 25%);
        }

        .time {
            font-weight: 400;
            color: #aaa;
        }
    }

    .header-underline {
        border-bottom: 1px solid $borderColor;
        padding: 0 0.15rem;
        margin-top: 0.5rem;
    }
}

@media (max-width: $MQMobile) {
    .page-edit {
        .last-updated {
            font-size: 0.8em;
            margin-bottom: 0.5rem;
            float: none;
            text-align: left;
        }
    }
}
</style>