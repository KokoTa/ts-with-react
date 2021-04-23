/*
 * @Author: KokoTa
 * @Date: 2021-04-21 16:29:12
 * @LastEditTime: 2021-04-23 11:08:16
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/App.tsx
 */
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import UseStateDemo from './components/hooks/UseStateDemo'
import UseEffectDemo from './components/hooks/UseEffectDemo'
import UseRefDemo from './components/hooks/UseRefDemo'
import UseContextDemo from './components/hooks/UseContextDemo'

function App() {

  const [showUseEffectDemo, setShowUseEffectDemo] = useState(true)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p className="title">useState demo</p>
        <UseStateDemo></UseStateDemo>

        <p className="title">useEffect demo</p>
        <button onClick={() => setShowUseEffectDemo(!showUseEffectDemo)}>视图切换</button>
        {showUseEffectDemo && <UseEffectDemo></UseEffectDemo>}

        <p className="title">useRef demo</p>
        <UseRefDemo></UseRefDemo>

        <p className="title">useContext demo</p>
        <UseContextDemo></UseContextDemo>

      </header>
    </div>
  );
}

export default App;
