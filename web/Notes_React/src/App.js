import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Note from './components/Note';
import ListOfNotes from './components/ListOfNotes';
import AddNote from './components/AddNote';
import testData from './testData/testData';
import { MdAdd } from "react-icons/md";
import { Spinner } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotesService, addNoteService, changeNoteService, deleteNoteService } from './services/notesService';
import { useNotesQuery } from './hooks/useNotesQuery';

const nameOfLocalStorage = 'notes_by_koroleva2025';

export default function App() {
    const [listNotes, changeListNotes] = useState([])
    const [openedNoteId, changeOpenedNoteId] = useState(-1)
    const navigate = useNavigate();
    const client = useQueryClient();

    const { data, isLoading, isSuccess } = useNotesQuery();

    const { mutate: createNoteMutation } = useMutation({
        mutationFn: addNoteService,
        onSuccess: (newNote) => {
            client.setQueryData(['notes'], (oldNotes) => [...oldNotes, newNote]);
            // client.invalidateQueries({ queryKey: ['notes'] });
        }
    })

    const { mutate: changeNoteMutation } = useMutation({
        mutationFn: changeNoteService,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['notes'] });
        }
    })

    const { mutate: deleteNoteMutation } = useMutation({
        mutationFn: deleteNoteService,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['notes'] });
        }
    })

    // useEffect(() => {
    //     getApiData();
    // }, [])

    useEffect(() => {
        console.log(openedNoteId);
    })

    const deleteNote = (id) => {
        deleteNoteMutation(id)
        changeOpenedNoteId(data.length - 2);
    }

    const changeNote = (newNote) => {
        newNote.date = (new Date()).toDateString();
        changeNoteMutation([JSON.stringify(newNote), newNote.id]);
        toggleNote(data.length);
    }

    const addNote = (newNote) => {
        newNote.date = (new Date()).toDateString();
        createNoteMutation(JSON.stringify(newNote));
        toggleNote(data.length);
    }

    const toggleNote = (id) => {
        changeOpenedNoteId(id);
        navigate('/');
    }

    if (isLoading) {
        return <Spinner thickness='4px' speed='0.5s' color='rgb(154, 147, 147)' size='xl' />
    }
    return (
        <div className='App'>
            <button className='addButton' onClick={() => navigate('/addNote')}><MdAdd /></button>
            {isSuccess &&
                <div className='container'>
                    <ListOfNotes listNotes={data} onChangeId={toggleNote} />
                    <Routes>
                        <Route path="/addNote" element={<AddNote onAddNote={addNote} />}></Route>
                        <Route path="/*" element={<Note note={data[openedNoteId]} onChangeNote={changeNote} onDeleteNote={deleteNote} />}></Route>
                    </Routes>
                </div>
            }
        </div>
    );
}
