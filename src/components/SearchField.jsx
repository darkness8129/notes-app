import React, { Component } from 'react';
import '../style/search-field.css';

export default class SearchField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
        };

        this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    //func to change search query
    handleSearchQueryChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    //when user press 'enter'
    _handleKeyDown(event) {
        if (event.key === 'Enter') this.props.onSearch(this.state.searchQuery);
    }

    render() {
        return (
            <div className='search-field'>
                <input
                    className='search-input'
                    type='text'
                    value={this.state.searchQuery}
                    placeholder='Search...'
                    onKeyDown={this._handleKeyDown}
                    onChange={this.handleSearchQueryChange}
                />
                <div
                    className='search-icon'
                    onClick={() => this.props.onSearch(this.state.searchQuery)}
                >
                    🔍
                </div>
            </div>
        );
    }
}
