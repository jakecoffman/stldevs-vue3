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
          <th>Repos</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="l in response.devs" :key="l.Login">
          <td class="ellipsis">
            <router-link :to="`/organizations/${l.Login}`" @click.native="getProfile(l.Login)">
              {{l.Name || l.Login}}
            </router-link>
          </td>
          <td>{{l.Stars}}</td>
          <td>{{l.Forks}}</td>
          <td>{{l.PublicRepos}}</td>
        </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
import LastRun from "@/components/LastRun"
import Hero from '@/components/Hero'
import {listOrganizations, getProfile} from '@/lib/stldevs'
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
  async created () {
    this.response = await listOrganizations()
  },
  methods: {
    getProfile
  }
}
</script>

<style scoped>
  .ellipsis {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
