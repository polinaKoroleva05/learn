const BASE = 'http://localhost:3004/notes'

export async function fetchNotesService() {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error('Failed to fetch notes!');
    return res.json()
}

export async function addNoteService(newNote) {
    const res = await fetch(BASE, {
        method: 'POST',
        body: newNote,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}

export async function changeNoteService([newNote, id]) {
    console.log("service", newNote, id)
    const res = await fetch(`${BASE}/${id}`, {
        method: 'PATCH',
        body: newNote,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}