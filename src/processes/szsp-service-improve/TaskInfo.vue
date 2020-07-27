<template>
  <div class="taskInfo">
    <div v-for="(item, i) in taskVariables" :key="i">
      <span>{{ item.name }}</span> =
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskVariables: [],
    }
  },
  props: {
    task: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  mounted() {
    this.$flowableClient.taskVariables
      .getVariables(this.task.id)
      .then((resp) => {
        this.taskVariables = resp.data
        console.table(this.taskVariables)
      })
  },
  components: {},
}
</script>
<style>
.taskInfo {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  margin: 10px;
}
</style>
