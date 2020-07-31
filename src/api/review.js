import {
    get,
    post
} from "@/core/utils/request";
import {
    services
} from "@/core/app/services";

//提交审核
export function submitReview(params) {
    return post({
        url: `${services.do.edit}addReview`,
        params: params
    });
}

//查询审核信息
export function getReview(query) {
    return get({
        url: `${services.do.query}getReview`,
        params: query
    });
}