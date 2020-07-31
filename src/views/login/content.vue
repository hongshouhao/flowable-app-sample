<template>
  <div class="login-content">
    <div class="title">
      <img src="../../assets/login/logo.png" width="100" />
    </div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium">
      <el-form-item prop="username">
        <el-input
          v-model="formData.username"
          placeholder="请输入账号"
          clearable
          :style="{width: '100%'}"
          @keyup.enter.native="submitForm"
        >
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入密码"
          clearable
          show-password
          :style="{width: '100%'}"
          @keyup.enter.native="submitForm"
        >
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="login-btn">
      <el-button type="primary" :loading="loading" @click="submitForm">登 录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      returnUrl: "",
      formData: {
        username: undefined,
        password: undefined,
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.$flowable.logout();
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.loading = true;
        debugger
        console.log(this.formData.username)
        console.log(this.formData.password)
        this.$flowable
          .login(this.formData.username,this.formData.password)
          .then((user) => {
            console.log(user);
            this.$router.push(this.returnUrl);
          })
          .catch((error) => {
            this.$message.error(error);
            this.loading = false;
          });
      });
    },
  },
};
</script>
<style lang="scss">
.login-content {
  z-index: 999;
  width: 400px;
  background: #fff;
  margin: 6% auto 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  padding: 30px 50px;
  .title {
    margin-bottom: 10px;
    line-height: 40px;
    font-size: 26px;
    text-align: center;
    font-weight: bold;
    color: #17134e;
  }
  .login-btn {
    text-align: center;

    .el-button {
      width: 100%;
      height: 40px;
      font-size: 14px;
    }
  }

  //覆盖iview样式
  .ivu-form-item {
    margin-bottom: 14px;
    .ivu-input-prefix {
      width: 36px;
      padding: 6px 0;
    }

    .ivu-input {
      height: 44px;
    }
    // .ivu-checkbox-default {
    //   color: #666;
    // }
  }
}
</style>
