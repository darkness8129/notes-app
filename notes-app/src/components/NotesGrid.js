import React, { Component } from 'react';
import Masonry from 'masonry-layout';
import '../style/notes-grid.css';
import Note from './Note.js';

export default class NotesGrid extends Component {
    constructor(props){
        super(props);

        this.notesGrid = React.createRef();
    }

    //initializing the Masonry so that the blocks are laid with bricks 
    componentDidMount() {
        this.msnry = new Masonry(this.notesGrid.current, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10
        });
    }

    //compare the array before and after adding note, rebuild the masonry
    componentDidUpdate(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }

    render() {
        let onNoteDelete = this.props.onNoteDelete;
        return (
            <div className="notes-grid" ref={this.notesGrid}>
                {
                    //passing parameters for each note
                    this.props.notes.map((note) => {
                        return (
                            <Note
                                key={note.id}
                                color={note.color}
                                onDelete={onNoteDelete.bind(null, note)}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
}