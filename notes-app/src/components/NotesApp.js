import React, { Component } from 'react';
import '../style/notes-app.css';
import SearchField from './SearchField.js';
import NoteEditor from './NoteEditor.js';
import NotesGrid from './NotesGrid.js';

export default class NotesApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            displayedNotes: []
        };

        this.handleNoteDelete = this.handleNoteDelete.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleNoteSearch = this.handleNoteSearch.bind(this);
        this._updateLocalStorage = this._updateLocalStorage.bind(this);
    }

    //when component updated - update localStorage 
    componentDidUpdate() {
        this._updateLocalStorage();
    }

    //when component mount takes notes from localStorage
    componentDidMount() {
        let localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({
                notes: localNotes,
                displayedNotes: localNotes,
                searchQuery: ""
            });
        }
    }

    //func for deleting note
    handleNoteDelete(note) {
        let noteId = note.id;
        let newNotes = this.state.notes.filter(function (note) {
            return note.id !== noteId;
        });

        //callback need to search notes, when note deleted
        this.setState({
            notes: newNotes
        }, () => this.handleNoteSearch(this.state.searchQuery));
    }

    //func that add new note to array
    handleNoteAdd(newNote) {
        let newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);

        //callback need to search notes, when note added
        this.setState({
            notes: newNotes
        }, () => this.handleNoteSearch(this.state.searchQuery));
    }

    //func for searching notes
    handleNoteSearch(searchQuery) {
        let displayedNotes = this.state.notes.filter(function (note) {
            return note.text.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
        });

        this.setState({ displayedNotes, searchQuery });
    }

    //write notes to localStorage
    _updateLocalStorage() {
        let notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }

    render() {
        return (
            <div className="notes-app">
                <h1 className="app-header">NotesApp</h1>
                <SearchField onSearch={this.handleNoteSearch} />
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.displayedNotes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    }

}