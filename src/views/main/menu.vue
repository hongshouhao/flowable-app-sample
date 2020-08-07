<template>
  <div class="menu-view">
    <el-menu :default-active="activeName" @select="changeMenu">
      <el-menu-item index="index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="advice">
        <i class="el-icon-document"></i>
        <span slot="title">建议列表</span>
      </el-menu-item>
      <el-menu-item index="task">
        <i class="el-icon-c-scale-to-original"></i>
        <span slot="title">任务列表</span>
      </el-menu-item>
      <el-menu-item index="project">
        <i class="el-icon-finished"></i>
        <span slot="title">项目组预设</span>
      </el-menu-item>
      <el-menu-item index="config">
        <i class="el-icon-setting"></i>
        <span slot="title">超时配置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "home",
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.activeName = this.$route.name;
  },
  methods: {
    changeMenu(name) {
      this.$router.push({ path: "/" + name });
    },
  },
};
</script>
