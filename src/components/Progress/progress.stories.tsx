/*
 * @Author: KokoTa
 * @Date: 2021-05-14 15:38:38
 * @LastEditTime: 2021-05-14 15:39:35
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/Progress/progress.stories.tsx
 */
import { Meta, Story } from "@storybook/react";
import Progress, { ProgressProps } from "./progress";

export default {
  title: 'Component/Progress',
  component: Progress
} as Meta

const Template: Story<ProgressProps> = (args) => <Progress {...args}></Progress>

export const DefaultProgress = Template.bind({})
DefaultProgress.args = {}