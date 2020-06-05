import { request } from './request'
export function getusersdata(data) {
    return request({
        url: 'users',
        params: data
    })
}
export function ChangeduserState(id, state) {
    return request({
        url: `users/${id}/state/${state}`,
        method: 'put'

    })
}
export function addusers(data) {
    return request({
        url: 'users',
        method:'post',
        data: data
    })
}
export function changeusersdata(data) {
    return request({
        url: 'users/'+data.id,
        method: 'put',
        data:{
            email:data.email,
            mobile:data.mobile
        }
    })
}
export function deleteuser(data) {
    return request({
        url: 'users/'+data,
        method: 'delete',

    })
}
export function getrolesdata() {
    return request({
        url: 'roles',
    })
}
export function Changeroles(id,iid) {
    return request({
        url: `users/${id}/role`,
        method: 'put',
      data:{
        rid:iid
      }

    })
}