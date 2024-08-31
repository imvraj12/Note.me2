import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../Context/Notes/noteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNote, editNote } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    },[])
    
    const reference = useRef(null)
    const referenceClose = useRef(null)
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: ""})
    const updateNote = (currentNote) => {
        reference.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const handleClick = (event) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        // console.log("Updated Note", note);
        referenceClose.current.click();
        props.showAlert("Note edited successfully", "success") 
    }
    
    const onChange = (event) => {
        setNote({...note, [event.target.name]: event.target.value})
    }

    return (
        <>
            <AddNote showAlert = {props.showAlert}/>
            <button type="button" ref={reference} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Launch demo modal</button>

            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' placeholder="" onChange={onChange} value={note.etitle}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Write your note here</label>
                                    <textarea className="form-control" id="edescription" name='edescription' rows="3" onChange={onChange} value={note.edescription}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' placeholder="" onChange={onChange} value={note.etag} />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={referenceClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length===0 && "No notes :("}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes