<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="120px">
      <el-form-item label="解决情况描述" prop="jjqk">
        <el-input
          v-model="formData.jjqk"
          type="textarea"
          placeholder="请输入解决情况描述"
          :autosize="{minRows: 4, maxRows: 4}"
          :style="{width: '100%'}"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传" prop="finish">
        <el-upload
          ref="finish"
          :file-list="finishfileList"
          :action="finishAction"
          :before-upload="finishBeforeUpload"
        >
          <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addFinish } from "@/api/task";
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        jjqk: undefined,
        finish: null,
      },
      rules: {
        jjqk: [
          {
            required: true,
            message: "请输入解决情况描述",
            trigger: "blur",
          },
        ],
      },
      finishAction: "https://jsonplaceholder.typicode.com/posts/",
      finishfileList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.addFinish();
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    finishBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    async addFinish() {
      this.formData.taskid = this.$route.query.taskID;
      this.formData.creator = "项目组";
      let response = await addFinish(this.formData);
      if (response.status === 1) {
        this.$emit("on-success");
        this.$message.success("保存成功！");
      } else {
        this.$message.error("保存失败，请检查网络");
      }
    },
  },
};
</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}
</style>
