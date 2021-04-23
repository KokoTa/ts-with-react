/*
 * @Author: KokoTa
 * @Date: 2021-04-23 14:22:02
 * @LastEditTime: 2021-04-23 14:25:16
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/hooks/context/themes.tsx
 */
import React from "react";

interface IThemeProps {
  [key: string]: {
    color: string;
    background: string;
  }
}

export const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#eee'
  },
  'dark': {
    color: '#fff',
    background: '#222'
  }
}

export const ThemeContext = React.createContext(themes.light)
