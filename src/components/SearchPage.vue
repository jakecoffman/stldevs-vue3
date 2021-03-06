<template>
  <div class="page">
    <hero/>
    <div class="search">
      <input type="text" v-model="query" @keyup.enter="search(query)" placeholder="Search"/>
      <button @click="search(query)">
        <icon name="search"></icon>
        Search
      </button>
    </div>

    <div v-if="status === 0">
      <article>Search for users or repositories</article>
    </div>
    <div class="loading" v-if="status === 1">
      <spinner/>
    </div>
    <transition name="page">
    <div v-if="status === 2">
      <p class="center">{{users.results.length}} users and {{repos.results.length}} repos</p>
      <article v-if="users.results.length">
        <h3>Users</h3>
        <section>
          <div v-for="user in users.results" :key="user.Login" class="profile">
            <router-link :to="`/developers/${user.Login}`">
              <img class="avatar" :src="user.AvatarURL">
            </router-link>
            <ul class="deets">
              <li><router-link :to="`/developers/${user.Login}`">{{user.Name || user.Login}}</router-link></li>
              <li>{{user.Blog}}</li>
              <li>{{user.Email}}</li>
              <li>{{user.Followers}} followers</li>
              <li>{{user.PublicRepos}} repos</li>
              <li>{{user.PublicGists}} gists</li>
            </ul>
          </div>
        </section>
      </article>
      <article class="repos" v-if="repos.results.length">
        <h3>Repositories</h3>
        <section v-for="repo in repos.results" :key="repo.Owner + repo.Name">
          <div class="flex">
            <h4 class="flex-1">
              {{repo.Name}} (by
              <router-link :to="`/developers/${repo.Owner}`">
                {{repo.Owner}}
              </router-link>
              )
            </h4>
            <span>
              {{repo.StargazersCount}} <icon name="star"></icon> {{repo.ForksCount}} <icon name="fork"></icon>
            </span>
          </div>
          <em>{{repo.Description}}</em>
        </section>
      </article>
    </div>
    </transition>
  </div>
</template>

<script>
import {search} from '@/lib/stldevs'
import Hero from '@/components/Hero'
import Spinner from '@/components/Spinner'

export default {
  components: {
    Hero,
    Spinner
  },
  data () {
    return {
      status: 0, // 0 - initial, 1 - loading, 2 - results
      usersStatus: 0,
      reposStatus: 0,
      users: {results: []},
      repos: {results: []},
      query: ''
    }
  },
  methods: {
    search (query) {
      if (!query) {
        return
      }
      this.status = 1
      this.usersStatus = 1
      this.reposStatus = 1
      search('users', query).then(r => {
        this.users = r
        this.usersStatus = 2
        this.status = 2
      })
      search('repos', query).then(r => {
        this.repos = r
        this.reposStatus = 2
        this.status = 2
      })
      this.$router.push({query: {query}})
      if (window && window.localStorage) {
        window.localStorage['stldevs-query'] = query
      }
    }
  },
  created () {
    if (window && window.localStorage && window.localStorage['stldevs-query']) {
      this.query = window.localStorage['stldevs-query']
      this.search(this.query)
    }
  }
}
</script>
<style scoped lang="scss">
  .search {
    margin: 1em;
    padding: 0.5em;
    display: flex;
    justify-content: center;
    input {
      font-size: 1em;
      flex: 1;
      margin-right: 1em;
      padding: 0.5em;
    }
    button {
      font-size: 1em;
    }
  }
  .center {
    display: flex;
    justify-content: center;
  }
  .profile {
    padding-top: .5em;
    display: flex;
    align-items: center;
  }
  .deets {
    flex-grow: 1;
  }
  h4 {
    margin: 0;
  }
  .repos {
    section {
      margin-bottom: 1em;
    }
  }
</style>
