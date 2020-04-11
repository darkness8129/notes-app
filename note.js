let Note = React.createClass({
    render: function() {
    	let style = {backgroundColor: this.props.color}
        return (
            <div className = "note" style = {style}>
            	{this.props.children}
            	<span className = "delete-note-btn" onClick = {this.props.onDelete}> × </span>
            </div>
        );
    }
});

let NoteEditor = React.createClass({
	getInitialState: function(){
		return {
			text: ""
		};
	},

	//func for changing state of component
	handleTextChange: function(event){
		this.setState({
			text: event.target.value
		});
	},

	//func that create new note and causes callback
	handleNodeAdd:function(){
		let newNote = {
			text: this.state.text,
			color: "yellow",
			id: Date.now()
		}
		this.props.onNoteAdd(newNote);
		//del text from area when note added
		this.setState({
			text: ""
		});
	},
    render: function() {
        return (
            <div className = "note-editor">
            	<textarea
            	 className = "note-textarea"
            	 placeholder = "Enter your note here..." 
            	 rows = {7} 
            	 value = {this.state.text}
            	 onChange = {this.handleTextChange}/>
            	<button className = "add-note-btn" onClick = {this.handleNodeAdd}>Add</button>
            </div>
        );
    }
});

let NotesGrid = React.createClass({
	//initializing the Masonry so that the blocks are laid with bricks 
	componentDidMount: function(){
		this.msnry = new Masonry( this.refs.notesGrid, {
  			itemSelector: '.note',
  			columnWidth: 200,
  			gutter: 10
		});

	},

	//compare the array before and after adding note, rebuild the masonry
	componentDidUpdate: function(prevProps){
		if(this.props.notes.length !== prevProps.notes.length){
			this.msnry.reloadItems();
			this.msnry.layout();
		}
	},

    render: function() {
    	let onNoteDelete = this.props.onNoteDelete;
        return (
            <div className = "notes-grid" ref = "notesGrid">
                {
                	//passing parameters for each note
                    this.props.notes.map(function(note){
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

let NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: []
        };
    },

    //when component updated, update localStorage 
    componentDidUpdate: function(){
    	this._updateLocalStorage();
    },

    //when component mount takes notes from localStorage
    componentDidMount: function(){
    	let localNotes = JSON.parse(localStorage.getItem('notes'));
    	if(localNotes){
    		this.setState({
    			notes: localNotes
    		});
    	}

    },

    //func for deleting note
    handleNoteDelete: function(note){
    	let noteId = note.id;
    	let newNotes = this.state.notes.filter(function(note){
    		return note.id !== noteId;
    	});
    	this.setState({
    		notes: newNotes
    	});
    },

    //func that add new note to array
    handleNoteAdd: function(newNote){
    	let newNotes = this.state.notes.slice();
    	newNotes.unshift(newNote);
    	this.setState({
    		notes: newNotes
    	});

    },

    //write notes to localStorage
    _updateLocalStorage: function(){
    	let notes = JSON.stringify(this.state.notes);
    	localStorage.setItem('notes', notes);
    },

    render: function() {
        return (
            <div className = "notes-app">
            <h1 className = "app-header">NotesApp</h1>
                <NoteEditor onNoteAdd = {this.handleNoteAdd}/>
                <NotesGrid notes={this.state.notes} onNoteDelete = {this.handleNoteDelete}/>
            </div>
        );
    },

});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('content')
	);