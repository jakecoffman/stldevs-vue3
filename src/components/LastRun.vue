<template>
    <em class="lastrun">Last run at {{lastrun | date}}</em>
</template>
<script>
import {lastRun} from "@/lib/stldevs";

export default {
  data() {
    return {
      lastrun: null
    }
  },
  async created() {
    this.lastrun = await lastRun()
  }
}
</script>
