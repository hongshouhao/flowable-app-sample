<template>
  <div class="advice-style">
    <div class="query-section">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="任务内容">
          <el-input v-model="formInline.rwnr" placeholder="请输入任务内容"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList" plain>查询</el-button>
          <el-button type="success" @click="drawerVisible=true" plain>创建子任务</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="rwnr" label="任务内容" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-link type="primary" @click="rowClick(scope.row)">{{scope.row.rwnr}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="groupName" label="解决单位" width="120"></el-table-column>
      <el-table-column prop="ifHtn" label="是否合同内" width="90">
        <template slot-scope="scope">{{scope.row.ifHtn?"是":"否"}}</template>
      </el-table-column>
      <el-table-column prop="ifDsf" label="是否第三方" width="90">
        <template slot-scope="scope">{{scope.row.ifDsf?"是":"否"}}</template>
      </el-table-column>
      <el-table-column prop="jjcd" label="紧急程度" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
      <el-table-column prop="creator" label="创建人" width="120"></el-table-column>
      <el-table-column prop="createTime" label="更新日期" width="150">
        <template slot-scope="scope">{{scope.row.createTime.parseTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <el-drawer title="添加子任务" :visible.sync="drawerVisible" size="450px" :wrapperClosable="false">
      <add-advice v-if="drawerVisible" @on-success="getList()"></add-advice>
    </el-drawer>
  </div>
</template>

<script>
import { getTaskList } from "@/api/task";
import addAdvice from "./components/selfAdd";
export default {
  components: { addAdvice },
  data() {
    return {
      total: 0,
      formInline: {
        rwnr: "",
        status: "",
        page: 1,
        pagesize: 10,
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
      let response = await getTaskList(this.formInline);
      if (response.status === 1) {
        {
          let data = response.data;
          this.tableData = data.rows;
          this.total = data.total;
        }
      } else this.$message.error("查询失败，请检查网络！");
    },
    handleCurrentChange(page) {
      this.formInline.page = page;
      this.getList();
    },
    rowClick(row) {
      this.$router.push({
        path: "/task/detail",
        query: { id: row.id },
      });
    },
    exportExcel() {},
  },
};
</script>

<style>
</style>