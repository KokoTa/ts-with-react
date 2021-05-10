/*
 * @Author: KokoTa
 * @Date: 2021-04-21 16:29:12
 * @LastEditTime: 2021-05-10 15:10:14
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/App.tsx
 */
import { useState } from 'react';
import UseStateDemo from './components/hooks/UseStateDemo'
import UseEffectDemo from './components/hooks/UseEffectDemo'
import UseRefDemo from './components/hooks/UseRefDemo'
import UseContextDemo from './components/hooks/UseContextDemo'
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import Input from './components/Input/input';

function App() {

  const [showUseEffectDemo, setShowUseEffectDemo] = useState(true)
  const [showButton, setShowButton] = useState(true)

  return (
    <div>
      <header>
        <h1>useState demo</h1>
        <UseStateDemo></UseStateDemo>

        <h1>useEffect demo</h1>
        <button onClick={() => setShowUseEffectDemo(!showUseEffectDemo)}>视图切换</button>
        {showUseEffectDemo && <UseEffectDemo></UseEffectDemo>}

        <h1>useRef demo</h1>
        <UseRefDemo></UseRefDemo>

        <h1>useContext demo</h1>
        <UseContextDemo></UseContextDemo>

        <hr />

        <h1>Button</h1>
        <Button onClick={(() => console.log('click'))}>Button</Button>
        <Button disabled={true}>Disabled</Button>
        <Button btnType='primary' size='lg'>Primary Large</Button>
        <Button btnType='danger' size='sm'>Danger Small</Button>
        <Button btnType='link' href="http://baidu.com">Link</Button>
        <Button btnType='link' href="http://baidu.com" disabled={true}>Link Disabled</Button>

        <h1>Menu</h1>
        <Menu defaultIndex="0" onSelect={(index: string) => console.log(index)} mode="vertical" defaultOpenSubMenus={["2"]}>
          <MenuItem>
            link1
          </MenuItem>
          <MenuItem disabled>
            link2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown1
            </MenuItem>
            <MenuItem>
              dropdown2
            </MenuItem>
          </SubMenu>
        </Menu>

        <h1>Icon</h1>
        <Icon icon="coffee" theme="primary" size="10x"></Icon>

        <h1>Transition</h1>
        <Button onClick={() => { setShowButton(!showButton) }}>Toggle Button</Button>
        <Transition in={showButton} timeout={300} animation="zoom-in-left" wrapper={true}>
          <Button>Hello</Button>
        </Transition>

        <h1>Input</h1>
        <Input placeholder="hello" prepend="hello" append="world"></Input>
      </header>
    </div>
  );
}

export default App;
