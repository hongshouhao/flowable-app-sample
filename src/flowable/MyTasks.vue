<template>
  <div>
    <el-tabs tab-position="left">
      <el-tab-pane label="我的任务">
        <div>
          <div>
            流程编号
            <el-input placeholder="Enter something..." style="width: 300px" />
          </div>

          <el-table :data="pagedTasks">
            <el-table-column type="index" width="50" />
            <el-table-column
              label="当前节点"
              prop="name"
              width="250"
              align="center"
            />
            <el-table-column
              label="流程"
              prop="bizName"
              width="250"
              align="center"
              :formatter="getTaskVariable"
            />
            <el-table-column
              label="发起人"
              prop="initiator"
              width="250"
              align="center"
              :formatter="getTaskVariable"
            />
            <el-table-column
              label="创建时间"
              prop="createTime"
              width="180"
              align="center"
              :formatter="formatTime"
            />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleTask(scope.row)"
                  >办理</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="delegateTask(scope.row)"
                  >委托</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="可认领的任务">
        <div>
          <div>
            流程编号
            <el-input placeholder="Enter something..." style="width: 300px" />
          </div>

          <el-table :data="groupTasks">
            <el-table-column type="index" width="50" />
            <el-table-column
              label="当前节点"
              prop="name"
              width="250"
              align="center"
            />
            <el-table-column
              label="流程"
              prop="name"
              width="250"
              align="center"
              :formatter="getTaskVariable"
            />
            <el-table-column
              label="发起人"
              prop="initiator"
              width="250"
              align="center"
              :formatter="getTaskVariable"
            />
            <el-table-column
              label="创建时间"
              prop="createTime"
              width="180"
              align="center"
              :formatter="formatTime"
            />
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-popconfirm
                  title="确定将此任务列入我的任务列表吗?"
                  @onConfirm="claimTask(scope.row)"
                >
                  <el-button type="text" size="small" slot="reference"
                    >认领</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="myTasks.length"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    />
    <el-dialog :visible.sync="formVisible" title="流程办理" fullscreen>
      <component
        v-if="formVisible"
        v-bind:is="finalTaskForm"
        :taskId="taskId"
        :task="currentTask"
        :procDef="procDef"
      ></component>

      <!-- <task-form ref="taskForm"
                 v-if="formVisible"
                 :taskId="taskId"
                 :procDef="procDef" /> -->
    </el-dialog>

    <el-dialog
      :visible.sync="userSelectFormVisible"
      width="30%"
      title="选择委托人"
    >
      <user-select ref="userSelect" v-if="userSelectFormVisible" />
      <span slot="footer">
        <el-button @click="userSelectFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="executeDelegateAction()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userSelect from './UserSelect'

export default {
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      myTasks: [],
      pagedTasks: [],
      groupTasks: [],
      procDefId: null,
      taskId: null,
      currentTask: {},
      formVisible: false,
      userSelectFormVisible: false,
    }
  },
  computed: {
    procDef() {
      if (this.procDefId) {
        const array = this.procDefId.split(':')
        return {
          id: this.procDefId,
          key: array[0],
          version: [1],
          guid: array[2],
        }
      } else {
        return {}
      }
    },
    finalTaskForm() {
      const _this = this
      if (_this.procDefId) {
        if (_this.$taskHandler) {
          return _this.$taskHandler.getView(_this.taskId, _this.procDef)
        } else {
          return () => import('./TaskForm')
        }
      } else {
        return () => import('./Empty')
      }
    },
  },
  asyncComputed: {},
  mounted() {
    let username = this.$flowableClient.options.auth.username
    //个人任务
    this.$flowableClient.tasks
      .queryTasks({
        assignee: username,
        includeTaskLocalVariables: true,
        includeProcessVariables: true,
        start: 0,
        size: 1000,
        sort: 'createTime',
        order: 'desc',
      })
      .then((tasks) => {
        this.myTasks = tasks.data.data
        this.handleCurrentChange()
        console.table(this.myTasks)
      })

    //组任务
    this.$flowableClient.tasks
      .queryTasks({
        candidateUser: username,
        includeTaskLocalVariables: true,
        includeProcessVariables: true,
        start: 0,
        size: 1000,
        sort: 'createTime',
        order: 'desc',
      })
      .then((tasks) => {
        this.groupTasks = tasks.data.data
        console.table(this.groupTasks)
      })
  },
  components: {
    userSelect,
  },
  methods: {
    handleTask(row) {
      this.currentTask = row
      this.taskId = row.id
      this.procDefId = row.processDefinitionId
      this.formVisible = true
    },
    delegateTask(row) {
      this.taskId = row.id
      this.userSelectFormVisible = true
    },
    executeDelegateAction() {
      const assigneeTo = this.$refs.userSelect.selected
      if (!assigneeTo) {
        this.$notify.error({
          title: '错误',
          message: '请选择一个用户',
        })
        return
      }

      this.$flowableClient.tasks
        .executeAction(this.taskId, {
          action: 'delegate',
          assignee: assigneeTo,
        })
        .then((response) => {
          this.userSelectFormVisible = false
          console.debug(response)
        })
    },
    claimTask(row) {
      this.taskId = row.id
      this.$flowableClient.tasks
        .executeAction(this.taskId, {
          action: 'claim',
          assignee: this.$flowableClient.options.auth.username,
        })
        .then((response) => {
          console.debug(response)
        })
    },
    getTaskVariable(row, column) {
      let varItem = this.$linq
        .from(row.variables)
        .firstOrDefault((v) => v.name === column.property)
      if (varItem) {
        return varItem.value
      } else {
        return ''
      }
    },
    getTaskExInfos(tasks, tasksToDisplay) {
      tasksToDisplay.length = 0
      let _this = this
      this.$linq
        .from(tasks)
        .partitionBy((t) => t.processInstanceId)
        .forEach(function(grp) {
          _this.$flowableClient.processInstances
            .getProcessInstance(grp.key())
            .then((result) => {
              let proc = result.data
              if (proc) {
                _this.$linq.from(grp.getSource()).forEach(function(task) {
                  task.processDefinitionName = proc.processDefinitionName
                  task.startUserId = proc.startUserId

                  tasksToDisplay.push(task)
                })
              }
            })
        })
    },
    handleCurrentChange() {
      var start = (this.currentPage - 1) * this.pageSize
      var end =
        this.currentPage * this.pageSize > this.myTasks.length
          ? this.myTasks.length
          : this.currentPage * this.pageSize

      this.pagedTasks = this.myTasks.slice(start, end)
      console.table(this.pagedTasks)
    },
    formatTime(row, column) {
      return new Date(row.createTime).toDateString()
    },
  },
}
</script>
