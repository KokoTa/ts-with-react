<!--
 * @Author: KokoTa
 * @Date: 2021-04-21 16:29:12
 * @LastEditTime: 2021-05-18 15:48:13
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/README.md
-->

# 项目说明

## 本地构建和测试

1. 构建：`yarn build-package`
2. 本地调试：本地库根目录使用 `npm link` + 目标项目使用 `npm link ts-with-react`
3. `package.json` 入口文，`main` 指向 CommonJS 规范的文件，`module` 指向 ES6 Module 规范的文件，`types` 指向 TS 声明文件
4. `npm link` 后本地库在目标项目使用可能会报 **react hook fail** 错误，这是因为本地库和目标项目使用的 react 版本不一致，可以通过在本地库中 `npm link [目标项目]/node_modules/react` 来让本地库使用目标项目的 react
