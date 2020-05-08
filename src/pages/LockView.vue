<template>
  <div>
    <div class="container">
      <div class="content" :class="{'bounce-out':pass}">
        <h2>admin</h2>
        <div style="margin-top: 15px;" :class="{'shake': noPass}">
          <el-input show-password placeholder="请输入内容" v-model="password" class="input-with-select">
            <el-button @click="unlock" slot="append" icon="el-icon-key"></el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      noPass: false,
      pass: false
    };
  },
  components: {},
  props: {},
  methods: {
    unlock() {
      if (!sessionStorage.getItem("isLock")) {
        this.$router.go(-1);
      }
      let password = sessionStorage.getItem("lockPwd");
      if (this.password === password) {
        this.pass = true;
        let path = sessionStorage.getItem("path");
        sessionStorage.removeItem("lockPwd");
        sessionStorage.removeItem("isLock");
        // sessionStorage.removeItem("path");
        setTimeout(() => {
          this.$router.push(path);
          this.$message({
            message: "欢迎回来",
            type: "success"
          });
        }, 1000);
      } else {
        if (this.password.trim().length === 0) {
          this.noPass = true;
          this.$notify({
            title: "密码不能为空",
            type: "warning"
          });
        } else if (this.password !== password) {
          this.noPass = true;
          this.$notify.error({
            title: "密码不匹配"
          });
        }
        setTimeout(() => {
          this.noPass = false;
        }, 1000);
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    margin-bottom: 100px;
    animation: bounceInDown 1s ease-out 1;
  }
}
.shake {
  animation: shakes 1s ease-out 1;
}
.bounce-out {
  animation: bounceOut 1s ease-out 1 !important;
}
@keyframes bounceOut {
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }
  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }
  to {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
}
@keyframes bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }
  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes shakes {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }
  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}
</style>