<template>
  <div>
    <div class="header flex a-center j-between">
      <div class="header-left flex a-center">
        <i class="header-menu el-icon-s-fold" @click="showCollapse" data-step="1" data-intro="收缩菜单"></i>
        <div class="header-title">{{$t(`commons.xiaoai`)}}{{$t(`commons.admin`)}}</div>
      </div>
      <div class="header-right flex a-center">
        <div class="select flex a-center">
          <span data-step="2" data-intro="切换语言">
            <el-dropdown placement="bottom" @command="languageCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-edit-outline full"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item.type"
                  v-for="(item,index) in languageList"
                  :key="index"
                >{{item.title}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <span data-step="3" data-intro="设置全屏">
            <Full></Full>
          </span>
          <span data-step="4" data-intro="设置锁屏">
            <Lock></Lock>
          </span>
        </div>
        <div class="user" data-step="5" data-intro="用户操作">
          <el-dropdown @command="userCommand">
            <div class="flex a-center">
              <div class="img">
                <img :src="userInfo.avatar" :alt="userInfo.username" />
              </div>
              {{$t(`commons.dear`)}}{{userInfo.username}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="index" v-for="(item,index) in userList" :key="index">
                <el-upload
                  v-if="index===0"
                  class="avatar-uploader"
                  :headers="headers"
                  action="api/upload/image"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarError"
                >{{$t(`commons.${item}`)}}</el-upload>
                <span v-else>{{$t(`commons.${item}`)}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="520px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="请输入原密码" prop="password" required>
          <el-input type="password" show-password v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="newPwd" required>
          <el-input type="password" show-password v-model="ruleForm.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="请确认新密码" prop="checkPass" required>
          <el-input type="password" show-password v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPwd('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import IntroJs from "intro.js";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userAtions, mapState: userState } = userModule;
import Lock from "./Lock";
import Full from "./Full";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.ruleForm.checkPass !== "") {
        this.$refs.ruleForm.validateField("checkPass");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userList: ["uploadAvatar", "editPwd", "logout"],
      languageList: [
        { title: "简体中文", type: "cn" },
        { title: "繁體中文", type: "tw" },
        { title: "English", type: "en" }
      ],
      headers: null,
      dialogVisible: false,
      ruleForm: {
        password: "",
        newPwd: "",
        checkPass: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 6, message: "密码最少为六个字符", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "密码最少为六个字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { min: 6, message: "密码最少为六个字符", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  components: {
    Lock,
    Full
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...userAtions(["logout", "updatePwd"]),
    // 切换语言
    languageCommand(command) {
      this.$i18n.locale = command;
      localStorage.setItem("lang", command);
    },
    // 用户选项
    userCommand(command) {
      if (command === 2) {
        this.logout();
        this.$store.state.userInfo = {};
        localStorage.removeItem("userInfo");
        this.$router.push("/login");
      } else if (command === 1) {
        this.dialogVisible = true;
      }
    },
    // 折叠收起菜单
    showCollapse() {
      this.$emit("update:isCollapse", !this.isCollapse);
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      let a = /\.(jpg|jepg|gif|png)$/;
      const isType = a.test(file.name);
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else if (!isType) {
        this.$message.error("请上传jpg/png图片!");
      }
      return isLt2M && isType;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.$store.state.userInfo.avatar = res.url;
        localStorage.setItem(
          "userInfo",
          JSON.stringify(this.$store.state.userInfo)
        );
        this.$notify({
          title: res.msg,
          type: "success"
        });
      } else {
        this.$notify({
          title: res.msg,
          type: "warning"
        });
      }
    },
    // 上传失败
    handleAvatarError(res) {
      console.log(err);
    },
    editPwd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let obj = Object.assign({}, this.ruleForm);
          this.$set(obj, "id", this.$store.state.userInfo._id);
          this.$set(obj, "username", this.$store.state.userInfo.username);
          let flage = await this.updatePwd(obj);
          if (flage) {
            this.dialogVisible = false;
            if (localStorage.getItem("checkUser")) {
              let checkUser = JSON.parse(localStorage.getItem("checkUser"));
              checkUser.password = "";
              localStorage.setItem("checkUser", JSON.stringify(checkUser));
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

    startIntro() {
      IntroJs()
        .setOptions({
          prevLabel: "上一步",
          nextLabel: "下一步",
          skipLabel: "跳过",
          doneLabel: "结束"
        })
        .oncomplete(function() {
          //点击跳过按钮后执行的事件
        })
        .onexit(function() {
          //点击结束按钮后， 执行的事件
        })
        .start();
    }
  },
  mounted() {
    if (!localStorage.getItem("intro")) {
      this.$nextTick(() => {
        this.$confirm("您需要系统引导吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "不再提示",
          type: "info"
        })
          .then(() => {
            this.startIntro();
          })
          .catch(() => {
            localStorage.setItem("intro", true);
          });
      });
    }
  },
  beforeMount() {
    this.headers = {
      Authorization: localStorage.getItem("adminToken")
    };
  },
  watch: {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>

<style scoped lang='scss'>
.header {
  box-sizing: border-box;
  background: #fff;
  height: 60px;
  color: #2e5e85;
  z-index: 99;
  border-bottom: 1px solid #f0f2f5;

  .header-menu {
    font-size: 22px;
  }
  .header-title {
    padding-left: 30px;
    font-size: 18px;
  }
}
.header-right {
  margin-right: 10px;
  .select {
    cursor: pointer;
    span {
      margin-right: 8px;
    }
    .full {
      font-size: 22px;
    }
  }
  .user {
    padding: 0 15px 0 5px;
    box-sizing: border-box;
    cursor: pointer;
    .img {
      line-height: 30px;
      height: 30px;
      width: 30px;
      margin: 0 5px;
      img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
    }
  }
}
</style>