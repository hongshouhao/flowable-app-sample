import {
    get,
    post
} from "@/core/utils/request";
import {
    services
} from "@/core/app/services";

//创建项目组
export function addProGroup(params) {
    return post({
        url: `${services.do.edit}addProGroup`,
        params: params
    });
}

//获取项目组列表
export function getProGroupList(query) {
    return get({
        url: `${services.do.query}getProGroup`,
        params: query
    });
}