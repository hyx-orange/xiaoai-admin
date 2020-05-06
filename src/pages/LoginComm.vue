<template>
  <div>
    <div class="container flex a-center j-center">
      <div class="content flex a-center f-column a-center">
        <div class="content-header">
          <div class="header-content flex a-center f-column j-center">
            <div class="header-title">XiaoAi Admin</div>
            <div class="header-desc">这是一个炫酷的管理系统</div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  min-height: 100vh;
  .content {
    .content-header {
      background: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg")
        no-repeat;
      .header-content {
        padding-top: 100px;
        .header-title {
          font-size: 32px;
          color: #333;
          font-weight: 700;
        }
        .header-desc {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>