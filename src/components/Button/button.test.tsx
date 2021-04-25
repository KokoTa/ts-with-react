/*
 * @Author: KokoTa
 * @Date: 2021-04-25 15:45:31
 * @LastEditTime: 2021-04-25 17:40:20
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Button/button.test.tsx
 */
import React from 'react';
import { fireEvent, render } from "@testing-library/react"
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button"


describe('test Button component', () => {
  it('render default button', () => {
    const defaultProps = {
      onClick: jest.fn(),
    }
    const wrapper = render(<Button {...defaultProps}>button</Button>)
    const element = wrapper.getByText('button')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('render button when props is different', () => {
    const defaultProps: ButtonProps = {
      btnType: ButtonType.Primary,
      size: ButtonSize.Large,
      className: 'test-class'
    }
    const wrapper = render(<Button {...defaultProps}>button</Button>)
    const element = wrapper.getByText('button')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-lg btn-primary test-class')
  })

  it('render button when type is link and href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">button</Button>)
    const element = wrapper.getByText('button')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('render button when disabled is true', () => {
    const defaultProps: ButtonProps = {
      disabled: true,
      onClick: jest.fn()
    }
    const wrapper = render(<Button {...defaultProps}>button</Button>)
    const element = wrapper.getByText('button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})