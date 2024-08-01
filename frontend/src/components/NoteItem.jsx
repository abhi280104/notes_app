/* eslint-disable no-unused-vars */
import  { useContext } from 'react';
import PropTypes from 'prop-types';
import notesContext from '../contexts/notesContext';

const NoteItem = (props) => {
    const { title, description, _id } = props.note;
    const { deleteNote } = useContext(notesContext); 

    const clickHandler = () => {
        deleteNote(_id); 
    }

   

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam culpa assumenda, animi temporibus id, nemo dolorum harum doloremque sed iste explicabo porro, unde nam hic debitis nesciunt aliquid deserunt beatae laborum! Voluptatum, ipsum et?</p>
                    <i className="fa-solid fa-trash mx-2" onClick={clickHandler}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={props.updateNotess}></i>
                </div>
            </div>
        </div>
    );
}

NoteItem.propTypes = {
    note: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
       
    }).isRequired,
    updateNotess: PropTypes.func.isRequired,  
};
export default NoteItem;
