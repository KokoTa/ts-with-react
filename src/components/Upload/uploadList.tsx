/*
 * @Author: KokoTa
 * @Date: 2021-05-14 11:17:54
 * @LastEditTime: 2021-05-14 14:55:07
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /ts-with-react/src/components/Upload/uploadList.tsx
 */

import Icon from "../Icon/icon"
import { UploadFile } from "./upload"

interface UploadListProps {
  fileList: UploadFile[]
  onRemove: (file: UploadFile) => void
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove
  } = props

  return (
    <ul className="upload-list">
      {
        fileList.map((item) => (
          <li className="upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon style={{ marginRight: '5px' }} icon="file-alt"></Icon>
              {item.name}
            </span>
            {item.status === 'uploading' && <Icon className="file-icon" icon="spinner" spin ></Icon>}
            {item.status === 'success' && <Icon className="file-icon" icon="check-circle" theme="success" ></Icon>}
            {item.status === 'error' && <Icon className="file-icon" icon="times-circle" theme="warning" ></Icon>}
            <Icon className="file-action" icon="times" onClick={() => onRemove && onRemove(item)}></Icon>
          </li>
        ))
      }
    </ul>
  )
}

export default UploadList