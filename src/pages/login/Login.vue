<template>
  <div>
    <div class="main">
      <el-tabs v-model="LoginType" @tab-click="handleTabs">
        <el-tab-pane label="账号密码登录" name="passLogin">
          <passLogin></passLogin>
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="phoneLogin">
          <phoneLogin></phoneLogin>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import passLogin from "../../components/login/PassLogin";
import phoneLogin from "../../components/login/PhoneLogin";
export default {
  data() {
    return {
      LoginType: "passLogin"
    };
  },
  components: {
    passLogin,
    phoneLogin
  },
  props: {},
  methods: {
    // 切换tabs
    handleTabs(tab) {
      // console.log(tab);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.main {
  margin-top: 40px;
  width: 320px;
  ::v-deep .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }
}
</style>