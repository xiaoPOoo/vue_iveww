<template>
  <div class="user">
    <!-- 导航部分 -->
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/home">
        <Icon type="ios-home-outline"></Icon>首页
      </BreadcrumbItem>
      <BreadcrumbItem to="users">
        <Icon type="logo-buffer"></Icon>用户管理
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="ios-cafe"></Icon>用户列表
      </BreadcrumbItem>
    </Breadcrumb>
    <!-- 搜索框 -->
    <i-input
      suffix="ios-search"
      placeholder="请输入要搜索内容"
      style="width: auto"
      v-model="query"
      @keydown.enter.native="queryUser"
    ></i-input>
    <Button type="primary" style="margin-left:10px" @click="queryUser">查找</Button>
    <Button type="primary" style="margin-left:10px" @click="modal1=true">添加用户</Button>
    <!-- 表格部分 -->
    <Table border :columns="columns1" :data="data1" class="user-table">
      <template slot="mg_state" slot-scope="{ row }">
        <i-switch v-model="row.mg_state" @on-change="change(row)"/>
      </template>
      <template slot-scope="{ row }" slot="action">
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
          @click="remove(row.id)"
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
    <!-- 添加用户对话框 -->
    <Modal
      v-model="modal1"
      title="添加用户"
      :loading="true"
      :draggable="true"
      @on-ok="handleSubmit('formValidate')"
    >
      <template>
        <Form
          label-position="left"
          :label-width="60"
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
        >
          <FormItem label="用户名" prop="username">
            <i-input v-model="formValidate.username"></i-input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <i-input v-model="formValidate.password" type="password"></i-input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <i-input v-model="formValidate.email"></i-input>
          </FormItem>
          <FormItem label="手机号	" prop="mobile">
            <i-input v-model="formValidate.mobile"></i-input>
          </FormItem>
        </Form>
      </template>
    </Modal>
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
          title: "用户手机",
          key: "mobile"
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
      total: 0, //数据的总条数
      modal1: false, // 对话框的显影
      formValidate: {}, //添加用户时存放数据
      ruleValidate: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能低于6位数",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ]
      }
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
      if (res.meta.status !== 200) this.$Message.danger("请求错误");
      this.data1 = res.data.users;
      this.total = res.data.total;
    },
    show(row) {
      console.log(row);
    },
    // 删除
    async remove(id) {
      // console.log(index);
      const { data: res } = await this.$http.delete(`users/${id}`);
      // console.log(res);
      if (res.meta.status === 200) {
        this.$Message.success("数据删除成功");
        //重新加载数据
        this.initDate();
      }
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
      this.pagesize = size;
      this.initDate();
    },
    //查找用户
    queryUser() {
      //直接调用数据接口就可以了
      this.initDate();
    },
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          // console.log(this.formValidate);
          //当成功的获取到了数据 向服务器发起请求
          const { data: res } = await this.$http.post(
            "users",
            this.formValidate
          );
          console.log(res);
          if (res.meta.status !== 201) {
            this.$Message.warning("用户添加失败");
          }
          //数据请求为200 之后，关闭对话框重新请求数据
          this.modal1 = false;
          this.initDate();
          this.formValidate = {};
        } else {
          this.$Message.warning("数据请求失败");
          // 数据请求失败也需要关闭对话框
          this.modal1 = false;
        }
      });
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