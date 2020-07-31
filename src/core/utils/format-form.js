import { parseTime } from "@/core/utils";
export function formatEmptyForm(data, options = {}) {
  //过滤空置
  let form = {};
  for (let key in data) {
    let value = data[key] || null;
    if (value) form[key] = value;
  }
  const { date, datetime } = options;
  for (let key of date || []) {
    if (form[key]) form[key] = parseTime(form[key]);
  }
  return form;
}

export function formatRules(options) {
  let rules = {};
  const { input, change, email, number } = options;
  for (let key of input || []) {
    rules[key] = [
      { required: true, message: "必填项不能为空", trigger: "blur" }
    ];
    if (email || [].indexOf(key) > -1)
      rules[key].push({
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur", "change"]
      });
  }
  for (let key of change || [])
    rules[key] = [
      { required: true, message: "必选项不能为空", trigger: "change" }
    ];

  for (let key of number || [])
    rules[key] = [
      { required: true, message: "必选项不能为空" },
      { type: "number", message: "请填入数字" }
    ];
  return rules;
}
