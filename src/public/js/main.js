//Creamos una instancia de socket.io desde el lado del cliente: 
const socket = io(); 

let user; 
//Acá en esta variable voy a almacenar el nombre del usuario. 

//Utilizamos Sweet Alert para el mensaje de bienvenida. 

//Swal es un objeto global que nos permite acceder a todos los métodos de la librería. 
//Fire es un método que nos permite configurar el alerta. 

Swal.fire({
    title: "Identificate", 
    input: "text", 
    text: "Ingresa un usuario para identificarte en el Chat",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar"
    }
}).then(result => {
    user = result.value;
    //Me guardo el nombre del usuario. 
})

const chatBox = document.getElementById("chatBox"); 
//Vinculamos el elemento del HTML (input) con una constante en mi código. 

chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {
            //Trim nos permite sacar los espacios en blanco del principio y del final de un string. 
            //Si el mensaje tiene más de 0 caracteres, lo enviamos al servidor. 
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = ""; 
        }
    }
})

//Listener de Mensajes: 

socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs"); 
    let messages = ""; 
    data.forEach( message => {
        messages =  messages + ` ${message.user} dice: ${message.message} <br>` 
    })
    log.innerHTML = messages;
})