import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NotesApp from './NotesApp.js';

ReactDOM.render(
  <React.StrictMode>
    <NotesApp />
  </React.StrictMode>,
  document.getElementById('content')
);

