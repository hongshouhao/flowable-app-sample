<template>
  <div class="advice-style">
    <div class="query-section">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="项目组名称">
          <el-input v-model="formInline.groupname" placeholder="请输入项目组名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList" plain>查询</el-button>
          <el-button type="success" @click="drawerVisible=true" plain>添加项目组</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="groupName" label="项目组名称" width="120"></el-table-column>
      <el-table-column prop="descrpition" label="项目简述"></el-table-column>
      <el-table-column prop="leaderID" label="责任领导" width="180"></el-table-column>
    </el-table>

    <el-drawer title="添加项目组" :visible.sync="drawerVisible" size="450px" :wrapperClosable="false">
      <add-progroup v-if="drawerVisible" @on-success="getList()"></add-progroup>
    </el-drawer>
  </div>
</template>

<script>
import { getProGroupList } from "@/api/projectGroup";
import addProgroup from "./components/add";
export default {
  components: { addProgroup },
  data() {
    return {
      total: 0,
      formInline: {
        groupname: "",
      },
      tableData: [],
      drawerVisible: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.drawerVisible = false;
      let response = await getProGroupList(this.formInline);
      if (response.status === 1) {
        this.tableData = response.data;
      } else this.$message.error("查询失败，请检查网络！");
    },
  },
};
</script>

<style>
</style>