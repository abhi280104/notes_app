/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import notesContext from '../contexts/notesContext';

const AddNote = () => {
    const { addNote } = useContext(notesContext);
    const [state, setState] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(state.title, state.description, state.tag);
        setState({ title: "", description: "", tag: "" }); // Reset form fields after adding note
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <h1>ADD NOTES</h1>
            <form className='mb-3' onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={state.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={state.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={state.tag} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    );
}

export default AddNote;
