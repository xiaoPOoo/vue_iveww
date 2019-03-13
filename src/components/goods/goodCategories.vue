<template>
  <div class="goodCategroy">
    <!-- 导航部分 -->
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="categories">
        <Icon type="logo-buffer"></Icon>分类管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>商品分类
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.goodCategroy {
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
</style>