<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="120px">
      <el-form-item label="需求分析" prop="xqfx">
        <upload-view folder="xuqiufenxi"></upload-view>
      </el-form-item>
      <el-form-item label="需求确认单" prop="xqqrd">
        <upload-view folder="xuqiuquerendan"></upload-view>
      </el-form-item>
      <el-form-item label="预计开始时间" prop="kssj">
        <el-date-picker
          v-model="formData.kssj"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :style="{width: '100%'}"
          placeholder="请选择预计开始时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="预计结束时间" prop="jssj">
        <el-date-picker
          v-model="formData.jssj"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :style="{width: '100%'}"
          placeholder="请选择预计结束时间"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addRequest } from "@/api/task";
import UploadView from "../../components/uploadView";
export default {
  components: { UploadView },
  props: [],
  data() {
    return {
      formData: {
        xqfx: null,
        xqqrd: null,
        kssj: null,
        jssj: null,
      },
      rules: {
        kssj: [
          {
            required: true,
            message: "请选择预计开始时间",
            trigger: "change",
          },
        ],
        jssj: [
          {
            required: true,
            message: "请选择预计结束时间",
            trigger: "change",
          },
        ],
      },
      xqfxfileList: [],
      xqqrdfileList: [],
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
        this.addRequest();
      });
    },
    async addRequest() {
      this.formData.creator = "项目组";
      this.formData.taskid = this.$route.query.id;
      let response = await addRequest(this.formData);
      if (response.status === 1) {
        this.$emit("on-success");
        this.$message.success("保存成功！");
      } else {
        this.$message.error("保存失败，请检查网络");
      }
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    xqfxBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    xqqrdBeforeUpload(file) {
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
.el-upload__tip {
  line-height: 1.2;
}
</style>
