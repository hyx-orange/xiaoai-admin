<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix flex j-between a-center">
        <span>个人动态</span>
        <el-button type="primary" size="small" @click="dialogVisible=true">添加动态</el-button>
      </div>
      <div class="content">
        <div>
          <el-date-picker
            v-model="datePicker"
            type="date"
            placeholder="选择日期"
            :picker-options="endDatePicker"
            @change="changeData"
          ></el-date-picker>
        </div>
        <div class="noThing" v-if="dynamicList.length===0">暂无动态</div>
        <div v-else>
          <div class="content-item" v-for="(item,index) in dynamicList" :key="index">
            <div class="name flex a-center j-between">
              <div>类型：{{item.username}}</div>
              <div>发布人：{{item.classification}}</div>
            </div>
            <div class="report flex" v-if="item.reportUsers.length>0">
              <span>汇报人：</span>
              <el-tooltip :content="item.reportUsers.join(' ')" placement="bottom" effect="light">
                <span>{{item.reportUsers.join(' ')}}</span>
              </el-tooltip>
            </div>
            <div class="t-name flex a-center j-between">
              <div class="text">{{item.dynamic}}</div>
              <div class="time">发布于{{getTime(item.date)}}</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="添加动态" :visible.sync="dialogVisible" width="650px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="动态类型" prop="classification" required>
          <el-select clearable v-model="ruleForm.classification" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相关汇报人" v-if="ruleForm.classification==='工作汇报'">
          <el-select multiple clearable v-model="ruleForm.reportUsers" placeholder="请选择汇报人">
            <el-option v-for="item in report" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情内容" prop="dynamic" required>
          <el-input clearable type="textarea" placeholder="请输入内容" v-model="ruleForm.dynamic"></el-input>
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
import { createNamespacedHelpers } from "vuex";
const otherModule = createNamespacedHelpers("other");
const { mapActions: otherAtions, mapState: otherState } = otherModule;
export default {
  data() {
    return {
      datePicker: new Date(),
      endDatePicker: this.processDate(),
      dialogVisible: false,
      dynamicList: [],
      ruleForm: {
        classification: "",
        dynamic: "",
        reportUsers: []
      },
      options: [
        {
          value: "个人心情",
          label: "个人心情"
        },
        {
          value: "工作汇报",
          label: "工作汇报"
        },
        {
          value: "公司相关",
          label: "公司相关"
        },
        {
          value: "其他事物",
          label: "其他事物"
        }
      ],

      rules: {
        dynamic: [
          { required: true, message: "动态类型不能为空", trigger: "blur" }
        ],
        classification: [
          { required: true, message: "动态内容不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  props: {},
  methods: {
    ...otherAtions(["addDynamic", "getDynamic", "getReport"]),
    processDate() {
      return {
        disabledDate(time) {
          return time.getTime() > Date.now(); //开始时间不选时，结束时间最大值小于等于当天
        }
      };
    },
    changeData(e) {
      this.getDynamicData();
    },
    getDynamicData() {
      this.dynamicList = this.dynamic.filter(item => {
        return (
          this.$dayjs(item.date).format("YYYY-MM-DD") ===
            this.$dayjs(this.datePicker).format("YYYY-MM-DD") &&
          item.username === this.$store.state.userInfo.username
        );
      });
    },
    editPwd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let a = Object.assign({}, this.ruleForm);
          a.username = this.$store.state.userInfo.username;
          a.date = this.datePicker;
          let flage = await this.addDynamic(a);
          if (flage) {
            this.getDynamic();
            this.dialogVisible = false;
          }
        } else {
          this.$message({
            message: "请完成表单验证",
            type: "warning"
          });
        }
      });
    },
    getTime(time) {
      return this.$dayjs(time).format("YYYY年MM月DD日");
    }
  },
  mounted() {},
  beforeMount() {
    this.getReport();
  },
  watch: {
    dynamic(val) {
      this.getDynamicData();
    }
  },
  computed: {
    ...otherState(["dynamic", "report"])
  }
};
</script>

<style scoped lang='scss'>
::v-deep .el-card.is-always-shadow {
  box-shadow: none;
}
.noThing {
  margin-top: 30px;
}
::v-deep .el-select {
  display: block !important;
}
.content {
  max-height: 440px;
}
.content-item {
  background: #fafafa;
  margin: 15px 0;
  padding: 20px;
  .report {
    margin-top: 20px;
  }
  .t-name {
    margin-top: 20px;
    .time {
      color: #ccc;
    }
  }
}
</style>