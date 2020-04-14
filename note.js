let SWITCHERS = [{
	id: 1,
	color: "#f3f56c",
	isActive: true
},{

	id: 2,
	color: "#f26b61",
	isActive: false
},{
	id: 3,
	color: "#84c5f0",
	isActive: false
},{
	id: 4,
	color: "#7af088",
	isActive: false
},{
	id: 5,
	color: "#c184f0",
	isActive: false
}];

let ColorSwitcher = React.createClass({
	//func that transfer color to change color of note and set active switcher
	setActive(){
		this.props.setActive(this.props.color);
		this.props.onColorChange(this.props.color)
	},

	render(){
		let styleSwitcher = {backgroundColor: this.props.color};
		styleSwitcher.color = this.props.isActive === false ? "transparent" : "black";
		return <div className = "color-switcher" style = {styleSwitcher} onClick = {this.setActive}> ✔ </div>;
	}
});

let ColorPanel = React.createClass({
	//func to activate switcher
	setActive(color){
		for (let i = 0; i < SWITCHERS.length; i++){
			SWITCHERS[i].isActive = SWITCHERS[i].color == color ?  true : false;
		}
	},

	render(){
		return (<div className = "color-panel">
			{
				SWITCHERS.map((switcher) => {
					return (<ColorSwitcher key = {switcher.id}
										  isActive = {switcher.isActive} 
										  color = {switcher.color} 
										  onColorChange = {this.props.onColorChange}
										  setActive = {this.setActive}/>);
				})
			}
		</div>);
	}
});


let Note = React.createClass({
    render(){
    	let styleNote = {backgroundColor: this.props.color};
        return (
            <div className = "note" style = {styleNote}>
            	{this.props.children}
            	<span className = "delete-note-btn" onClick = {this.props.onDelete}> × </span>
            </div>
        );
    }
});

let NoteEditor = React.createClass({
	getInitialState(){
		return {
			text: "", 
			color: "#f3f56c"
		};
	},

	//func for changing state text of component
	handleTextChange(event){
		this.setState({text: event.target.value});		
	},

	//func for changing color of note
	handleColorChange(value){
		this.setState({color: value});
	},

	//func that create new note and causes callback
	handleNodeAdd(){
		let newNote = {
			text: this.state.text,
			color: this.state.color,
			id: Date.now()
		};

		this.props.onNoteAdd(newNote);
		//del text from area when note added
		this.setState({text: ""});
	},

    render(){
        return (
            <div className = "note-editor">
            	<textarea className = "note-textarea"
		            	 placeholder = "Enter your note here..." 
		            	 rows = {7} 
		            	 value = {this.state.text}
		            	 onChange = {this.handleTextChange}/>
            	 <div className = "buttons-panel">
		         <ColorPanel onColorChange = {this.handleColorChange}/>
            	 <button className = "add-note-btn" onClick = {this.handleNodeAdd}>Add</button>
            	 </div>
            </div>
        );
    }
});

let NotesGrid = React.createClass({
	//initializing the Masonry so that the blocks are laid with bricks 
	componentDidMount(){
		this.msnry = new Masonry( this.refs.notesGrid, {
  			itemSelector: '.note',
  			columnWidth: 200,
  			gutter: 10
		});
	},

	//compare the array before and after adding note, rebuild the masonry
	componentDidUpdate(prevProps){
		if (this.props.notes.length !== prevProps.notes.length){
			this.msnry.reloadItems();
			this.msnry.layout();
		}
	},

    render() {
    	let onNoteDelete = this.props.onNoteDelete;
        return (
            <div className = "notes-grid" ref = "notesGrid">
                {
                	//passing parameters for each note
                    this.props.notes.map((note) => {
                        return (
                            <Note
                                key={note.id}
                                color={note.color}
                                onDelete = {onNoteDelete.bind(null, note)}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});

let  SearchField = React.createClass({
	getInitialState(){
		return{
			searchQuery: ""
		};
	},

	//func to change search query
	handleSearchQueryChange(event){
		this.setState({searchQuery: event.target.value});
	},

	_handleKeyDown(event) {
		if (event.key === 'Enter') this.props.onSearch(this.state.searchQuery);
	},

	render(){
		return (<div className = "search-field">
					<input className = "search-input"
						   type = "text"
						   value = {this.state.searchQuery}
						   placeholder = "Search..." 
						   onKeyDown = {this._handleKeyDown} 
						   onChange = {this.handleSearchQueryChange}/>
					<div className = "search-icon" 
						 onClick = {() => this.props.onSearch(this.state.searchQuery)}>🔍</div>
				</div>);
	}
});

let NotesApp = React.createClass({
    getInitialState(){
        return {
            notes: [],
            displayedNotes: []
        };
    },

    //when component updated - update localStorage 
    componentDidUpdate(){
    	this._updateLocalStorage();
    },

    //when component mount takes notes from localStorage
    componentDidMount(){	
    	let localNotes = JSON.parse(localStorage.getItem('notes'));
    	if (localNotes){
    		this.setState({
    			notes: localNotes,
    			displayedNotes: localNotes,
    			searchQuery: ""
    		});
    	}
    },

    //func for deleting note
    handleNoteDelete(note){
    	let noteId = note.id;
    	let newNotes = this.state.notes.filter(function(note){
    		return note.id !== noteId;
    	});

    	//callback need to search notes, when note deleted
    	this.setState({
    		notes: newNotes
    	}, () => this.handleNoteSearch(this.state.searchQuery));
    },

    //func that add new note to array
    handleNoteAdd(newNote){
    	let newNotes = this.state.notes.slice();
    	newNotes.unshift(newNote);

    	//callback need to search notes, when note added
    	this.setState({
    		notes: newNotes
    	}, () => this.handleNoteSearch(this.state.searchQuery));
    },

    //func for searching notes
    handleNoteSearch(searchQuery){ 
    	let displayedNotes = this.state.notes.filter(function(note){ 
	    	return note.text.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
	    });

	    this.setState({displayedNotes,searchQuery});
      },

    //write notes to localStorage
    _updateLocalStorage(){
    	let notes = JSON.stringify(this.state.notes);
    	localStorage.setItem('notes', notes);
    },

    render() {
        return (
            <div className = "notes-app">
            <h1 className = "app-header">NotesApp</h1>
            <SearchField onSearch = {this.handleNoteSearch}/>
            <NoteEditor onNoteAdd = {this.handleNoteAdd}/>
            <NotesGrid notes = {this.state.displayedNotes} onNoteDelete = {this.handleNoteDelete}/>
            </div>
        );
    },

});

ReactDOM.render(<NotesApp />, document.getElementById('content'));