/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NotesState from './contexts/notesState';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
    return (
        <NotesState>
            <BrowserRouter>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/signup" element={<SignUp/>} />
                        
                    </Routes>
                </div>
            </BrowserRouter>
        </NotesState>
    );
}

export default App;
