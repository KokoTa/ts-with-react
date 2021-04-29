/*
 * @Author: KokoTa
 * @Date: 2021-04-27 10:23:03
 * @LastEditTime: 2021-04-29 10:52:11
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/Menu/menu.test.tsx
 */

import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Menu, { IMenuProps } from './menu'
import MenuItem from "./menuItem"
import SubMenu from './subMenu'

const MenuTest: React.FC<IMenuProps> = (props) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        link3
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          dropdown1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .submenu-item {
      display: none;
    }
    .submenu-item.submenu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}

describe('test menu component', () => {
  let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
  const defaultProps: IMenuProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: 'test',
    mode: 'horizontal'
  }

  beforeEach(() => {
    wrapper = render(<MenuTest {...defaultProps}></MenuTest>)
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('render Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click MenuItem and call the callback', () => {
    const thirdElement = wrapper.getByText('link3')
    fireEvent.click(thirdElement)
    expect(thirdElement).toHaveClass('menu-item is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(defaultProps.onSelect).toHaveBeenCalledWith("2")
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(defaultProps.onSelect).not.toHaveBeenCalledWith("1")
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
  it('show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('dropdown1')).not.toBeVisible() // 需要有 css 支持，测试不会加入样式代码，需要手动加入
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => { // 由于代码调用了定时器，所以需要异步
      expect(wrapper.queryByText('dropdown1')).toBeVisible()
    })
    fireEvent.click(wrapper.getByText('dropdown1'))
    expect(defaultProps.onSelect).toHaveBeenCalledWith("3-0")
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(wrapper.queryByText('dropdown1')).not.toBeVisible()
    })
  })
  it('show dropdown items when click on subMenu and mode is vertical', () => {
    cleanup()
    const props: IMenuProps = {
      ...defaultProps,
      mode: 'vertical'
    }
    wrapper = render(<MenuTest {...props}></MenuTest>)
    wrapper.container.append(createStyleFile())
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.click(dropdownElement)
    expect(wrapper.getByText('dropdown1')).toBeVisible()
  })
  it('open dropdown items when defaultOpenSubMenus is supported and mode is vertical', () => {
    cleanup()
    const props: IMenuProps = {
      ...defaultProps,
      mode: 'vertical',
      defaultOpenSubMenus: ["3"]
    }
    wrapper = render(<MenuTest {...props}></MenuTest>)
    wrapper.container.append(createStyleFile())
    expect(wrapper.getByText('dropdown1')).toBeVisible()
  })
})