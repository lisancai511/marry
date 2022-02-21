/*
 * @Description: 
 * @Version: 1.0
 * @Autor: lituo
 * @Date: 2022-02-11 12:19:36
 * @LastEditors: lituo
 * @LastEditTime: 2022-02-11 18:53:14
 */
import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
import "./permission";
import "@/style/reset.less";
import Vant from "vant";
import "vant/lib/index.css";
import dayjs from 'dayjs'
import store from './store'
import request from "@/utils/request";
import moment from 'moment'
Vue.prototype.$Ajax = request; //将request挂载到vue的原型上
Vue.prototype.$moment = moment; //moment
Vue.prototype.$baseUrl='https://i3.hnzwfw.gov.cn/zapi'
Vue.config.productionTip = false;
Vue.use(Vant);
Vue.prototype.dayjs = dayjs

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
