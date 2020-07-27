<template>
  <div>
    <slot name="processQuery"></slot>
    <el-table :data="listDisplaied">
      <el-table-column type="index" width="80" />
      <el-table-column
        label="流程名称"
        prop="processDefinitionName"
        width="250"
        align="center"
      />
      <el-table-column label="发起人" prop="startUserId" align="center" />
      <el-table-column
        label="开始时间"
        prop="startTime"
        width="180"
        align="center"
        :formatter="formatTime"
      />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="showProcessDetails(scope.row)"
            type="text"
            size="small"
            >历史</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="list.length"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      :visible.sync="procDetailDialogVisible"
      :title="procDetailDialogTitle + ' - 流程信息'"
      fullscreen
    >
      <processTransition
        :processInstanceId="processInstanceId"
        :showDiagram="false"
      />
    </el-dialog>
  </div>
</template>

<script>
import processTransition from './ProcessTransition'

export default {
  name: 'processes-table-archived',
  data() {
    return {
      processInstanceId: null,
      list: [],
      listDisplaied: [],
      pageSize: 15,
      currentPage: 1,
      procDetailDialogVisible: false,
      procDetailDialogTitle: '',
    }
  },
  props: {
    procDefKey: {
      type: String,
      default: '',
    },
  },
  computed: {},
  mounted() {
    this.listProcesses()
  },
  methods: {
    listProcesses() {
      this.$flowableClient.historicprocessInstances
        .getProcessInstances({
          processDefinitionKey: this.procDefKey,
          sort: 'startTime',
          order: 'desc',
        })
        .then((result) => {
          this.list = result.data.data
          this.currentPage = 1
          this.handleCurrentChange()

          console.table(this.list)
        })
    },
    showProcessDetails(row) {
      this.procDetailDialogTitle = row.processDefinitionName
      this.processInstanceId = row.id
      this.procDetailDialogVisible = true
    },
    handleCurrentChange() {
      var start = (this.currentPage - 1) * this.pageSize
      var end =
        this.currentPage * this.pageSize > this.list.length
          ? this.list.length
          : this.currentPage * this.pageSize

      this.listDisplaied = this.list.slice(start, end)
      console.table(this.listDisplaied)
    },
    formatTime(row, column) {
      return new Date(row.startTime).toDateString()
    },
  },
  components: { processTransition },
}
</script>
