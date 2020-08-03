<template>
  <div>
    <el-form ref="elForm"
             :model="formData"
             :rules="rules"
             size="medium"
             label-width="100px">
      <el-form-item label="审核结果"
                    prop="result">
        <el-radio-group v-model="formData.result"
                        size="medium">
          <el-radio v-for="(item, index) in field103Options"
                    :key="index"
                    :label="item.value"
                    :disabled="item.disabled">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核意见"
                    prop="opinion">
        <el-input v-model="formData.opinion"
                  type="textarea"
                  placeholder="请输入审核意见"
                  :autosize="{minRows: 4, maxRows: 4}"
                  :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="备注"
                    prop="bz">
        <el-input v-model="formData.bz"
                  type="textarea"
                  placeholder="请输入备注"
                  :autosize="{minRows: 4, maxRows: 4}"
                  :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary"
                   @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { submitReview } from "@/api/review";
export default {
  components: {},
  props: ["data"],
  data () {
    return {
      formData: {
        result: undefined,
        opinion: undefined,
        bz: undefined,
      },
      rules: {
        result: [
          {
            required: true,
            message: "审核结果不能为空",
            trigger: "change",
          },
        ],
        opinion: [
          {
            required: true,
            message: "请输入审核意见",
            trigger: "blur",
          },
        ],
        bz: [],
      },
      field103Options: [
        {
          label: "通过",
          value: 1,
        },
        {
          label: "不通过",
          value: 0,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    submitForm () {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.submitReview();
      });
    },
    resetForm () {
      this.$refs["elForm"].resetFields();
    },
    async submitReview () {
      let response = null;
      let params = {
        adviceID: this.data.adviceID,
        taskID: this.$route.query.id,
        type: "任务审核",
        result: this.formData.result,
        opinion: this.formData.opinion,
        bz: this.formData.bz,
        creator: "领导",
      };
      response = await submitReview(params);
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
