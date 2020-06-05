import { request } from './request'
export function getCateList1() {
    return request({
        url: 'categories'
    })
}
export function tabClicked1(cateId) {
    return request({
        url: `categories/${cateId}/attributes`,
        params: { sel: 'many' }
    })
}

export function tabClicked2(cateId) {
    return request({
        url: `categories/${cateId}/attributes`,
        params: { sel: 'only' }
    })
}
export function add(data) {
    return request({
        url: `goods`,
        method:'post',
        data
    })
}

