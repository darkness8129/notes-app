import React, { Component } from 'react';
import styled from 'styled-components';
import ButtonsPanel from './ButtonsPanel';

const StyledNoteEditor = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 16px;
    margin: 16px auto;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 2px;
    display: flex;
    flex-direction: column;
`;

const Textarea = styled.textarea.attrs((props) => ({
    placeholder: 'Enter your note here...',
    rows: 7,
}))`
    &:focus {
        outline: 0;
    }

    width: 100%;
    resize: none;
    margin: 5px;
    font-size: 14px;
    border: none;
    font-weight: 300;
`;

export default class NoteEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            color: '#f3f56c',
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleNodeAdd = this.handleNodeAdd.bind(this);
    }

    //func for changing state text of component
    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    //func for changing color of note
    handleColorChange(value) {
        this.setState({ color: value });
    }

    //func that create new note and causes callback
    handleNodeAdd() {
        if (this.state.text) {
            let newNote = {
                text: this.state.text,
                color: this.state.color,
                id: Date.now(),
            };

            this.props.onNoteAdd(newNote);
            //del text from area when note added
            this.setState({ text: '' });
        } else {
            this.setState({
                text: 'You should write something in your note! ',
            });
        }
    }

    render() {
        return (
            <StyledNoteEditor>
                <Textarea
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />

                <ButtonsPanel
                    handleColorChange={this.handleColorChange}
                    handleNodeAdd={this.handleNodeAdd}
                />
            </StyledNoteEditor>
        );
    }
}
