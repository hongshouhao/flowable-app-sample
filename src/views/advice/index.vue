<template>
  <div class="advice-style">
    <div class="query-section">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="建议编号">
          <el-input v-model="formInline.code" placeholder="请输入建议编号"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formInline.ms" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="提出单位">
          <el-input v-model="formInline.tcdw" placeholder="请输入提出单位"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAdviceStatus" plain>查询</el-button>
          <el-button type="success" @click="drawerVisible=true" plain>创建要求</el-button>
          <el-button type="warning" @click="exportExcel" plain>导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="code" label="编号" width="130">
        <template slot-scope="scope">
          <el-link type="primary" @click="rowClick(scope.row)">{{scope.row.code}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="tcdw" label="提出单位" width="180"></el-table-column>
      <el-table-column prop="ms" label="描述"></el-table-column>
      <el-table-column prop="jjcd" label="紧急程度" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="180"></el-table-column>
      <el-table-column prop="creator" label="创建人" width="120"></el-table-column>
      <el-table-column prop="createTime" label="更新日期" width="150">
        <template slot-scope="scope">{{scope.row.createTime.parseTime('yyyy-MM-dd hh:mm:ss')}}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev, pager, next"
      :total="total"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <el-drawer title="创建初步要求" :visible.sync="drawerVisible" size="450px" :wrapperClosable="false">
      <add-advice v-if="drawerVisible" @on-success="getAdviceStatus()"></add-advice>
    </el-drawer>
  </div>
</template>

<script>
import { getAdviceList } from "@/api/advice";
import addAdvice from "./components/add";
export default {
  components: { addAdvice },
  data() {
    return {
      total: 0,
      formInline: {
        code: "",
        ms: "",
        tcdw: "",
        status: "",
        page: 1,
        pagesize: 10,
      },
      statusList: [],
      tableData: [],
      drawerVisible: false,
    };
  },
  mounted() {
    this.getAdviceStatus();
  },
  methods: {
    //刷新表格数据
    async getList() {
      this.drawerVisible = false;
      let response = await getAdviceList(this.formInline);
      if (response.status === 1) {
        {
          this.total = response.data.total;
          this.tableData = response.data.rows;

          for (var i = 0; i < response.data.rows.length; i++) {
            this.tableData[i].status = this.statusList.find(
              (obj) => obj.id === response.data.rows[i].adviceID
            )
              ? this.statusList.find(
                  (obj) => obj.id === response.data.rows[i].adviceID
                ).status
              : "";
          }
        }
      } else this.$message.error("查询失败，请检查网络！");
    },

    //翻页
    handleCurrentChange(page) {
      this.formInline.page = page;
      this.getAdviceStatus();
    },

    //跳转至详情页面
    rowClick(row) {
      this.$router.push({
        path: "/advice/detail",
        query: { adviceID: row.adviceID },
      });
    },

    //获取所有数据的流程
    async getAdviceStatus() {
      let rsp = await this.$flowableClient.tasks.queryTasks({
        processDefinitionKey: "szsp-service-improve2",
        includeTaskLocalVariables: true,
        includeProcessVariables: true,
        size: 9999,
      });

      let data = rsp.data.data;
      let arr = [];
      data.forEach((item) => {
        let variable = item.variables.filter(function (val) {
          return val.name == "businessKey";
        });
        if (variable.length > 0)
          this.statusList.push({
            status: item.name,
            id: variable[0].value,
          });
      });
      console.log(this.statusList);
      this.statusList.forEach((item) => {
        if (item.id == "75509a10-45c1-4edf-8d49-a885933e1f1b") {
          console.log(item);
        }
      });

      this.getList();
    },
    exportExcel() {},
  },
};
</script>

<style>
</style>