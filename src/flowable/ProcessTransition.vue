<template>
  <div>
    <el-card v-if="showDiagram">
      <div slot="header">
        <span>流程图</span>
      </div>
      <div v-lazy-container="{ selector: 'img' }">
        <img :data-src="diagramSource" />
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <span>流程历史跟踪</span>
      </div>
      <el-table :data="tableData"
                style="margin: 0px auto;">
        <el-table-column prop="activityName"
                         label="名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="startTime"
                         label="开始时间"
                         width="180">
        </el-table-column>
        <el-table-column prop="endTime"
                         label="结束时间"
                         width="180">
        </el-table-column>
        <el-table-column prop="assignee"
                         label="处理人"
                         width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'process-transition',
  data () {
    return {
      diagramSource: '',
      tableData: []
    }
  },
  props: {
    processInstanceId: {
      type: String,
      default: ''
    },
    showDiagram: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.diagramSource = this.$flowableClient.processInstances.getDiagramUrl(
      this.processInstanceId
    )
    this.$flowableClient.histories
      .getActivityInstances({
        processInstanceId: this.processInstanceId,
        activityType: 'userTask'
      })
      .then(result => {
        this.tableData = result.data.data
      })
  }
}
</script>
