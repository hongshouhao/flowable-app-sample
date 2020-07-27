<template>
  <div>
    <div>taskId: {{ taskId }}</div>
    <div>processDefId: {{ procDef.id }}</div>
    <div>processInstanceId: {{ task.processInstanceId }}</div>

    <taskInfo v-for="(item, i) in tasks" :key="i" :task="item"> </taskInfo>

    <el-button @click="visible = true">添加任务</el-button>
    <el-button @click="completeAdding">提交</el-button>
    <el-dialog
      title="任务信息"
      :visible.sync="visible"
      append-to-body
      :close-on-click-modal="false"
      @opened="editTask"
    >
      <form-data-view ref="formDataView" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commitTask">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import formDataView from '../../flowable/FormDataView'
import taskInfo from './TaskInfo'
export default {
  data() {
    return {
      visible: false,
      tasks: [],
      allTasks: [],
      taskFilter: null,
    }
  },
  props: {
    procDef: {
      type: Object,
      default() {
        return {}
      },
    },
    taskId: {
      type: String,
      default: '',
    },
    task: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  mounted() {
    this.taskFilter = (taskItem) => {
      let taskVar = taskItem.variables.find(
        (vitem) => vitem.name === 'renwuneirong'
      )
      return taskVar !== undefined
    }

    this.listTasks()
  },
  methods: {
    editTask() {
      this.$flowableClient.tasks.getTaskForm(this.taskId).then((response) => {
        this.$refs.formDataView.setValues(this.procDef.key, response.data)
      })
    },
    commitTask() {
      debugger
      let _this = this

      _this.$refs.formDataView
        .getValues()
        .then((data) => {
          let emptyTask = _this.allTasks.find(
            (item) => _this.taskFilter(item) === false
          )
          debugger
          if (emptyTask) {
            _this.$flowableClient.taskVariables
              .createVariables(emptyTask.id, data.variables)
              .then((res) => {
                _this.listTasks()
                _this.visible = false
              })
          } else {
            let addMultiInstanceExecutionRequest = {
              activityId: 'sid-937AC944-600C-4ACB-BEB1-3D0470A89DD0',
              variables: data.variables,
            }
            _this.$flowableClient.processInstances
              .addMultiInstanceExecution(
                _this.task.processInstanceId,
                addMultiInstanceExecutionRequest
              )
              .then((response) => {
                debugger
                _this.queryTask().then((resp) => {
                  let emptyTask2 = resp.data.data.find(
                    (item) => _this.taskFilter(item) === false
                  )
                  debugger
                  if (emptyTask2) {
                    _this.$flowableClient.taskVariables
                      .createVariables(emptyTask2.id, data.variables)
                      .then((res) => {
                        _this.listTasks()
                        _this.visible = false
                      })
                  } else {
                    throw '创建任务失败'
                  }
                })
              })
              .catch((e) => {
                console.error(e)
              })
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    completeAdding() {
      debugger
      this.$flowableClient.processInstanceVariables
        .createVariables(this.task.processInstanceId, [
          {
            name: 'completeAdding',
            type: 'string',
            value: 'true',
            scope: 'local',
          },
        ])
        .then((resp) => {
          let taskActionRequest = {
            action: 'complete',
          }
          // this.queryTask().then((resp) => {
          //   let promises = resp.data.data.map((item) => {
          //     debugger
          //     return this.$flowableClient.tasks.executeAction(
          //       item.id,
          //       taskActionRequest
          //     )
          //   })

          //   debugger
          //   Promise.allSettled(promises).then((resp) => {
          //     this.visible = false
          //   })
          // })
        })
    },
    queryTask() {
      return this.$flowableClient.tasks.queryTasks({
        processInstanceId: this.task.processInstanceId,
        includeTaskLocalVariables: true,
        includeProcessVariables: false,
      })
    },
    listTasks() {
      this.queryTask().then((resp) => {
        debugger
        this.allTasks = resp.data.data
        this.tasks = resp.data.data.filter(
          (item) => this.taskFilter(item) === true
        )
        console.table(this.tasks)
      })
    },
  },
  components: {
    formDataView,
    taskInfo,
  },
}
</script>
