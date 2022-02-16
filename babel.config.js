/*
 * @Author: seanchen
 * @Date: 2022-02-16 22:50:17
 * @LastEditTime: 2022-02-16 22:53:40
 * @LastEditors: seanchen
 * @Description:
 */
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
