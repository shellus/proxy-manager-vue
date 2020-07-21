import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_REQUEST_BASE_URL;

// 响应拦截器，响应拦截器会在then/catch处理之前执行
axios.interceptors.response.use(
    (response) => {
        // 假如请求码 === 10004，则重新回到 授权页,token失效或者过期
        if (response.data.code === 10004 || response.data.code === 10010) {
            window.location.href = '/login';
            return
        }
        // JJCCException
        if (response.data.code === 10000) {
            window.app.$message({type: 'error', message: response.data.msg});
            throw new Error(response.data.msg)
        }
        // 只将请求结果的data字段返回
        return response.data
    }, (err) => {
        // 发生网络错误后会走到这里
        if (err.response && err.response.data && err.response.data.message) {
            window.app.$message({type: 'error', message: err.response.data.message})
        }
        {
            console.log(err);
            window.app.$message({type: 'error', message: "请求异常"})
        }
        throw err
    }
)

Vue.prototype.$http = axios;
