import { post } from "@/core/utils/request";
import { tokens } from "@/core/app/app";
class Token {
  constructor() {
    this.tokens = {};
  }

  getPTToken(name) {
    return new Promise(resolve => {
      const token = this.tokens[name];
      if (token) resolve(token);
      else {
        const _token = this._getTokenByName(name);
        post({
          url: _token.serviceUrl,
          data: _token.params
        }).then(response => {
          this.tokens[name] = response.token;
          resolve(response.token);
        });
      }
    });
  }

  _getTokenByName(name) {
    let token = null;
    for (const item of tokens)
      if (item.name === name) {
        token = item;
        break;
      }
    return token;
  }
}

export const tokenManager = new Token();
