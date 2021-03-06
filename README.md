<!--
 * @Author: KokoTa
 * @Date: 2021-04-21 16:29:12
 * @LastEditTime: 2021-05-19 14:14:13
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

## 发布

1. `npm whoami` + `npm adduser`，注意需要使用 npm 的 registry 而不要用代理
2. `npm publish`
3. 由于 `npm install [包]` 会下载包中的 dependencies，因此包中的非核心依赖最好放到 devDependencies 中以精简依赖。同时为了解决包和项目中 react 冲突的问题，需要设置 peerDependencies
4. 使用 `husky` 包在提交前进行代码格式化验证和单元测试
5. 使用特定的 npm 钩子来执行命令
6. 完善 `package.json` 的其他信息
