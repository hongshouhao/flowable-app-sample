<template>
  <div class="advice_detail">
    <el-collapse :value="openNames">
      <el-collapse-item name="1">
        <template slot="title">
          <i class="header-icon el-icon-notebook-1"></i>初步要求内容
        </template>
        <info-view :adviceInfo="adviceInfo"></info-view>
      </el-collapse-item>
      <el-collapse-item name="2" v-if="Object.keys(analysisInfo).length>0">
        <template slot="title">
          <i class="header-icon el-icon-data-analysis"></i>初步分析
        </template>
        <analysis-info :analysis="analysisInfo"></analysis-info>
      </el-collapse-item>
      <el-collapse-item name="3" v-if="tasks.length>0">
        <template slot="title">
          <i class="header-icon el-icon-collection"></i>任务拆分情况
        </template>
        <el-card v-for="(item,index) in tasks" :key="index" style="margin-bottom:10px;">
          <task-item :data="item"></task-item>
          <first-info :data="item" v-if="item.opinion"></first-info>
          <el-button
            type="primary"
            v-if="(!item.opinion)&&(!item.ifHtn)"
            plain
            @click="submitSubtask(item)"
          >审核</el-button>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="审核信息" name="4" v-if="Object.keys(reviewInfo).length>0">
        <template slot="title">
          <i class="header-icon el-icon-user-solid"></i>审核信息
        </template>
        <second-info :data="reviewInfo"></second-info>
      </el-collapse-item>
    </el-collapse>
    <div class="btn-group" v-show="stage>0">
      <el-button type="primary" v-show="stage==1" plain @click="cbfxVisible=true">提交初步分析</el-button>
      <el-button type="primary" v-show="stage==2" plain @click="rwcfVisible=true">任务拆分</el-button>
      <el-button type="primary" v-show="stage==3" plain @click="submitSecondReview">提交复核</el-button>
      <el-button type="primary" v-show="stage==4" plain @click="submitMainTask()">核定</el-button>
      <el-button type="primary" v-show="stage==5" plain @click="submitSecondReview">提交指派</el-button>

      <el-button type="primary" plain @click="diagramVisible=true">流程圖</el-button>
    </div>
    <el-drawer title="初步分析" :visible.sync="cbfxVisible" size="450px" :wrapperClosable="false">
      <add-analysis v-if="cbfxVisible" :flowableTaskId="flowableTaskId" @on-success="init()"></add-analysis>
    </el-drawer>
    <el-drawer
      title="任务拆分"
      :visible.sync="rwcfVisible"
      size="450px"
      :wrapperClosable="false"
      :before-close="handleClose"
    >
      <split-task v-if="rwcfVisible" :flowableTaskId="flowableTaskId" @on-success="init()"></split-task>
    </el-drawer>
    <el-dialog title="审核意见" :visible.sync="reviewVisible">
      <first-review v-if="first" @on-success="init()" :data="submitReviewData"></first-review>
      <second-review v-if="!first" :flowableTaskId="flowableTaskId" @on-success="init()"></second-review>
    </el-dialog>

    <el-dialog title="流程图" :visible.sync="diagramVisible">
      <process-transition :processInstanceId="flowableProcessId" />
    </el-dialog>
  </div>
</template>

<script>
import { validate } from "@/core/mixins/";
import { getTasksByAdvice } from "@/api/task";
import { getAdviceById, getAnalysisByAdvice } from "@/api/advice";
import { getReview } from "@/api/review";
import InfoView from "./components/info";
import AddAnalysis from "./analysis/add";
import AnalysisInfo from "./analysis/info";
import SplitTask from "../task/components/split";
import TaskItem from "../task/components/item";
import FirstReview from "../review/firstReview";
import FirstInfo from "../review/firstReviewInfo";
import SecondReview from "../review/secondReview";
import SecondInfo from "../review/secondReivewInfo";
import ProcessTransition from "../../flowable/ProcessTransition";

