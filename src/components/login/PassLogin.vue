<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" clearable placeholder="用户名/邮箱/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="captcha flex a-center">
          <el-input v-model="ruleForm.code" clearable placeholder="请输入验证码"></el-input>
          <div class="captcha-img flex a-center j-center" v-html="captcha" @click="getCaptcha"></div>
        </div>
      </el-form-item>
      <div class="forget flex a-center j-between">
        <el-checkbox v-model="ruleForm.single">记住密码</el-checkbox>
        <a class="register" @click="jumpRoute('/forget')">忘记密码?</a>
      </div>
      <div class="btn">
        <el-button style="width:100%" type="primary" @click="submit('ruleForm')">立即登录</el-button>
      </div>
      <div class="flex a-center j-between">
        <div>
          <span>其他方式登录</span>
          <a class="git iconfont icon-github" @click="gitHub"></a>
        </div>
        <a class="forget" @click="jumpRoute('/register')">注册账号</a>
      </div>
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userAtions, mapState: userState } = userModule;
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        code: "",
        single: false
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码至少为六位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
          { min: 4, max: 4, message: "图形验证码为4个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  props: {},
  methods: {
    ...userAtions(["login", "getCaptcha"]),
    // 登录
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let flage = await this.login(this.ruleForm);
          if (!flage) {
            this.getCaptcha();
            this.ruleForm.captcha = "";
          }
        } else {
          this.$message({
            message: "请完成表单验证",
            type: "warning"
          });
        }
      });
    },
    // 跳转页面
    jumpRoute(path) {
      this, $router.push(path);
    },
    gitHub() {}
  },
  mounted() {
    this.getCaptcha();
  },
  watch: {},
  computed: {
    ...userState(["captcha"])
  }
};
</script>

<style scoped lang='scss'>
.captcha {
  .captcha-img {
    margin-left: 10px;
    cursor: pointer;
    ::v-deep svg {
      height: 35px !important;
      width: 100px;
    }
  }
}
.forget {
  color: rgb(45, 140, 240);
  cursor: pointer;
  z-index: 10;
}
.btn {
  margin: 20px 0;
}
.git {
  width: 20px;
  height: 20px;
  margin-left: 8px;
}
</style>