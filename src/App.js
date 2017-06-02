import React, { Component } from 'react'

import Console from './Console'
import Files from './Files'
import './App.css'

// node class represents each folder/file
class Node {
  constructor (name, type, path, parent) {
    this.name = name
    this.type = type
    this.path = path
    this.parent = parent
    this.children = [] // files should not have children however...
  }
  add (thing) {
    this.children.push(thing)
  }
  remove (thing) {
    this.children = this.children.filter(child=>child.name!==thing)
  }
}

class App extends Component {
  constructor () {
    super()
    const root = new Node ('root', 'folder', '/')
    this.state = {
      currentFolder: root,
      directory: root,
      history: [],
    }
  }
  handleInput = event => {
    event.preventDefault()
    let command = event.target.command.value // command as full string
    let flags = command.split(' ')
    let cmd = flags.splice(0,1)
    // add to command history
    this.setState({history: this.state.history.concat(command)})
    // execute command
    this.processCommand(...cmd, [...flags])
    // reset console input
    event.target.command.value = ""
  }
  processCommand = (cmd, arr) => {
    const path = this.state.currentFolder.path
    function createPath (name) { return path === '/'? '/' + name : path + '/' + name }
    const parent = this.state.currentFolder
    // for this simple app, i chose to explicity define each state change in the component to better illustrate the nested tree structure
    switch(cmd) {
      case "mkdir":
        const newFolders = []
        arr.forEach(name=>newFolders.push(new Node (name, 'folder', createPath(name), parent)))
        const addedFolders = this.addThings(parent.path, newFolders)
        this.setState({directory: addedFolders})
        break;
      case "touch":
        const newFiles = []
        arr.forEach(name=>newFiles.push(new Node (name, 'file', createPath(name), parent)))
        const addedFiles = this.addThings(parent.path, newFiles)
        this.setState({directory: addedFiles})
        break;
      case "ls":
        const files = []
        this.state.currentFolder.children.forEach(child=>{
          if(child.type==="file") files.push(child.name)
        })
        // the ls cmd only alters the log, not the actual directory
        this.setState({history: this.state.history.concat(files.join('  '))})
        break;
      case "cd":
        if(arr[0]==="..") {
          this.setState({currentFolder: this.state.currentFolder.parent})
        }
        else {
          const next = this.state.currentFolder.children.filter(child=>child.name===arr[0])
          // only cd into folders
          if(next[0].type === "folder") this.setState({currentFolder: next[0]})
        }
        break;
      case "rm":
        const deleted = this.removeThings(parent.path, arr)
        this.setState({directory: deleted})
        break;
      case "pwd":
        this.setState({history: this.state.history.concat(this.state.currentFolder.path)})
        break;
      case "echo":
        this.setState({history: this.state.history.concat(arr)})
        break;
      case "genie":
        const msg = this.pickAnswer()
        this.setState({history: this.state.history.concat(msg)})
        break;
      default:
        return
    }
  }
  // helper function which traverses the directory structure to find the right place to add a file or folder
  addThings = (path, things) => {
    // reference to mutated directory
    const directory = this.state.directory
    let name
    let curr = this.state.directory
    // splice out root slash '/'
    const paths = path.length > 1? path.split('/').splice(1): []
    while(paths.length) {
      name = paths.shift()
      curr = curr.children.find(child=>child.name===name)
    }
    things.forEach(thing=>curr.add(thing))
    return directory
  }
  removeThings = (path, things) => {
    const directory = this.state.directory
    let name
    let curr = this.state.directory
    const paths = path.length > 1? path.split('/').splice(1): []
    while(paths.length) {
      name = paths.shift()
      curr = curr.children.find(child=>child.name===name)
    }
    things.forEach(thing=>curr.remove(thing))
    return directory
  }
  pickAnswer = () => {
    const answers = [
      "It is certain", "It is decidedly so", "Without a doubt",
      "Yes definitely", "You may rely on it", "As I see it, yes",
      "Most likely", "Outlook good", "Yes", "Signs point to yes",
      "Reply hazy try again", "Ask again later", "Better not tell you now",
      "Cannot predict now", "Concentrate and ask again",
      "Don't count on it", "My reply is no", "My sources say no",
      "Outlook not so good", "Very doubtful"
    ]
    return answers[Math.floor(Math.random() * answers.length)]
  }
  render() {
    return (
      <div className="App">
        <h1 className="centered">magic lamp</h1>
          <Console
            handleInput={this.handleInput}
            history={this.state.history}
            currentFolderName={this.state.currentFolder.name}
          />
          <Files
            directory={this.state.directory}
            currentFolder={this.state.currentFolder}
          />
        <h4>see more at <a href="github.com/pseuyi">github</a></h4>
      </div>
    )
  }
}

export default App
