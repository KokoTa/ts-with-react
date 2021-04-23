/*
 * @Author: KokoTa
 * @Date: 2021-04-22 15:56:29
 * @LastEditTime: 2021-04-22 16:03:36
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/UseStateDemo.tsx
 */
import React, { useState } from 'react';

const UseStateDemo: React.FC = () => {
  const [like, setLike] = useState(0)

  return <button onClick={() => setLike(like + 1)}>{like} 👍</button>
}

export default UseStateDemo