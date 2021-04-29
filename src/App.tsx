/*
 * @Author: KokoTa
 * @Date: 2021-04-21 16:29:12
 * @LastEditTime: 2021-04-29 10:37:58
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/App.tsx
 */
import { useState } from 'react';
import UseStateDemo from './components/hooks/UseStateDemo'
import UseEffectDemo from './components/hooks/UseEffectDemo'
import UseRefDemo from './components/hooks/UseRefDemo'
import UseContextDemo from './components/hooks/UseContextDemo'
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {

  const [showUseEffectDemo, setShowUseEffectDemo] = useState(true)

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

        <hr/>

        <h1>Button</h1>
        <Button onClick={(() => console.log('click'))}>Button</Button>
        <Button disabled={true}>Disabled</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary Large</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Danger Small</Button>
        <Button btnType={ButtonType.Link} href="http://baidu.com">Link</Button>
        <Button btnType={ButtonType.Link} href="http://baidu.com" disabled={true}>Link Disabled</Button>

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
      </header>
    </div>
  );
}

export default App;
