/*
 * @Author: KokoTa
 * @Date: 2021-05-12 14:03:10
 * @LastEditTime: 2021-05-12 17:55:46
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/AutoComplete/autoComplete.test.tsx
 */

import { cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react"
import { config } from "react-transition-group"
import AutoComplete, { ResourceData } from "./autoComplete"

// 关掉 transition 效果
config.disabled = true

const arr = [
  { value: 'a', number: 1 },
  { value: 'aa', number: 2 },
  { value: 'b', number: 3 },
  { value: 'bb', number: 4 },
  { value: 'c', number: 5 },
  { value: 'cc', number: 6 },
]
const defaultProps = {
  fetchSuggestion: (query: string) => arr.filter(item => item.value.includes(query)),
  onSelect: jest.fn(),
  placeholder: 'test'
}

describe('test AutoComplete', () => {
  let wrapper: RenderResult
  let inputNode: HTMLInputElement

  beforeEach(() => {
    wrapper = render(<AutoComplete {...defaultProps}></AutoComplete>)
    inputNode = wrapper.getByPlaceholderText('test') as HTMLInputElement
  })

  test('basic behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('aa')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll('li').length).toEqual(2)
    fireEvent.click(wrapper.getByText('a'))
    expect(defaultProps.onSelect).toHaveBeenCalledWith({ value: 'a', number: 1 })
    expect(wrapper.queryByText('a')).not.toBeInTheDocument() // 注意这里使用 queryByText 而不是 getByText
    expect(inputNode.value).toEqual('a')
  })

  test('keyboard behavior', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('aa')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('a')
    const secondResult = wrapper.queryByText('aa')
    fireEvent.keyDown(inputNode, { key: 'ArrowDown' })
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, { key: 'ArrowDown' })
    expect(secondResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, { key: 'ArrowUp' })
    expect(firstResult).toHaveClass('is-active')
    fireEvent.keyDown(inputNode, { key: "Enter" })
    expect(defaultProps.onSelect).toHaveBeenCalledWith({ value: 'a', number: 1 })
    expect(wrapper.queryByText('a')).not.toBeInTheDocument()
  })

  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('aa')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('aa')).not.toBeInTheDocument()
  })

  it('renderOption show right template', async () => {
    cleanup()
    const renderOption = (item: ResourceData) => (<h1>{item.value}</h1>)
    wrapper = render(<AutoComplete {...defaultProps} renderOption={renderOption}></AutoComplete>)
    inputNode = wrapper.getByPlaceholderText('test') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('aa')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelectorAll('h1').length).toEqual(2)
  })

  it('async fetchSuggestion work fine', async () => {
    cleanup()
    const fetchSuggestion = async () => [{ value: 'a', number: 1 }]
    wrapper = render(<AutoComplete {...defaultProps} fetchSuggestion={fetchSuggestion}></AutoComplete>)
    inputNode = wrapper.getByPlaceholderText('test') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await waitFor(() => {
      expect(wrapper.queryByText('a')).toBeInTheDocument()
    })
  })
})