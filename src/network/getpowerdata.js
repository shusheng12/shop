import { request } from './request'
export function getdata() {
    return request({
        url: 'rights/' + 'list',
    })
}

export function getrolesdata() {
    return request({
        url: 'roles',
    })
}
export function addroles(data) {
    return request({
        url: 'roles',
        method:'post',
        data:data
    })
}

export function changeroles(data) {
    return request({
        url: 'roles/'+data.id,
        method: 'put',
        data:{
            roleName:data.roleName,
            roleDesc:data.roleDesc
        }
    })
}
export function deleteuser(data) {
    return request({
        url: 'roles/'+data,
        method: 'delete',

    })
}

export function getrightlist() {
    return request({
        url:'rights/tree'
    })
}

export function changerights(id,data) {
    return request({
        url:`roles/${id}/rights`,
        method:'post',
        data:{
            rids:data
        }
    })
}

export function delright(id,iid) {
    return request({
        url:`roles/${id}/rights/${iid}`,
        method:'delete'
        
    })
}