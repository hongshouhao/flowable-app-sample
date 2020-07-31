<template>
  <div>
    <el-upload
      ref="files"
      :file-list="fujianfileList"
      :before-upload="handleUpload"
      :on-remove="handleRemove"
      :action="action"
      :data="data"
    >
      <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { uploadFile, deleteFile } from "@/api/file";
import { services } from "@/core/app/services";
export default {
  props: ["floder"],
  data() {
    return {
      fujianfileList: [],
      action: `${services.file.upload}`,
      data: {},
    };
  },
  mounted() {
    this.data = {
      UserAccount: "admin",
      folder: this.floder,
    };
  },
  methods: {
    getList() {},
    async handleRemove(file) {
      let params = {
        UserAccount: "admin",
        fileIDs: file.response.data.lstID[0],
      };
      let response = await deleteFile(params);
      if (response.status != 1) this.$message.error("删除失败！");
    },

    async handleUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
  },
};
</script>

<style>
</style>