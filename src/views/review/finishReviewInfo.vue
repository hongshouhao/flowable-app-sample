<template>
  <el-row>
    <el-col :span="6">审核人：{{data.creator}}</el-col>
    <el-col :span="6">
      审核结果：
      <el-tag :type="type">{{data.result?"通过":"不通过"}}</el-tag>
    </el-col>
    <el-col :span="6">审核日期：{{data.createTime.parseTime()}}</el-col>
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