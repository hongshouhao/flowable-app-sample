<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    pageSize: {
      type: Number,
      default: 15
    },
    data: {
      type: Array,
      default () { return [] }
    }
  },
  watch: {
    data () {
      debugger
      this.currentPage = 1
      this.handleCurrentChange()
    }
  },
  components: {},
  methods: {
    handleCurrentChange () {
      var start = (this.currentPage - 1) * this.pageSize
      var end =
        this.currentPage * this.pageSize > this.data.length
          ? this.data.length
          : this.currentPage * this.pageSize
      this.currentPageData.length = 0

      let page = this.data.slice(start, end)
      for (var i = 0; i < page.length; i++) {
        this.currentPageData.push(page[i])
      }
      console.table(this.currentPageData)
    }
  }
}
</script>
