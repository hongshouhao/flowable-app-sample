import {
    get,
    post
} from "@/core/utils/request";
import {
    services
} from "@/core/app/services";


//添加任务
export function addTask(params) {
    return post({
        url: `${services.do.edit}addTask`,
        params: params
    });
}

//获取建议中的任务
export function getTasksByAdvice(query) {
    return get({
        url: `${services.do.query}getTasksByAdvice`,
        params: query
    });
}

//获取任务列表
export function getTaskList(query) {
    return get({
        url: `${services.grid.data}TaskList`,
        params: query
    });
}

//根据id查询任务信息
export function getTaskById(query) {
    return get({
        url: `${services.do.query}getTaskById`,
        params: query
    });
}

//添加需求分析
export function addRequest(params) {
    return post({
        url: `${services.do.edit}addRequest`,
        params: params
    });
}

//获取需求分析信息
export function getRequestByTaskId(query) {
    return get({
        url: `${services.do.query}getRequest`,
        params: query
    });
}

//提交进度
export function addProcess(params) {
    return post({
        url: `${services.do.edit}addProcess`,
        params: params
    });
}

//获取任务下的进度
export function getProcessByTaskId(query) {
    return get({
        url: `${services.do.query}getProcessByTask`,
        params: query
    });
}

//提交审核
export function addFinish(params) {
    return post({
        url: `${services.do.edit}addFinish`,
        params: params
    });
}

//获取任务下的提交审核情况
export function getFinishByTaskId(query) {
    return get({
        url: `${services.do.query}getFinishByTask`,
        params: query
    });
}