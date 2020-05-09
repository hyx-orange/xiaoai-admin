<template>
  <div>
    <div class="progress flex a-center">
      <div
        class="progress-item flex a-center j-center"
        v-for="(item,index) in progress"
        :key="index"
        :class="{'active-item':active===index}"
        @click="changeProgress(index)"
        :style="{borderColor:colorLost[index].barColor}"
      >
        <div class="desc flex f-column j-center">
          <div class="title">{{item.name}}(元)</div>
          <div class="money">
            ￥
            <span>
              <countTo
                :startVal="active===index?0:item.money"
                :endVal="item.money"
                :duration="1000"
              ></countTo>
            </span>
          </div>
        </div>
        <div class="wrap-progress" style="height: 80px;" :id="`progress${index}`">
          <div class="num" v-show="active===index">{{item.value}}%</div>
          <div class="p-desc" v-show="active===index">完成率</div>
          <circle-progressbar
            :id="index"
            :barColor="getBarColor(index)"
            :backgroundColor="getBgColor(index)"
            :width="80"
            :radius="10"
            :progress="item.value"
            :isAnimation="true"
          ></circle-progressbar>
        </div>
        <div class="line" v-if="index!==(progress.length-1)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import circleProgressbar from "vue-circleprogressbar";
export default {
  data() {
    return {
      active: 0,
      colorLost: [
        { barColor: "rgb(94, 176, 254)", bgColor: "rgb(169, 208, 255)" },
        { barColor: "rgb(128, 227, 19)", bgColor: "rgb(211, 244, 175)" },
        { barColor: "rgb(242, 174, 87)", bgColor: "rgb(255, 232, 204)" }
      ]
    };
  },
  components: {
    countTo,
    circleProgressbar
  },
  props: {
    progress: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeProgress(index) {
      if (this.active !== index) {
        this.changeSwitch(this.active);
        this.changeSwitch(index);
        this.active = index;
      }
    },
    changeSwitch(index) {
      let a = `#progress${index}`;
      document.querySelector(a).style.display = "none";
      setTimeout(() => {
        document.querySelector(a).style.display = "block";
      }, 10);
    },
    getBarColor(index) {
      if (this.active === index) return this.colorLost[index].barColor;
      else return "rgb(159, 178, 189)";
    },
    getBgColor(index) {
      if (this.active === index) return this.colorLost[index].bgColor;
      else return "rgb(220, 226, 230)";
    },
    getProgress(index, value) {}
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.progress {
  margin: 10px 0 50px 0;
  .active-item {
    border-top: 8px solid;
  }
  .progress-item {
    cursor: pointer;
    padding: 8px 0;
    // box-sizing: border-box;
    position: relative;
    flex: 1;
    .desc {
      height: 120px;
      font-size: 12px;
      width: 200px;
      .title {
        margin: 10px 0;
        font-size: 14px;
        color: #ccc;
      }
      .money {
        font-size: 20px;
        margin: 10px 0;
      }
    }
    .wrap-progress {
      width: 80px;
      position: relative;
      font-size: 12px !important;
      ::v-deep .center_text {
        display: none;
      }
      .num,
      .p-desc {
        position: absolute;
        left: 50%;
        font-size: 12px;
        z-index: 99;
      }
      .num {
        top: 42%;
        transform: translate(-50%, -42%);
      }
      .p-desc {
        top: 63%;
        transform: translate(-50%, -63%);
      }
    }
    .line {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 24px;
      background: #ccc;
    }
  }
}
</style>