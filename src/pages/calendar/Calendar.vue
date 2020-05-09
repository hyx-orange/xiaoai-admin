<template>
  <div class="lunarFullCalendar">
    <div class="full-calendar">
      <LunarFullCalendar
        ref="calender"
        :events="events"
        :config="config"
        @event-selected="eventClick"
        @day-click="dayClick"
      ></LunarFullCalendar>
    </div>
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
const calendarModule = createNamespacedHelpers("calendar");
const { mapActions: calendarAtions, mapState: calendarState } = calendarModule;
export default {
  data() {
    let self = this;
    return {
      events: [],
      config: {
        eventLimitText: "更多",
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
      console.log(event);
      this.$confirm("此操作将永久删除该日程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //背景点击事件
    dayClick(date, jsEvent, view) {
      this.ruleForm.currentDay = this.$dayjs(date._d).format("YYYY-MM-DD");
      this.dialogVisible = true;
    },
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
    // 确认
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let obj = Object.assign({}, this.ruleForm);
          obj.startTime = new Date(
            `${obj.currentDay} ${obj.startTime}:00`
          ).getTime();
          obj.endTime = new Date(
            `${obj.currentDay} ${obj.endTime}:00`
          ).getTime();

          obj.currentDay = this.$dayjs(obj.currentDay).format("YYYY-MM-DD");
          this.addCalendar(obj);
          this.dialogVisible = false;
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
  beforeMount() {
    this.getCalendar();
    if (localStorage.getItem("userInfo")) {
      let username = JSON.parse(localStorage.getItem("userInfo")).username;
      this.ruleForm.users.push(username);
    }
  },
  watch: {
    calendar(val) {
      this.events = val;
      this.events.map(item => {
        item.title =
          this.$dayjs(item.startTime).format("hh:mm") +
          " - " +
          this.$dayjs(item.endTime).format("hh:mm") +
          item.schedule;
        item.start = item.startTime;
        item.end = item.endTime;
      });
      console.log(this.events);
    }
  },
  computed: {
    ...calendarState(["calendar"]),
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
</style>