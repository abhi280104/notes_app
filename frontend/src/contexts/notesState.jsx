import { useState } from 'react';
import PropTypes from 'prop-types';
import notesContext from './notesContext';
import axios from 'axios';

const NotesState = (props) => {
    const host = "http://localhost:3000";
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        try {
            const response = await axios({
                method: "get",
                url: `${host}/api/note/getallnotes`,
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            setNotes(response.data)
            return response.data;
        } catch (error) {
            console.error("Error fetching notes:", error);
            return [];
        }
    };

    


    const addNote = async (title, description, tag) => {
        try {
            const response = await axios({
                method: "post",
                url: `${host}/api/note/addnote`,
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                data: {
                    title: title,
                    description: description,
                    tag: tag
                }
            });

            const newNote = response.data;
            setNotes([...notes, newNote]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await axios({
                method: "delete",
                url: `${host}/api/note/deletenote/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                
            });
            console.log(response);
            setNotes(notes.filter(note => note._id !== id));
            
        } catch (error) {
            console.log(error)
            
        }

       
    };

    const updateNote = async (id, title, description, tag) => {
        try {
            const response = await axios({
                method: "put",
                url: `${host}/api/note/updatenote/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                data:{
                    title:title,
                    description:description,
                    tag:tag

                }
               
                
            });
            console.log(response);
            setNotes(notes.map(note => 
                note._id === id ? { ...note, title, description, tag } : note
            ));
        } catch (error) {
            console.log(error)
            
        }

       
    };

    return (
        <notesContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote,fetchNotes }}>
            {props.children}
        </notesContext.Provider>
    );
};

NotesState.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NotesState;
