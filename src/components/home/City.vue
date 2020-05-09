<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t(`commons.profit`)}}({{$t(`commons.tenThousand`)}})</span>
      </div>
      <div class="content">
        <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: [],
        rows: []
      },
      chartSettings: {
        sizeMin: 12,
        sizeMax: 20
      }
    };
  },
  components: {},
  props: {
    cityValue: {
      type: Array,
      default: () => []
    }
  },
  methods: {},
  mounted() {},
  beforeDestroy() {},
  watch: {
    cityValue(val) {
      this.chartData.rows = val;
      this.chartData.columns = Object.keys(val[0]);
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
::v-deep .el-card.is-always-shadow {
  box-shadow: none;
}
.container {
  margin-right: 10px;
  .content {
    height: 400px;
  }
}
</style>