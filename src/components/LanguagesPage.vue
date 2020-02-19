<template>
  <div class="page">
    <div class="loading" v-if="!response">
      <icon name="spinner" pulse scale="2"></icon>
    </div>
    <article v-else>
      <em class="lastrun">Last run at {{response.lastrun | date}}</em>

      <table>
        <thead>
        <tr>
          <th>Language</th>
          <th>Repos</th>
          <th>Users</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="l in response.langs" :key="l.Language">
          <td>
            <router-link :to="{name: 'Language', params: {lang: l.Language}}" @click.native="getLang(l.Language)">
              {{l.Language}}
            </router-link>
          </td>
          <td>{{l.Count}}</td>
          <td>{{l.Users}}</td>
        </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
import {listLanguages, getLang} from '@/lib/stldevs'

export default {
  name: 'LanguagesPage',
  data () {
    return {
      response: null
    }
  },
  methods: {
    getLang
  },
  async created () {
    this.response = await listLanguages()
  }
}
</script>
<style scoped>
</style>
