<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>
<script>
import { setRem } from '@/utils'
export default {
  name: 'home',
  data() {
    return {}
  },
  mounted() {
    setRem()
  },
  methods: {},
}
</script>