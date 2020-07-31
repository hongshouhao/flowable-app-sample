<template>
  <div class="info-style">
    <el-row>
      <el-col :span="12">需求分析：</el-col>
      <el-col :span="12">需求确认单：</el-col>
      <el-col :span="12">开始时间：{{data.kssj.parseTime("yyyy-MM-dd")}}</el-col>
      <el-col :span="12">结束时间：{{data.jssj.parseTime("yyyy-MM-dd")}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style>
</style>