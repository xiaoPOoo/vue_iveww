<template>
  <div class="login">
    <!--  -->
    <h1>基于vue开发的电商后台管理系统</h1>
    <template>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="账号">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formInline')" class="button">登录</Button>
        </FormItem>
      </Form>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能低于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  background: linear-gradient(-45deg, #dd80ff, #7fbdfe);
  h1 {
    margin: auto;
    color: #fff;
    text-align: center;
    font-size: 40px;
    padding-top: 30px;
  }
  form {
    width: 400px;
    height: 500px;
    margin: auto;
    padding-top: 30px;
    .button {
      height: 50px;
    }
  }
}
</style>