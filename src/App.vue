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
    color: #409eff;
  }
  .btn-group {
    width: 100%;
    height: 50px;
    background: #fff;
    padding: 5px 10px;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    bottom: 0;
  }
}
span:focus,
div:focus,
button:focus {
  outline: 0;
}

/* 在全局CSS里引用: */
/* 滚动条宽度 */
::-webkit-scrollbar {
  width: 7px;
  height: 10px;
}
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 3px;
}
</style>
