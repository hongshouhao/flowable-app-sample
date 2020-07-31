<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;

  .el-drawer__body {
    padding-right: 20px;
    overflow-y: auto;

    .dialog-btn {
      width: 100%;
      bottom: 0;
      text-align: right;
      border-top: 1px solid #eee;
      padding: 10px;
      background: #fff;
    }
  }
  .el-collapse-item__header {
    font-weight: bold;
    font-size: 15px;
  }
  .btn-group {
    padding: 20px 0;
  }
}
</style>
