import React, { Component } from 'react'

import Toolbar from './Toolbar'
import './Console.css'
import './Files.css'

class Files extends Component {
  render() {
    const { currentFolder } = this.props
    return (
      <div className="files">
        <Toolbar title="directory" />
        <div className="directories">
          <ol className="directory navbar">
            {
              currentFolder && currentFolder.name
            }
          </ol>
          <ol className="directory">
          {
            currentFolder.children && currentFolder.children.map((file, idx)=>(
              <li key={idx} className={file.type === "folder"? "folder" : "file"}>{file.name}</li>
            ))
          }
          </ol>
        </div>
      </div>
    )
  }
}

export default Files
