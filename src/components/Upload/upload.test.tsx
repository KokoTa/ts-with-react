/*
 * @Author: KokoTa
 * @Date: 2021-05-17 13:50:36
 * @LastEditTime: 2021-05-17 16:39:35
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/Upload/upload.test.tsx
 */

import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Button from '../Button/button'
import Upload, { UploadProps } from './upload'
import axios from 'axios'

jest.mock('axios')

const mockAxios = axios as jest.Mocked<typeof axios>

const defaultProps: UploadProps = {
  action: 'fake_url',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}

const file = new File(['x'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {
  let wrapper: RenderResult
  let fileInput: HTMLInputElement
  let uploadArea: HTMLElement

  beforeEach(() => {
    wrapper = render(
      <Upload {...defaultProps}>
        <Button>Upload File</Button>
      </Upload>
    )
    fileInput = wrapper.container.querySelector('.upload-input') as HTMLInputElement
    uploadArea = wrapper.container.querySelector('.dragger') as HTMLDivElement
  })

  it('upload and remove file will work fine', async () => {
    // 模拟 axios 的请求
    // mockAxios.post.mockImplementation(() => Promise.resolve({ data: 'ok' }))
    mockAxios.post.mockResolvedValue({ data: 'ok' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    // 触发上传
    fireEvent.change(fileInput, { target: { files: [file] } })
    expect(wrapper.container.querySelector('.fa-spin')).toBeInTheDocument()
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(wrapper.container.querySelector('.fa-check-circle')).toBeInTheDocument()
    expect(defaultProps.onChange).toHaveBeenCalledWith(file)
    expect(defaultProps.onSuccess).toHaveBeenCalledWith('ok', file)
    // 删除文件
    expect(wrapper.container.querySelector('.fa-times')).toBeInTheDocument()
    fireEvent.click(wrapper.container.querySelector('.fa-times') as HTMLElement)
    expect(wrapper.queryByText('test.png')).not.toBeInTheDocument()
    expect(defaultProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'test.png',
        raw: file,
        status: 'success'
      })
    )
  })

  it('drag and drop will work fine', async () => {
    mockAxios.post.mockResolvedValue({ data: 'ok' })
    // 测试拖拽
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    // 拖拽上传
    fireEvent.drop(uploadArea, { dataTransfer: { files: [file] } })
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
  })
})
