/*
 * @Description:
 * @Version: 1.0
 * @Autor: lituo
 * @Date: 2022-02-11 12:19:36
 * @LastEditors: lituo
 * @LastEditTime: 2022-02-11 19:57:35
 */
import router from "./router";
import setDocumentTitle from "@/utils/domUtil";
router.beforeEach(async (to, from, next) => {
  next();
});
