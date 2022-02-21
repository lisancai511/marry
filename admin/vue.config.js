/*
 * @Description:
 * @Version: 1.0
 * @Autor: lituo
 * @Date: 2022-02-11 12:19:36
 * @LastEditors: lituo
 * @LastEditTime: 2022-02-11 19:30:33
 */
"use strict";
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    disableHostCheck: true,
    proxy: {
      //配置跨域
      "/api": {
        // target: "http://machuxin.free.idcfengye.com/zapi",//马楚欣
        target: "https://i3.hnzwfw.gov.cn/zapi", //正式
        changOrigin: true,
        ws: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  // configureWebpack: (config) => {
  //   // 打包体积优化
  //   if (process.env.VUE_APP_ENV === "production") {
  //     // 为生产环境修改配置...
  //     config.mode = "production";
  //     //去除打印日志
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  //   }
  // },
  configureWebpack: (config) => {
    config.resolve.alias["@"] = resolve("src");
    if (process.env.NODE_ENV === "production") {
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;

      // GZIP压缩
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.(js|css)(\?.*)?$/i, // 需要压缩的文件正则
            threshold: 10240, // 对10K以上的数据进行压缩
            deleteOriginalAssets: false, // 压缩后保留原文件
          }),
          new FileManagerPlugin({
            events: {
              onEnd: {
                // delete: ["./yqfkprotal"],
                archive: [
                  {
                    source: "./dist",
                    destination: "./dist.zip",
                  },
                ],
              },
            },
          }),
        ],
      };
    }
  },
};
