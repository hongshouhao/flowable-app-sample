<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="工作内容" prop="gznr">
        <el-input
          v-model="formData.gznr"
          type="textarea"
          placeholder="请输入工作内容"
          :autosize="{minRows: 4, maxRows: 4}"
          :style="{width: '100%'}"
        ></el-input>
      </el-form-item>
      <el-form-item label="工作进度" prop="gzjd">
        <el-input
          v-model="formData.gzjd"
          placeholder="请输入工作进度"
          :maxlength="3"
          clearable
          :style="{width: '100%'}"
        >
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addProcess } from "@/api/task";
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        gznr: undefined,
        gzjd: "",
      },
      rules: {
        gznr: [
          {
            required: true,
            message: "请输入工作内容",
            trigger: "blur",
          },
        ],
        gzjd: [
          {
            required: true,
            message: "请输入工作进度",
            trigger: "blur",
          },
          {
            pattern: /^((?!0)\d{1,2}|100)$/,
            message: "只能输入0-100的数字",
            trigger: "blur",
          },
        ],
      },
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
        this.addProcess();
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    async addProcess() {
      this.formData.taskid = this.$route.query.id;
      this.formData.creator = "项目组";
      let response = await addProcess(this.formData);
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
</style>
