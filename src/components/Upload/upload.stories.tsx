/*
 * @Author: KokoTa
 * @Date: 2021-05-13 15:50:53
 * @LastEditTime: 2021-05-17 11:41:51
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/Upload/upload.stories.tsx
 */

import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import Button from '../Button/button'
import Upload, { UploadFile, UploadProps } from './upload'

export default {
  title: 'Component/Upload',
  component: Upload
} as Meta

const Template: Story<UploadProps> = (args) => (
  <Upload {...args}>
    <Button>Upload File</Button>
  </Upload>
)

export const DefaultUpload = Template.bind({})

// const beforeUploadBoolean = (file: File) => {
//   if ((file.size / 1024) > 50) {
//     console.log('file too big');
//     return false
//   }
//   return true
// }
// const beforeUploadPromise = (file: File) => {
//   const newFile = new File([file], 'name.docx', { type: file.type })
//   return Promise.resolve(newFile)
// }

const defaultFileList: UploadFile[] = [
  {
    uid: 'a',
    name: 'a.jpg',
    status: 'uploading',
    percent: 30,
    size: 100
  },
  {
    uid: 'b',
    name: 'b.jpg',
    status: 'success',
    percent: 100,
    size: 100
  },
  {
    uid: 'c',
    name: 'c.jpg',
    status: 'error',
    percent: 0,
    size: 100
  }
]

DefaultUpload.args = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onProgress: action('progress'),
  onSuccess: action('success'),
  onError: action('error'),
  // beforeUpload: beforeUploadPromise,
  onChange: action('change'),
  defaultFileList,
  onRemove: action('remove'),
  name: 'test file',
  withCredentials: true,
  data: {
    name: 'Brian'
  },
  accept: '.jpg',
  multiple: true,
  drag: true
}
