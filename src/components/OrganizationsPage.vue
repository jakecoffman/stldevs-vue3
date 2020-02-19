<template>
  <div class="page">
    <div class="loading" v-if="!response">
      <icon name="spinner" pulse scale="2"></icon>
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
import {listOrganizations, getProfile} from '@/lib/stldevs'

export default {
  components: {
    LastRun
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
