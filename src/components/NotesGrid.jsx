import React, { Component } from 'react';
import Masonry from 'masonry-layout';
import Note from './Note';
import styled from 'styled-components';

const StyledNotesGrid = styled.div`
    margin: 0 auto;
`;

export default class NotesGrid extends Component {
    constructor(props) {
        super(props);

        this.notesGrid = React.createRef();
    }

    //initializing the Masonry so that the blocks are laid with bricks
    componentDidMount() {
        this.msnry = new Masonry(this.notesGrid.current, {
            itemSelector: '.note',
            columnWidth: 200,
            fitWidth: true,
            gutter: 10,
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
            <StyledNotesGrid ref={this.notesGrid}>
                {
                    //passing parameters for each note
                    this.props.notes.map((note) => {
                        return (
                            <Note
                                key={note.id}
                                color={note.color}
                                onDelete={onNoteDelete.bind(null, note)}
                            >
                                {note.text}
                            </Note>
                        );
                    })
                }
            </StyledNotesGrid>
        );
    }
}
