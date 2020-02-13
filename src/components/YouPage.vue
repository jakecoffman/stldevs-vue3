<template>
  <div class="page">
    <article>
      <div v-if="!me">
        <p>You aren't logged in. You can login to opt out of this website.</p>
        <a href="/stldevs-api/login">Login With GitHub</a>
      </div>
      <div v-else>
        Welcome {{me.Name || me.Login}}!
        <div v-if="!me.Hide">
          To opt out of stldevs click here:
          <button @click="optOut()">Opt Out</button>
        </div>
        <div v-else>
          To opt back in to stldevs click here:
          <button @click="optIn()">Opt In</button>
        </div>

        <div v-if="me.IsAdmin">You're an admin</div>

        <button @click="logout()">Logout</button>
      </div>
    </article>
  </div>
</template>

<script>
import stldevs from '@/lib/stldevs'
import axios from "axios";

export default {
  name: 'ProfilePage',
  data () {
    return {
      me: null
    }
  },
  created () {
    stldevs.getMe().then(r => this.me = r.data)
  },
  methods: {
    logout() {
      stldevs.logout().then(() => this.me = null)
    },
    async optOut() {
      const r = await axios.patch(`/stldevs-api/devs/`, {Hide: true}, {withCredentials: true})
      this.me = r.data
    },
    async optIn() {
      const r = await axios.patch(`/stldevs-api/devs/`, {Hide: false}, {withCredentials: true})
      this.me = r.data
    },
  }
}
</script>

<style scoped>
  h4 {
    margin: 0;
  }
  .repo {
      padding-bottom: 0.5em;
  }
</style>
