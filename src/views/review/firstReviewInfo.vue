<template>
  <el-row>
    <el-divider content-position="left">审核信息</el-divider>
    <el-col :span="6">审核人：{{data.reviewCreator}}</el-col>
    <el-col :span="6">
      审核结果：
      <el-tag :type="type">{{data.result?"同意":"待定"}}</el-tag>
    </el-col>
    <el-col :span="6">审核日期：{{data.reviewCreateTime.parseTime("yyyy-MM-dd")}}</el-col>
    <el-col :span="24">审核意见：{{data.opinion}}</el-col>
    <el-col :span="24">备注：{{data.bz}}</el-col>
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
    if (this.data.result) this.type = "success";
    else this.type = "danger";
  },
};
</script>

<style>
</style>