import {request} from './request'
export function gethomedata(data) {
return request({
    url:'users',
    method:'get',
    params:data
})
}

export function ChangeduserState(uid, type) {
    return request({
        url: `users/${uid}/state/${type}`,
        method: 'put'

    })
}