<template>
  <div>
    <el-card>
      <div slot="header">
        <span>处理意见</span>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          circle
          @click="newEmptyComment()"
        ></el-button>
      </div>
      <div
        v-for="(cmnt, idx) in comments"
        :key="idx"
        @mouseover="hover(idx)"
        @mouseleave="hoverIndex = -1"
      >
        <h4 style="margin:0px 0px 8px 0px;display:inline">
          {{ cmnt.author }} 于 {{ cmnt.time }}
        </h4>
        <el-popconfirm
          title="确定处理意见吗?"
          v-show="hoverIndex === idx"
          @onConfirm="deleteComment(idx)"
        >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            slot="reference"
            circle
          ></el-button>
        </el-popconfirm>
        <el-button
          type="success"
          size="mini"
          icon="el-icon-check"
          circle
          v-if="!cmnt.id"
          @click="saveComment(idx)"
        ></el-button>
        <content-editable
          :content="cmnt.message"
          :editable="!cmnt.id"
          @contentChanged="content = $event"
        ></content-editable>

        <el-divider v-if="idx < comments.length - 1" />
      </div>
    </el-card>
  </div>
</template>
<script>
import contentEditable from './ContentEditable'

export default {
  data() {
    return {
      diagramSource: '',
      comments: [],
      content: '',
      hoverIndex: -1
    }
  },
  props: {
    taskId: {
      type: String,
      default: ''
    },
    processInstanceId: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.listComments()
  },
  methods: {
    listComments() {
      this.$flowableClient.taskComments
        .getComments(this.taskId)
        .then(result => {
          this.comments = result.data.reverse()
          console.table(this.comments)
        })
        .catch(err => {})
    },
    hover(idx) {
      this.hoverIndex = idx
    },
    newEmptyComment() {
      this.comments.push({})
    },
    saveComment(idx) {
      this.comments[idx].message = this.content
      this.comments[idx].taskId = this.taskId
      this.comments[idx].processInstanceId = this.processInstanceId
      this.$flowableClient.taskComments
        .saveComment(this.taskId, this.comments[idx])
        .then(result => {
          this.listComments()
        })
    },
    deleteComment(idx) {
      if (this.comments[idx].id) {
        this.$flowableClient.taskComments
          .deleteComment(this.taskId, this.comments[idx].id)
          .then(result => {
            this.listComments()
          })
      } else {
        this.comments = this.comments.splice(0, this.comments.length - 1)
      }
    }
  },
  components: {
    contentEditable
  }
}
</script>
