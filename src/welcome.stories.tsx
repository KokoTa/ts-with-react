/*
 * @Author: KokoTa
 * @Date: 2021-05-18 17:14:54
 * @LastEditTime: 2021-05-18 17:39:27
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/welcome.stories.tsx
 */

import { Meta, Story } from '@storybook/react'

export default {
  title: 'Welcome'
} as Meta

const Template: Story = () => {
  return (
    <div>
      <h1>Welcome to React components document</h1>
      <hr />
      <h4>Install</h4>
      <code>npm install ts-with-react --save</code>
    </div>
  )
}

export const Welcome = Template.bind({})
