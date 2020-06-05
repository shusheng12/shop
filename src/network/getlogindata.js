import {request} from './request'
export function getlogindata(data) {
return request({
    url:'login',
    method:'post',
    data:data
})
}