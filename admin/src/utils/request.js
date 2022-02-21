/*
 * @Description:
 * @Version: 1.0
 * @Autor: lituo
 * @Date: 2022-02-11 12:19:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-14 09:14:27
 */
import axios from "axios";
// import { Message } from "element-ui";
// import router from "@/router";
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.253.1:9898/fever-treatment-api"
    : "https://i2.hnzwfw.gov.cn/fever-treatment-api";
const requests = axios.create({
  baseURL,
  timeout: 5000,
});
// // 添加请求拦截器
// requests.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem("token");
//     const token =
//       "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4NjQ2OTExMjg0NTUxODI4MTM1IiwiY3JlYXRlZCI6MTY0Mzk2MDQxOTg5NiwiZXhwIjoxNjQzOTk2NDE5fQ.27_0tyrgaUkCVXl6iFMJbtLhI5yInXcl17jEoh-Y1ez_DamqmpmKwF_nSRWsyYcwVeJoAiwhOW_dkB6IphrdCw";
//     token && (config.headers.Authorization = token);
//     return config;
//   },
//   // 对请求错误做些什么
//   (error) => Promise.reject(error)
// );
// 添加响应拦截器
requests.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.status === 200) {
      const res = response.data;
      if (res.code !== 200) {
        // if (res.indexOf("401") > -1) {
        //   localStorage.clear();
        //   // Message("用户凭证已过期，请重新登录");
        //   router.push("/");
        // }
        // Message("服务器异常,请稍后再试");
      }
      return response;
    }
    // Message("服务器异常,请稍后再试");
    return Promise.reject(response);
  },
  (error) => {
    // 对响应错误做点什么
    // Message("服务器异常,请稍后再试");
    return Promise.reject(error);
  }
);

export default requests;
