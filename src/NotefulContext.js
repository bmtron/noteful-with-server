import React, { Component } from 'react';


const NotefulContext = React.createContext({
    notes: '',
    folders: '',
    updateCount: () => {},
    updateNotes: () => {},
    updateFolders: () => {},
    deleteFolder: () => {},
    deleteNote: () => {}
})

export default NotefulContext;