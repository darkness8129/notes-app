import React, { Component } from 'react';
import '../style/color-switcher.css';

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
        let styleSwitcher = { backgroundColor: this.props.color };
        styleSwitcher.color = this.props.isActive === false ? "transparent" : "black";
        return <div className="color-switcher" style={styleSwitcher} onClick={this.setActive}> ✔ </div>;
    }
}