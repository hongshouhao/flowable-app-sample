<template>
  <el-card>
    <el-row>
      <el-col :span="24">工作进度：<el-tag type="success">{{data.gzjd}}%</el-tag></el-col>
      <el-col :span="24">工作内容：{{data.gznr}}</el-col>
    </el-row>
  </el-card>
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