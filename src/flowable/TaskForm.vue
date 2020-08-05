<template>
  <el-tabs tab-position="left">
    <el-tab-pane label="任务详情">
      <slot name="formDetails"></slot>
      <form-data-view ref="formDataView" />
    </el-tab-pane>

    <el-tab-pane label="任务处理">
      <taskFormTabComments :taskId="taskId" :processInstanceId="processInstanceId" />

      <el-card style="margin-top:10px">
        <div v-if="delegatePending === false">
          <el-row style="margin-bottom:10px">
            <el-radio v-model="selectedAction" label="complete">提交</el-radio>
            <el-radio v-model="selectedAction" label="reject">驳回</el-radio>
            <activity-select
              ref="activitySelect"
              :taskId="taskId"
              :processInstanceId="processInstanceId"
              v-if="isRejectAction"
            />
          </el-row>

          <el-row>
            <el-checkbox v-if="isCompleteAction" v-model="selectUserForCompleteAction">指定处理人</el-checkbox>

            <user-select ref="userSelect" v-if="isCompleteAction && selectUserForCompleteAction" />
          </el-row>
        </div>

        <el-button
          type="primary"
          size="small"
          style="margin:10px auto;"
          @click="executeAction()"
        >确认提交</el-button>
      </el-card>
    </el-tab-pane>

    <el-tab-pane label="流程图">
      <processTransition v-if="processInstanceId" :processInstanceId="processInstanceId" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import formDataView from "./FormDataView";
import taskFormTabComments from "./TaskFormTab-Comments";
import processTransition from "./ProcessTransition";
import userSelect from "./UserSelect";
import activitySelect from "./ActivitySelect";

export default {
  data() {
    return {
      metadata: { config: { size: "0" }, list: [] },
      delegatePending: false,
      selectedAction: "complete",
      selectUserForCompleteAction: false,
      sendBackTo: {},
      processInstanceId: "",
    };
  },
  props: {
    procDef: {
      type: Object,
      default() {
        return {};
      },
    },
    task: {
      type: Object,
      default() {
        return {};
      },
    },
    taskId: {
      type: String,
      default: "",
    },
    hideForm: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.refreshView();
  },
  computed: {
    isCompleteAction() {
      return this.selectedAction === "complete";
    },
    isRejectAction() {
      return this.selectedAction === "reject";
    },
  },
  methods: {
    refreshView() {
      let _this = this;
      if (!_this.task.id) {
        _this.$flowableClient.tasks.getTask(_this.taskId).then((response) => {
          let task = response.data;
          _this.processInstanceId = task.processInstanceId;
          _this.delegatePending = task.delegationState === "pending";
        });
      } else {
        _this.processInstanceId = _this.task.processInstanceId;
        _this.delegatePending = _this.task.delegationState === "pending";
      }

      _this.$flowableClient.tasks.getTaskForm(_this.taskId).then((response) => {
        _this.metadata = response.data;
        _this.$refs.formDataView.setValues(_this.procDef.key, _this.metadata);
      });
    },
    executeAction() {
      if (this.isRejectAction === true) {
        this.$flowableClient.processInstances.changeState(
          this.processInstanceId,
          {
            startActivityIds: this.$refs.activitySelect.startActivityIds,
            cancelActivityIds: this.$refs.activitySelect.cancelActivityIds,
          }
        );
      } else {
        let targUser = null;

        if (
          this.isCompleteAction === true &&
          this.selectUserForCompleteAction === true
        ) {
          targUser = this.$refs.userSelect.selected;
        }

        let targAction = this.selectedAction;
        if (this.delegatePending === true) {
          targAction = "resolve";
        }

        this.$refs.formDataView
          .getValues()
          .then((data) => {
            let taskActionRequest = {
              action: targAction,
              assignee: targUser,
              variables: data.variables,
              localScope: data.localScope,
            };

            this.$flowableClient.tasks
              .executeAction(this.taskId, taskActionRequest)
              .then((response) => {
                console.debug(response);
              });
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },
  },
  components: {
    formDataView,
    taskFormTabComments,
    processTransition,
    userSelect,
    activitySelect,
  },
};
</script>
