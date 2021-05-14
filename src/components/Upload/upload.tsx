import axios from 'axios'
import { ChangeEvent, useRef, useState } from 'react'
import Button from '../Button/button'
import UploadList from './uploadList'

/*
 * @Author: KokoTa
 * @Date: 2021-05-13 13:32:13
 * @LastEditTime: 2021-05-14 15:06:33
 * @LastEditors: KokoTa
 * @Description:
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
}

export const Upload: React.FC<UploadProps> = (props) => {
  const { action, beforeUpload, onProgress, onSuccess, onError, onChange, defaultFileList, onRemove } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const handleClick = () => {
    fileInput.current && fileInput.current.click()
  }

  const updateFileList = (updateFile: UploadFile, uploadInfo: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...uploadInfo }
        }
        return file
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
    setFileList([fileInfo, ...fileList])
    // 上传文件
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      // 监听进度
      onUploadProgress: (e) => {
        const percentage = Math.round(e.loaded / e.total * 100) || 0
        if (percentage < 100) {
          // 更新 state 默认是异步的，因此无法实时获取到 fileList 的值，但可以通过函数的方式获取
          // console.log(fileList);
          updateFileList(fileInfo, { percent: percentage, status: 'uploading' })
          onProgress && onProgress(percentage, file)
        }
      }
    }).then((res) => {
      console.log(res);
      updateFileList(fileInfo, { status: 'success', response: res.data })
      onChange && onChange(file)
      onSuccess && onSuccess(res.data, file)
    }).catch((err) => {
      console.log(err);
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
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid)
    })
    onRemove && onRemove(file)
  }

  return (
    <div className="upload">
      <Button onClick={handleClick}>Upload File</Button>
      <input ref={fileInput} type="file" className="upload-input" style={{ display: 'none' }} onChange={handleChange} />
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}

export default Upload
