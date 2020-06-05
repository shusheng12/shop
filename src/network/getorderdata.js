import { request } from './request'
export function getorder(data) {
    return request({
        url: 'orders',
        params:data
    })
}


