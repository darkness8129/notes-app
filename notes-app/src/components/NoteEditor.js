import React, { Component } from 'react';
import '../style/note-editor.css';
import ColorPanel from './ColorPanel.js';

export default class NoteEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            color: "#f3f56c"
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
        let newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        //del text from area when note added
        this.setState({ text: "" });
    }

    render() {
        return (
            <div className="note-editor">
                <textarea className="note-textarea"
                    placeholder="Enter your note here..."
                    rows={7}
                    value={this.state.text}
                    onChange={this.handleTextChange} />
                <div className="buttons-panel">
                    <ColorPanel onColorChange={this.handleColorChange} />
                    <button className="add-note-btn" onClick={this.handleNodeAdd}>Add</button>
                </div>
            </div>
        );
    }
}