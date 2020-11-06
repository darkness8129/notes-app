import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSearchField = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 250px;
`;

const SearchInput = styled.input.attrs((props) => ({
    type: 'text',
    placeholder: 'Search...',
}))`
    &:focus {
        outline: none;
    }

    display: block;
    width: 100%;
    padding: 10px 10px 10px 30px;
    border: 1px solid #b0afac;
    border-radius: 20px;
`;

const SearchIcon = styled.div`
    position: absolute;
    left: 5px;
    top: 7px;
    cursor: pointer;
`;

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
            <StyledSearchField>
                <SearchInput
                    value={this.state.searchQuery}
                    onKeyDown={this._handleKeyDown}
                    onChange={this.handleSearchQueryChange}
                />
                <SearchIcon
                    onClick={() => this.props.onSearch(this.state.searchQuery)}
                >
                    🔍
                </SearchIcon>
            </StyledSearchField>
        );
    }
}
