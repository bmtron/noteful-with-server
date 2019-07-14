import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';

export default class AddNote extends Component {
    static contextType = NotefulContext;
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            content: '',
            folderId: ''
        }
    }
    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }
    handleContentChange(e) {
        this.setState({
            content: e.target.value
        })
    }
    handleFolderIdChange(e) {
        this.setState({
            folderId: e.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newNote = {
            name: this.state.name,
            content: this.state.content,
            folderId: this.state.folderId
        }
        fetch(`http://localhost:8000/api/notes`, {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(responseJson => {
            console.log(responseJson);
            this.context.updateNotes(responseJson);
            this.props.history.push('/');
        })
        .catch(error => {
            console.error(error);
        })
    }
    render() {
        
        return (
            <div className="addnote_main">
                <section onClick={() => this.props.history.goBack()}>Go Back</section>
                <form onSubmit={(e) => this.handleSubmit(e)} className='addnote'>
                    <label htmlFor="name">Name</label>
                    <input name="name" id="name" type="text" defaultValue='' onChange={(e) => this.handleNameChange(e)}/>

                    <label htmlFor="content">Content</label>
                    <input name="content" id="name" type="text" defaultValue='' onChange={(e) => this.handleContentChange(e)}></input>

                    <label htmlFor="folder">Select Folder</label>
                    <select name="folder" id="folder" type="text" onChange={(e) => this.handleFolderIdChange(e)}>
                        {this.context.folders ? this.context.folders.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        }) : <option value="0">Blank</option>}
                    </select>
                    <button type="submit">Add Note</button>
                </form>
            </div>
        )
    }
}