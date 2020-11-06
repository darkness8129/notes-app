import React, { Component } from 'react';
import SearchField from './SearchField';
import NoteEditor from './NoteEditor/NoteEditor';
import NotesGrid from './NotesGrid';
import styled from 'styled-components';

const StyledNotesApp = styled.div`
    max-width: 960px;
    width: 100%;
`;

const Title = styled.h1`
    text-align: center;
    font-weight: 500;
    color: grey;
    text-shadow: 0px 2px 3px rgba(255, 255, 255, 0.5);
`;

export default class NotesApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            displayedNotes: [],
            searchQuery: '',
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
        this.setState(
            {
                notes: newNotes,
            },
            () => this.handleNoteSearch(this.state.searchQuery)
        );
    }

    //func that add new note to array
    handleNoteAdd(newNote) {
        let newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);

        //callback need to search notes, when note added
        this.setState(
            {
                notes: newNotes,
            },
            () => this.handleNoteSearch(this.state.searchQuery)
        );
    }

    //func for searching notes
    handleNoteSearch(searchQuery) {
        let displayedNotes = this.state.notes.filter(function (note) {
            return (
                note.text.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
                -1
            );
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
            <StyledNotesApp>
                <Title>NotesApp</Title>
                <SearchField onSearch={this.handleNoteSearch} />
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid
                    notes={this.state.displayedNotes}
                    onNoteDelete={this.handleNoteDelete}
                />
            </StyledNotesApp>
        );
    }
}
