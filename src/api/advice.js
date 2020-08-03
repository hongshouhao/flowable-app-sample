import {
  get,
  post
} from "@/core/utils/request";
import {
  services
} from "@/core/app/services";

//获取建议列表
export function getAdviceList(query) {
  return get({
    url: `${services.grid.data}AdviceList`,
    params: query
  });
}

//获取建议编号
export function getAdviceCode() {
  return get({
    url: `${services.do.query}getAdviceCode`,
  });
}

//创建建议
export function addAdvice(query) {
  return post({
    url: `${services.do.edit}addAdvice`,
    params: query
  });
}

//根据id获取建议详情
export function getAdviceById(query) {
  return get({
    url: `${services.do.query}getAdviceById`,
    params: query
  });
}

//提交初步分析
export function addAnalysis(query) {
  return post({
    url: `${services.do.edit}addAnalysis`,
    params: query
  });
}

//获取初步分析
export function getAnalysisByAdvice(query) {
  return get({
    url: `${services.do.query}getAnalysisByAdvice`,
    params: query
  });
}

//根据任务查询建议信息
export function getAdviceByTask(query) {
  return get({
    url: `${services.do.query}getAdviceByTask`,
    params: query
  });
}