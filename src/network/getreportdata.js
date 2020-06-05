import { request } from './request'
export function getreportdata() {
    return request({
        url: 'reports/type/1'
    })
}


