<template>
  <div class="addGoods">
    <!-- 导航部分 -->
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="users">
        <Icon type="logo-buffer"></Icon>商品管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>商品列表
      </BreadcrumbItem>
    </Breadcrumb>

    <Alert
      type="warning"
      show-icon
    >值得注意的是： 基于iview 这个导航条存在一个bug , 无法改变table栏为纵向！并且下一步不会自动判断是否完成！手动设置会出现一个问题就是返回上一步不会判断进行中，除非选中第一个</Alert>
    <!-- 步骤条 -->
    <template>
      <Steps :current="current" class="steps">
        <Step title="进行中"></Step>
        <Step title="进行中"></Step>
        <Step title="进行中"></Step>
        <Step title="进行中"></Step>
        <Step :title="title"></Step>
      </Steps>
    </template>
    <Tabs value="name" @on-click="changeIndex" direction="vertical" class="tabs">
      <TabPane label="商品名称" name="0"></TabPane>
      <TabPane label="商品价格" name="1">标签二的内容</TabPane>
      <TabPane label="商品数量" name="2">标签三的内容</TabPane>
      <TabPane label="商品重量" name="3">标签三的内容</TabPane>
      <TabPane label="商品分类" name="4">标签三的内容</TabPane>
    </Tabs>

    <Alert type="success" show-icon>这个是基于element 开发的一个</Alert>
    <!-- elment 进度条 -->
    <el-steps :space="200" :active="eleCurrent" class="el-steps">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step :title="lable"></el-step>
    </el-steps>
    <!-- table -->
    <template>
      <el-tabs v-model="activeName" tab-position="left" @tab-click="handClick">
        <el-tab-pane label="用户管理" name="1">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane>
        <el-tab-pane label="文件上传" name="5">定时任务补偿</el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0, // 步骤条的数据
      name: "1",
      title: "进行中",
      select: 1,
      eleCurrent: 0,
      activeName: "1",
      lable: "步骤5"
    };
  },
  methods: {
    changeIndex(name) {
      //   console.log(name);
      this.current = Number(name);
      if (this.current === 4) {
        this.title = "已完成";
      } else {
        this.title = "进行中";
      }
    },
    handClick(tab) {
      this.eleCurrent = Number(tab.name);
      if (tab.name == 5) {
        this.lable = "完成";
      } else {
        this.lable = "步骤5";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.addGoods {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 5px;
  .breadCrumb {
    height: 40px;
    line-height: 40px;
    background-color: #a7beee;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .steps {
    width: 80%;
    margin: 25px 0;
  }
  .tabs {
    width: 80%;
    border: 1px solid #cccc;
    height: 200px;
    margin-bottom: 10px;
  }
  .el-steps {
    margin: 40px 0;
    padding-left: 80px;
  }
}
</style>