/*
 * @Author: KokoTa
 * @Date: 2021-04-21 16:29:12
 * @LastEditTime: 2021-04-23 17:54:14
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/App.tsx
 */
import { useState } from 'react';
import UseStateDemo from './components/hooks/UseStateDemo'
import UseEffectDemo from './components/hooks/UseEffectDemo'
import UseRefDemo from './components/hooks/UseRefDemo'
import UseContextDemo from './components/hooks/UseContextDemo'

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
      </header>
    </div>
  );
}

export default App;
