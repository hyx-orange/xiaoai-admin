<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix flex j-between a-center">
        <span>网站问卷调查</span>
      </div>
      <div>
        <el-table
          :data="question"
          style="width: 100%"
          :default-sort="{prop: 'startTime', order: 'descending'}"
        >
          <el-table-column prop="name" label="问卷名称" align="center"></el-table-column>
          <el-table-column prop="desc" label="问卷描述" align="center"></el-table-column>
          <el-table-column prop="startTime" label="创建时间" sortable align="center"></el-table-column>
          <el-table-column prop="endTime" label="截止时间" sortable align="center"></el-table-column>
          <el-table-column prop="status" label="问卷状态" align="center">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status===1">已发布</el-tag>
              <el-tag type="warning" v-else-if="scope.row.status===2">已截止</el-tag>
              <el-tag type="info" v-else>未发布</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="网站名称" align="center">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.url==='https://github.com/'">Github</el-tag>
              <el-tag type="danger" v-else-if="scope.row.url==='https://www.baidu.com'">百度</el-tag>
              <el-tag type="info" v-else>豆瓣</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="openDetail(scope.row.url)">查看网站详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog title="复制地址" :visible.sync="dialogVisible" width="650px">
      <div class="dialog-content">
        <div>
          <div class="top flex a-center">
            <el-input v-model="activeUrl"></el-input>
            <el-button
              style="marginLeft:10px"
              type="success"
              class="tag-read"
              :data-clipboard-text="activeUrl"
              size="small"
              @click="copy"
            >复制</el-button>
          </div>
          <div class="desc">如无法使用上方复制按钮，请选中内容后，使用 Ctrl + C 复制。也可扫描下方二维码或右键保存二维码进行访问。</div>
          <div class="flex j-center">
            <qrcode :value="defaultUrl" v-if="defaultUrl" :options="{ size: 200 }"></qrcode>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import Qrcode from "vue-qrcode";
export default {
  data() {
    return {
      activeUrl: "",
      dialogVisible: false,
      defaultUrl: ""
    };
  },
  components: {
    qrcode: Qrcode
  },
  props: {
    question: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 查看详情
    openDetail(url) {
      this.activeUrl = url;
      this.defaultUrl = url;
      this.dialogVisible = true;
    },
    // 复制文本
    copy() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        this.$message({
          message: "复制成功",
          type: "success"
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        console.log("err");
        // 不支持复制
        this.$message({
          message: "复制失败，请手动复制",
          type: "warning"
        });
        // 释放内存
        clipboard.destroy();
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  margin: 20px auto;
  ::v-deep .el-input__inner {
    height: 33px !important;
  }
  .desc {
    background: #ebf5ff;
    color: #657180;
    font-size: 14px;
    padding: 15px 10px;
    margin-top: 20px;
    line-height: 1.5;
    border-radius: 8px;
  }
  ::v-deep img {
    width: 200px;
    height: 200px;
  }
}
</style>