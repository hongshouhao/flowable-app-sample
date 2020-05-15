<template>
  <processes-list>
    <template slot="query">
      <div>
        查询
        <el-input placeholder="Enter something..." style="width: 300px" />
      </div>
    </template>
  </processes-list>
</template>

<script>
import ProcessesList from '../../flowable/ProcessesTable-All'

export default {
  name: 'VacationRequest',
  components: { ProcessesList }
}
</script>
