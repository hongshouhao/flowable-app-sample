<template>
  <div class="login-container">
    <div class="login-title">{{ title }}</div>
    <login-content></login-content>
    <div class="login-footer">
      <p>copyright © 2020 苏州工业园区一网通办运营团队 技术支持</p>
    </div>
  </div>
</template>

<script>
import LoginContent from "./content";
export default {
  components: { LoginContent },
  data() {
    return {
      title: "苏州工业园区“一网通办”优化提升服务平台",
    };
  },
  created() {
    document.title = this.title;
  },
};
</script>

<style lang="scss">
body {
  font: 1em / normal "\5fae\8f6f\96c5\9ed1", "\9ed1\4f53", Arial;
}

.login-container {
  width: 100%;
  height: 100%;
  background: url("../../assets/login/loginBg.png") no-repeat center center;
  background-size: 100% auto;
  .login-title {
    margin: 0 auto;
    line-height: 150px;
    color: #fff;
    font-size: 2.5em;
    letter-spacing: 0.1em;
    text-align: center;
    width: 550px;
    height: 100px;
    img {
      margin-top: -10px;
    }
    * {
      vertical-align: middle;
    }
  }

  .login-title,
  .login-copyright {
    z-index: 11;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
  }
  .login-footer {
    z-index: 11;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    text-transform: capitalize;
    font-size: 0.8em;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
    color: #999;
    p {
      padding: 2em 0;
      a {
        color: #999;
      }
    }
  }
}
</style>
