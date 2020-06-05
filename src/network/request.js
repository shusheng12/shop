import axios from 'axios'

//进度条 
import NProgress from 'nprogress'
import'nprogress/nprogress.css'

export function request(config) {

const instance=axios.create({
    timeout:5000,
    baseURL:'http://120.76.56.157:8888/api/private/v1/'
    })
    
//拦截 比如携带token值
//请求拦截
instance.interceptors.request.use(config=>{
  NProgress.start();
    //请求头携带token
   config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
    },err=>{})
    
//响应拦截
instance.interceptors.response.use(config=>{
  NProgress.done();
    return config
      },err=>{})

    return instance(config)
}