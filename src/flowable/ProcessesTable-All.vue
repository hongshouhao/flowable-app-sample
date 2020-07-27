<template>
  <el-tabs tab-position="left">
    <el-tab-pane label="流转中">
      <processesInProgress v-if="procDefKey" :procDefKey="procDefKey" />
    </el-tab-pane>
    <el-tab-pane label="已归档">
      <processesArchived v-if="procDefKey" :procDefKey="procDefKey" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import processesInProgress from './ProcessesTable-InProgress'
import processesArchived from './ProcessesTable-Archived'

export default {
  data() {
    return {
      procDefKey: null,
    }
  },
  mounted() {
    this.procDefKey = this.$route.params.procDefKey
  },
  components: {
    processesInProgress,
    processesArchived,
  },
}
</script>
