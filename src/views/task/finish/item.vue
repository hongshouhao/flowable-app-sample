<template>
  <el-row>
    <el-col :span="24">附件：</el-col>
    <el-col :span="24">解决情况描述：{{data.jjqk}}</el-col>
    <el-col :span="6">提交人：{{data.creator}}</el-col>
    <el-col :span="6">提交日期：{{data.createTime.parseTime("yyyy-MM-dd")}}</el-col>
  </el-row>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
};
</script>

<style>
</style>