import { request } from './request'
export function getcatedata(data) {
    return request({
        url: 'categories',
        params:data
    })
}

export function getcatedata1(data) {
    return request({
        url: 'categories',
        params:{
            type:data
        }
    })
}

export function addcate(data) {
    return request({
        url: 'categories',
       data:data,
       method:'post'
    })
}

export function delcate(data) {
    return request({
        url: 'categories/'+data,
        method: 'delete',
    })
}

export function changecate(id,data) {
    return request({
        url: 'categories/'+id,
        method: 'put',
        data:{
            cat_name:data
        }
    })
}

export function getgoodsdata(data) {
    return request({
        url: 'goods',
        params:data
    })
}

export function getparamsdata(id,data) {
    return request({
        url: `categories/${id}/attributes`,
        params:{
            sel:data 
        }
    })
}
