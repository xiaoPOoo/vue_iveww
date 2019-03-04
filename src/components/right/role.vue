<template>
  <div class="role">
    <!-- 导航部分 -->
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="roles">
        <Icon type="logo-buffer"></Icon>角色管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>角色列表
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.role{
  padding: 5px;
  .breadCrumb {
    height: 40px;
    line-height: 40px;
    background-color: pink;
    padding-left: 10px;
    margin-bottom: 10px;
  }
}
</style>