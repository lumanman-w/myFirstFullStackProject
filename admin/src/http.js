import axios from "axios";
import Vue from 'vue';

const http = axios.create({
  /* 这里一定要看清是baseURL，不是baseUrl，因为这个耽误了很久很久的时间去排查 */
  baseURL: "http://localhost:3000/admin/api",
});

http.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message
  })
  return Promise.reject(err)
})

export default http;