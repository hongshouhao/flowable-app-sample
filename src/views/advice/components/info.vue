<template>
  <div class="info-style">
    <el-row>
      <el-col :span="6">编号：{{adviceInfo.code}}</el-col>
      <el-col :span="6">提出单位:{{adviceInfo.tcdw}}</el-col>
      <el-col :span="6">联系人：{{adviceInfo.lxr}}</el-col>
      <el-col :span="6">联系方式：{{adviceInfo.lxfs}}</el-col>
      <el-col :span="6">来源：{{adviceInfo.ly}}</el-col>
      <el-col
        :span="6"
        v-if="adviceInfo.createTime"
      >提出时间：{{adviceInfo.createTime.parseTime("yyyy-MM-dd")}}</el-col>
      <el-col :span="24">描述：{{adviceInfo.ms}}</el-col>
      <el-col :span="24">备注：{{adviceInfo.bz}}</el-col>
      <el-col :span="24">
        附件：
        <upload-view folder="chubufenxi"></upload-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadView from "../../components/uploadView";
export default {
  props: ["adviceInfo"],
  components: { UploadView },
};
</script>

<style>
</style>