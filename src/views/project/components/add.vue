<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="项目组名称" prop="groupName">
        <el-input
          v-model="formData.groupName"
          placeholder="请输入单行文本项目组名称"
          clearable
          :style="{width: '100%'}"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目简述" prop="descrpition">
        <el-input
          v-model="formData.descrpition"
          type="textarea"
          placeholder="请输入项目简述"
          :autosize="{minRows: 4, maxRows: 4}"
          :style="{width: '100%'}"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择用户" prop="userID">
        <el-select
          v-model="formData.userID"
          placeholder="请选择选择用户"
          clearable
          :style="{width: '100%'}"
        >
          <el-option
            v-for="(item, index) in userIDOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择领导" prop="leaderID">
        <el-select
          v-model="formData.leaderID"
          placeholder="请选择选择领导"
          clearable
          :style="{width: '100%'}"
        >
          <el-option
            v-for="(item, index) in leaderIDOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAdviceCode, addAdvice } from "@/api/advice";
import { addProGroup } from "@/api/projectGroup";
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        groupName: undefined,
        descrpition: undefined,
        userID: undefined,
        leaderID: undefined,
      },
      rules: {
        groupName: [
          {
            required: true,
            message: "请输入项目组名称",
            trigger: "blur",
          },
        ],
        descrpition: [
          {
            required: true,
            message: "请输入项目简述",
            trigger: "blur",
          },
        ],
        userID: [
          {
            required: true,
            message: "请选择用户",
            trigger: "change",
          },
        ],
        leaderID: [
          {
            required: true,
            message: "请选择领导",
            trigger: "change",
          },
        ],
      },
      userIDOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      leaderIDOptions: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      advice: {
        code: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.gen();
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.addAdvice();
      });
    },
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    async gen() {
      const { data } = await getAdviceCode();
      this.advice.code =
        "YHTS" + "-" + new Date().getFullYear() + "-" + data[0].code;
    },
    async addAdvice() {
      this.advice.ms = this.formData.descrpition;
      this.advice.creator = "总集";
      this.advice.adviceID = this.guid();
      this.advice.ifDefault = true;
      let response = null;
      response = await addAdvice(this.advice);
      if (response.code == 200) {
        this.formData.adviceID = this.advice.adviceID;
        this.addGroup();
      } else {
        this.$message.error("保存失败，请重新检查。");
      }
    },
    async addGroup() {
      this.formData.creator = "总集";
      let response = await addProGroup(this.formData);
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
  },
};
</script>
<style>
</style>
