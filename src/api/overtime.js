import {
    get,
    post
} from "@/core/utils/request";
import {
    services
} from "@/core/app/services";


//获取超时列表
export function getOvertimeSetting() {
    return get({
        url: `${services.do.query}getOvertimeSetting`,
    });
}

//修改超时设置
export function submitReview(params) {
    return post({
        url: `${services.do.edit}addReview`,
        params: params
    });
}