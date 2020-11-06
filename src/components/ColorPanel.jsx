import React, { Component } from 'react';
import styled from 'styled-components';
import ColorSwitcher from './ColorSwitcher';

const StyledColorPanel = styled.div`
    display: flex;
`;

let SWITCHERS = [
    {
        id: 1,
        color: '#f3f56c',
        isActive: true,
    },
    {
        id: 2,
        color: '#f26b61',
        isActive: false,
    },
    {
        id: 3,
        color: '#84c5f0',
        isActive: false,
    },
    {
        id: 4,
        color: '#7af088',
        isActive: false,
    },
    {
        id: 5,
        color: '#c184f0',
        isActive: false,
    },
];

export default class ColorPanel extends Component {
    constructor(props) {
        super(props);

        this.setActive = this.setActive.bind(this);
    }

    //func to activate switcher
    setActive(color) {
        for (let i = 0; i < SWITCHERS.length; i++) {
            SWITCHERS[i].isActive = SWITCHERS[i].color === color ? true : false;
        }
    }

    render() {
        return (
            <StyledColorPanel>
                {SWITCHERS.map((switcher) => {
                    return (
                        <ColorSwitcher
                            key={switcher.id}
                            isActive={switcher.isActive}
                            color={switcher.color}
                            onColorChange={this.props.onColorChange}
                            setActive={this.setActive}
                        />
                    );
                })}
            </StyledColorPanel>
        );
    }
}
