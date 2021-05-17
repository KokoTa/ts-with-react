import axios from 'axios'
import { ChangeEvent, useRef, useState } from 'react'
import Button from '../Button/button'
import UploadList from './uploadList'

/*
 * @Author: KokoTa
 * @Date: 2021-05-13 13:32:13
 * @LastEditTime: 2021-05-17 10:43:25
 * @LastEditors: KokoTa
 * @Description:
 *  基本需求：
 *  1. 点击按钮选择文件
 *  2. 选择后上传文件
 *  3. 上传文件时监听进度
 *  4. 显示上传文件和上传进度
 *  需求更新：
 *  1. 添加自定义 header
 *  2. 添加自定义 name
 *  3. 添加自定义 post formData
 *  4. 选择是否携带 cookie
 *  5. 添加 input multiple 属性
 *  6. 添加 input accept 属性
 * @FilePath: /ts-with-react/src/components/Upload/upload.tsx
 */

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: 'ready' | 'uploading' | 'success' | 'error'
  percent?: number
  raw?: File
  response?: any
  error?: any
}

export interface UploadProps {
  action: string
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  defaultFileList?: UploadFile[]
  onRemove: (file: UploadFile) => void
  headers?: { [key: string]: any }
  name?: string
  data?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple: boolean
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    defaultFileList,
    onRemove,
    name,
    data,
    headers,
    withCredentials,
    accept,
    multiple
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileInfoList, setFileInfoList] = useState<UploadFile[]>(defaultFileList || [])

  const handleClick = () => {
    fileInput.current && fileInput.current.click()
  }

  const updateFileList = (updateFile: UploadFile, uploadInfo: Partial<UploadFile>) => {
    setFileInfoList((prevList) => {
      return prevList.map((fileInfo) => {
        if (fileInfo.uid === updateFile.uid) {
          return { ...fileInfo, ...uploadInfo }
        }
        return fileInfo
      })
    })
  }

  const uploadRequest = (file: File) => {
    // 文件信息
    const fileInfo: UploadFile = {
      uid: Date.now().toString(),
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setFileInfoList((prevList) => [fileInfo, ...prevList])
    // 上传文件
    const formData = new FormData()
    formData.append(name || file.name, file)
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers,
        withCredentials,
        // 监听进度
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded / e.total) * 100) || 0
          if (percentage < 100) {
            // 更新 state 默认是异步的，因此无法实时获取到 fileList 的值，但可以通过函数的方式获取
            // console.log(fileList);
            updateFileList(fileInfo, { percent: percentage, status: 'uploading' })
            onProgress && onProgress(percentage, file)
          }
        }
      })
      .then((res) => {
        console.log(res)
        updateFileList(fileInfo, { status: 'success', response: res.data })
        onChange && onChange(file)
        onSuccess && onSuccess(res.data, file)
      })
      .catch((err) => {
        console.log(err)
        updateFileList(fileInfo, { status: 'error', error: err })
        onChange && onChange(file)
        onError && onError(err, file)
      })
  }

  const uploadFiles = (files: FileList) => {
    const fileArray = Array.from(files)
    fileArray.forEach((file) => {
      if (!beforeUpload) {
        uploadRequest(file)
      } else {
        const result = beforeUpload(file) // 结果可能是布尔值，也可能是 Promise
        if (result && result instanceof Promise) {
          result.then((res) => uploadRequest(res))
        } else if (result) {
          uploadRequest(file)
        }
      }
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFiles(files)
    if (fileInput.current) fileInput.current.value = '' // 清空 input 的数据
  }

  const handleRemove = (file: UploadFile) => {
    setFileInfoList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    onRemove && onRemove(file)
  }

  return (
    <div className="upload">
      <Button onClick={handleClick}>Upload File</Button>
      <input
        ref={fileInput}
        type="file"
        className="upload-input"
        style={{ display: 'none' }}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
      />
      <UploadList fileList={fileInfoList} onRemove={handleRemove}></UploadList>
    </div>
  )
}

Upload.defaultProps = {
  name: 'file',
  withCredentials: false
}

export default Upload
