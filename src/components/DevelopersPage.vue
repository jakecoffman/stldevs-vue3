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
          <th>Developer</th>
          <th>Stars</th>
          <th>Forks</th>
          <th class="hide-phone">Followers</th>
          <th class="hide-phone">Repos</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="l in response" :key="l.Login">
          <td><router-link :to="`/developers/${l.Login}`" @click.native="getProfile(l.Login)">{{l.Name || l.Login}}</router-link></td>
          <td>{{l.Stars}}</td>
          <td>{{l.Forks}}</td>
          <td class="hide-phone">{{l.Followers}}</td>
          <td class="hide-phone">{{l.PublicRepos}}</td>
        </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
import LastRun from "@/components/LastRun"
import Hero from '@/components/Hero'
import Spinner from '@/components/Spinner'
import {listDevelopers, getProfile} from '@/lib/stldevs'

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
  async created () {
    this.response = await listDevelopers()
  },
  methods: {
    getProfile
  }
}
</script>
<style scoped>
</style>
