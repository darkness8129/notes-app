import React, { Component } from 'react';
import styled from 'styled-components';
import ColorPanel from '../ColorPanel';

const StyledButtonsPanel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AddNoteBtn = styled.button`
    &:hover {
        background-color: #5cbf2a;
    }

    &:active {
        position: relative;
        top: 1px;
    }

    &:focus {
        outline: 0;
    }

    align-self: flex-end;
    width: 100px;
    background-color: #44c767;
    border-radius: 28px;
    border: 1px solid #18ab29;
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
    padding: 8px 8px;
    text-transform: uppercase;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;
`;

export default class ButtonsPanel extends Component {
    render() {
        return (
            <StyledButtonsPanel>
                <ColorPanel onColorChange={this.props.handleColorChange} />
                <AddNoteBtn onClick={this.props.handleNodeAdd}>Add</AddNoteBtn>
            </StyledButtonsPanel>
        );
    }
}
