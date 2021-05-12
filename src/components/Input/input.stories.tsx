/*
 * @Author: KokoTa
 * @Date: 2021-05-06 15:21:49
 * @LastEditTime: 2021-05-11 09:39:57
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Input/input.stories.tsx
 */

import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import Input, { InputProps } from "./input";

export default {
  title: 'Component/Input',
  component: Input,
} as Meta

const Template: Story<InputProps> = (args) => <Input {...args}></Input>

export const DefaultInput = Template.bind({})
DefaultInput.args = {}

export const IconInput = Template.bind({})
IconInput.args = {
  icon: 'coffee'
}

export const PrependInput = Template.bind({})
PrependInput.args = {
  prepend: 'https://'
}

export const AppendInput = Template.bind({})
AppendInput.args = {
  append: (<span>.com</span>)
}

export const DisabledInput = Template.bind({})
DisabledInput.args = {
  disabled: true
}

// 受控组件测试
// https://zh-hans.reactjs.org/docs/uncontrolled-components.html#default-values
export const ControllerInput: Story<InputProps> = (props) => {
  const [value, setValue] = useState('')
  return <Input {...props} value={value} defaultValue={value} onChange={(e) => {
    setValue(e.target.value)
    console.log(value)
  }}></Input >
}