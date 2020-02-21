<template>
  <div class="page">
    <div class="loading" v-if="!response">
      <icon name="spinner" pulse scale="2"></icon>
    </div>
    <article v-else>
      <h3 ref="top">{{response.count}} {{$route.params.lang}} users in St. Louis</h3>
      <p class="page-of">Page {{page+1}} of {{pages}}</p>
      <div v-for="lang in paginated" :key="lang.Owner">
        <router-link :to="`/developers/${lang.Owner}`">{{lang.Owner}}</router-link>
        has <b>{{lang.Count}}</b> <icon name="star"/> on {{$route.params.lang}} repos, with popular ones like:
        <ul>
          <li v-for="r in lang.Repos" :key="r.Name">
            <a :href="`https://github.com/${lang.Owner}/${r.Name}`" target="_blank">
              {{r.Name}}
            </a>
            (<b>{{r.StargazersCount}}</b> <icon name="star"/>) <small>{{r.Description || '(No description)'}}</small>
          </li>
        </ul>
      </div>
      <div class="flex">
        <div>
          <button class="flex-1" @click="prev()" :disabled="page === 0">
            Previous
          </button>
        </div>
        <div class="flex-1 center">Page {{page+1}}/{{pages}}</div>
        <div>
          <button @click="next()" :disabled="!morePages">
            Next
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import {getLang} from '@/lib/stldevs'

export default {
  name: 'LangPage',
  data () {
    return {
      response: null,
      page: 0,
      pageSize: 25
    }
  },
  computed: {
    pages() {
      if (this.response === null) {
        return 0
      }
      return Math.ceil(this.response.count / this.pageSize)
    },
    paginated() {
      if (!this.response) {
        return []
      }
      const start = this.page * this.pageSize
      return this.response.languages.slice(start, start + this.pageSize)
    },
    morePages() {
      return this.page+1 < this.pages
    }
  },
  methods: {
    next() {
      if (this.page * this.pageSize > this.response.languages.length) {
        return
      }
      this.page++
      setTimeout(() => document.getElementsByTagName('header')[0].scrollIntoView({behavior: 'smooth'}),100);
    },
    prev() {
      if (this.page === 0) {
        return
      }
      this.page--
      setTimeout(() => document.getElementsByTagName('header')[0].scrollIntoView({behavior: 'smooth'}),100);
    }
  },
  async created () {
    this.response = await getLang(this.$route.params.lang)
  }
}
</script>
<style scoped lang="scss">
  .profile {
    display: flex;
    .avatar {
      height: 200px;
    }
  }
  .page-of {
    text-align: right;
    padding: 0;
    margin: 0;
  }
</style>
