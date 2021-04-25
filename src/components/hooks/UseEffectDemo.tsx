/*
 * @Author: KokoTa
 * @Date: 2021-04-22 16:20:59
 * @LastEditTime: 2021-04-25 10:13:35
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/hooks/UseEffectDemo.tsx
 */
import React, { useEffect, useState } from 'react';
import useMousePosition from './customHooks/useMousePosition'
import useURLLoader from './customHooks/useURLLoader'

const UseEffectDemo: React.FC = () => {
  const [like, setLike] = useState(0)
  // const [position, setPosition] = useState({ x: 0, y: 0 })

  // 每次渲染都会触发，即只要有视图操作就会触发
  useEffect(() => {
    console.log('触发')
  })

  // 根据 like 值进行触发
  useEffect(() => {
    document.title = `点击了${like}次`
  }, [like])

  // 只会触发一次
  // useEffect(() => {
  //   const positionHandle = (e: MouseEvent) => {
  //     const { clientX: x, clientY: y } = e
  //     setPosition({ x, y })
  //   }
  //   window.addEventListener('click', positionHandle)
  //   return () => {
  //     window.removeEventListener('click', positionHandle)
  //   }
  // }, [])

  // 自定义 hook
  const position = useMousePosition()
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random')


  return (<>
    <button onClick={() => setLike(like + 1)}>点击了 {like} 次</button>
    <p>x:{position.x} y: {position.y}</p>
    { loading ? <p>🐶 读取中...</p> : <img style={{ width: '100px' }} src={data && data.message} alt="dog" />}
  </>)
}

export default UseEffectDemo