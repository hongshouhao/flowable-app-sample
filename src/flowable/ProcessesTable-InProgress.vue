<template
  >
  <div>
    <slot name="processQuery"></slot>
    <el-button icon="el-icon-plus"
               type="primary"
               size="mini"
               :style="{ margin: '10px 5px' }"
               @click="showStartForm">新增</el-button>
    <el-table :data="listDisplaied">
      <el-table-column type="index"
                       width="80" />
      <el-table-column label="流程名称"
                       prop="processDefinitionName"
                       width="250"
                       align="center" />
      <el-table-column label="发起人"
                       prop="startUserId"
                       align="center" />
      <el-table-column label="开始时间"
                       prop="startTime"
                       width="180"
                       align="center" />
      <el-table-column label="状态"
                       prop="status"
                       width="180"
                       align="center"
                       :formatter="procStatusFormatter" />
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="scope">
          <!-- <el-button @click="formDetails(scope.row)" type="text" size="small"
              >详情</el-button
            > -->
          <el-button @click="showProcessDetails(scope.row)"
                     type="text"
                     size="small">审批进度</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   layout="total, prev, pager, next"
                   :page-size="pageSize"
                   :total="list.length"
                   :current-page.sync="currentPage"
                   @current-change="handleCurrentChange" />

    <el-dialog :visible.sync="startFormVisible"
               :title="startFormTitle"
               fullscreen>
      <task-start-form ref="taskStartForm"
                       v-if="startFormVisible"
                       :procDef="procDef"
                       @afterFormLoaded='startFormTitle = $event.name' />
    </el-dialog>
    <el-dialog :visible.sync="procDetailDialogVisible"
               :title="procDetailDialogTitle + ' - 流程信息'"
               width="80%">
      <processTransition :processInstanceId="processInstanceId" />
    </el-dialog>
  </div>
</template>

<script>
import taskStartForm from './TaskStartForm'
import processTransition from './ProcessTransition'

export default {
  name: 'processes-table-inprogress',
  data () {
    return {
      procDef: null,
      processInstanceId: null,
      list: [],
      listDisplaied: [],
      pageSize: 15,
      currentPage: 1,
      startFormTitle: '',
      startFormVisible: false,
      procDetailDialogVisible: false,
      procDetailDialogTitle: ''
    }
  },
  props: {
    procDefKey: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$flowableClient.processDefinitions
      .getProcessDefinitions({ key: this.procDefKey, latest: true })
      .then(result => {
        console.table(result.data.data)
        this.procDef = result.data.data[0]
      })

    this.listProcesses()
  },
  methods: {
    listProcesses () {
      this.$flowableClient.processInstances
        .getProcessInstances({
          processDefinitionKey: this.procDefKey
        })
        .then(result => {
          this.list = result.data.data
          this.currentPage = 1
          this.handleCurrentChange()
          console.table(this.list)
        })
    },
    showProcessDetails (row) {
      this.procDetailDialogTitle = row.processDefinitionName
      this.processInstanceId = row.id
      this.procDetailDialogVisible = true
    },
    handleCurrentChange () {
      var start = (this.currentPage - 1) * this.pageSize
      var end =
        this.currentPage * this.pageSize > this.list.length
          ? this.list.length
          : this.currentPage * this.pageSize

      this.listDisplaied = this.list.slice(start, end)
      console.table(this.listDisplaied)
    },
    showStartForm () {
      if (this.procDef.startFormDefined) {
        this.startFormVisible = true
      }
      else {
        this.$confirm('是否新建流程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$flowableClient.processInstances.startProcessInstance({
            processDefinitionId: this.procDef.id,
            variables: [],
            returnVariables: true
          }).then(() => {
            this.$message({
              type: 'success',
              message: '新建成功!'
            });
          })
        })
      }
    },
    procStatusFormatter (row) {
      if (row.suspended) {
        return '挂起'
      }
      else {
        return row.assignee + '处理中'
      }
    }
  },
  components: {
    taskStartForm,
    processTransition
  }
}
</script>
