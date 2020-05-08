<template>
  <div class="main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" clearable placeholder="2-10位用户名">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" show-password placeholder="六位以上密码">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" clearable placeholder="合法邮箱">
          <i slot="prefix" class="el-input__icon el-icon-message"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="ruleForm.phone"
          type="number"
          clearable
          placeholder="请输入手机号"
          @blur="phoneBlur"
        >
          <i slot="prefix" class="el-input__icon el-icon-phone"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="sms">
        <div class="flex a-center">
          <el-input v-model="ruleForm.sms" type="number" clearable placeholder="请输入短信验证码">
            <i slot="prefix" class="el-input__icon el-icon-document"></i>
          </el-input>
          <el-button
            style="marginLeft:10px"
            type="primary"
            :disabled="disabledCode"
            @click="sendCodes"
          >{{codeText}}</el-button>
        </div>
      </el-form-item>
      <div class="forget flex a-center j-between">
        <a class="register" @click="jumpRoute('/login')">使用已有账号登录</a>
      </div>
      <div class="btn">
        <el-button style="width:100%" type="primary" @click="submit('ruleForm')">立即注册</el-button>
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
        username: "",
        password: "",
        email: "",
        phone: null,
        sms: null
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码至少为六位", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        sms: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      },
      disabledCode: true,
      codeText: "发送验证码"
    };
  },
  components: {},
  props: {},
  methods: {
    ...userAtions(["sendCode", "register"]),
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
    // 跳转路由
    jumpRoute(path) {
      this.$router.push(path);
    },
    // 注册
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let flage = await this.register(this.ruleForm);
        } else {
          this.$message({
            message: "请完成表单验证",
            type: "warning"
          });
        }
      });
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
  .btn {
    margin: 20px 0;
  }
}
</style>