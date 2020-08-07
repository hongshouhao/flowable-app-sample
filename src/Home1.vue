<template>
  <el-container class="main">
    <el-header class="header">
      <div class="logo"></div>
      <span class="header-btn"
            @click="hiddenSidebar">
        <i class="el-icon-menu"></i>
      </span>

      <div class="right">
        <span class="header-btn">
          <el-badge :value="3">
            <i class="el-icon-bell"></i>
          </el-badge>
        </span>
        <el-dropdown trigger="hover"
                     @command="handleCommand">
          <span class="header-btn">
            {{ user.firstName
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-arrow-down"
                 style="padding-right: 8px"></i>个人信息</el-dropdown-item>
            <el-dropdown-item command="logout"><i class="el-icon-arrow-down"
                 style="padding-right: 8px"></i>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="app">
      <el-aside class="aside"
                width="230px">
        <el-menu class="menu"
                 router
                 :collapse="collapsed">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-eleme" />
              流程定义
            </template>
            <el-menu-item v-for="defItem in procDefs"
                          :key="defItem.id"
                          :index="'/processes/' + defItem.key">{{ defItem.name + "(v"+defItem.version+")" }}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-eleme" />
              个人办公
            </template>
            <el-menu-item index="/tasks/myTasks">我的任务</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-eleme" />
              已处理
            </template>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-eleme" />
              我发起的
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="app-body">
        <el-container class="main-container">
          <router-view />
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      collapsed: false,
      procDefs: [],
      user: {}
    }
  },
  computed: {},
  mounted () {
    this.user = this.$flowable.getUser()
    this.$flowableClient.processDefinitions
      .getProcessDefinitions({ latest: true })
      .then(result => {
        this.procDefs = result.data.data
        console.table(this.procDefs)
        this.$store.commit('processDefinitions', this.procDefs)
      })
  },
  methods: {
    // handleProcessClick(procDef) {
    //   this.$router
    //     .push({
    //       name: 'processes',
    //       params: {
    //         procDefKey: procDef.key
    //       }
    //     })
    //     .catch()
    // },
    // handleTaskClick(task) {
    //   this.$router
    //     .push({
    //       name: 'mytasks',
    //       params: {
    //         procDefKey: procDef.key
    //       }
    //     })
    //     .catch()
    // },
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.$flowable.logout()
          this.$router.push('/')
          break
      }
    },
    hiddenSidebar (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-close')
    }
  }
}
</script>
<style lang="scss">
@import "Home.scss";
</style>
