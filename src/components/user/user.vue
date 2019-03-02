<template>
  <div class="user">
    <!-- 导航部分 -->
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="user">
        <Icon type="logo-buffer"></Icon>用户管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>用户列表
      </BreadcrumbItem>
    </Breadcrumb>
    <!-- 搜索框 -->
    <i-input suffix="ios-search" placeholder="请输入要搜索内容" style="width: auto" v-model="query" @keydown.enter.native="queryUser" ></i-input>
    <Button type="primary" style="margin-left:10px" @click="queryUser">查找</Button>

    <!-- 表格部分 -->
    <Table border :columns="columns1" :data="data1" class="user-table">
      <template slot="mg_state" slot-scope="{ row }">
        <i-switch v-model="row.mg_state" @on-change="change(row)"/>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="success"
          size="small"
          title="添加用户"
          style="margin-right: 15px"
          @click="show(row)"
          icon="ios-add-circle-outline"
        ></Button>
        <Button
          type="warning"
          size="small"
          @click="remove(index)"
          style="margin-right: 15px"
          title="删除用户"
          icon="ios-trash-outline"
        ></Button>
        <Button type="primary" size="small" title="编辑用户" icon="md-create"></Button>
      </template>
    </Table>
    <!-- 分页部分  -->
    <Page
      :total="total"
      size="small"
      :page-size="pagesize"
      :page-size-opts="[1,10,15,20]"
      show-total
      show-elevator
      show-sizer
      @on-change="changPagenum"
      @on-page-size-change="changePagesize"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns1: [
        {
          type: "index",
          width: "60",
          align: "center"
        },
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "用户角色",
          key: "role_name"
        },
        {
          title: "用户邮箱",
          key: "email"
        },
        {
          title: "用户状态",
          slot: "mg_state",
          width: 100
        },
        {
          title: "操作",
          slot: "action",
          width: 300,
          align: "center"
        }
      ],
      data1: [], //用来保存动态数据
      query: "", //关键之查询
      pagenum: 1, //请求页数默认为1
      pagesize: 10, // 请求条数默认为10
      total: 0 //数据的总条数
    };
  },
  //调用初始化数据
  created() {
    this.initDate();
  },
  methods: {
    //数据初始化
    async initDate() {
      // 发起数据列表请求
      const { data: res } = await this.$http.get("users", {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      // console.log(res)
      if (res.meta.status !== 200) this.$Message.danger("请求错误")
      this.data1 = res.data.users
      this.total = res.data.total
    },
    show(row) {
      console.log(row);
    },
    remove(index) {
      console.log(index);
    },
    // 修改用户状态
    async change(row) {
      // console.log(row);
      //发送修改状态的请求
      const { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      );
      if (res.meta.status !== 200) this.$Message.danger("状态修改失败");
      //当状态为200 则意味修改成功
      this.$Message.success(res.meta.msg);
    },
    // 显示页码
    changPagenum(num) {
      // console.log(num)
      //调用数据初始化接口   改变每页的条数
      this.pagenum = num;
      this.initDate();
    },
    //显示条数
    changePagesize(size) {
      // console.log(size)
      this.pagesize = size
      this.initDate()
    },
    //查找用户
    queryUser(){
      //直接调用数据接口就可以了
      this.initDate()
    }
  }
};
</script>

<style  lang="scss" scoped>
.user {
  padding: 5px;
  .breadCrumb {
    height: 40px;
    line-height: 40px;
    background-color: pink;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .user-table {
    margin: 10px 0;
  }
}
</style>