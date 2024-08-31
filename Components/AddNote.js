import React, { useContext, useState } from 'react'
import noteContext from '../Context/Notes/noteContext';

const AddNote = (props) => {
  const context = useContext(noteContext)
  const { addNote } = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleClick = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    showAlert("Note added successfully", "success") 
  }

  const onChange = (event) => {
    setNote({...note, [event.target.name]: event.target.value})
  }

  const {showAlert} = props;

  return (
    <div>
      <form action="">
        <h1>Add a note</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Write your note here</label>
          <textarea className="form-control" id="description" name='description' rows="3" value={note.description} onChange={onChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick} >Add note</button>
      </form>
    </div>
  )
}

export default AddNote