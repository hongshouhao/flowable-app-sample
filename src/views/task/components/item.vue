<template>
  <el-row>
    <el-divider content-position="left">任务信息</el-divider>
    <el-col :span="6">解决单位：{{data.jjdwName}}</el-col>
    <el-col :span="6">
      是否合同内：
      <el-switch v-model="data.ifHtn" disabled active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      {{data.ifHtn?"是":"否"}}
    </el-col>
    <el-col :span="6">
      紧急程度：
      <el-tag :type="type">{{data.jjcd}}</el-tag>
    </el-col>
    <el-col :span="6" v-if="data.qwwcsj">期望完成时间：{{data.qwwcsj.parseTime("yyyy-MM-dd")}}</el-col>
    <el-col :span="24">任务内容：{{data.rwnr}}</el-col>
  </el-row>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      type: "",
    };
  },
  mounted() {
    switch (this.data.jjcd) {
      case "一般":
        this.type = "";
        break;
      case "紧急":
        this.type = "warning";
        break;
      case "非常紧急":
        this.type = "danger";
        break;
    }
  },
};
</script>

<style>
</style>