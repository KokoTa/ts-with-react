/*
 * @Author: KokoTa
 * @Date: 2021-04-23 10:01:33
 * @LastEditTime: 2021-04-23 11:01:55
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/hooks/UseRefDemo.tsx
 */
import React, { useState, useRef, useEffect } from 'react';

const UseStateDemo: React.FC = () => {
  const [like, setLike] = useState(0)
  const likeRef = useRef(0)
  const didMounted = useRef(true)
  const domRef = useRef<HTMLInputElement>(null)

  // 每次渲染的 state 都是相互独立的，这会导致延迟函数的取值问题
  function handleTimeout() {
    setTimeout(() => {
      console.log(like)
    }, 3000)
  }
  // 每次渲染的 useRef 都是同一个引用，可以解决取值问题
  // 另外，修改 useRef 不会触发 render
  function handleTimeout2() {
    setTimeout(() => {
      console.log(likeRef.current)
    }, 3000)
  }

  // useRef 可以进行生命周期的区分
  // 因为 useEffect 不传第二个参数默认是 mounted + updated 的
  // 这里用 useRef 来区分 mounted 和 updated
  useEffect(() => {
    if (didMounted.current) {
      didMounted.current = false
      console.log('mounted')
    } else {
      console.log('updated')
    }
  })

  // useRef 可以获取 DOM 节点
  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus()
    }
  })

  return (
    <>
      <button onClick={() => {
        setLike(like + 1)
        likeRef.current++
      }}>{like} 👍</button>
      <button onClick={() => handleTimeout()}>console</button>
      <button onClick={() => handleTimeout2()}>console2</button>
      <input type="text" ref={domRef} />
    </>
  )
}

export default UseStateDemo