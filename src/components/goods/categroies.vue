<template>
  <div class="category">
    <!-- 导航部分 -->
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="params">
        <Icon type="logo-buffer"></Icon>分类管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>分类参数
      </BreadcrumbItem>
    </Breadcrumb>
    <!-- 分类参数 -->
    <h1>数据参数有误，正在积极修正中！</h1>
  </div>
</template>

<script>
export default {};
</script>

<style  lang='scss' scoped>
.category {
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
}
h1 {
  font-size: 20px;
  color: coral;
}
</style>