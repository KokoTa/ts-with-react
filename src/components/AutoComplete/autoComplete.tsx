/*
 * @Author: KokoTa
 * @Date: 2021-05-11 10:12:28
 * @LastEditTime: 2021-05-12 17:02:00
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/AutoComplete/autoComplete.tsx
 */

import classNames from "classnames";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import useDebounce from "../../hooks/useDebounce";
import Icon from "../Icon/icon";
import Input, { InputProps } from "../Input/input";

interface IResourceData {
  value: string
}

export type ResourceData<T = {}> = T & IResourceData

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 获取数据的函数
   */
  fetchSuggestion: (str: string) => ResourceData[] | Promise<ResourceData[]>
  /**
   * 选择事件
   */
  onSelect?: (item: ResourceData) => void
  /**
   * 自定义下拉项模板
   */
  renderOption?: (item: ResourceData) => React.ReactElement
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestion,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestion, setSuggestion] = useState<ResourceData[]>([])
  const [loading, setLoading] = useState(false)
  const debounceValue = useDebounce(inputValue, 500) // 防抖
  const [hightLightIndex, setHightLightIndex] = useState(-1) // 高亮索引
  const triggerSearchFlag = useRef(false) // 由于用 useState 会导致无意义的刷新，因此用 useRef 来解决
  const componentRef = useRef<HTMLDivElement>(null)

  // 当点击容器外时，关闭 dropdown
  useClickOutside(componentRef, () => {
    setSuggestion([])
  })

  // 数据获取处理
  useEffect(() => {
    if (debounceValue && triggerSearchFlag.current) {
      const results = fetchSuggestion(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          setSuggestion(data)
        }).finally(() => {
          setLoading(false)
        })
      } else {
        setSuggestion(results)
      }
    } else {
      setSuggestion([])
    }
  }, [debounceValue, fetchSuggestion])

  // 处理输入
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearchFlag.current = true
  }

  // 处理选择
  const handleSelect = (item: ResourceData) => {
    setInputValue(item.value)
    triggerSearchFlag.current = false
    setSuggestion([])
    onSelect && onSelect(item)
  }

  // 处理某些键盘事件
  const formatHightLightIndex = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestion.length) index = suggestion.length
    setHightLightIndex(index)
  }
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        formatHightLightIndex(hightLightIndex - 1)
        break
      case 'ArrowDown':
        formatHightLightIndex(hightLightIndex + 1)
        break
      case 'Enter':
        suggestion[hightLightIndex] && handleSelect(suggestion[hightLightIndex])
        break
      case 'Escape':
        setSuggestion([])
        break
      default:
        break
    }
  }

  const renderTemplate = (item: ResourceData) => (renderOption ? renderOption(item) : item.value)
  const generateSuggestion = () => {
    return (
      <ul>
        {
          suggestion.map((item, index) => {
            const classes = classNames({
              'is-active': hightLightIndex === index
            })
            return (
              <li className={classes} key={index} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })
        }
      </ul>
    )
  }

  return (
    <div className="auto-complete" ref={componentRef}>
      <Input {...restProps} value={inputValue} onChange={handleChange} onKeyDown={handleKeydown}></Input>
      {loading && <div><Icon icon="spinner" spin></Icon></div>}
      {generateSuggestion()}
    </div>
  )
}

export default AutoComplete