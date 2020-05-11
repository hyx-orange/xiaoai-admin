<template>
  <div class="container flex">
    <div class="tree">
      <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="content flex f-wrap" v-if="dataList.length>0">
      <div class="content-item" v-for="(item,index) in dataList" :key="index">
        <el-card>
          <div slot="header" class="header flex">
            <img :src="item.img" :alt="item.name" />
            <div class="t-desc">
              <div class="name">{{item.name}}</div>
              <div class="t-con">{{item.department}}/{{item.position}}</div>
              <div class="tag flex f-wrap">
                <span>
                  <el-tag
                    :type="tagList[indexs]"
                    v-for="(items,indexs) in item.tag"
                    :key="indexs"
                  >{{items.name}}</el-tag>
                </span>
              </div>
            </div>
          </div>
          <div class="desc">
            <div class="desc-item">邮箱：{{item.email}}</div>
            <div class="desc-item">手机号码：{{item.phone}}</div>
            <div class="desc-item">办公电话：{{item.tel}}</div>
            <div class="desc-item">
              性别：
              <span v-if="item.gender">男</span>
              <span v-else>女</span>
            </div>
            <div class="desc-item">QQ:{{item.qq}}</div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="no-content" v-else>暂无数据</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const mainListModule = createNamespacedHelpers("mainList");
const { mapActions: mainListAtions, mapState: mainListState } = mainListModule;
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      dataList: [],
      dataLists: [],
      tagList: ["success", "info", "warning", "danger"]
    };
  },
  components: {},
  props: {},
  methods: {
    ...mainListAtions(["getMailList", "getTreeData"]),
    // 节点点击
    handleNodeClick(data, node, el) {
      if (node.level === 1) {
        this.dataList = this.mailList;
      } else {
        this.dataList = [];
        this.dataLists = [];
        this.mapList(data);
        this.dataList = this.dataLists;
      }
    },
    // 过滤数据
    getData(label) {
      return this.mailList.filter(item => item.department === label);
    },
    mapList(arr) {
      this.dataLists = this.dataLists.concat(this.getData(arr.label));
      if (arr.children) {
        arr.children.map(item => {
          this.middle(item);
        });
      }
    },
    // 中间调用
    middle(arr) {
      this.mapList(arr);
    }
  },
  mounted() {},
  beforeMount() {
    this.getMailList();
    this.getTreeData();
  },
  watch: {
    mailList(val) {
      this.dataList = val;
    }
  },
  computed: {
    ...mainListState(["mailList", "treeData"])
  }
};
</script>

<style scoped lang='scss'>
.container {
  padding-top: 10px;
  .tree {
    width: 220px;
    margin-right: 10px;
  }
  .content {
    flex: 1;
    .content-item {
      box-sizing: border-box;
      padding: 5px;
      width: 33.33%;
      .header {
        img {
          width: 85px;
          height: 85px;
          margin-right: 20px;
          border-radius: 50%;
        }
        .t-desc {
          .name {
            font-size: 18px;
            margin: 8px 0;
          }
          .t-con {
            font-size: 14px;
            margin-bottom: 8px;
          }
          .tag {
            span {
              margin-right: 5px;
            }
          }
        }
      }
      .desc {
        position: relative;
        left: 20px;
        .desc-item {
          margin-bottom: 5px;
          font-size: 14px;
        }
      }
    }
  }
  .no-content {
    padding: 10px;
    flex: 1;
    text-align: center;
    color: #0285dc;
  }
}
</style>