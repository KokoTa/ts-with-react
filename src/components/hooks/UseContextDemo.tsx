/*
 * @Author: KokoTa
 * @Date: 2021-04-23 11:07:47
 * @LastEditTime: 2021-04-23 14:25:29
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/hooks/UseContextDemo.tsx
 */
import React, { useContext } from 'react';
import { themes, ThemeContext } from './context/themes'

const ThemeButton: React.FC = () => {
  const theme = useContext(ThemeContext);
  const { color, background } = theme;
  return <h1 style={{color, background}}>Theme</h1>
}

const UseContextDemo: React.FC = () => {
  return (
    <ThemeContext.Provider value={themes.light} >
      <ThemeButton></ThemeButton>
    </ThemeContext.Provider>
  )
}

export default UseContextDemo