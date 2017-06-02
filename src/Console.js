import React, { Component } from 'react'

import Toolbar from './Toolbar'
import './Console.css'

class Console extends Component {
  render() {
    const { handleInput, history, currentFolderName } = this.props
    return (
      <div className="console">
        <Toolbar title="magic lamp" />
        <div className="panel">
          <div className="editor">
            <div className="console-input-container">
              <ul className="console-output">
                {
                  history && history.map((cmd,idx)=><li key={idx}>{cmd}</li>)
                }
              </ul>
              <form className="console-input" onSubmit={handleInput}>
                  <span className="console-input-lead">{`magic_lamp:${currentFolderName}$  `}</span><input autoFocus type="text" name="command" className="console-input"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Console
