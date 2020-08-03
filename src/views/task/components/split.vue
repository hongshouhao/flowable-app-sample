<template>
  <div style="padding:10px">
    <el-button
      type="primary"
      icon="el-icon-plus"
      plain
      style="margin:0 10px 10px 10px"
      @click="taskVisible=true"
    >添加子任务</el-button>
    <el-popconfirm
      confirmButtonText="确定"
      cancelButtonText="取消"
      icon="el-icon-info"
      @onConfirm="splitComplete"
      iconColor="orange"
      title="完成拆分后将无法再添加子任务，是否确认完成？"
    >
      <el-button slot="reference" type="success" icon="el-icon-success" plain>完成拆分</el-button>
    </el-popconfirm>
    <el-card v-for="(item,index) in tasks" :key="index" style="margin-bottom:10px;">
      <task-item :data="item"></task-item>
    </el-card>
    <el-dialog
      title="添加子任务"
      :visible.sync="taskVisible"
      :modal="false"
      :close-on-click-modal="false"
    >
      <add-task @on-success="reload()"></add-task>
    </el-dialog>
  </div>
</template>

<script>
import { getTasksByAdvice } from "@/api/task";
import AddTask from "./add";
import TaskItem from "./item";
export default {
  components: { AddTask, TaskItem },
  data() {
    return {
      tasks: [],
      taskVisible: false,
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    async reload() {
      this.taskVisible = false;
      let response = null;
      let params = {
        adviceID: this.$route.query.adviceID,
      };
      response = await getTasksByAdvice(params);
      this.tasks = response.data;
    },
    splitComplete() {
      this.$emit("on-success");
    },
  },
};
</script>

<style>
</style>