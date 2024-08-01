/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NotesContext from '../contexts/notesContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Notes() {
    const { notes, setNotes, updateNote, fetchNotes } = useContext(NotesContext);
    const navigate = useNavigate(); // Initialize useNavigate
    const btnRef = useRef(null);  // Renamed to btnRef for clarity
    const clsssRef = useRef(null);
    const [mstate, msetState] = useState({ _id: '', title: '', description: '', tag: '' });

    useEffect(() => {
        const fetchInitialNotes = async () => {
            if (localStorage.getItem('token')) {
                await fetchNotes();
            } else {
                navigate('/login'); // Navigate to login page
            }
        };
        fetchInitialNotes();
    }, []); // Add dependencies

    const changeHandler = (e) => {
        msetState({ ...mstate, [e.target.name]: e.target.value });
    };

    const clickHandler = () => {
        updateNote(mstate._id, mstate.title, mstate.description, mstate.tag);
        clsssRef.current.click();
    };

    const handleUpdateNote = (note) => {
        // Open the modal by triggering a click event
        if (btnRef.current) {
            btnRef.current.click();
            msetState(note);
        }
    };

    return (
        <>
            <AddNote />
            <div>
                <button
                    type="button"
                    ref={btnRef}
                    style={{ display: 'none' }}
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#updateNoteModal" // Ensure this matches the ID of your update modal
                >
                    Launch demo modal
                </button>
                <div className="modal fade" id="updateNoteModal" tabIndex="-1" aria-labelledby="updateNoteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="updateNoteModalLabel">Update Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" name="title" value={mstate.title} onChange={changeHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="description" name="description" value={mstate.description} onChange={changeHandler} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="tag" name="tag" value={mstate.tag} onChange={changeHandler} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={clsssRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={clickHandler}>Update changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <h1>Your Notes</h1>
                {notes.map((note) => (
                    <NoteItem
                        key={note._id}
                        note={note}
                        updateNotess={() => handleUpdateNote(note)}
                    />
                ))}
            </div>
        </>
    );
}

export default Notes;