<template>
  <component v-bind:is="view"></component>
</template>

<script>
export default {
  computed: {
    view() {
      const procDefKey = this.$route.params.procDefKey
      return () => import(`../processes/${procDefKey}/Index.vue`)
    }
  }
}
</script>