export default {
  mixins: [validate],
  components: {
    InfoView,
    AddAnalysis,
    AnalysisInfo,
    SplitTask,
    TaskItem,
    FirstReview,
    FirstInfo,
    SecondReview,
    SecondInfo,
    ProcessTransition,
  },
  data() {
    return {
      validate: false,
      stage: 0,
      openNames: ["1", "2", "3", "4"],
      cbfxVisible: false,
      rwcfVisible: false,
      reviewVisible: false,
      diagramVisible: false,
      first: false,
      second: false,
      tasks: [],
      submitReviewData: {},
      adviceInfo: {},
      analysisInfo: {},
      reviewInfo: {},
      btnGrpVisible: false,
      btnCbfxVisible: false,
      btnRwcfVisible: false,
      btnReviewVisible: false,
      btnHedingVisible: false,
      flowableMainTask: {},
      flowableTasks: [],
    };
  },
  computed: {
    flowableTaskId() {
      if (this.flowableMainTask) return this.flowableMainTask.id;
      else return "";
    },
    flowableProcessId() {
      if (this.flowableMainTask) return this.flowableMainTask.processInstanceId;
      else return "";
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.cbfxVisible = false;
      this.reviewVisible = false;
      this.rwcfVisible = false;
      this.getTasksByAdvice();
      this.getAdviceById();
      this.getAnalysisByAdvice();
      this.getReview();
      this.getMyTask();
    },

    //获取建议中的所有任务
    async getTasksByAdvice() {
      let response = null;
      let params = {
        adviceID: this.$route.query.adviceID,
      };
      response = await getTasksByAdvice(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.tasks = response.data;
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取建议信息
    async getAdviceById() {
      let response = await getAdviceById({ id: this.$route.query.adviceID });
      if (response.status === 1) {
        if (response.data.length > 0) this.adviceInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取初步分析
    async getAnalysisByAdvice() {
      let params = {
        adviceid: this.$route.query.adviceID,
      };
      let response = await getAnalysisByAdvice(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.analysisInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取复审信息
    async getReview() {
      let params = {
        adviceid: this.$route.query.adviceID,
        type: "领导复审",
      };
      let response = await getReview(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.reviewInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取建议中的所有任务
    async getTasks() {
      let response = null;
      let params = {
        adviceid: this.$route.query.adviceID,
      };
      response = await getTasksByAdvice(params);

      if (response.status === 1) {
        if (response.data.length > 0) this.analysisInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //弹出审核对话框
    async submitSubtask(data) {
      this.submitReviewData.data = data;
      for (let i = 0; i < this.flowableTasks.length; i++) {
        const bizTaskId = await this.$flowableClient.taskVariables.getVariable(
          this.flowableTasks[i].id,
          "taskId"
        );
        if (bizTaskId.data.value === data.taskID) {
          this.submitReviewData.flowableTaskId = this.flowableTasks[i].id;
          break;
        }
      }
      if (this.submitReviewData.flowableTaskId === undefined) {
        throw "沒有找到對應的流程";
      }

      this.reviewVisible = true;
      this.first = true;
    },

    async submitMainTask() {
      this.submitReviewData.flowableTaskId = this.flowableMainTask.id;
      this.reviewVisible = true;
      this.first = false;
    },

    //提交复审操作 --未写
    async submitSecondReview() {
      this.$message.success("已提交复审！");
      let response = await this.excuFlowableTask();
      if (response === 1) {
        this.$message.success("已提交复审！");
      } else {
        this.$message.error("提交复审失败");
      }
    },

    async excuFlowableTask() {
      let taskActionRequest = {
        action: "complete",
        variables: [],
        localScope: false,
      };
      return await this.$flowableClient.tasks
        .executeAction(this.flowableTaskId, taskActionRequest)
        .then((resp) => {
          return 1;
        })
        .catch((err) => {
          console.error(err);
          return 0;
        });
    },

    //完成拆分任务 --未写
    finishSplit() {
      this.$message.success("拆分完成");
    },

    //任务拆分关闭后刷新数据
    handleClose(done) {
      this.init();
      done();
    },

    //获取流程
    async getMyTask() {
      let username = this.$flowableClient.options.auth.username;
      let response = await this.$flowableClient.tasks.queryTasks({
        candidateGroups: this._role,
        candidateOrAssigned: username,
        processInstanceBusinessKey: this.$route.query.adviceID,
        includeTaskLocalVariables: true,
        includeProcessVariables: true,
      });
      if (response.status === 200) {
        let myTasks = response.data.data;
        console.log(myTasks);
        if (myTasks.length > 0) {
          this.flowableMainTask = myTasks.filter(
            (x) =>
              x.name === "提交需求及效益分析" ||
              x.name === "任务拆分" ||
              x.name === "项目审核"
          )[0];
          this.flowableTasks = myTasks.filter(
            (x) => /*x.name === "填写进度" ||*/ x.name === "任务审核"
          );
          if (this.flowableMainTask) {
            this.$store.state.currentProcessInstanceId = this.flowableMainTask.processInstanceId;
            //根据节点设置按钮
            if (this.flowableMainTask.name === "提交需求及效益分析") {
              this.stage = "1";
            } else if (this.flowableMainTask.name === "任务拆分") {
              this.stage = "2";
            } else if (this.flowableMainTask.name === "项目审核") {
              this.stage = "4";
            }
          }
        }
      } else {
        this.$message.error("流程获取失败，请联系管理员！");
      }
      // if (tasks) {
      //   let myTasks = tasks.data.data;
      //   if (myTasks.length === 0) {
      //     _this.btnGrpVisible = false;
      //   } else {
      //     _this.btnGrpVisible = true;
      //     _this.flowableMainTask = myTasks.filter(
      //       (x) =>
      //         x.name === "提交需求及效益分析" ||
      //         x.name === "任务拆分" ||
      //         x.name === "项目审核"
      //     )[0];
      //     _this.flowableTasks = myTasks.filter(
      //       (x) => /*x.name === "填写进度" ||*/ x.name === "任务审核"
      //     );
      //     console.log(_this.flowableMainTask.name);
      //     if (_this.flowableMainTask) {
      //       _this.$store.state.currentProcessInstanceId = this.flowableMainTask.processInstanceId;
      //       //根据节点设置按钮
      //       if (_this.flowableMainTask.name === "提交需求及效益分析") {
      //         _this.stage = "1";
      //       } else if (_this.flowableMainTask.name === "任务拆分") {
      //         _this.stage = "2";
      //       } else if (_this.flowableMainTask.name === "项目审核") {
      //         _this.stage = "4";
      //       }
      //     } else {
      //       _this.btnGrpVisible = false;
      //     }
      //   }
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.advice_detail {
  .header-icon {
    margin: 0 10px;
    font-size: 17px;
  }
}
</style>