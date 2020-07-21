<template>
  <fm-generate-form ref="generateForm"
                    :data="metadata"
                    :value="value" />
</template>

<script>
import convert from './actFormDataConvert'

export default {
  data () {
    return {
      value: {},
      metadata: { config: { size: '0' }, list: [] }
    }
  },
  mounted () { },
  methods: {
    setValues (procDefKey, formFields) {
      this.value = convert.to(formFields)
      console.log(this.value)
      const formJsonFile = `/forms/${procDefKey}/${formFields.key.replace(
        '.form',
        ''
      )}.v${formFields.version}.json`
      this.$http.get(formJsonFile).then(response => {
        this.metadata = response.data
        console.log(this.metadata)
      })
    },
    getValues () {
      return this.$refs.generateForm.getData().then(data => {
        if (typeof this.metadata.localScope === undefined) {
          this.metadata.localScope = false
        }
        return {
          variables: convert.from(data, this.metadata),
          localScope: this.metadata.localScope
        }
      })
    }
  }
}
</script>
