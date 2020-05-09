<template>
  <div class="container">
    <my-progress :progress="progress"></my-progress>
    <div class="content flex">
      <div>
        <city :cityValue="cityValue"></city>
      </div>
      <div>
        <Dynamic></Dynamic>
      </div>
    </div>
    <div>
      <Question :question="question"></Question>
    </div>
  </div>
</template>

<script>
import myProgress from "../../components/home/Progress";
import city from "../../components/home/City";
import Dynamic from "../../components/home/Dynamic";
import Question from "../../components/home/Question";
import { createNamespacedHelpers } from "vuex";
const otherModule = createNamespacedHelpers("other");
const { mapActions: otherAtions, mapState: otherState } = otherModule;
export default {
  data() {
    return {};
  },
  components: {
    myProgress,
    city,
    Dynamic,
    Question
  },
  props: {},
  methods: {
    ...otherAtions([
      "getCityValue",
      "getProgress",
      "getReport",
      "getQuestion",
      "addDynamic",
      "getDynamic"
    ])
  },
  mounted() {},
  beforeMount() {
    this.getProgress();
    this.getCityValue();
    this.getDynamic();
    this.getQuestion();
  },
  watch: {},
  computed: {
    ...otherState(["cityValue", "progress", "report", "question", "dynamic"])
  }
};
</script>

<style scoped lang='scss'>
.container {
  padding-top: 20px;
  .content {
    div {
      flex: 1;
    }

    ::v-deep .el-card__header {
      height: 53px;
      display: flex;
      justify-content: center;
      flex-flow: column;
      padding: 0 20px;
    }
  }
}
</style>