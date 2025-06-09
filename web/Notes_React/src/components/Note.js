import './../css/Note.css'
import { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { ImCheckmark } from "react-icons/im";

export default function Note(props) {
    const [noteCurrent, changeNote] = useState(props.note);
    const [readOnlyMode, switchMode] = useState(true);

    useEffect(() => {
        changeNote(props.note);
        switchMode(true);
    }, [props.note])

    const validate = () => { //убедиться что текст заметки не пустой 
        if (noteCurrent.content.replace(/\s/g, '') === '') {
            alert("Содержимое заметки не может быть пустым!")
        } else {
            switchMode(true);
            props.onChangeNote(noteCurrent);
        }
    }

    const validateNameInput = (e) => {
        if (e.target.value.indexOf('\n') === -1) { //если пользователь написал перенос строки - не реагируем
            changeNote({ ...noteCurrent, name: e.target.value });
        }
    }

    return (
        <div className='note'>
            {noteCurrent === undefined ?
                <div className='start'>
                    <b> Несуществующая заметка! </b>
                </div>
                :
                <div>
                    <div className='bar'>
                        <p className='date-text'>{noteCurrent.date}</p>
                        <div>
                        {readOnlyMode === true ?
                            <button className='edit-button' onClick={() => switchMode(false)}><MdEdit /></button> :
                            <button className='done-button' onClick={validate}><ImCheckmark /></button>}
                        <button className='delete-button' onClick={props.onDeleteNote}><MdDelete /></button>
                        </div>
                    </div>
                    <textarea className='name-field' type='text' placeholder="Заголовок" readOnly={readOnlyMode} name='name' value={noteCurrent.name} onChange={validateNameInput} />
                    <textarea className='content-field' type='text' readOnly={readOnlyMode} name='content' value={noteCurrent.content} onChange={e => changeNote({ ...noteCurrent, content: e.target.value })} />
                </div>}
        </div>
    );
}
