<template>
  <div v-if="procDef.startFormDefined">
    <form-data-view ref="formDataView" />
    <el-row>
      <el-button type="primary"
                 @click="startTask()">开始</el-button>
    </el-row>
  </div>
</template>

<script>
import formDataView from './FormDataView'

export default {
  data () {
    return {
      formName: '',
      metadata: { config: { size: '0' }, list: [] }
    }
  },
  props: {
    procDef: {
      type: Object,
      default () {
        return null
      }
    }
  },
  mounted () {
    if (this.procDef.startFormDefined) {
      this.refreshView()
    }
  },
  computed: {},
  methods: {
    refreshView () {
      this.$flowableClient.processDefinitions
        .getStartForm(this.procDef.id)
        .then(response => {
          this.metadata = response.data
          this.formName = this.metadata.name
          this.$refs.formDataView.setValues(this.procDef.key, this.metadata)

          this.$emit('afterFormLoaded', this.metadata)
        })
    },
    startTask () {
      this.$refs.formDataView
        .getValues()
        .then(data => {
          this.$flowableClient.processInstances.startProcessInstance({
            processDefinitionId: this.procDef.id,
            variables: data.variables,
            returnVariables: true
          })
        })
        .catch(e => {
          console.error(e)
        })
    }
  },
  components: { formDataView }
}
</script>
