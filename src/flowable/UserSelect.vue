<template>
  <el-select v-model="selected"
             placeholder="请选择处理人">
    <el-option v-for="item in data"
               :key="item.id"
               :label="item.firstName"
               :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      selected: ''
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      let username = this.$flowableClient.options.auth.username
      this.$flowableClient.identityUsers.getUsers().then(response => {
        this.data = this.$linq
          .from(response.data.data)
          .where(u => u.id !== username)
        console.table(this.data)
      })
    }
  }
}
</script>
