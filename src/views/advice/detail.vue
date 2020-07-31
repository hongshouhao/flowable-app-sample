<template>
  <div>
    <el-collapse :value="openNames">
      <el-collapse-item title="初步要求内容" name="1">
        <info-view :adviceInfo="adviceInfo"></info-view>
      </el-collapse-item>
      <el-collapse-item title="初步分析" name="2" v-if="Object.keys(analysisInfo).length>0">
        <analysis-info :analysis="analysisInfo"></analysis-info>
      </el-collapse-item>
      <el-collapse-item title="任务拆分情况" name="3" v-if="tasks.length>0">
        <el-card v-for="(item,index) in tasks" :key="index" style="margin-bottom:10px;">
          <task-item :data="item"></task-item>
          <first-info :data="item" v-if="item.opinion"></first-info>
          <el-button type="primary" plain @click="submitRst(1,item)">审核</el-button>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="审核信息" name="4" v-if="Object.keys(reviewInfo).length>0">
        <second-info :data="reviewInfo"></second-info>
      </el-collapse-item>
    </el-collapse>
    <div class="btn-group">
      <el-button type="primary" plain @click="cbfxVisible=true">提交初步分析</el-button>
      <el-button type="primary" plain @click="rwcfVisible=true">任务拆分</el-button>
      <el-button type="primary" plain @click="submitSecondReview">提交复核</el-button>
      <el-button type="primary" plain @click="submitRst(2)">核定</el-button>
      <el-button type="primary" plain @click="submitSecondReview">提交指派</el-button>
    </div>
    <el-drawer title="初步分析" :visible.sync="cbfxVisible" size="450px" :wrapperClosable="false">
      <add-analysis v-if="cbfxVisible" @on-success="init()"></add-analysis>
    </el-drawer>
    <el-drawer
      title="任务拆分"
      :visible.sync="rwcfVisible"
      size="450px"
      :wrapperClosable="false"
      @close="init"
    >
      <split-task v-if="rwcfVisible" @on-success="init()"></split-task>
    </el-drawer>
    <el-dialog title="审核意见" :visible.sync="reviewVisible">
      <first-review v-if="first" @on-success="init()" :data="submitReviewData"></first-review>
      <second-review v-if="!first" @on-success="init()"></second-review>
    </el-dialog>
  </div>
</template>

<script>
import { getTasks } from "@/api/task";
import { getAdviceById, getAnalysis } from "@/api/advice";
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
export default {
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
  },
  data() {
    return {
      openNames: ["1", "2", "3", "4"],
      cbfxVisible: false,
      rwcfVisible: false,
      reviewVisible: false,
      first: false,
      second: false,
      tasks: [],
      submitReviewData: {},
      adviceInfo: {},
      analysisInfo: {},
      reviewInfo: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.cbfxVisible = false;
      this.reviewVisible = false;
      this.rwcfVisible = false;
      this.getTasks();
      this.getAdviceById();
      this.getAnalysis();
      this.getReview();
    },

    //获取复审信息
    async getReview() {
      let params = {
        adviceid: this.$route.query.id,
        type: "领导复审",
      };
      let response = await getReview(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.reviewInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取建议信息
    async getAdviceById() {
      let response = await getAdviceById({ id: this.$route.query.id });
      if (response.status === 1) {
        if (response.data.length > 0) this.adviceInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取建议中的所有任务
    async getTasks() {
      let response = null;
      let params = {
        adviceID: this.$route.query.id,
      };
      response = await getTasks(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.tasks = response.data;
      } else this.$message.error("查询失败，请检查网络！");
    },

    //获取初步分析
    async getAnalysis() {
      let params = {
        adviceid: this.$route.query.id,
      };
      let response = await getAnalysis(params);
      if (response.status === 1) {
        if (response.data.length > 0) this.analysisInfo = response.data[0];
      } else this.$message.error("查询失败，请检查网络！");
    },

    //弹出审核对话框
    submitRst(type, data) {
      this.submitReviewData = data;
      this.reviewVisible = true;
      if (type == 1) this.first = true;
      else this.first = false;
    },

    //提交复审操作 --未写
    submitSecondReview() {
      this.$message.success("已提交复审！");
    },

    //完成拆分任务 --未写
    finishSplit() {
      this.$message.success("拆分完成");
    },
  },
};
</script>
