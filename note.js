
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
	setActive: function(event){
		this.props.setActive(this.props.color);
		this.props.onColorChange(this.props.color)
	},

	render: function(){
		let styleSwitcher = {backgroundColor: this.props.color};
		this.props.isActive === false ? styleSwitcher.color = "transparent" : styleSwitcher.color = "black";
		return <div className = "color-switcher" style = {styleSwitcher} onClick = {this.setActive}> ✔ </div>;
	}
});

let ColorPanel = React.createClass({
	setActive: function(color){
		for(let i = 0; i < SWITCHERS.length; i++){
			SWITCHERS[i].color == color ? SWITCHERS[i].isActive = true : SWITCHERS[i].isActive = false;
		}
	},

	render: function(){
		return <div className = "color-panel">
			{
				SWITCHERS.map((switcher) => {
					return <ColorSwitcher key = {switcher.id}
										  isActive = {switcher.isActive} 
										  color = {switcher.color} 
										  onColorChange = {this.props.onColorChange}
										  setActive = {this.setActive}/>;
				})
			}
		</div>
	}
});


let Note = React.createClass({
    render: function() {
    	let styleNote = {backgroundColor: this.props.color}
        return (
            <div className = "note" style = {styleNote}>
            	{this.props.children}
            	<span className = "delete-note-btn" onClick = {this.props.onDelete}> × </span>
            </div>
        );
    }
});

let NoteEditor = React.createClass({
	getInitialState: function(){
		return {
			text: "", 
			color: "#f3f56c"
		};
	},

	//func for changing state of component
	handleTextChange: function(event){
		this.setState({
			text: event.target.value
		});
	},

	handleColorChange: function(value){
		this.setState({
			color: value
		});
	},

	//func that create new note and causes callback
	handleNodeAdd:function(){
		let newNote = {
			text: this.state.text,
			color: this.state.color,
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