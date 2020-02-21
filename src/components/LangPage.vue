<template>
  <div class="page">
    <hero/>
    <div class="loading" v-if="!response">
      <spinner/>
    </div>
    <article v-else>
      <h3 ref="top">{{response.count}} {{$route.params.lang}} users in St. Louis</h3>
      <p class="page-of">Page {{page}} of {{pages}}</p>
      <div v-for="lang in response.languages" :key="lang.Owner">
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
        <div class="flex-1 center">Page {{page}} of {{pages}}</div>
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
import Hero from '@/components/Hero'
import Spinner from '@/components/Spinner'

export default {
  components: {
    Hero,
    Spinner
  },
  data () {
    return {
      response: null,
      page: 0,
      offset: 0,
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
    morePages() {
      return this.page+1 < this.pages
    }
  },
  methods: {
    async next() {
      this.page++
      this.offset += this.pageSize
      this.response = await getLang(this.$route.params.lang, this.offset, this.pageSize)
      await this.$router.push({query: {page: this.page.toString()}})
      this.$nextTick(() => {
        document.getElementsByTagName('header')[0].scrollIntoView({behavior: 'smooth'})
      })
    },
    async prev() {
      this.page--
      this.offset -= this.pageSize
      this.response = await getLang(this.$route.params.lang, this.offset, this.pageSize)
      await this.$router.push({query: {page: this.page > 0 ? this.page.toString() : undefined}})
      this.$nextTick(() => {
        document.getElementsByTagName('header')[0].scrollIntoView({behavior: 'smooth'})
      })
    }
  },
  async created () {
    this.page = Number(this.$route.query.page) || 0
    this.offset = this.page * this.pageSize
    this.response = await getLang(this.$route.params.lang, this.offset, this.pageSize)
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
