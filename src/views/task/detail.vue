<template>
  <div>
    <el-collapse :value="openNames">
      <el-collapse-item title="初步要求内容" name="1">
        <advice-info :adviceInfo="adviceInfo"></advice-info>
      </el-collapse-item>

      <el-collapse-item title="初步分析" name="2" v-if="Object.keys(analysisInfo).length>0">
        <analysis-info :analysis="analysisInfo"></analysis-info>
      </el-collapse-item>

      <el-collapse-item title="任务内容" name="3">
        <task-item :data="task"></task-item>
      </el-collapse-item>

      <el-collapse-item title="需求分析和需求确认单" name="4" v-if="Object.keys(requestInfo).length>0">
        <request-info :data="requestInfo"></request-info>
      </el-collapse-item>

      <el-collapse-item title="进度列表" name="5" v-if="processList.length>0">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in processList"
            :key="index"
            :timestamp="activity.createTime.parseTime('yyyy-MM-dd')"
            placement="top"
            color="#0bbd87"
          >
            <process-item :data="activity"></process-item>
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>

      <el-collapse-item title="成果情况" name="5" v-if="Object.keys(finishInfo).length>0">
        <finish-item :data="finishInfo"></finish-item>
      </el-collapse-item>

      <el-collapse-item title="任务审核情况" name="6" v-if="Object.keys(reviewInfo).length>0">
        <review-info :data="reviewInfo"></review-info>
      </el-collapse-item>
    </el-collapse>

    <div class="btn-group">
      <el-button type="primary" plain @click="xqfxVisible=true">提交需求分析和需求确认单</el-button>
      <el-button type="primary" plain @click="processVisible=true">提交进度</el-button>
      <el-button type="warning" plain @click="finishVisible=true">提交审核</el-button>
      <el-button type="primary" plain @click="reviewVisible=true">审核</el-button>
    </div>

    <el-drawer
      title="提交需求分析和需求确认单"
      :visible.sync="xqfxVisible"
      size="450px"
      :wrapperClosable="false"
    >
      <request-add v-if="xqfxVisible" @on-success="init()"></request-add>
    </el-drawer>

    <el-dialog
      title="提交进度"
      :visible.sync="processVisible"
      width="550px"
      :close-on-click-modal="false"
    >
      <process-add v-if="processVisible" @on-success="init()"></process-add>
    </el-dialog>

    <el-dialog
      title="提交审核"
      :visible.sync="finishVisible"
      width="550px"
      :close-on-click-modal="false"
    >
      <finish-add v-if="finishVisible" @on-success="init()"></finish-add>
    </el-dialog>

    <el-dialog title="审核意见" :visible.sync="reviewVisible" :close-on-click-modal="false">
      <finish-review v-if="reviewVisible" @on-success="init()" :data="task"></finish-review>
    </el-dialog>
  </div>
</template>

<script>
import { getAdviceByTask, getAnalysis } from "@/api/advice";
import {
  getTaskById,
  getRequestByTaskId,
  getProcessByTaskId,
  getFinishByTaskId,
} from "@/api/task";
import { getReview } from "@/api/review";
import AdviceInfo from "../advice/components/info";
import AnalysisInfo from "../advice/analysis/info";
import TaskItem from "./components/item";
import RequestAdd from "./request/add";
import RequestInfo from "./request/info";
import ProcessAdd from "./process/add";
import ProcessItem from "./process/item";
import FinishAdd from "./finish/add";
import FinishItem from "./finish/item";
import FinishReview from "../review/finishReview";
import ReviewInfo from "../review/finishReviewInfo";
export default {
  components: {
    AdviceInfo,
    AnalysisInfo,
    TaskItem,
    RequestAdd,
    RequestInfo,
    ProcessAdd,
    ProcessItem,
    FinishAdd,
    FinishItem,
    FinishReview,
    ReviewInfo,
  },
  data() {
    return {
      openNames: ["1", "2", "3", "4", "5", "6"],
      adviceInfo: {},
      analysisInfo: {},
      task: {},
      xqfxVisible: false,
      requestInfo: {},
      processVisible: false,
      processList: [],
      finishVisible: false,
      finishInfo: {},
      reviewVisible: false,
      reviewInfo: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.xqfxVisible = false;
      this.processVisible = false;
      this.finishVisible = false;
      this.reviewVisible = false;
      this.getAdviceByTask();
      this.getTaskInfo();
      this.getRequest();
      this.getProcess();
      this.getFinish();
    },

    //根据任务id查询建议
    async getAdviceByTask() {
      let params = {
        taskID: this.$route.query.taskID,
      };
      let response = await getAdviceByTask(params);
      if (response.status === 1) {
        if (response.data.length > 0) {
          this.adviceInfo = response.data[0];
          this.getAnalysis(this.adviceInfo.adviceID);
          this.getReview(this.adviceInfo.adviceID);
        }
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取初步分析
    async getAnalysis(id) {
      let params = {
        adviceid: id,
      };
      let response = await getAnalysis(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.analysisInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取任务审核信息
    async getReview(id) {
      let params = {
        adviceid: id,
        type: "任务审核",
      };
      let response = await getReview(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.reviewInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取任务信息
    async getTaskInfo() {
      let params = {
        taskID: this.$route.query.taskID,
      };
      let response = await getTaskById(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.task = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取需求分析
    async getRequest() {
      let params = {
        taskID: this.$route.query.taskID,
      };
      let response = await getRequestByTaskId(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.requestInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取任务下的进度列表
    async getProcess() {
      let params = {
        taskID: this.$route.query.taskID,
      };
      let response = await getProcessByTaskId(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.processList = response.data;
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取任务下的成果情况
    async getFinish() {
      let params = {
        taskID: this.$route.query.taskID,
      };
      let response = await getFinishByTaskId(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.finishInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },
  },
};
</script>

<style>
</style>