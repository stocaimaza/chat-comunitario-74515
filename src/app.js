/** CHAT COMUNITARIO - UTILIZANDO WEBSOCKETS Y EXPRESS HANDLEBARS **/

import express from "express"; 
import { engine } from "express-handlebars";
import viewRouter from "./routes/view.router.js"; 
import { Server } from "socket.io";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("./src/public")); 

//Express- Handlebars
app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 

//Rutas
app.use("/", viewRouter); 

//Listen:

const httpServer = app.listen(PUERTO, () => console.log(`Escuchando en el puerto: ${PUERTO}`)); 

//Generamos una instancia de Socket.io ahora desde el lado del backend. 
const io = new Server(httpServer);

//Array donde guardamos los usuarios y sus mensajes. 
let messages = []; 

//Establecemos la conexión: 

io.on("connection", (socket) => {
    console.log("Un cliente se conectó"); 

    socket.on("message", data => {
        //console.log(data); 
        messages.push(data); 

        //Emitimos mensaje para el cliente, con todo el array de datos: 
        io.emit("messagesLogs", messages); 
    })
})