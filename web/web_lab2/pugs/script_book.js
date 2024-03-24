const elem = document.getElementById('edit');
if (elem) {
    elem.href = `${window.location.href}/edit`;
}


async function deleteBook (){
    if (window.confirm("Вы уверены, что хотите удалить книгу?")) {
        const response = await fetch(window.location.href, {
            method: 'DELETE'
        });
        if (response.ok) {
            window.location.replace('/');
        }
    }
}

const dialog = document.getElementById('infoReader');
function showConfirm() {
    dialog.showModal();
}

function hideConfirm() {
    dialog.close();
}
