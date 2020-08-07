<template>
  <div class="user-info">
    <div class="title">
      <img src="../../assets/login/logo2.png" />
    </div>
    <div class="detail">
      <el-avatar icon="el-icon-s-custom" style="background-color: #87d068" size="large"></el-avatar>
      <p v-if="validate">欢迎登录，{{ _userName }}</p>
      <p>
        <span @click="changePasswdShown=true">[ 修改密码 ]</span>
        <span @click="exit">[ 注销 ]</span>
      </p>
    </div>
    <change-passwd v-if="changePasswdShown"></change-passwd>
  </div>
</template>
<script>
import { validate } from "@/core/mixins/";
import ChangePasswd from "./ChangePasswd";

export default {
  mixins: [validate],
  components: { ChangePasswd },
  data() {
    return {
      validate: false,
      changePasswdShown: false,
    };
  },
  methods: {
    exit() {
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.user-info {
  height: 250px;
  width: 100%;

  .title {
    height: 60px;
    background: #3375af;
    padding: 15px 0;
    img {
      display: block;
      height: 30px;
      margin: 0 auto;
    }
  }
  .detail {
    background: url("../../assets/login/userinfoBg.png") no-repeat #fff;
    background-size: 100% 100%;
    height: 170px;
    text-align: center;
    padding: 10px 0;
    p {
      color: #fff;
      font-size: 14px;
      line-height: 35px;
      margin: 5px 0;
      span {
        cursor: pointer;
      }
      span:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
