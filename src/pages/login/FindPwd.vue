<template>
  <div class="main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" clearable placeholder="2-10位用户名">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" clearable placeholder="合法邮箱">
          <i slot="prefix" class="el-input__icon el-icon-message"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" type="primary" @click="submit('ruleForm')">找回密码</el-button>
      </el-form-item>
      <div class="flex a-center j-between">
        <div>
          <span style="fontSize:14px">其他方式登录</span>
          <a class="git iconfont icon-github" @click="gitHub"></a>
        </div>
        <a class="forget" @click="jumpRoute('/login')">立即登录</a>
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
        email: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  props: {},
  methods: {
    ...userAtions(["forget"]),
    // 找回密码
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let flage = await this.forget(this.ruleForm);
        } else {
          this.$message({
            message: "请完成表单验证",
            type: "warning"
          });
        }
      });
    },
    gitHub() {},
    // 跳转页面
    jumpRoute(path) {
      this.$router.push(path);
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
  .forget {
    color: rgb(45, 140, 240);
    cursor: pointer;
    z-index: 10;
  }
  .git {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }
}
</style>