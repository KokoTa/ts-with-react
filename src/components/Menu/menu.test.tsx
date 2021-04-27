/*
 * @Author: KokoTa
 * @Date: 2021-04-27 10:23:03
 * @LastEditTime: 2021-04-27 17:35:37
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Menu/menu.test.tsx
 */

import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Menu, { IMenuProps } from './menu'
import MenuItem from "./menuItem"

const MenuTest: React.FC<IMenuProps> = (props) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
      </MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>
        link3
      </MenuItem>
    </Menu>
  )
}

describe('test menu component', () => {
  let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
  const defaultProps: IMenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
  }

  beforeEach(() => {
    wrapper = render(<MenuTest {...defaultProps}></MenuTest>)
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('render Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click MenuItem and call the callback', () => {
    const thirdElement = wrapper.getByText('link3')
    fireEvent.click(thirdElement)
    expect(thirdElement).toHaveClass('menu-item is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(defaultProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('render Menu when mode is vertical', () => {
    cleanup() // 清除 beforeEach 生成的内容
    const props: IMenuProps = {
      ...defaultProps,
      mode: 'vertical'
    }
    wrapper = render(<MenuTest {...props}></MenuTest>)
    menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})