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
    <p class="text">左侧为API调用数据，右侧是假数据！测试效果</p>
    <div class="main" ref="main"></div>
    <!-- 示范图 -->
    <div class="demo" ref="demo"></div>
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
    const myChart1 = echarts.init(this.$refs.main);
    const { data: res } = await this.$http.get("reports/type/1");
    if (res.meta.status !== 200) return;
    console.log(res);
    myChart1.setOption({
      title: {
        text: "堆叠区域图"
      },
      legend: res.data.legend,
      xAxis: res.data.xAxis,
      yAxis: res.data.yAxis,
      series: res.data.series
    });

    // 操作dom元素
    const myChart2 = echarts.init(this.$refs.demo);
    // 初始化数据
    myChart2.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: [
          "直达",
          "营销广告",
          "搜索引擎",
          "邮件营销",
          "联盟广告",
          "视频广告",
          "百度",
          "谷歌",
          "必应",
          "其他"
        ]
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          selectedMode: "single",
          radius: [0, "30%"],

          label: {
            normal: {
              position: "inner"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: "直达", selected: true },
            { value: 679, name: "营销广告" },
            { value: 1548, name: "搜索引擎" }
          ]
        },
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "55%"],
          label: {
            normal: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          data: [
            { value: 335, name: "直达" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1048, name: "百度" },
            { value: 251, name: "谷歌" },
            { value: 147, name: "必应" },
            { value: 102, name: "其他" }
          ]
        }
      ]
    });
  }
};
</script>
<style lang="scss" scoped>
.reports {
  padding: 5px;
  .main {
    width: 600px;
    height: 400px;
    margin-left: 30px;
    // border: 1px solid blue;
    float: left;
  }
  .breadCrumb {
    height: 40px;
    line-height: 40px;
    background-color: #a7beee;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .demo {
    float: right;
    width: 800px;
    height: 400px;
    border: 1px solid #fff;
  }
  .text {
    text-align: center;
    font-size: 30px;
    color: rgb(2, 217, 233);
    margin: 30px 0;
  }
}
</style>