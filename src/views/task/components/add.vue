<template>
  <div>
    <el-row :gutter="15">
      <el-form ref="elForm"
               :model="formData"
               :rules="rules"
               size="medium"
               label-width="125px">
        <el-col :span="12">
          <el-form-item label="解决单位"
                        prop="jjdw">
            <el-select v-model="formData.jjdw"
                       placeholder="请选择解决单位"
                       clearable
                       :style="{width: '100%'}">
              <el-option v-for="(item, index) in jjdwOptions"
                         :key="index"
                         :label="item.label"
                         :value="item.value"
                         :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="紧急程度"
                        prop="jjcd">
            <el-radio-group v-model="formData.jjcd"
                            size="medium">
              <el-radio v-for="(item, index) in jjcdOptions"
                        :key="index"
                        :label="item.value"
                        :disabled="item.disabled">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否合同内"
                        prop="ifHtn"
                        required>
            <el-switch v-model="formData.ifHtn"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否第三方提交"
                        prop="ifDsf"
                        required>
            <el-switch v-model="formData.ifDsf"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="期望完成时间"
                        prop="qwwcsj">
            <el-date-picker v-model="formData.qwwcsj"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :style="{width: '100%'}"
                            placeholder="请选择期望完成时间"
                            clearable></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="任务内容"
                        prop="rwnr">
            <el-input v-model="formData.rwnr"
                      type="textarea"
                      placeholder="请输入任务内容"
                      :autosize="{minRows: 4, maxRows: 4}"
                      :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button type="primary"
                       @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { guid } from "@/core/utils";
import { addTask } from "@/api/task";
import { getProGroupList } from "@/api/projectGroup";
export default {
  components: {},
  data () {
    return {
      formData: {
        jjdw: undefined,
        ifHtn: true,
        ifDsf: false,
        jjcd: undefined,
        qwwcsj: null,
        rwnr: undefined,
      },
      rules: {
        jjdw: [
          {
            required: true,
            message: "请选择解决单位",
            trigger: "change",
          },
        ],
        jjcd: [
          {
            required: true,
            message: "紧急程度不能为空",
            trigger: "change",
          },
        ],
        qwwcsj: [
          {
            required: true,
            message: "请选择期望完成时间",
            trigger: "change",
          },
        ],
        rwnr: [
          {
            required: true,
            message: "请输入任务内容",
            trigger: "blur",
          },
        ],
      },
      jjdwOptions: [],
      jjcdOptions: [
        {
          label: "一般",
          value: "一般",
        },
        {
          label: "紧急",
          value: "紧急",
        },
        {
          label: "非常紧急",
          value: "非常紧急",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    this.getGroups();
  },
  methods: {
    submitForm () {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.addTask();
      });
    },
    async getGroups () {
      let response = await getProGroupList({ groupname: "" });
      if (response.status === 1) {
        response.data.forEach((item) => {
          this.jjdwOptions.push({
            label: item.groupName,
            value: item.id,
          });
        });
      } else {
        this.$message.error("保存失败，请检查网络");
      }
    },
    async addTask () {
      this.formData.adviceId = this.$route.query.adviceID;
      this.formData.creator = "总集";
      this.formData.taskID = guid();
      let response = await addTask(this.formData);
      if (response.status === 1) {

        let addFlowableTaskSuccess = await this.addFlowableTask();

        if (addFlowableTaskSuccess === 1) {
          this.$emit("on-success");
          this.$message.success("保存成功！");
        }
        else {
          this.$message.error("添加任务失败");
        }
      } else {
        this.$message.error("保存失败，请检查网络");
      }
    },

    //添加flowable任务 多实例
    async addFlowableTask () {
      let _this = this
      let processId = _this.$store.state.currentProcessInstanceId

      debugger

      let executionRequest = {
        activityId: 'subprocess-renwushenhe',
        variables: [
          //   {
          //   name: "adviceid",
          //   type: "string",
          //   value: this.formData.adviceId,
          // }, 
          {
            name: "ifDsf",
            type: "string",
            value: this.formData.ifDsf.toString(),
          },
          {
            name: "ifHtn",
            type: "string",
            value: this.formData.ifHtn.toString(),
          },
          {
            name: "taskId",
            type: "string",
            value: this.formData.taskID,
          },
        ],
      }

      return _this.$flowableClient.processInstances
        .addMultiInstanceExecution(
          processId,
          executionRequest
        )
        .then((response) => {
          return 1
        })
        .catch((e) => {
          console.error(e)
          return 0
        })
    },
    resetForm () {
      this.$refs["elForm"].resetFields();
    },

  },
};
</script>
<style>
</style>
