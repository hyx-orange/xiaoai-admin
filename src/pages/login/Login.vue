<template>
  <div>
    <div class="main">
      <el-tabs v-model="LoginType" @tab-click="handleTabs">
        <el-tab-pane label="账号密码登录" name="passLogin"></el-tab-pane>
        <el-tab-pane label="手机号登录" name="phoneLogin"></el-tab-pane>
      </el-tabs>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <!-- 密码登录 -->
        <div v-if="LoginType==='passLogin'">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" clearable placeholder="2-10位用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" show-password placeholder="六位以上密码"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <div class="captcha flex a-center">
              <el-input v-model="ruleForm.code" clearable placeholder="验证码"></el-input>
              <div class="captcha-img flex a-center j-center" v-html="captcha" @click="getCaptcha"></div>
            </div>
          </el-form-item>
        </div>
        <!-- 手机号登录 -->
        <div v-else>
          <el-form-item prop="phone">
            <el-input
              v-model="ruleForm.phone"
              type="number"
              clearable
              placeholder="请输入手机号"
              @blur="phoneBlur"
            ></el-input>
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
        </div>
      </el-form>
      <div class="forget flex a-center j-between">
        <el-checkbox v-model="ruleForm.single">记住密码</el-checkbox>
        <a class="register" @click="jumpRoute('/findPwd')">忘记密码?</a>
      </div>
      <div class="btn">
        <el-button style="width:100%" type="primary" @click="submit('ruleForm')">立即登录</el-button>
      </div>
      <div class="flex a-center j-between">
        <div>
          <span style="fontSize:14px">其他方式登录</span>
          <a class="git iconfont icon-github" @click="gitHub"></a>
        </div>
        <a class="forget" @click="jumpRoute('/register')">注册账号</a>
      </div>
    </div>
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
      LoginType: "passLogin",
      ruleForm: {
        username: "",
        password: "",
        phone: null,
        code: null,
        single: false
      },
      fromDate: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码至少为六位", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      },
      disabledCode: true,
      codeText: "发送验证码"
    };
  },
  components: {},
  props: {},
  methods: {
    // 切换tabs
    handleTabs(tab) {
      this.fromDate = Object.assign({}, this.ruleForm);
      this.$refs.ruleForm.resetFields();
      this.ruleForm = Object.assign({}, this.fromDate);
    },
    ...userAtions(["sendCode", "phoneLogin", "login", "getCaptcha"]),
    // 登录
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.LoginType === "passLogin") {
            let flage = await this.login(this.ruleForm);
            if (!flage) {
              this.getCaptcha();
              this.ruleForm.code = "";
            }
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
      this.$router.push(path);
    },
    gitHub() {},
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
    }
  },
  mounted() {
    this.getCaptcha();
  },
  beforeMount() {
    if (JSON.parse(localStorage.getItem("checkUser"))) {
      let a = JSON.parse(localStorage.getItem("checkUser"));
      this.ruleForm.username = a.username;
      this.ruleForm.password = a.password;
      this.ruleForm.phone = a.phone;
      this.ruleForm.single = true;
    }
  },
  watch: {},
  computed: {
    ...userState(["captcha"])
  }
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