import Vue from "vue"
export const Message = {
  confirm(vue, { message = null, callback }) {
    vue
      .$confirm(message || "此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        callback();
      })
      .catch(() => {
        vue.$notify({
          title: "提示",
          message: "已取消操作",
          type: "info",
          duration: 2000
        });
      });
  },
  showTips(vue, { message = null, success }) {
    if (success)
      vue.$notify({
        title: "成功",
        message: message || "操作成功",
        type: "success",
        duration: 2000
      });
    else
      vue.$notify({
        title: "失败",
        message: "信息保存失败",
        type: "error",
        duration: 2000
      });
  }
};
Vue.prototype.$Message=Message;
