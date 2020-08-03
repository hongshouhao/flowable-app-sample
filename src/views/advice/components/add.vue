<template>
  <div>
    <el-form ref="elForm"
             :model="formData"
             :rules="rules"
             size="medium"
             label-width="100px">
      <el-form-item label="编号"
                    prop="code">
        <el-input v-model="formData.code"
                  placeholder="请输入编号"
                  readonly
                  :style="{width: '100%'}">
          <el-button slot="append"
                     @click="gen">生成</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="提出单位"
                    prop="tcdw">
        <el-input v-model="formData.tcdw"
                  placeholder="请输入提出单位"
                  clearable
                  :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="联系人"
                    prop="lxr">
        <el-input v-model="formData.lxr"
                  placeholder="请输入联系人"
                  clearable
                  :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="联系方式"
                    prop="lxfs">
        <el-input v-model="formData.lxfs"
                  placeholder="请输入联系方式"
                  clearable
                  :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="来源"
                    prop="ly">
        <el-select v-model="formData.ly"
                   placeholder="请选择来源"
                   clearable
                   :style="{width: '100%'}">
          <el-option v-for="(item, index) in lyOptions"
                     :key="index"
                     :label="item.label"
                     :value="item.value"
                     :disabled="item.disabled"></el-option>
        </el-select>
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
      <el-form-item label="描述"
                    prop="ms">
        <el-input v-model="formData.ms"
                  type="textarea"
                  placeholder="请输入描述"
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
      <el-form-item label="附件"
                    prop="fujian">
        <upload-view folder="chubufenxi"></upload-view>
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
import { getAdviceCode, addAdvice } from "@/api/advice";
import UploadView from "../../components/uploadView";
export default {
  components: { UploadView },
  props: [],
  data () {
    return {
      formData: {
        code: undefined,
        tcdw: undefined,
        lxr: undefined,
        lxfs: undefined,
        ly: undefined,
        jjcd: undefined,
        ms: undefined,
        bz: undefined,
        prodef: undefined,
        status: "初步分析中",
      },
      rules: {
        code: [
          {
            required: true,
          },
        ],
        tcdw: [
          {
            required: true,
            message: "请输入提出单位",
            trigger: "blur",
          },
        ],
        lxr: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur",
          },
        ],
        lxfs: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: "blur",
          },
        ],
        ly: [
          {
            required: true,
            message: "请选择来源",
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
        ms: [
          {
            required: true,
            message: "请输入描述",
            trigger: "blur",
          },
        ],
        bz: [],
      },
      lyOptions: [
        {
          label: "专员走访",
          value: "专员走访",
        },
        {
          label: "部门需求",
          value: "部门需求",
        },
        {
          label: "客服热线",
          value: "客服热线",
        },
        {
          label: "领导指派",
          value: "领导指派",
        },
        {
          label: "其他",
          value: "其他",
        },
      ],
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
    this.prodef = this.$store.state.processDefinitions.find(x => x.key === "szsp-service-improve")
  },
  methods: {
    async gen () {
      const { data } = await getAdviceCode();
      this.formData.code =
        "YHTS" + "-" + new Date().getFullYear() + "-" + data[0].code;
    },
    submitForm () {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.addAdvice().then(resp1 => {
          if (resp1 === 1) {
            this.startProcess().then(resp2 => {
              debugger
              if (resp2 === 1) {
                this.$emit("on-success");
                this.$message.success("创建成功！");
              } else if (resp2 === 0) {
                this.$message.error("流程启动失败！");
              } else if (resp2 === -1) {
                this.$message.error("流程定义不存在，请联系开发人员！");
              }
            })
          }
          else {
            this.$message.error("保存失败，请重新检查。");
          }
        });
      });
    },
    async addAdvice () {
      this.formData.creator = "总集";
      this.formData.adviceID = guid();
      let response = null;
      response = await addAdvice(this.formData);
      if (response.code == 200) {
        return 1

      } else {
        return 0
      }
    },
    async startProcess () {
      if (this.prodef) {
        let theProcs = await this.$flowableClient.processInstances.getProcessInstances(
          {
            processDefinitionKey: this.prodef.key,
            businessKey: this.formData.adviceID
          })
        debugger
        if (theProcs.data.data.length === 0) {
          return await this.$flowableClient.processInstances
            .startProcessInstance({
              processDefinitionId: this.prodef.id,
              businessKey: this.formData.adviceID,
              variables: [],
              returnVariables: true,
            }).then((result) => {
              debugger
              return 1
            }).catch((err) => {
              debugger
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
    resetForm () {
      this.$refs["elForm"].resetFields();
    },
  },
};
</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}
</style>
