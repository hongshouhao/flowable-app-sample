class PostMessage {
  constructor() {
    this.subUid = 0;
    this.topics = {};
    window.addEventListener(
      "message",
      event => {
        const { name, data } = event.data;
        this.publish(name, data);
      },
      false
    );
  }

  publish(topic, args) {
    if (!this.topics[topic]) {
      return false;
    }
    let subscribes = this.topics[topic];
    let len = subscribes ? subscribes.length : 0;

    while (len--) {
      subscribes[len].func(args);
    }
    return this;
  }

  subscribe(topic, func) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    let token = (++this.subUid).toString();
    this.topics[topic].push({
      token: token,
      func: func
    });
    return token;
  }

  unsubscribe(token) {
    for (let m in this.topics) {
      if (this.topics[m]) {
        for (var i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  }

  unsubscribe(name) {
    delete this.topics[name];
  }

  publishChild(frameName, option) {
    const iframe = document.getElementById(frameName);
    const contentWindow = iframe ? iframe.contentWindow : null;
    if (contentWindow) contentWindow.postMessage(option, "*");
  }
}

//全局message事件绑定
window.MessageEvent = new PostMessage();

//父节点出发子节点
