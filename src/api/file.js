import {
    get,
    post
} from "@/core/utils/request";
import {
    services
} from "@/core/app/services";

//上传文件
export function uploadFile(query, file) {
    return post({
        url: `${services.file.upload}&UserAccount=${query.UserAccount}&folder=${query.folder}`,
        params: file
    });
}

//删除文件
export function deleteFile(query) {
    return post({
        url: `${services.file.upload}`,
        params: query
    });
}

//获取文件信息
export function getFileInfos(query) {
    return get({
        url: `${services.file.infos}`,
        query: query
    });
}