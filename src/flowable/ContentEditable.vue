<template>
  <div :contenteditable="editable "
       :style="'width:auto;height:' + height"
       @blur="lostFocus()"></div>
</template>

<script> 
export default {
  name: 'content-editable',
  data () {
    return {
      editing: true
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    height: {
      get () {
        if (this.editable === true) {
          return '100px'
        }
        else {
          return 'auto'
        }
      }
    }
  },
  mounted: function () {
    this.$el.innerText = this.content;
    if (this.editable) {
      this.$el.focus();
    }
  },
  watch: {
    content: function () {
      this.$el.innerText = this.content;
    }
  },
  methods: {
    lostFocus () {
      this.$emit('contentChanged', this.$el.innerText)
    }
  }
}
</script> 
