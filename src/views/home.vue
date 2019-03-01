<template>
  <div class="home">
    <Layout class="layout">
      <Sider hide-trigger class="slider">
        <div class="logo">LOGO</div>
        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
          <Submenu name="1">
            <template slot="title" class="menu">
              <Icon type="ios-options"></Icon>用户管理
            </template>
            <MenuItem name="1-1" to="user">
              <Icon type="ios-navigate"></Icon>用户列表
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header class="header">
          <i>hello</i>
          <h2>基于iview开发管理系统后台</h2>
          <span>
            <span>xxx</span>
            <Icon type="ios-exit-outline" title="退出"/>
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
export default {};
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
    span {
      font-size: 30px;
    }
  }
}
</style>