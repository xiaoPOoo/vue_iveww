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
    <!-- 添加角色 -->
    <Button type="info" size="large" @click="addRole">添加角色</Button>
    <!-- 引入el表格 -->
    <template>
      <el-table :data="roleList" border style="width: 100%; margin:10px 0;">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <Row v-for="firstList in scope.row.children" :key="firstList.id">
              <i-col span="2">
                <!-- 此处传递id需要传递两个 -->
                <el-tag closable @close="delteTag(scope.row,firstList.id)">{{ firstList.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </i-col>
              <i-col span="22">
                <Row v-for="secondList in firstList.children" :key="secondList.id">
                  <i-col span="2">
                    <el-tag
                      type="success"
                      closable
                      @close="delteTag(scope.row,secondList.id)"
                    >{{ secondList.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </i-col>
                  <i-col span="20">
                    <el-tag
                      type="warning"
                      closable
                      v-for="lastList in secondList.children"
                      :key="lastList.id"
                      @close="delteTag(scope.row,lastList.id)"
                    >{{lastList.authName}}</el-tag>
                  </i-col>
                </Row>
              </i-col>
            </Row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" round size="mini" title="编辑"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              round
              size="mini"
              title="删除"
              @click="deleteRole(scope.row)"
            ></el-button>
            <el-button type="success" icon="el-icon-check" round size="mini" title="分配角色"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 添加角色对话框 -->
    <!-- 添加用户对话框 -->
    <Modal
      v-model="modal1"
      title="添加用户"
      :loading="true"
      :draggable="true"
      @on-ok="addRoleTo('formValidate')"
    >
      <template>
        <Form
          label-position="left"
          :label-width="80"
          ref="formValidate"
          :model="EdiformValidate"
          :rules="ruleValidate"
        >
          <FormItem label="角色" prop="roleName">
            <i-input v-model="EdiformValidate.roleName"></i-input>
          </FormItem>
          <FormItem label="角色描述" prop="roleDesc">
            <i-input v-model="EdiformValidate.roleDesc"></i-input>
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
      roleList: [], // 角色列表信息
      ruleValidate: {
        roleName: [
          {
            required: true,
            message: "请输入角色名字",
            trigger: "blur"
          }
        ],
        roleDesc: [
          {
            required: true,
            message: "请输入角色描述",
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
      },
      modal1: false, // 添加角色信息的显影
      EdiformValidate: {} // 存放角色信息
    };
  },
  created() {
    //调用初始化角色列表信息
    this.initData();
  },
  methods: {
    //初始化角色列表信息
    async initData() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status === 200) {
        this.roleList = res.data;
      }
    },
    // 删除指定角色信息
    async delteTag(role, rightId) {
      //正确获取两个id 进行删除操作
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      );
      //   console.log(res)
      // 如果请求成功，则向服务器刷新请求
      if (res.meta.status === 200) {
        // this.initData();
        this.$Message.success("数据请求成功");
        // 无刷新请求数据
        role.children = res.data;
      }
    },
    // 点击添加角色信息
    addRole() {
      this.modal1 = true;
    },
    // 向服务器发送请求
    addRoleTo(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          //   console.log("ok");
          const { data: res } = await this.$http.post("roles", {
            roleName: this.EdiformValidate.roleName,
            roleDesc: this.EdiformValidate.roleDesc
          });
          if (res.meta.status === 201) {
            //数据请求成功

            this.initData();
            this.$Message.success("角色添加成功");
            this.modal1 = false;
          }
        } else {
          //   console.log("err");
          this.$Message.error({
            content: "数据请求失败",
            duration: 3
          });
        }
      });
    },
    //根据id 删除角色
    async deleteRole(row) {
      const { data: res } = await this.$http.delete(`roles/${row.id}`);
      if (res.meta.status === 200) {
        //刷新数据
        this.initData();
        this.$Message.success("删除成功！");
      } else {
        this.$Message.error({
          content: "数据请求失败",
          duration: 3
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.role {
  padding: 5px;
  .breadCrumb {
    height: 40px;
    line-height: 40px;
    background-color: pink;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .el-tag {
    margin: 5px;
  }
}
</style>