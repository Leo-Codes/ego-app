
const dataName = "notes_data";

var data = localStorage.getItem(dataName);
var dataList = data? JSON.parse(data): [];
const notes_list = document.getElementById("notes-list-container");

const addBtn = document.getElementById('add-button');
const addInput = document.getElementById('add-input');

const saveBtn = document.getElementById('save-button');
const deleteBtn = document.getElementById('delete-button');

var noteView = document.getElementById('note-view');
var noteTitle = document.getElementById('view-title');

const title = "";
const text = "";

var currentNoteId;

console.log(JSON.stringify(dataList));

function updateDataList(){
    //Atualiza a Variavel data com a ultima modificação.
     data = localStorage.getItem(dataName);
     dataList = data? JSON.parse(data): [];
}


function generateID(prefix){
    const id = prefix + String(Math.random());
    return id;
}

function insertEmptyNote(title){
    const id = generateID(title);
    const note ={
        id:id,
        title:title,
        text:'',
    }

    saveData(note);
}


function handleSave(title,text){
    const id = generateID(title);
    const note ={
        id:id,
        title:title,
        text:text,
        html:'<h1>Digite algo aqui</h1>'
    }

    saveData(note);
}

function handleUpdate(note_id){
    for(let i=0; i<dataList.length; i++){
        console.log(i);
        if(dataList[i].id === note_id){
            dataList[i].text = noteView.textContent;
            dataList[i].html = noteView.innerHTML;
        }        
    }
    localStorage.setItem(dataName, JSON.stringify(dataList));
    renderAside();
    renderView(currentNoteId);
    
}

function handleDelete(note_id){
    for(let i=0;i<dataList.length; i++){
        if(dataList[i].id === note_id){
            console.log('achou');
            dataList.splice(i,1);
            localStorage.setItem(dataName, JSON.stringify(dataList));
            
        }
    }
    //aponta currentNoteId para o primeiro indice de dataList p/ não retornar erro ao renderizar novamente
    console.log(dataList);
    
    currentNoteId = dataList.length>0 ? dataList[0].id : null;
    updateDataList();
    renderAside();
    renderView(currentNoteId);

}

function saveData(newData){
    const newArray = [...dataList,newData];
    localStorage.setItem(dataName, JSON.stringify(newArray));
    
    updateDataList();
    renderAside();
    
}

function handleClick(element){

    if(element.id=="add-button"){
        element.addEventListener("click",()=>{
            const newNoteTitle = addInput.value;
            handleSave(newNoteTitle,'');
            
        });

    }

    if(element.id=="save-button"){
        element.addEventListener("click", ()=>{
            handleUpdate(currentNoteId);            
        });
    }

    if(element.id =="delete-button"){
        element.addEventListener("click",()=>{
            console.log('deletou');
            handleDelete(currentNoteId);
        });
    }
    
    if(element.className =='aside-delete-button'){
        element.addEventListener("click", ()=>{
            handleDelete(element.getAttribute('data-id'));
        })
    }

    if(element.className=="note"){
        element.addEventListener("click",()=>{
            currentNoteId = element.id;
            renderView(element.id);
            // Seta a variavel currentNoteId com o Id da nota para que possamos deletar ou atualizar a nota.
        });
    }


    
}

function setupAside(){
    let notes_div_array = document.getElementsByClassName('note');
    Array.from(notes_div_array).forEach((element)=>{
        handleClick(element);
    });
}

function renderView(note_id){
    updateDataList();
    if(dataList.length>0){
        note_id = currentNoteId; //coreção de bug
        let filteredNote = dataList.filter(item=> item.id === note_id);
        console.log(filteredNote[0]);
        noteTitle.innerHTML = filteredNote[0].title;
        noteView.innerHTML = filteredNote[0].html;
    }else{
        noteTitle.innerHTML = "Adicione uma nova Nota para Começar"
    }
    // console.log('html>> ' + filteredNote[0].html);

}

function renderAside(){
    //limpa o elemento aside para não duplicar a lista
    notes_list.innerHTML ='';

    notes_list.innerHTML += `
    <div id="Tarefa EBAC" class="default-note">
        <div class="note-list-title">
            <h4>Tarefa EBAC</h4>
            <button class="aside-delete-button">X</button>
        </div>
        <p class="note-description">TO-DO LIST EBAC:- Implementar botão 'delete' no seletor lateral de n...</p>
    </div>
    `;    

    dataList.map((item,index)=>{
        notes_list.innerHTML += `
        <div id="${item.id}" class="note">
            <div class="note-list-title">
                <h4>${item.title}</h4>
                <button class="aside-delete-button" data-id="${item.id}">X</button>
            </div>
            <p class="note-description">${item.text.substring(0,58)+'...'}</p>
        </div>
        `;    
    });
    setupAsideDeleteButton();
    setupAside();

}

function setupAsideDeleteButton(){
    let buttons = document.getElementsByClassName('aside-delete-button');

    for(let i=0; i<buttons.length; i++){
        // console.log(buttons[i].getAttribute('data-id'));
        handleClick(buttons[i]);
    }


}


function start(){
    handleClick(addBtn);
    handleClick(saveBtn);
    handleClick(deleteBtn);
    if(dataList.length>0){
        renderAside();

    }

}



start();






