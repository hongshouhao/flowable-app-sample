<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="需求架构" prop="xqjg">
        <el-input
          v-model="formData.xqjg"
          type="textarea"
          placeholder="请输入需求架构"
          :autosize="{minRows: 4, maxRows: 4}"
          :style="{width: '100%'}"
        ></el-input>
      </el-form-item>
      <el-form-item label="效益评分" prop="xypf">
        <el-rate v-model="formData.xypf" :max="5" show-score></el-rate>
      </el-form-item>
      <el-form-item label="效益分析" prop="xyfx">
        <el-input
          v-model="formData.xyfx"
          type="textarea"
          placeholder="请输入效益分析"
          :autosize="{minRows: 4, maxRows: 4}"
          :style="{width: '100%'}"
        ></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addAnalysis } from "@/api/advice";
export default {
  components: {},
  props: {
    flowableTaskId: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      formData: {
        xqjg: undefined,
        xypf: 0,
        xyfx: undefined,
      },
      rules: {
        xqjg: [
          {
            required: true,
            message: "请输入需求架构",
            trigger: "blur",
          },
        ],
        xypf: [],
        xyfx: [],
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
        this.addAnalysis();
      });
    },

    //重置
    resetForm() {
      this.$refs["elForm"].resetFields();
    },

    //业务
    async addAnalysis() {
      let response = null;
      this.formData.adviceid = this.$route.query.adviceID;
      this.formData.creator = "总集";
      response = await addAnalysis(this.formData);
      if (response.status === 1) {
        let execSuccess = await this.excuFlowableTask();
        if (execSuccess === 1) {
          this.$emit("on-success");
          this.$message.success("创建成功！");
        } else {
          this.$message.error("任务流程提交失败，请联系管理员");
        }
      } else {
        this.$message.error("保存失败，请重新检查。");
      }
    },

    //流程
    async excuFlowableTask() {
      // let taskActionRequest = {
      //   action: "complete",
      //   variables: [],
      //   localScope: false,
      // };

      let taskActionRequest = {
        action: "claim",
        assignee: this.$flowableClient.options.auth.username,
      };
      console.log(this.flowableTaskId);

      return await this.$flowableClient.tasks
        .executeAction(this.flowableTaskId, taskActionRequest)
        .then((resp) => {
          return 1;
        })
        .catch((err) => {
          console.error(err);
          return 0;
        });
    },
  },
};
</script>
<style>
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}
.el-form-item--medium .el-rate {
  margin: 0;
}
</style>
