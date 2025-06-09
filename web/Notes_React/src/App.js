import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Note from './components/Note';
import ListOfNotes from './components/ListOfNotes';
import AddNote from './components/AddNote';
import testData from './testData/testData';
import { MdAdd } from "react-icons/md";

const nameOfLocalStorage = 'notes_by_koroleva2025';

export default function App() {
    const [listNotes, changeListNotes] = useState([])
    const [openedNoteId, changeOpenedNoteId] = useState(-1)
    const navigate = useNavigate();

    const getApiData = () => {
        if(!localStorage.getItem(nameOfLocalStorage) || localStorage.getItem(nameOfLocalStorage)===undefined){
            localStorage.setItem(nameOfLocalStorage, JSON.stringify([testData]));
        }
        const notesFromStorage = JSON.parse(localStorage.getItem(nameOfLocalStorage));
        let validNotes = notesFromStorage.filter(note => note.hasOwnProperty('name') && note.hasOwnProperty('content') && note.hasOwnProperty('date')); //если данные подпорчены, убираем их
        if(!validNotes.length){
            validNotes = [testData]; //если все данные оказались некорректными, устанавливаем начальную записку
        }
        changeListNotes(validNotes);
        changeOpenedNoteId(validNotes.length-1);
    }

    const saveApiData = (newListNotes) => {
        localStorage.setItem(nameOfLocalStorage, JSON.stringify(newListNotes));
    }

    useEffect(() => {
        getApiData();
    }, [])

    const deleteNote = () => {
        listNotes.splice(openedNoteId, 1);
        changeListNotes([...listNotes]);
        changeOpenedNoteId(listNotes.length-1);
        saveApiData(listNotes);
    }

    const changeNote = (newNote) => {
        listNotes.splice(openedNoteId, 1);
        newNote.date = (new Date()).toDateString();
        let newListNotes = [...listNotes, newNote];
        changeListNotes(newListNotes);
        changeOpenedNoteId(listNotes.length);
        saveApiData(newListNotes);
    }

    const addNote = (newNote) => {
        newNote.date = (new Date()).toDateString();
        let newListNotes = [...listNotes, newNote];
        changeListNotes(newListNotes);
        changeId(listNotes.length);
        saveApiData(newListNotes);
    }

    const changeId = (id) => {
        changeOpenedNoteId(id); 
        navigate('/');
    }

    return (
        <div className='App'>
            <button className='addButton' onClick={()=>navigate('/addNote')}><MdAdd/></button>
            <div className='container'>
                <ListOfNotes listNotes={listNotes} onChangeId={changeId} />
                <Routes>
                    <Route path="/addNote" element={<AddNote onAddNote={addNote}/>}></Route>
                    <Route path="/*" element={<Note note={listNotes[openedNoteId]} onChangeNote={changeNote} onDeleteNote={deleteNote} />}></Route>
                </Routes>
            </div>
        </div>
    );
}
