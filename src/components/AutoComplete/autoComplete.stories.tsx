/*
 * @Author: KokoTa
 * @Date: 2021-05-11 10:33:52
 * @LastEditTime: 2021-05-11 16:50:29
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/AutoComplete/autoComplete.stories.tsx
 */

import { Meta, Story } from "@storybook/react";
import { action } from '@storybook/addon-actions'
import AutoComplete, { AutoCompleteProps, ResourceData } from "./autoComplete";

export default {
  title: 'Component/AutoComplete',
  component: AutoComplete
} as Meta

const Template: Story<AutoCompleteProps> = (args) => <AutoComplete {...args}></AutoComplete>

export const DefaultAutoComplete = Template.bind({})
DefaultAutoComplete.args = {
  fetchSuggestion: (query: string) => {
    const data = [
      { value: 'a', number: 1 },
      { value: 'aa', number: 2 },
      { value: 'b', number: 3 },
      { value: 'bb', number: 4 },
      { value: 'c', number: 5 },
      { value: 'cc', number: 6 },
    ]
    return data.filter(item => item.value.includes(query))
  },
  onSelect: action('selected'),
  renderOption: (item: ResourceData) => (<h1>{item.value}</h1>)
}

export const AsyncAutoComplete = Template.bind({})
AsyncAutoComplete.args = {
  fetchSuggestion: async (query: string) => {
    const res = await fetch(`https://api.github.com/search/users?q=${query}`)
    const data = await res.json()
    return data.items ? data.items.map((item: any) => {
      item.value = item.login
      return item
    }) : []
  },
  onSelect: action('selected'),
  renderOption: (item: ResourceData) => (<h1>{item.value}</h1>)
}