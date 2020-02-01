import axios from 'axios'

let fetch = axios.create({
    baseURL: "https://lab.isaaclin.cn/nCoV", // 这里是本地express启动的服务地址
    timeout: 5000 // request timeout
});

fetch.interceptors.response.use(
    response => {
        //拦截响应，做统一处理
        if (response.status === 200) {
            return response.data
        }
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response) // 返回接口返回的错误信息
    });

export default fetch;
