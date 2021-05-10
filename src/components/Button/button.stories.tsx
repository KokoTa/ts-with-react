/*
 * @Author: KokoTa
 * @Date: 2021-05-06 15:21:49
 * @LastEditTime: 2021-05-10 10:50:13
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Button/button.stories.tsx
 */

import { Meta, Story } from "@storybook/react";
import Button, { ButtonProps } from "./button";

export default {
  title: 'Component/Button',
  component: Button,
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  }
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const DefaultButton = Template.bind({})
DefaultButton.args = {}