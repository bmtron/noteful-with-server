import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';

export default class AddFolder extends Component {
    static contextType = NotefulContext;
    constructor(props) {
        super(props);
        this.state = {
            folderName: '',
            count: "one"
        }
    }
    handleChange = e => {
        this.setState({
            folderName: e.target.value
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.addfolder.value;
        let newFolder = {
            name: name, 
        }
        fetch(`http://localhost:8000/api/folders`, {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
            return res.json()
          })
          .then(responseJson => {
            console.log(responseJson)
            this.context.updateFolders(responseJson)
            this.props.history.push('/');
        }).catch(error => {
            console.error(error)
        });
    }
    render() {
        
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <fieldset>
                    <label htmlFor="addfolder">Folder Name</label>
                    <input name="addfolder" id="addfolder" onChange={(e) => this.handleChange(e)} defaultValue={this.state.folderName}></input>
                </fieldset>
                <button type="submit">Add</button>
            </form>
        )
    }
}