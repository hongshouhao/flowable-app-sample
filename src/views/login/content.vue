<template>
  <el-card style="width:400px;margin:100px auto 0 auto;">
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
        <el-form-item prop="pwd">
          <el-input
            v-model="formData.pwd"
            placeholder="请输入密码"
            clearable
            show-password
            :style="{width: '100%'}"
            @keyup.enter.native="submitForm"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="remember">记住密码</el-checkbox>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button type="primary" :loading="loading" @click="submitForm">登 录</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import { userLogin, getUser } from "@/api/user";
import { appId } from "@/core/app/app";
import { encode, decode } from "@/core/utils/base64";
export default {
  components: {},
  props: [],
  data() {
    return {
      loading: false,
      returnUrl: "",
      formData: {
        username: undefined,
        pwd: undefined,
      },
      role: "",
      remember: false,
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        pwd: [
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
  created() {},
  mounted() {
    // this.$flowable.logout();
    this.returnUrl = this.$route.query.returnUrl || "/";
    sessionStorage.removeItem("login-" + appId);
    sessionStorage.removeItem("roles-" + appId);
    let remember = localStorage.getItem(appId + "-login-remember") || null;

    if (remember !== null) {
      this.remember = true;
      var rememberInfo = decode(remember);
      var userJson = JSON.parse(rememberInfo);
      this.formData.username = userJson.username;
      this.formData.pwd = userJson.pwd;
    }
  },
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.login();
      });
    },

    //登录
    async login() {
      let responce = await this.process();
      if (responce === 1) {
        this.checkLogin();
      } else {
        this.$message.error("流程获取失败，请联系管理员！");
      }
    },

    //业务登录
    async checkLogin() {
      this.loading = true;
      let response = await userLogin(this.formData);
      if (response.status === 1) {
        var jsonStr = JSON.stringify({
          username: this.formData.username,
          pwd: this.formData.pwd,
        });
        if (this.remember) {
          localStorage.setItem(appId + "-login-remember", encode(jsonStr));
        } else {
          localStorage.removeItem(appId + "-login-remember");
        }
        let data = response.data.userInfo;
        let rst = await getUser(data.id);
        if (rst.data.length === 1) {
          data.role = rst.data[0].name;
          sessionStorage.setItem(
            "login-" + appId,
            encode(JSON.stringify(data))
          );
          this.$router.push(this.returnUrl);
        } else {
          this.$message.error("未获取到用户角色，请联系管理员！");
        }
      } else {
        this.loading = false;
        this.$message.error(response.message);
      }
    },

    //流程登录
    async process() {
      let response = await this.$flowable.login(
        this.formData.username,
        this.formData.pwd
      );
      if (response) return 1;
      else return 0;
    },
  },
};
</script>
<style lang="scss">
.login-content {
  width: 360px;
  overflow: hidden;
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
  .el-form-item {
    margin-bottom: 12px;
  }
}
</style>
