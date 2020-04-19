import React, { Component } from 'react';
import '../style/note.css';

export default class Note extends Component {
    render() {
        let styleNote = { backgroundColor: this.props.color };
        return (
            <div className="note" style={styleNote}>
                {this.props.children}
                <span className="delete-note-btn" onClick={this.props.onDelete}> × </span>
            </div>
        );
    }
}