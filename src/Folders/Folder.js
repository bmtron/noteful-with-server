import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from '../NotefulContext';


export default class Folder extends Component {
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
        const folder = this.context.folders.find(item => item.id.toString() === this.props.match.params.folder_id) || {};
        console.log(this.context)
        console.log(folder.name)
        return (
            <div className="Main_route">
                <section className="Main_folders">
                {this.context.folders.map((item, index) => {
                   return <section key={index} className="main_folder" >
                       <NavLink to={`/folder/${item.id}`}>{item.name}</NavLink>
                       <button onClick={() => this.deleteFolder(item.id)}>Delete Folder</button>
                       </section>
                })}
                <Link to='/addFolder'><button>Add Folder</button></Link>
                </section>
                <section className="Main_notes">
                    {this.context.notes.map((item, index) => {
                        if(item.folderid === folder.id) {
                            return <section key={index}>
                                        <Link to={`/note/${item.id}`}><p>{item.name}</p></Link>
                                        <p>{item.content}</p>
                                        <button onClick={() => this.handleDelete(item.id)}>Delete Note</button>
                                </section>
                        }
                    })}
                    <Link to="/addnote"><button>Add Note</button></Link>
                </section>
            </div>
        )
    }
}