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

const SearchIcon = styled.span`
    position: absolute;
    left: 5px;
    top: 7px;
`;

export default class SearchField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    //func handle searching
    handleSearch(event) {
        this.setState({ searchQuery: event.target.value }, () => {
            this.props.onSearch(this.state.searchQuery);
        });
    }

    render() {
        return (
            <StyledSearchField>
                <SearchInput
                    value={this.state.searchQuery}
                    onChange={this.handleSearch}
                />
                <SearchIcon>🔍</SearchIcon>
            </StyledSearchField>
        );
    }
}
