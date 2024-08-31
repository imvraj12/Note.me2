import React, { useContext } from 'react'
import noteContext from '../Context/Notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>

                    <button className="btn btn-primary" onClick={()=>{updateNote(note);}}>
                        <i className="fa-regular fa-pen-to-square mx-2"></i>Edit
                    </button>
                    <button className="btn btn-primary mx-2" onClick={()=>{deleteNote(note._id); showAlert("Deleted successfully", "primary")}}>
                        <i className="fa-regular fa-trash-can mx-2"></i>Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteItem