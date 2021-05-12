/*
 * @Author: KokoTa
 * @Date: 2021-05-10 16:21:22
 * @LastEditTime: 2021-05-12 16:42:51
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/Input/input.test.tsx
 */

import { fireEvent, render } from "@testing-library/react"
import Input from "./input"

const defaultProps = {
  onChange: jest.fn(),
  placeholder: 'test'
}

describe('test input component', () => {

  it('render default input', () => {
    const wrapper = render(<Input {...defaultProps}></Input>)
    const node = wrapper.getByPlaceholderText('test') as HTMLInputElement
    expect(node).toBeInTheDocument()
    expect(node).toHaveClass('input-inner')
    fireEvent.change(node, {
      target: { value: 'hello' }
    })
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(node.value).toEqual('hello')
  })
  it('render disabled input', () => {
    const wrapper = render(<Input {...defaultProps} disabled></Input>)
    const node = wrapper.getByPlaceholderText('test') as HTMLInputElement
    expect(node.disabled).toBeTruthy()
  })
  it('render different size input', () => {
    const wrapper = render(<Input {...defaultProps} size="sm"></Input>)
    const node = wrapper.container.querySelector('.input')
    expect(node).toHaveClass('input-sm')
  })
  it('render prepend and append element on input', () => {
    const { queryByText, container } = render(<Input placeholder="pend" prepend="https://" append=".com" />)
    const testContainer = container.querySelector('.input')
    expect(testContainer).toHaveClass('input-group input-group-append input-group-prepend')
    expect(queryByText('https://')).toBeInTheDocument()
    expect(queryByText('.com')).toBeInTheDocument()
  })
})