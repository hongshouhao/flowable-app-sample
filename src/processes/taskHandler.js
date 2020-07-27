import vue from '../main'

class TaskHandler {
  getView (taskId, procDef) {
    if (procDef.key === 'szsp-service-improve') {
      return () => new Promise((resolve, reject) => {
        vue.$flowableClient.tasks.getTask(taskId).then(resp1 => {
          let task = resp1.data
          if (task.formKey === "renwuxinxi") {
            vue.$flowableClient.processInstanceVariables.getVariables(task.processInstanceId).then(resp2 => {
              let vars = resp2.data
              let targ = vars.find(item => item.name = 'completeAdding')
              if (targ && targ.value === 'true') {
                resolve(import('../flowable/TaskForm'))
              }
              else {
                resolve(import('../processes/szsp-service-improve/AddTask'))
              }
            }).catch(err2 => {
              reject(err2)
            })
          }
          else {
            resolve(import('../flowable/TaskForm'))
          }
        }).catch(err1 => {
          reject(err1)
        })
      })
    }
    else {
      return () => import('../flowable/TaskForm')
    }
  }
}

export default TaskHandler