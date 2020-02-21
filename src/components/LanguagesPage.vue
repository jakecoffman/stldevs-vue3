<template>
  <div class="page">
    <hero/>
    <div class="loading" v-if="!response">
      <spinner/>
    </div>
    <article v-else>
      <last-run/>
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
import LastRun from "@/components/LastRun";
import Hero from '@/components/Hero'
import {listLanguages, getLang} from '@/lib/stldevs'
import Spinner from '@/components/Spinner'

export default {
  components: {
    LastRun,
    Hero,
    Spinner
  },
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
