import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';

export default class Main extends Component {
    static contextType = NotefulContext;
    deleteFolder = (id) => {
        console.log(id)
        fetch(`http://localhost:8000/api/folders/${id}`, {
            method: 'DELETE'
        }).catch(error => {
            console.error(error)
        });
        this.context.deleteFolder(id);
    }
    handleDelete = (id) => {

        fetch(`http://localhost:8000/api/notes/${id}`, {
            method: 'DELETE'
        }).catch(error => {
            console.log(error)
        });
        this.context.deleteNote(id)
    }
    render() {
        const blankFolder = [{id: 1, content: 'stuff'}];
        const blankNote = [{id: 1, content: 'stuff', name: 'stuff', folderId: 1}];
        return (
            <div className="Main_route">
                <section className='Main_folders'>
                    {this.context.folders === '' ? <p></p> : this.context.folders.map((item, index) => {
                        return <section key={index} className="main_folder" >
                        <NavLink to={`/folder/${item.id}`}>{item.name}</NavLink>
                        <button onClick={() => this.deleteFolder(item.id)}>Delete Folder</button>
                        </section>
                    })}
                    <Link to='/addFolder'><button>Add Folder</button></Link>
                </section>
                <section className='Main_notes'>
                    {this.context.notes === '' ? <p></p> : this.context.notes.map((item, index) => {
                       return <section id={item.id} key={index}>
                        <Link to={`/note/${item.id}`}><p>{item.name}</p></Link>
                        <p>{item.content}</p>
                        <button onClick={() => this.handleDelete(item.id)}>Delete Note</button>
                       </section>
                    })}
                    <Link to="/addnote"><button>Add Note</button></Link>
                </section>
            </div>
        )
    }
}