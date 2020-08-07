<template>
  <div>
    <div class="demo-upload-list" v-for="item in uploadList" :key="item.id">
      <template v-if="item.status === 'finished'">
        <img :src="item.url" />
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-if="!view"></Icon>
        </div>
      </template>
    </div>
    <el-upload
      ref="files"
      :file-list="fujianfileList"
      :before-upload="handleUpload"
      :on-remove="handleRemove"
      :action="action"
      :data="data"
      multiple
      style="display: inline-block;width:58px;border:1px dashed #dcdee2;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <i class="el-icon-upload" style="font-size:18px"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { uploadFile, deleteFile, getFileInfos } from "@/api/file";
import { services } from "@/core/app/services";
import { validate } from "@/core/mixins/";
export default {
  mixins: [validate],
  props: {
    folder: {
      type: String,
      default: "",
    },
    files: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      fujianfileList: [],
      action: `${services.file.upload}`,
      data: {},
      uploadList: [],
      defaultList: [],
      validate: false,
    };
  },
  mounted() {
    this.data = {
      UserAccount: "admin",
      folder: this.floder,
    };
    this.getFiles();
  },
  methods: {
    async getFiles() {
      this.uploadList = [];
      this.defaultList = [];
      if (this.files === "") {
        setTimeout(() => {
          this.uploadList = this.$refs.files.fileList;
        }, 200);
        return;
      }
      let params = {
        fileIDs: this.files,
      };
      let response = await getFileInfos(params);
      console.log(response);

      // if(response){

      // }
    },
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

<style lang="scss" scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>