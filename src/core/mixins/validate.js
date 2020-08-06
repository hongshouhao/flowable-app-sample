import {
  decode
} from "@/core/utils/base64";
import {
  appId
} from "@/core/app/app";
export const validate = {
  data() {
    return {
      status: false,
      _userName: "",
      _userAccount: "",
      _company: "",
      _role: "",
      validate: false
    };
  },
  mounted() {
    var login_session = sessionStorage.getItem("login-" + appId);
    if (login_session === null) {
      this.$router.push("/");
      return false;
    }
    this.status = true;

    var login = JSON.parse(decode(login_session));
    this._userName = login.userName;
    this._userAccount = login.userAccount;
    this._isAdmin = login.isAdmin;
    this._company = login.company;
    this._role = login.role
    this.validate = true;
  }
};