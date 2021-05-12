/*
 * @Author: KokoTa
 * @Date: 2021-05-06 14:00:37
 * @LastEditTime: 2021-05-11 14:10:20
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/.storybook/preview.js
 */

import '../src/styles/index.scss'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true
  },
}

// 全局装饰器
export const decorators = [
  (Story) => (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  ),
];