<template>
  <div class="list">
    <div class="item">解决单位：{{data.jjdwName}}</div>
    <div class="item">
      是否合同内：
      <el-switch v-model="data.ifHtn" disabled active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      {{data.ifHtn?"是":"否"}}
    </div>
    <div class="item">
      紧急程度：
      <el-tag :type="type">{{data.jjcd}}</el-tag>
    </div>
    <div class="item" v-if="data.qwwcsj">期望完成时间：{{data.qwwcsj.parseTime("yyyy-MM-dd")}}</div>
    <div>任务内容：{{data.rwnr}}</div>
  </div>
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

<style lang="scss">
.list {
  width: 100%;
  font-size: 13px;
  .item {
    float: left;
    width: 25%;
    height: 25px;
    min-width: 390px;
    line-height: 25px;
  }
}
</style>