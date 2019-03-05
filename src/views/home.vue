<template>
  <div class="home">
    <Layout class="layout">
      <Sider hide-trigger class="slider">
        <div class="logo">LOGO</div>
        <!-- 菜单列表 -->
        <Menu active-name="1" theme="dark" width="auto"  :accordion="true">
          <Submenu :name="list.path" v-for="list in menuList" :key="list.id">
            <template slot="title" class="menu">
              <Icon type="ios-options"></Icon>
              {{list.authName}}
            </template>
            <MenuItem :name="secondList.path" :to="secondList.path" v-for="secondList in list.children" :key="secondList.id">
              <Icon type="ios-navigate"></Icon>
              {{ secondList.authName}}
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header class="header">
          <i>hello</i>
          <h2>基于iview开发管理系统后台</h2>
          <span>
            <span class="uername">用户：{{ username }}</span>
            <Button
              size="small"
              icon="ios-download-outline"
              type="primary"
              title="退出"
              @click="exit"
            >退出</Button>
          </span>
        </Header>
        <Content>
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "xxx",
      menuList: [] //菜单列表数据
    };
  },
  created() {
    this.username = window.localStorage.getItem("username");
    //获取菜单列表初始化
    this.getMenuList();
  },
  methods: {
    exit() {
      //退出需要做两件事 1清除token  2.路由跳转
      window.localStorage.clear();
      this.$router.push("/");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      // console.log(res);
      //当获取成功处理数据
      if (res.meta.status === 200) {
        this.menuList = res.data;
      } else {
        this.$Message.error({
          content: "数据参数错误,请联系管理员！",
          duration: 4
        });
      }
    }
  }
};
</script>

<style  lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .layout {
    width: 100%;
    height: 100%;
    .slider {
      width: 200px;
      height: 100%;
      .logo {
        width: 200px;
        height: 64px;
        line-height: 64px;
        color: blue;
        text-align: center;
        font-size: 28px;
        font-weight: 800;
        background-color: #fff;
      }
      Submenu {
        height: 60px;
      }
    }
  }
  .header {
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h2 {
      font-size: 30px;
    }
    .uername {
      font-size: 14px;
      margin-right: 20px;
    }
  }
}
</style>