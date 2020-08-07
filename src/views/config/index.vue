<template>
  <div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="processName" label="流程名称"></el-table-column>
      <el-table-column prop="days" label="超时天数" width="180"></el-table-column>
      <el-table-column prop="createTime" label="更新日期" width="180">
        <template slot-scope="scope">{{scope.row.createTime.parseTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" @click="getList(scope.row)" plain>修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOvertimeSetting } from "@/api/overtime";
import { from } from "../../flowable/actFormDataConvert";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getConfigData();
  },
  methods: {
    async getConfigData() {
      let response = await getOvertimeSetting();
      if (response.status === 1) {
        this.tableData = response.data;
      } else {
        this.$message.error("数据获取失败，请检查网络");
      }
    },
    getList(data) {
      console.log(data);
    },
  },
};
</script>

<style>
</style>