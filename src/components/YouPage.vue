<template>
  <div class="page">
    <hero/>
    <article>
      <div v-if="!me">
        <p>You aren't logged in. You can login to opt out of this website.</p>
        <a href="/stldevs-api/login">Login With GitHub</a>
      </div>
      <div v-else>
        Welcome {{me.name || me.login}}!
        <div v-if="!me.Hide">
          <p>To opt out of stldevs click here:</p>
          <button @click="optOut()">Opt Out</button>
        </div>
        <div v-else>
          <p>You should be hidden now.</p>
          <p>To opt back in to stldevs click here:</p>
          <button @click="optIn()">Opt In</button>
        </div>

        <div v-if="me.IsAdmin">You're an admin</div>

        <button @click="logout()">Logout</button>
      </div>
    </article>
  </div>
</template>

<script>
import {getMe, logout} from '@/lib/stldevs'
import axios from "axios";
import Hero from '@/components/Hero'

export default {
  components: {
    Hero
  },
  data () {
    return {
      me: null
    }
  },
  async created () {
    this.me = await getMe()
  },
  methods: {
    async logout() {
      await logout()
      location.reload()
    },
    async optOut() {
      const r = await axios.patch(`/stldevs-api/devs/${this.me.login}`, {
        Hide: true
      }, {
        withCredentials: true
      })
      this.me = r.data.User
    },
    async optIn() {
      const r = await axios.patch(`/stldevs-api/devs/${this.me.login}`, {
        Hide: false
      }, {
        withCredentials: true
      })
      this.me = r.data.User
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
