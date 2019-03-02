<template>
  <div class="login">
    <!--  -->
    <h1>基于vue开发的电商后台管理系统</h1>
    <template>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="username">
          <i-input type="text" v-model="formInline.username" placeholder="账号">
            <Icon type="ios-person-outline" slot="prepend" class="icon"></Icon>
          </i-input>
        </FormItem>
        <FormItem prop="password">
          <i-input
            type="password"
            v-model="formInline.password"
            placeholder="密码"
            @keydown.enter.native="handleSubmit('formInline')"
          >
            <Icon type="ios-lock-outline" slot="prepend" class="icon"></Icon>
          </i-input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formInline')" class="button">登录</Button>
        </FormItem>
      </Form>
    </template>
    <p>designBy:yaogengzhu</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        username: "admin",
        password: "123456"
      },
      ruleInline: {
        username: [
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
      this.$refs[name].validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post("login", this.formInline)
        if (res.meta.status !== 200) return this.$Message.error("登录失败")
        console.log(res)
        //如果登录成功需要将token 先保存在本localStroe上
        const token = res.data.token
        // 登录成功之后将用户的用户名保存到本地上
        let username = res.data.username
        window.localStorage.setItem("username",username)
        window.localStorage.setItem("mytoken", token)
        // 登录成功即需要路由跳转 (编程式路由导航)
        this.$router.push("/home")
        this.$Message.success("登录成功")
        console.log(res)
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
//   justify-content:center;
  background: linear-gradient(-45deg, #dd80ff, #7fbdfe);
  position: relative;
  .icon {
    font-size: 20px;
  }
  h1 {
    margin: auto;
    color: #fff;
    text-align: center;
    font-size: 40px;
    padding-top: 60px;
    box-sizing: border-box;
    flex: 1;
  }
  form {
    width: 400px;
    height: 500px;
    margin: auto;
    padding-top: -30px;
    flex: 3;
    .button {
      height: 50px;
    }
  }
  p{
      color:#ffff;
      font-size: 18px;
      margin-bottom:5px;
      text-align: center;
  }
}
</style>