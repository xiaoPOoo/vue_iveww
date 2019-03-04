<template>
  <div class="right">
    <!-- 导航部分 -->
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="rights">
        <Icon type="logo-buffer"></Icon>角色管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>权限列表
      </BreadcrumbItem>
    </Breadcrumb>
    <!-- 表格部分 -->
    <template>
      <Table border :columns="title" :data="roleData" class="table">
        <template slot-scope="{ row }" slot="level">
          <Button :type="row.level |styleFormat " size="small">{{row.level | numFormat }}</Button>
        </template>
      </Table>
    </template>
    <!-- 返回部分 -->
    <template>
      <BackTop :height="100" :bottom="200">
        <div class="top">返回顶端</div>
      </BackTop>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "权限名称",
          key: "authName"
        },
        {
          title: "路径",
          key: "path"
        },
        {
          title: "等级",
          slot: "level"
        }
      ],
      roleData: []
    };
  },
  created() {
    // 调用数据初始化
    this.initData();
  },
  methods: {
    //数据列表初始化
    async initData() {
      const type = "list";
      const { data: res } = await this.$http.get(`rights/${type}`);
      //   console.log(res);
      if (res.meta.status === 200) {
        this.roleData = res.data;
      }
    }
  },
  filters: {
    numFormat: data => {
      if (data == "0") {
        return "一级";
      } else if (data == "1") {
        return "二级";
      } else {
        return "三级 ";
      }
    },
    styleFormat: data => {
      if (data == "0") {
        return "warning";
      } else if (data == "1") {
        return "success";
      } else {
        return "info";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.right {
  z-index: -1;
  padding: 5px;
  .breadCrumb {
    height: 40px;
    line-height: 40px;
    background-color: pink;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .table {
    z-index: 1;
  }
  .top {
    padding: 10px;
    background: rgba(0, 153, 229, 0.7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
    z-index: 9999;
  }
}
</style>