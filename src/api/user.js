import {
    get,
    post
} from "@/core/utils/request";
import {
    services
} from "@/core/app/services";

//用户登录
export function userLogin(params) {
    return post({
        url: `${services.sys.login}`,
        params: params
    });
}

//获取用户权限
export function getUser(id) {
    return get({
        url: `${services.sys.query}` + id,
    });
}