<template>
  <el-container class="main">
    <el-aside width="200px"
              class="aside">
      <user-info></user-info>
      <menu-view></menu-view>
    </el-aside>
    <el-container direction="vertical">
      <el-header>{{ SysName }}</el-header>
      <el-main>
        <el-card>
          <router-view />
        </el-card>
      </el-main>
      <el-footer>
        <p>技术支持：苏州工业园区一网通办运营团队 版权所有&copy; 2020</p>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import MenuView from "./menu";
import UserInfo from "./userInfo";
export default {
  components: { MenuView, UserInfo },
  data () {
    return {
      user: {},
      SysName: "苏州工业园区“一网通办”优化提升服务平台",
    };
  },
  mounted () {
    debugger
    this.$flowableClient.processDefinitions
      .getProcessDefinitions({ latest: true })
      .then(result => {
        console.table(result.data.data)
        this.$store.commit('processDefinitions', result.data.data)
      })
      .catch(err => console.error(err))
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  header {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    text-indent: 50px;
    letter-spacing: 2px;
    position: absolute;
    background: url("../../assets/login/headerBg.png") no-repeat;
    background-size: 100% auto;
    color: #fff;
    width: 100%;
  }
  aside {
    border-right: 1px solid #4396ca;
  }
  main {
    position: absolute;
    top: 60px;
    left: 200px;
    right: 0;
    bottom: 60px;
    background: #f9f9f9;
    > .el-card {
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 11;
    text-align: center;
    font-size: 13px;
    color: #999;
    background: #eee;
    p {
      line-height: 60px;
      padding: 0;
      margin: 0;
    }
  }
}
</style>