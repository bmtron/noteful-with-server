import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';

export default class Note extends Component {
    static contextType= NotefulContext;

    handleDelete = (id) => {

        fetch(`http://localhost:8000/api/notes/${id}`, {
            method: 'DELETE'
        }).catch(error => {
            console.log(error)
        });
        this.context.deleteNote(id)
    }
    render() {
        console.log(this.context)
        const note = this.context.notes.find(item => item.id.toString() === this.props.match.params.note_id) || {};
        const folder = this.context.folders.find(item => item.id === note.folderid) || {};
        
        return(
            <div className="Main_route">
                <section className="Main_folders">
                    <button onClick={() => this.props.history.goBack()}>Go Back</button>
                    <p>{folder.name}</p>
                </section>
                <section className="Main_notes">
                    <section className="big_note">
                        <p>{note.name}</p>
                        <p>{note.content}</p>
                    </section>
                    <Link to="addnote"><button >Add Note</button></Link>
                    <button onClick={() => this.handleDelete(parseInt(this.props.match.params.note_id, 10))}>Delete Note</button>
                </section>
            </div>
        )
    }
}