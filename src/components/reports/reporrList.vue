<template>
  <div class="reports">
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="reports">
        <Icon type="logo-buffer"></Icon>数据管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>数据列表
      </BreadcrumbItem>
    </Breadcrumb>
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
  async mounted() {
    const myChart = echarts.init(this.$refs.main);
    const { data: res } = await this.$http.get("reports/type/1");
    if (res.meta.status !== 200) return;
    console.log(res);
    myChart.setOption({
      title:{
        text:"堆叠区域图"
      },
      legend: res.data.legend,
      xAxis: res.data.xAxis,
      yAxis: res.data.yAxis,
      series: res.data.series
    });
  }
};
</script>
<style lang="scss" scoped>
.reports {
  .main {
    width: 600px;
    height: 400px;
    margin-left: 30px;
    // border: 1px solid blue;
  }
  .breadCrumb {
    height: 40px;
    line-height: 40px;
    background-color: #a7beee;
    padding-left: 10px;
    margin-bottom: 10px;
  }
}
</style>