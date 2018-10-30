<template>
  <div id="app">
    <div class="header">
      <div class="title">12306管理</div>
    </div>
    <div class="content">
      <div class="left-nav">
        <el-menu default-active="4" class="el-menu-vertical-demo" router>
      <el-menu-item index="station">
        <i class="el-icon-location"></i>
        <span slot="title">车站管理</span>
      </el-menu-item>
      <el-menu-item index="ex">
        <i class="el-icon-menu"></i>
        <span slot="title">项目管理</span>
      </el-menu-item>
      <el-menu-item index="piao" >
        <i class="el-icon-document"></i>
        <span slot="title">票务管理</span>
      </el-menu-item>
      <el-menu-item index="user" >
        <i class="el-icon-setting"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
      </div>
      <div class="right-content">
        <div class="wrapper">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data() {
      return {
       
      };
    },
  mounted(){
    this.$router.push('/user');
  },
  methods: {
  }
}
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  html {
    color: #666;
  }
  body,ul,ol,dl,p,h1,h2,h3 {
    margin: 0;
    padding: 0;
  }
  ul,ol {
    list-style: none;
  }
  a{
    color: #666;
    text-decoration: none;
  }
  .header {
    width: 100%;
    background-color: teal;
  }
  .header .title {
    margin-left: 20px;
    color: #ffffff;
    line-height: 70px;
    font-size: 24px;
  }
  .content {
    position: absolute;
    width: 100%;
    top: 70px;
    bottom: 0;
  }
  .content > .left-nav {
    width: 160px;
    height: 100%;
    float: left;
  }
  .content > .right-content {
    /* box-sizing: border-box; */
    margin-left: 200px;
    height: 100%;
    background-color: #f0f0f0;
    padding: 1em;
  }
  .content > .right-content > .wrapper {
    /* box-sizing: border-box; */
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: #ffffff;
    padding: .5em;
  }
    .left_nav ul li {
    line-height: 2.6em;
    text-align: center;
    border-bottom: 1px solid #ededed;
  }
</style>
