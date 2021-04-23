/*
 * @Author: KokoTa
 * @Date: 2021-04-22 17:42:30
 * @LastEditTime: 2021-04-23 10:27:12
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /ts-with-react/src/components/hooks/customHooks/UseURLLoader.tsx
 */
import { useEffect, useState } from 'react';
import axios from 'axios';

const useURLLoader = (url: string) => {
  const [data, setData] = useState<any>(null) // 设置 null 默认类型推断为 null，这里数据可能为任意类型
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(url).then((res) => {
      setData(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [url])

  return [data, loading]
}

export default useURLLoader