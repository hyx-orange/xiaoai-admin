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
                <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt />
              </div>
              {{$t(`commons.dear`)}}{{userInfo.username}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="index"
                v-for="(item,index) in userList"
                :key="index"
              >{{$t(`commons.${item}`)}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
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
    return {
      userList: ["uploadAvatar", "editPwd", "logout"],
      languageList: [
        { title: "简体中文", type: "cn" },
        { title: "繁體中文", type: "tw" },
        { title: "English", type: "en" }
      ]
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
    ...userAtions(["logout", "getCaptcha"]),
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
      }
    },
    // 折叠收起菜单
    showCollapse() {
      this.$emit("update:isCollapse", !this.isCollapse);
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
  padding: 0 20px;
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