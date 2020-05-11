<template>
  <div class="lunarFullCalendar">
    <div class="full-calendar">
      <!-- 富日历 -->
      <LunarFullCalendar
        ref="calender"
        :events="events"
        :config="config"
        @event-selected="eventClick"
        @day-click="dayClick"
        @event-render="eventRender"
      ></LunarFullCalendar>
    </div>
    <!-- 添加日程 -->
    <el-dialog :visible.sync="dialogVisible" width="650px">
      <span slot="title" class="dialog-header">日程</span>
      <el-form
        :model="ruleForm"
        label-width="100px"
        label-position="left"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="schedule" label="内容：" required>
          <el-input clearable placeholder="准备做什么..." v-model="ruleForm.schedule"></el-input>
        </el-form-item>
        <el-form-item label="时间：" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-time-select
                placeholder="起始时间"
                v-model="ruleForm.startTime"
                :picker-options="{
      start: '07:00',
      step: '00:15',
      end: '23:30',
        maxTime: ruleForm.endTime
    }"
              ></el-time-select>
            </el-form-item>
          </el-col>

          <el-col class="line" :span="1">~</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-time-select
                placeholder="结束时间"
                v-model="ruleForm.endTime"
                :picker-options="{
      start: '07:00',
      step: '00:15',
      end: '24:00',
      minTime: ruleForm.startTime
    }"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="参与人：">
          <div class="person flex a-center">
            <span>{{getUser}}</span>
            <el-popover placement="top" width="220" v-model="visible">
              <el-input clearable placeholder="请输入参与人的姓名" v-model="ruleForm.username"></el-input>
              <div style="text-align: right; marginTop: 10px">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="addUser">确定</el-button>
              </div>
              <span
                slot="reference"
                style="color: rgb(2, 133, 220); font-size: 18px; margin-left: 8px;"
                class="el-icon-circle-plus-outline"
              ></span>
              <!-- <i class=""></i> -->
            </el-popover>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { LunarFullCalendar } from "vue-lunar-full-calendar";
import { createNamespacedHelpers } from "vuex";
import { async } from "q";
const calendarModule = createNamespacedHelpers("calendar");
const { mapActions: calendarAtions, mapState: calendarState } = calendarModule;
export default {
  data() {
    let self = this;
    return {
      events: [],

      config: {
        eventLimitText: "更多",
        lazyFetching: true, //是否启用懒加载技术-
        eventStartEditable: false,
        header: {
          left: "prevYear,prev,next,nextYear",
          center: "title"
        },
        // themeSystem: "Pulse",
        lunarCalendar: true, //控制中文日历是否显示为真
        locale: "zh-cn", //中文
        eventLimit: true, // 一天中显示多少条事件，多了隐藏
        firstDay: 0, // 控制周一周日那个在前面
        defaultView: "month",
        buttonText: {
          today: "今天",
          month: "月",
          week: "周",
          day: "日"
        }
      },
      dialogVisible: false,
      ruleForm: {
        schedule: "",
        startTime: "",
        endTime: "",
        users: [],
        username: "",
        currentDay: null
      },
      visible: false,
      rules: {
        schedule: [
          { required: true, message: "日常内容不能为空", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    LunarFullCalendar
  },
  props: {},
  methods: {
    ...calendarAtions([
      "getCalendar",
      "addCalendar",
      "delCalendar",
      "repeatDynamic"
    ]),
    //日历事件点击事件
    eventClick(event, jsEvent, pos) {
      let _this = this;
      if (event.schedule) {
        // 删除日程
        this.$confirm("此操作将永久删除该日程, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            _this.delCalendar(event._id);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        // 重复上周
        this.$confirm("是否重复上周日程, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            _this.repeatDynamic(event.start.format("YYYY-MM-DD"));
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    //背景点击事件
    dayClick(date, jsEvent, view) {
      if (date._d < this.$dayjs(new Date()).subtract(1, "days")) {
        this.$message({
          message: "不能安排今天之前的日程",
          type: "warning"
        });
      } else {
        this.ruleForm.currentDay = this.$dayjs(date._d).format("YYYY-MM-DD");
        this.dialogVisible = true;
      }
    },
    // 展示日程
    viewRender(view, element) {
      var time = view.calendar.currentDate._i;

      this.years = this.$dayjs(time).format("YYYYMM");
      // this.initData(this.years);
    },
    // 添加参与人
    addUser() {
      if (this.ruleForm.username.trim().length > 0) {
        let flage = this.ruleForm.users.includes(this.ruleForm.username);
        if (!flage) {
          this.ruleForm.users.push(this.ruleForm.username);
        } else {
          this.$message({
            message: "已有该参与人",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "输入为空",
          type: "warning"
        });
      }
      this.visible = false;
    },
    formatTime(timeNumber, time) {
      let a = time.split(":");
      let b = timeNumber + 60 * 60 * Number(a[0]) + 60 * Number(a[1]);
      return new Date(b);
    },
    // 确认添加
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let obj = Object.assign({}, this.ruleForm);
          obj.startTime = `${obj.currentDay} ${obj.startTime}:00`;
          obj.endTime = `${obj.currentDay} ${obj.endTime}:00`;
          obj.currentDay = this.$dayjs(obj.currentDay).format("YYYY-MM-DD");
          let flage = await this.addCalendar(obj);
          if (flage) {
            this.$refs.ruleForm.resetFields();
          }
          this.dialogVisible = false;
        } else {
          this.$message({
            message: "请完成表单验证",
            type: "warning"
          });
        }
      });
    },
    // 渲染展示日程
    eventRender(event, element) {
      if (event.schedule) {
        let a =
          this.$dayjs(event.startTime).format("hh:mm") +
          " - " +
          this.$dayjs(event.endTime).format("hh:mm") +
          event.schedule;
        element[0].innerHTML =
          a +
          "<br/>" +
          `参与人：${event.users.join(" ")} ` +
          "<br/>" +
          `参与人数: <i class="el-icon-user-solid"></i>${event.users.length}`;
      }
    }
  },
  mounted() {},
  beforeMount() {
    // 获取日程
    this.getCalendar();
    if (localStorage.getItem("userInfo")) {
      let username = JSON.parse(localStorage.getItem("userInfo")).username;
      this.ruleForm.users.push(username);
    }
  },
  watch: {
    calendar(val) {
      this.events = val;
      let arr = [];
      // 处理日程
      this.events.map(item => {
        item.start = item.currentDay + " 00:00:00";
        item.end = item.currentDay + " 00:00:00";
        item.title = item.schedule;
        let a =
          new Date(item.currentDay + " 00:00:00").valueOf() * 1 +
          86400 * 7 * 1000;
        let b = this.$dayjs(a).format("YYYY-MM-DD");
        let flage = val.some(items => items.currentDay === b);
        if (!flage) {
          let c = {
            start: b + " 00:00:00",
            end: b + " 00:00:00",
            title: "重复上周",
            backgroundColor: "pink!important"
          };
          arr.push(c);
        }
      });
      this.events = this.events.concat(arr);
    }
  },
  computed: {
    ...calendarState(["calendar"]),
    // 处理参与人
    getUser() {
      return this.ruleForm.users.join(" ");
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../../styles/calendar";
.dialog-header {
  color: rgb(2, 133, 220);
  position: relative;
}
.dialog-header::after {
  content: ""; // 必须
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -5px;
  width: 70%;
  height: 4px;
  background: #0285dc;
}
.time {
  .t-time {
    width: 80px;
  }
}
::v-deep .fc-time {
  display: none;
}
</style>