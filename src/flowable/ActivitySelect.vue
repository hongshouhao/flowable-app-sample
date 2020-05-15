<template>
  <el-select v-model="selected"
             placeholder="请选择节点">
    <el-option v-for="item in data"
               :key="item.id"
               :label="item.activityName"
               :value="item.activityId">
    </el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      currentActivityId: '',
      selected: ''
    }
  },
  props: {
    processInstanceId: {
      type: String,
      default: ''
    },
    taskId: {
      type: String,
      default: ''
    }
  },
  computed: {
    startActivityIds () {
      return [this.selected]
    },
    cancelActivityIds () {
      return [this.currentActivityId]
      //   let ids = []
      //   for (let i = 0; i < this.data.length; i++) {
      //     if (this.data[i].activityId === this.selected) {
      //       break
      //     }
      //     ids.push(this.data[i].activityId)
      //   }

      //   return ids
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      this.$flowableClient.histories
        .getActivityInstances({
          processInstanceId: this.processInstanceId,
          activityType: 'userTask'
        })
        .then(response => {
          let list = response.data.data.reverse()
          console.table(list)

          var idx = -1
          for (let i = 0; i < list.length; i++) {
            if (list[i].taskId === this.taskId) {
              idx = i
              this.currentActivityId = list[i].activityId
              break
            }
          }
          list.splice(0, idx + 1)
          this.data = list
        })
    }
  }
}
</script>
