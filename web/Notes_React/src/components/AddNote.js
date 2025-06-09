import './../css/Note.css'
import { useEffect, useState } from 'react';
import {useNavigate } from "react-router-dom";
import { ImCheckmark, ImCross  } from "react-icons/im";
import { TiCancel } from "react-icons/ti";

export default function AddNote(props) {
    const [noteCurrent, changeNote] = useState({ name: '', content: '' });
    const navigate = useNavigate();

    const validate = () => { //убедиться что текст заметки не пустой 
        if(noteCurrent.content.replace(/\s/g,'') === ''){
            alert("Содержимое заметки не может быть пустым!")
        }else{
            props.onAddNote(noteCurrent)
        }
    }

    const validateNameInput = (e)=>{ //если пользователь написал перенос строки - не реагируем
        if(e.target.value.indexOf('\n') === -1){
            changeNote({ ...noteCurrent, name: e.target.value });
        }
    }

    return (
        <div className='note'>
            <div>
            <div className='bar'>
                <button className='done-button' onClick={validate}><ImCheckmark/></button>
                <button className='cancel-button' onClick={()=>navigate('/')}><ImCross/></button>
                </div>
                <textarea className='name-field' placeholder='Название' type='text' name='name' value={noteCurrent.name} onChange={validateNameInput} />
                <textarea className='content-field' placeholder='Содержание' type='text' name='content' value={noteCurrent.content} onChange={e => changeNote({ ...noteCurrent, content: e.target.value })} />
            </div>
        </div>
    );
}
