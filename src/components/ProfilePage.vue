<template>
  <div class="page">
    <hero/>
    <div class="loading" v-if="!response">
      <spinner/>
    </div>
    <article v-else>
      <section class="profile">
        <img class="avatar" :src="response.User.avatar_url">
        <ul>
          <li v-if="me && me.IsAdmin">
            User is <span v-if="response.User.Hide">hidden</span><span v-else>visible</span>.
            <button @click="toggleHide(!response.User.Hide)">
              Toggle
            </button>
          </li>
          <li><a :href="`https://github.com/${response.User.login}`" target="_blank">
            {{response.User.name || response.User.login}} <icon name="external-link-alt" class="sup" scale="0.75"/>
          </a></li>
          <li>{{response.User.blog}}</li>
          <li>{{response.User.email}}</li>
          <li>{{response.User.followers}} followers</li>
          <li>{{response.User.public_repos}} repos</li>
          <li>{{response.User.public_gists}} gists</li>
        </ul>
      </section>
      <section class="code">
        <div v-for="(infos, lang) in response.Repos" :key="lang">
          <h3 :id="lang">{{lang}}</h3>
          <section v-for="repo in infos" :key="repo.Name" class="repo">
            <div class="flex">
              <h4 class="flex-1">
                <icon v-if="repo.Fork === true" name="fork"></icon>
                <a :href="`https://github.com/${$route.params.login}/${repo.Name}`" target="_blank">{{repo.Name}}</a>
              </h4>
              <span>
              {{repo.StargazersCount}} <icon name="star"></icon> {{repo.ForksCount}} <icon name="fork"></icon>
            </span>
            </div>
            <em>{{repo.Description}}</em>
          </section>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import Spinner from '@/components/Spinner'
import {getProfile, getMe} from '@/lib/stldevs'
import axios from "axios";

export default {
  components: {
    Hero,
    Spinner
  },
  data () {
    return {
      response: null,
      me: null
    }
  },
  created () {
    getProfile(this.$route.params.login).then(r => this.response = r)
    getMe().then(r => this.me = r).catch(() => {})
  },
  methods: {
    async toggleHide(v) {
      const r = await axios.patch(`/stldevs-api/devs/${this.$route.params.login}`, {
        Hide: v
      }, {
        withCredentials: true
      })
      this.response = r.data
    }
  }
}
</script>
<style scoped lang="scss">
  h4 {
    margin: 0;
  }
  .repo {
      padding-bottom: 0.5em;
  }
</style>
