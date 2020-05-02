import axios from "axios";

const http = axios.create({
  /* 这里一定要看清是baseURL，不是baseUrl，因为这个耽误了很久很久的时间去排查 */
  baseURL: "http://localhost:3000/admin/api",
});

export default http;