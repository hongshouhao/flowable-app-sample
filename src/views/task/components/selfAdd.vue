<template>
  <div>
    <el-form ref="elForm"
             :model="formData"
             :rules="rules"
             size="medium"
             label-width="120px">
      <el-form-item label="解决单位"
                    prop="jjdw">
        <el-input v-model="formData.jjdw"
                  placeholder="请输入解决单位"
                  readonly
                  clearable
                  :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="任务内容"
                    prop="rwnr">
        <el-input v-model="formData.rwnr"
                  type="textarea"
                  placeholder="请输入任务内容"
                  :autosize="{minRows: 4, maxRows: 4}"
                  :style="{width: '100%'}"></el-input>
      </el-form-item>
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
      <el-form-item label="期望完成时间"
                    prop="qwwcsj">
        <el-date-picker v-model="formData.qwwcsj"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :style="{width: '100%'}"
                        placeholder="请选择期望完成时间"
                        clearable></el-date-picker>
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
import { guid } from "@/core/utils";
import { addTask } from "@/api/task";
export default {
  components: {},
  props: [],
  data () {
    return {
      formData: {
        jjdw: "项目组",
        rwnr: undefined,
        jjcd: undefined,
        prodef: undefined,
        qwwcsj: null,
      },
      rules: {
        jjdw: [],
        rwnr: [
          {
            required: true,
            message: "请输入任务内容",
            trigger: "blur",
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
      },
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
    this.prodef = this.$store.state.processDefinitions.find(x => x.key === "szsp-service-improve-task")
  },
  methods: {
    submitForm () {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.addTask();
      });
    },
    resetForm () {
      this.$refs["elForm"].resetFields();
    },
    async addTask () {
      this.formData.AdviceID = "预设";
      this.formData.creator = "项目组";
      this.formData.ifHtn = true;
      this.formData.ifDsf = false;
      this.formData.taskID = guid();

      let response = await addTask(this.formData);

      if (response.status === 1) {
        this.startProcess().then(resp2 => {
          if (resp2 === 1) {
            this.$message.success("创建成功！");
            this.$emit("on-success");
          } else if (resp2 === 0) {
            this.$message.error("流程启动失败！");
          } else if (resp2 === -1) {
            this.$message.error("流程定义不存在，请联系开发人员！");
          }
        })
      } else {
        this.$message.error("保存失败，请检查网络");
      }
    },

    async startProcess () {
      if (this.prodef) {
        let theProcs = await this.$flowableClient.processInstances.getProcessInstances(
          {
            processDefinitionKey: this.prodef.key,
            businessKey: this.formData.taskID
          })
        if (theProcs.data.data.length === 0) {
          return await this.$flowableClient.processInstances
            .startProcessInstance({
              processDefinitionId: this.prodef.id,
              businessKey: this.formData.taskID,
              variables: [],
              returnVariables: true,
            }).then((result) => {
              return 1
            }).catch((err) => {
              return 0
            });
        }
        else {
          return 1
        }
      }
      else {
        return -1
      }
    },
  },
};
</script>
<style>
</style>
