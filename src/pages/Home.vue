<template>
  <div>
    <el-button type="primary" @click="send">按钮</el-button>
    <child-one></child-one>
    <child-two></child-two>
  </div>
</template>

<script>
import childOne from '../components/Child1'
import childTwo from '../components/Child2'
export default {
  name: '',
  props: {
  },
  components: {
    childOne,
    childTwo
  },
  data() {
    return {
      msg: '我是home组件的数据'
    }
  },
  methods: {
    send() {
      this.$bus.$emit('send', this.msg)
    }
  },
  mounted() {

  },
  watch: {

  },
  computed: {

  }
}
</script>

<style scoped lang='scss'>
</style>