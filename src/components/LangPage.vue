<template>
  <div class="page">
    <div class="loading" v-if="!response">
      <icon name="spinner" pulse scale="2"></icon>
    </div>
    <article v-else>
      <h3>{{response.count}} {{$route.params.lang}} users in St. Louis</h3>
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
    </article>
  </div>
</template>

<script>
import stldevs from '@/lib/stldevs'

export default {
  name: 'LangPage',
  data () {
    return {
      response: null,
      page: 0,
      pageSize: 100
    }
  },
  computed: {
    paginated() {
      if (!this.response) {
        return []
      }
      const start = this.page * this.pageSize
      return this.response.languages.slice(start, start + this.pageSize)
    }
  },
  methods: {
    next() {
      if (this.page * this.pageSize > this.response.languages.length) {
        return
      }
      this.page++
    },
    prev() {
      if (this.page === 0) {
        return
      }
      this.page--
    }
  },
  created () {
    stldevs.getLang(this.$route.params.lang).then(r => (this.response = r.data))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .profile {
    display: flex;
    .avatar {
      height: 200px;
    }
  }
</style>
