<template>
  <div class="wraper flex">
    <div class="menu">
      <el-menu
        :default-active="$route.path"
        :unique-opened="true"
        :router="true"
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
      >
        <template v-for="(item,index) in menuList">
          <el-submenu :index="item.path" v-if="item.children.length>0">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{$t(`commons.${item.title}`)}}</span>
            </template>
            <el-menu-item
              :index="`${item.path}${items.path}`"
              v-for="(items,indexs) in item.children"
              :key="indexs"
            >
              <i :class="items.icon"></i>
              <span>{{$t(`commons.${items.title}`)}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="item.path" v-else>
            <i :class="item.icon"></i>
            <span slot="title">{{$t(`commons.${item.title}`)}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="content">
      <headerHome :isCollapse.sync="isCollapse"></headerHome>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headerHome from "../components/comm/HeaderRight";
export default {
  data() {
    return {
      menuList: [
        {
          title: "dashboard",
          path: "/",
          icon: "el-icon-location",
          children: []
        },
        {
          title: "calendar",
          path: "/calendar",
          icon: "el-icon-date",
          children: []
        },
        {
          title: "mailList",
          path: "/mailList",
          icon: "el-icon-document",
          children: []
        },
        {
          title: "organize",
          path: "/organization",
          icon: "el-icon-user",
          children: [
            {
              title: "offer",
              path: "/offer",
              icon: "el-icon-c-scale-to-original"
            },
            {
              title: "userInfo",
              path: "/userInfo",
              icon: "el-icon-folder-checked"
            },
            {
              title: "payMent",
              path: "/pay",
              icon: "el-icon-coin"
            }
          ]
        },
        {
          title: "form",
          path: "/form",
          icon: "el-icon-files",
          children: [
            {
              title: "stepForm",
              path: "/stepForm",
              icon: "el-icon-edit"
            }
          ]
        }
      ],
      isCollapse: false
    };
  },
  components: {
    headerHome
  },
  props: {},
  methods: {},
  mounted() {},
  beforeMount() {
    if (localStorage.getItem("userInfo")) {
      this.$store.state.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.wraper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  .menu {
    ::v-deep .el-menu {
      border-right: none !important;
    }
    min-height: 100vh;
    overflow-x: hidden !important;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
      overflow: hidden;
    }
  }
  .content {
    flex: 1;
  }
}
</style>