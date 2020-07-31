<template>
  <el-row>
    <el-col :span="24">需求架构：{{analysis.xqjg}}</el-col>
    <el-col :span="24">
      效益评分：
      <el-rate v-model="analysis.xypf" show-score disabled text-color="#ff9900"></el-rate>
    </el-col>
    <el-col :span="24">效益分析：{{analysis.xyfx}}</el-col>
  </el-row>
</template>

<script>
export default {
  props: ["analysis"],
  mounted() {},
};
</script>

<style>
</style>