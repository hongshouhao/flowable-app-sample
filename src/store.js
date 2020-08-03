import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // currentProcDef: {},
    processDefinitions: [],
    currentProcessInstanceId: '',
    currentUser: {}
  },
  mutations: {
    // currentProcDef (state, processDefinition) {
    //   let target = this._vm.$linq.from(state.processDefinitions).firstOrDefault(d => d.id === processDefinition.id);
    //   if (!target) {
    //     target = this._vm.$flowableClient.processDefinitions.getProcessDefinitionById(processDefinition.id);
    //   }
    //   state.currentProcDef = target;
    // },
    processDefinitions (state, processDefinitions) {
      state.processDefinitions = processDefinitions;
    },
    currentUser (state, user) {
      state.currentUser = user
    }
  }
})
