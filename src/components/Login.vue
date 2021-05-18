<template>
  <div>
      <p>这是login</p>
      <el-button type="primary" @click="changePage('Frame')">toFrame</el-button>
      <el-button type="primary" @click="changePage('Hello')">toHello</el-button>
      <el-button type="primary" @click="changePage('Drop')">toDrop</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name:"Login",
  setup () {
    const router = useRouter()
    const changePage = ((destination) => {
      router.push({
        name: destination
      })
    })
    return {
      changePage
    }
  },
}
</script>

<style>

</style>