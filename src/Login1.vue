<template>
  <el-form size="small"
           label-position="left"
           label-width="0px"
           class="login-container">
    <h2>Login</h2>
    <el-form-item :rules="[{ required: true, message: '必填' }]">
      <el-input v-model="username"
                placeholder="账号"></el-input>
    </el-form-item>

    <el-form-item :rules="[{ required: true, message: '必填' }]">
      <el-input type="password"
                v-model="password"
                autocomplete="off"
                placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked"
                 checked
                 class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary"
                 style="width:100%;"
                 :loading="loading"
                 @click="handleSubmit">登录</el-button>
    </el-form-item>
    <el-alert v-if="error"
              :title="error"
              type="error"
              show-icon></el-alert>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      username: "",
      password: "",
      loading: false,
      returnUrl: "",
      error: "",
    };
  },
  created () {
    this.$flowable.logout();
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    handleSubmit () {
      if (!(this.username && this.password)) {
        return;
      }
      this.loading = true;
      this.$flowable
        .login(this.username, this.password)
        .then((user) => this.$router.push(this.returnUrl))
        .catch((error) => {
          this.error = error;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>