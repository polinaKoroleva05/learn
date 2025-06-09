import './../css/ListOfNotes.css';

export default function ListOfNotes(props) {
    console.log(props)
    return (
        <div className='list'>
            {props.listNotes.map((note, id) =>
                <div className='note-item' key={id} onClick={() => props.onChangeId(id)}>
                    <p className='light-text'>{note.date}</p>
                    <b>{note.name}</b>
                    <div className='clipable-text'>
                    {note.content}
                    </div>
                    
                </div>).toReversed()}
        </div>
    );
}
