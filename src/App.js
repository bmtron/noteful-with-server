import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Main from './Main';
import Folder from './Folders/Folder';
import Note from './Notes/Note';
import NotefulContext from './NotefulContext';
import AddFolder from './Folders/AddFolder';
import AddNote from './Notes/AddNote';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: 1,
          name: 'Blank',
          content: 'Blank',
          folderid: 1
        },
        {
          id: 2,
          name: 'Blank',
          content: 'Blank',
          folderid: 2
        }
      ],
      folders: [
        {
          id: 1,
          name: 'blank'
        },
        {
          id: 2,
          name: 'Blank'
        }
      ]
    }
  }
  deleteFolder = (id) => {
    let newFolders = this.state.folders.filter(item => item.id !== id);
    this.setState({
      folders: newFolders
    })
  }
  deleteNote = (id) => {
    let newNotes = this.state.notes.filter(item => item.id !== id);
    this.setState({
      notes: newNotes
    })
  }
  updateFolders = (newFolder) => {
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }
 updateNotes = (newNote) => {
   this.setState({
     notes: [...this.state.notes, newNote]
   })
 }
  componentDidMount() {
    fetch(`http://localhost:8000/api/folders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(resJ => {
      this.setState({
        folders: resJ
      })
    });
    fetch(`http://localhost:8000/api/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(resJson => {
      this.setState({
        notes: resJson
      })
    })
    console.log(this.state)
  }
  render() {
    const contextData = {
      notes: this.state.notes,
      folders: this.state.folders,
      updateFolders: this.updateFolders,
      updateNotes: this.updateNotes,
      deleteFolder: this.deleteFolder,
      deleteNote: this.deleteNote
    }
    console.log(contextData)
    return (
      <div className='App'>
        <h1><Link to='/'>Noteful</Link></h1>
        <NotefulContext.Provider value={contextData}>
          <Route exact path='/' component={Main}/>
          <Route path='/folder/:folder_id' component={Folder}/>
          <Route path='/note/:note_id' component={Note}/>
          <Route path='/addFolder' component={AddFolder}/>
          <Route path='/addnote' component={AddNote}/>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default App;
