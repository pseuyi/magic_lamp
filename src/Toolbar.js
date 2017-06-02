import React, { Component } from 'react'

import './Toolbar.css'

class Toolbar extends Component {
  render() {
    const title = this.props.title
    return (
      <div className="toolbar">
        <ul className="controls">
          <li><a href="" className="close"></a></li>
          <li><a href="" className="minmax"></a></li>
          <li><a href="" className="minmax"></a></li>
        </ul>
        <div className="title">
          <span className="console-title">🔮 {title}—600x300</span>
        </div>
      </div>
    )
  }
}

export default Toolbar
