const BASE_URL = 'http://127.0.0.1:3000';
const startCard = document.getElementById('list-1');
const addCardBtn = document.getElementById('add_card');
const trash = document.getElementById('trash_delite');


window.onload = async ()=> {
    await fillCards(1)
    await fillCards(2)
    await fillCards(3)


    enableStartButton();

}

addCardBtn.addEventListener('click', async (e) => {
	await createCard('');
    
});

const deleteCardEvent = async (e) => {
	//await deliteCardAPICall();
    let targetEl = document.getElementById(e.target.id)
};

function showUpdatedDate(card){
    // if parent parent id is list-3 then show
    console.log(card.parentElement.id)
    if (card.parentElement.id === 'list-3'){
        let updatedDate = card.getElementsByClassName('updated-date')[0];
        updatedDate.style.display = 'block';
    }
    
}

// document.querySelectorAll(".card").addEventListener('change', changeCardTittle);


function createCardElement(id, text, position, updatedAt) {
    let card = document.createElement('textarea');
	card.className = 'card ';
	card.value = text;
    card.setAttribute('data-ogtitle', text);
    card.addEventListener('change', changeCardTittle)

    // Add updated date but hide
    let updatedDate = document.createElement('p');
    updatedDate.className = 'updated-date';
    // Format date with dd/mm/yyyy HH:MM
    let date = new Date(updatedAt);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    updatedDate.innerHTML = formattedDate;

    updatedDate.style.display = 'none';
    // card.appendChild(updatedDate);


    let icon=document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-trash-can');
    icon.classList.add('color');

    
    let div_icon = document.createElement('a');
    div_icon.className= 'icon';
    div_icon.appendChild(icon);
    div_icon.id="trash-"+id;
    //div_icon.addEventListener('click', deleteCardEvent);
    div_icon.setAttribute("onclick",`onClickTrash(${id})`);
    


    let div = document.createElement('div');
    div.className= 'backgorund-input';
    div.setAttribute('draggable', 'true');
	div.setAttribute('ondragstart', 'dragStart(event)');
	div.setAttribute('ondrop', 'dropIt(event)');
	div.setAttribute('ondragover', 'allowDrop(event)');
    div.appendChild(card);
    div.appendChild(updatedDate);
    div.appendChild(div_icon);
	div.id = id;
    div.setAttribute('data-position', position);
    return div
	

}

async function createCardAPICall(title){
    const description = '';
    const column = 1;

    let response = await fetch(`${BASE_URL}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            column: column,
            deadline_date: undefined,
        })
    });

    let result = await response.json();

    if (response.status == 200) {
        return result;
    }else{
        return undefined;
    }
};

function isValidCard(title){
    if (title.length > 100){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'El titulo no puede tener mas de 100 caracteres',
        })
        return false
    }

    if(title === ''){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'El titulo no puede estar vacio',
        })
        return false
    }

    const titles = document.getElementsByClassName('card');
    for (let i = 0; i < titles.length; i++){
        if (titles[i].value === title){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'El titulo ya existe',
            })
            return false
        }
    }

    return true
}

async function createCard(text) {
    // Al crear una tarjeta se asigna a la columna 1 por defecto
    const title = document.getElementsByName('title')[0].value;

    if (!isValidCard(title)){
        return
    }

	// Make api call to create card in database
	let response = await createCardAPICall(title);

	if(response !== undefined){
		let card = createCardElement(response.result._id, response.result._title, response.result._position, response.result._updatedAt);
        startCard.appendChild(card);
        document.getElementsByName('title')[0].value = '';
        Swal.fire({
            icon: 'success',
            title: 'Tarea creada',
            text: 'La tarea se creó correctamente',
        })
	}else{
		// Fire sweet alert
		Swal.fire({
			icon: 'error',
			title: 'Error!',
			text: 'No se pudó crear la tarea',
		})
	}
	
}


async function changeCardTittle(e){


    // set timer of 3 secs to execute the function
    const id = e.target.parentElement.id;
    const position = e.target.parentElement.getAttribute('data-position');
    const title = e.target.value;
    const column = e.target.parentElement.parentElement.id.split('-')[1];

    if(!isValidCard(title)){
        e.target.value = e.target.dataset.ogtitle;
        return;
    }    
    
    // Make api call to create card in database
    let response = await changeCardAPICall(id, title, column, position);

    if(response === undefined){
        // Fire sweet alert
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'No se pudó cambiar el titulo de la tarea',
        })
    }

    // update ogtittle
    e.target.dataset.ogtitle = title;

}


async function fillCards(columnId){
    const result = await fetch(`${BASE_URL}/columns/${columnId}/cards`)
    const columnInput = document.getElementById(`list-${columnId}`)
    const cards = await result.json()
    cards.result.map((value, index) => {
        const card = createCardElement(value._id, value._title, value._position, value._updatedAt)
        columnInput.appendChild(card)
        showUpdatedDate(card)
    })
}



async function onClickTrash(id){
    const result = await Swal.fire({
        title: '¿Estas seguro que quieres eliminar la tarea?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
    })

    if (result.isConfirmed){
        console.log('eliminando...')
        deliteCardAPICall(id);
    }
}



// CHECAR ESTA MADRE, LO HIZO LA MAVELY CON EL PAUL Y PUEDE TENER ERRORES (pa ti fajardo)
async function deliteCardAPICall (id) {
     
    let response = await fetch(`${BASE_URL}/cards/${id}`, {
        method: 'DELETE',
        
    });

    let result = await response.json();

    if (response.status == 200) {
        await Swal.fire({
			icon: 'success',
			title: 'Éxito!',
			text: 'La tarea se eliminó correctamente',
		})
        window.location.reload();
    }else{
        await Swal.fire({
			icon: 'error',
			title: 'Error!',
			text: 'Hubo un error inesperado',
		})
        
    }
};

const changeCardAPICall = async (id, title, column, position) => {
    if(id === undefined || id === "" || title === undefined || title === ""){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'La tarea no existe',
        });
        return
    }
    const description = '';

    let response = await fetch(`${BASE_URL}/cards/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            column: column,
            deadline_date: undefined,
            position: position
        })
    });

    let result = await response.json();

    if (response.status == 200) {
        return result;
    }else{
        return undefined;
    }
};

// TODO: move function to other file
async function putCard(cardId, columnId, position) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "column": `${columnId}`,
        "position": `${position}`
    })

    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw
    }
    
	const result = await fetch(`${BASE_URL}/cards/${cardId}`, requestOptions)
	const response = await result.json()
    console.log(response.result)
}


async function getCardById(id){
    const result = await fetch(`${BASE_URL}/cards/${id}`)
    let card = await result.json()
    card = createCardElement(response.result._id, response.result._title, response.result._updatedAt);
    return card;
}