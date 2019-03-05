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
            <el-button
              type="primary"
              icon="el-icon-edit"
              round
              size="mini"
              title="编辑"
              @click="ediRole(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              round
              size="mini"
              title="删除"
              @click="deleteRole(scope.row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              round
              size="mini"
              title="分配角色"
              @click="grantRole(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

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
          :model="addFormValidate"
          :rules="ruleValidate"
        >
          <FormItem label="角色" prop="roleName">
            <i-input v-model="addFormValidate.roleName"></i-input>
          </FormItem>
          <FormItem label="角色描述" prop="roleDesc">
            <i-input v-model="addFormValidate.roleDesc"></i-input>
          </FormItem>
        </Form>
      </template>
    </Modal>
    <!-- 编辑角色信息 -->
    <Modal
      v-model="modal2"
      title="编辑角色"
      :loading="true"
      :draggable="true"
      @on-ok="ediRoleTo('formValidate')"
    >
      <template>
        <Form
          label-position="left"
          :label-width="80"
          ref="formValidate"
          :model="ediFormValidate"
          :rules="ruleValidate"
        >
          <FormItem label="角色" prop="roleName">
            <i-input v-model="ediFormValidate.roleName"></i-input>
          </FormItem>
          <FormItem label="角色描述" prop="roleDesc">
            <i-input v-model="ediFormValidate.roleDesc"></i-input>
          </FormItem>
        </Form>
      </template>
    </Modal>
    <!-- 分配权限  -->
    <Modal
      v-model="modal3"
      title="权限分配"
      :loading="true"
      :draggable="true"
      @on-ok="ediRoleTo('formValidate')"
    >
      <template>
        <Form
          label-position="left"
          :label-width="80"
          ref="formValidate"
          :model="grantFormValidate"
          :rules="ruleValidate"
          class="treeForm"
        >
          <FormItem label="角色" prop="roleName">
            <i-input v-model="grantFormValidate.roleName"></i-input>
          </FormItem>
          <FormItem label="角色描述">
            <el-tree
              :data="Treedata"
              show-checkbox
              node-key="id"
              :props="defaultProps"
              :default-checked-keys="selectedRoleId"
            ></el-tree>
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
      modal2: false, // 编辑角色信息的显影
      modal3: false, // 分配权限的显影
      addFormValidate: {}, // 存放添加角色信息
      ediFormValidate: {}, // 存放编辑角色信息
      grantFormValidate: {}, //存放分配权限的信息
      Treedata: [], // 数状节点数
      defaultProps: {
        children: "children",
        label: "authName"
      },
      selectedRoleId: [] // 选择的id
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
            roleName: this.addFormValidate.roleName,
            roleDesc: this.addFormValidate.roleDesc
          });
          if (res.meta.status === 201) {
            //数据请求成功

            this.initData();
            this.$Message.success("角色添加成功");
            this.modal1 = false;
            this.addFormValidate = {};
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
    },
    // 编辑角色信息（根据id 查询该角色的信息
    async ediRole(row) {
      this.modal2 = true;
      const { data: res } = await this.$http.get(`roles/${row.id}`);
      if (res.meta.status === 200) {
        this.ediFormValidate = res.data;
      }
    },
    // 编辑向服务器提交信息
    ediRoleTo(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          console.log(this.ediFormValidate);
          const { data: res } = await this.$http.put(
            `roles/${this.ediFormValidate.roleId}`,
            {
              roleName: this.ediFormValidate.roleName,
              roleDesc: this.ediFormValidate.roleDesc
            }
          );
          if (res.meta.status === 200) {
            this.modal2 = false;
            this.initData();
            this.$Message.success("修改成功！");
          }
        } else {
          this.$Message.error("数据提交错误！请与管理员联系");
        }
      });
    },
    // 分配权限
    async grantRole(row) {
      this.modal3 = true;
      const { data: res } = await this.$http.get("rights/tree");
      // console.log(res);
      this.Treedata = res.data;
      this.selectedRoleId = [];
      row.children.forEach(list => {
        // 在遍历之前必须要确定第一层id不存在
        if (list.children && list.children.lenght !== 0) {
          list.children.forEach(list => {
            this.selectedRoleId.push(list.id);
          });
        }
      });
      console.log(this.selectedRoleId);
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
  .treeForm {
    height: 400px;
    overflow: auto;
  }
}
</style>