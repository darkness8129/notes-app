import React, { Component } from 'react';
import styled from 'styled-components';

const DeleteBtn = styled.button`
    position: absolute;
    top: 2px;
    right: 2px;
    display: none;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
`;

const StyledNote = styled.div`
    &:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
            0 6px 6px rgba(0, 0, 0, 0.23);
        ${DeleteBtn} {
            display: block;
        }
    }

    width: 200px;
    height: auto;
    float: left;
    background-color: yellow;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 2px;
    padding: 10px;
    margin-bottom: 10px;
    transition: box-shadow 0.3s;
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: ${(props) => props.backgroundColor};
`;

export default class Note extends Component {
    render() {
        return (
            <StyledNote backgroundColor={this.props.color} className='note'>
                {this.props.children}
                <DeleteBtn onClick={this.props.onDelete} as='span'>
                    ×
                </DeleteBtn>
            </StyledNote>
        );
    }
}
