import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = '';
  const notesInitial = []
  
  const [notes, setNotes] = useState(notesInitial)
  
  // Get all notes
  const getNote = async () => {
    // Add API call
    const response = await fetch(`/api/notes/fetchall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setNotes(json);
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // Add API call
    const response = await fetch(`/api/notes/createnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });

    // const note = await response.json(); // parses JSON response into native JavaScript objects
    const note = await response.json();
    setNotes(notes.concat(note))

  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Add API call
    const response = await fetch(`/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id===id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  // Delete a note
  const deleteNote = async (id) => {
    // Add API call
    const response = await fetch(`/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    const newNote = notes.filter((notes)=>{return notes._id!==id})
    setNotes(newNote);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;