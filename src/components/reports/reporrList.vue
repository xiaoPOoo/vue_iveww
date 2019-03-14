<template>
  <div class="reports">数据列表
    <!-- 存放数据 -->
    <div class="main" ref="main"></div>
  </div>
</template>

<script>
// import echart
const echarts = require("echarts");
export default {
  data() {
    return {};
  },
  // 在chuangjian
  created() {
    // 初始化数据，获取数据
    this.initData();
    //  初始化dom
  },
  mounted() {
    const myChart = echarts.init(this.$refs.main);

    myChart.setOption({
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  },
  methods: {
    async initData() {
      const { data: res } = await this.$http.get("reports/type/1");
      console.log(res);
    }
  }
};
</script>
<style lang="scss" scoped>
.reports {
  .main {
    width: 600px;
    height: 400px;
    margin-left: 30px;
    border: 1px solid blue;
  }
}
</style>