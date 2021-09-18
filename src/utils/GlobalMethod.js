import request from '@/utils/Request'

export default {
    httpGet(url, params) {
        return request({
            url,
            method: 'get',
            params,
        });
    },

    httpPost(url, data) {
        return request({
            url,
            method: 'post',
            data,
        });
    },
}
