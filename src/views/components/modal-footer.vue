<template>
  <div class="form-footer">
    <Button type="text" @click="onCancel">{{okCancel}}</Button>
    <Button type="primary" :loading="loading" @click="onOk">{{okText}}</Button>
  </div>
</template>
<script>
export default {
  props: {
    okText: {
      type: String,
      default: "保存"
    },
    okCancel: {
      type: String,
      default: "取消"
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    onOk() {
      this.loading = true;
      this.$emit("on-ok");
    },
    onCancel() {
      this.loading = false;
      this.$emit("on-cancel");
    }
  }
};
</script>
<style scoped>
.form-edit-footer {
  text-align: right;
}
</style>