document.querySelector('.notification-container').addEventListener('click',closeNotification);
document.querySelector('#btn-cargar-productos').addEventListener('click',cargarProductos);
document.querySelector('#btn-enviar-datos').addEventListener('click',enviarDatos);

chargeStores();


function newNotification(text){
    let div = document.createElement('div');
    div.classList.add('notification');
    div.classList.add('box');
    let texto = document.createElement('div');
    texto.classList.add('notification-text');
    texto.innerHTML = text;
    let xmark = document.createElement('i');
    xmark.classList.add('fa-solid');
    xmark.classList.add('fa-circle-xmark');
    let xmarkContainer = document.createElement('div');
    xmarkContainer.appendChild(xmark);
    div.appendChild(texto);
    div.appendChild(xmarkContainer);

    document.querySelector('.notification-container').appendChild(div);
}


function closeNotification(e){
    if(e.target.classList.contains('fa-circle-xmark')){
        e.target.parentElement.parentElement.remove();
    }
}
function chargeStores(){
    respuesta = fetch("https://sheet.best/api/sheets/109f6eb8-e3c9-4a70-a496-05fed33cc7ec")
    .then((response) => response.json())
    .then((data) => {
        respuesta = data;
        console.log(data);
        agregarOpciones();
    })
    .catch((error) => {
        console.error(error);
        alert('Error al conectarse con la base de datos, contacte al administrador')
    });
}

function agregarOpciones(){
    let tiendasCargadas = [];
    let opciones = document.querySelector('select');
 
    for(let i=0;i<respuesta.length;++i){
        if(!tiendasCargadas.includes(respuesta[i]['Tienda'])){
            xop = document.createElement('option');
            xop.innerHTML = respuesta[i]['Tienda'];
            opciones.appendChild(xop);
            tiendasCargadas.push(respuesta[i]['Tienda']);
        }
    }

}


function cargarProductos(){
    document.querySelector('.products').classList.remove('invisible');

    let elegida = document.querySelector('select');
    let index;
    for(let i=0;i<respuesta.length;++i){
        if(respuesta[i]['Tienda'] == elegida.value) {
            index = i;
            break;
        }
    }

    let filas = document.querySelectorAll('.table-row');
    for(let i=1;i<filas.length;++i){
        let filaHijos = filas[i].children;
        filaHijos.item(0).innerHTML = respuesta[index]['Producto'];
        filaHijos.item(1).innerHTML = respuesta[index]['Enviados'];
        index++;
    }
}

function enviarDatos(){
    newNotification('Datos enviados con éxito');
    document.querySelector('.products').classList.add('invisible');
}