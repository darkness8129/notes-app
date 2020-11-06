import React, { Component } from 'react';
import styled from 'styled-components';

const StyledColorSwitcher = styled.div`
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin: 5px;
    text-align: center;
    cursor: pointer;
    background-color: ${(props) => props.backgroundColor};
`;

export default class ColorSwitcher extends Component {
    constructor(props) {
        super(props);

        this.setActive = this.setActive.bind(this);
    }

    //func that transfer color to change color of note and set active switcher
    setActive() {
        this.props.setActive(this.props.color);
        this.props.onColorChange(this.props.color);
    }

    render() {
        return (
            <StyledColorSwitcher
                onClick={this.setActive}
                backgroundColor={this.props.color}
            >
                {this.props.isActive && <span>✔</span>}
            </StyledColorSwitcher>
        );
    }
}
