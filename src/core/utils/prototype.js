Date.prototype.Format = function(fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
};

String.prototype.parseTime = function(fmt = "yyyy-MM-dd") {
  if (this === "" || this === "null") return "";
  return new Date(this).Format(fmt);
};

Array.prototype.range = function(step = 1) {
  if (this.length !== 2) return this;
  else {
    let rst = [];
    const [first, last] = this;
    for (let i = first; i <= last; i = i + step) {
      rst.push(i);
    }
    return rst;
  }
};
