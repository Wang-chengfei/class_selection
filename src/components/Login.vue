<template>
  <div>
      <p>这是login</p>
      <el-button type="primary" @click="toFrame">toFrame</el-button>
      <el-button type="primary" @click="toHello">toHello</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name:"Login",
  setup () {
    const router = useRouter()
    const toFrame = (() => {
      router.push({
        name: 'Frame'
      })
    })
    const toHello = (() => {
      router.push({
        name: 'Hello'
      })
    })
    return {
      toFrame,
      toHello
    }
  },
  // methods: {
  //   toHello: function () {
  //     router.push({
  //       name: 'Hello'
  //     })
  //   },
  //   toFrame: function () {
  //     router.push({
  //       name: 'Frame'
  //     })
  //   },
  // },
}
</script>

<style>

</style>