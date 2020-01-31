import axios from 'axios'

let fetch = axios.create({
    baseURL: "https://lab.isaaclin.cn/nCoV", // 这里是本地express启动的服务地址
    timeout: 5000 // request timeout
});

export default fetch;
