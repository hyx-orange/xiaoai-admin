<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="phone">
        <el-input v-model="ruleForm.phone" clearable placeholder="请输入手机号" @blur="phoneBlur"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <div class="flex a-center">
          <el-input v-model="ruleForm.code" type="number" clearable placeholder="请输入短信验证码"></el-input>
          <el-button
            style="marginLeft:10px"
            type="primary"
            :disabled="disabledCode"
            @click="sendCodes"
          >{{codeText}}</el-button>
        </div>
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
      <!-- <div class="flex a-center j-between">
        <div>
          <span>其他方式登录</span>
          <a class="git iconfont icon-github" @click="gitHub"></a>
        </div>
        <a class="forget" @click="jumpRoute('/register')">注册账号</a>
      </div>-->
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userAtions, mapState: userState } = userModule;
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      let a = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!a.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: null,
        code: "",
        single: false
      },
      disabledCode: true,
      codeText: "发送验证码",
      rules: {
        phone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入短信验证码", trigger: "blur" }]
      }
    };
  },
  components: {},
  props: {},
  methods: {
    ...userAtions(["sendCode", "phoneLogin", "getCaptcha"]),
    // 发送验证码
    async sendCodes() {
      let timer;
      let flage = await this.sendCode(this.ruleForm.phone);
      if (flage) {
        var count = 60;
        timer = setInterval(() => {
          count--;
          if (count <= 0) {
            this.codeText = "重新获取";
            this.disabledCode = false;
            clearInterval(timer);
          } else {
            this.codeText = "已发送" + count;
            this.disabledCode = true;
          }
        }, 1000);
      } else {
        this.codeText = "重新获取";
        this.disabledCode = false;
        clearInterval(timer);
      }
    },
    // 手机号验证
    phoneBlur() {
      this.$refs.ruleForm.validateField("phone", err => {
        console.log(err);
        if (err) {
          this.disabledCode = true;
        } else {
          this.disabledCode = false;
        }
      });
    },
    // 密码登录
    login() {
      this.$router.push("/login");
    },
    // 登录
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let flage = await this.phoneLogin(this.ruleForm);
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
    }
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