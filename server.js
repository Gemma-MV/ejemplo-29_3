//Aquí estamos importando las funciones crearBaseDeDatos, crearColeccion y insertarDocumento desde el archivo mongoOperations.js. Estas funciones nos permitirán interactuar con nuestra base de datos MongoDB.
const {
    crearBaseDeDatos,
    crearColeccion,
    insertarDocumento,
    actualizarDocumento,
    borrarDocumento,
    verTodos
  } = require('./mongoOperations');

// Aqui estamos importando el módulo express, que es un framework de Node.jspara construir aplicaciones web, y luego creamos una instancia de una aplicación Express llamándola app.
const express = require('express');
const app = express();
  
// Aqui analizamos las solicitudes entrantes con datos codificados en URL y convertimos estos datos en un objeto req.body.
app.use(express.urlencoded({ extended: true }));
// Aqui analizamos las solicitudes entrantes con una carga útil JSON y convertimos estos datos en un objeto req.body.
app.use(express.json());

// Aquí estamos definiendo una ruta POST en /basedatos. Cuando se recibe una solicitud POST en esta ruta: La información enviada en el cuerpo de la solicitud (req.body) se imprime en la consola y luego, esa misma información se envía de vuelta al cliente en la respuesta (res.send(req.body)).
// Esta línea define una ruta en tu aplicación Express para manejar solicitudes POST en la dirección /basedatos.
app.post('/basedatos', (req, res) => {
    // Esto imprime en la consola los datos que se reciben en el cuerpo de la solicitud. req.body contiene los datos enviados por el cliente.
    console.log('Base de Datos: ', req.body.db, '\nColeccion: ', req.body.coleccion, '\nNombre: ', req.body.nombre, '\nEdad: ', req.body.edad);
    // Se define una función asíncrona llamada ejecutarOperaciones. Esta función realizará las operaciones de base de datos y conectara los datos con la base de datos de mongo.
    async function ejecutarOperaciones() {
        // Esta línea llama a la función crearBaseDeDatos con el nombre de la base de datos proporcionado en req.body.db.
        await crearBaseDeDatos(req.body.db);
        // Aquí se llama a la función crearColeccion, pasando el nombre de la base de datos y el nombre de la colección desde req.body.
        await crearColeccion(req.body.db, req.body.coleccion);
        // Esta línea inserta un documento en la colección especificada con los datos proporcionados (nombre y edad).
        await insertarDocumento(req.body.db, req.body.coleccion, {nombre: req.body.nombre, edad: req.body.edad});
        //¿?
        // await actualizarDocumento('Clientes', { nombre: 'Ana' }, { edad: 31 });
        // await borrarDocumento('Clientes', { nombre: 'Juan' });
    }
    // Se llama a la función ejecutarOperaciones y, si ocurre algún error, se imprime en la consola.
    ejecutarOperaciones().catch(console.error);
    // Finalmente, se envía de vuelta al cliente el mismo cuerpo de la solicitud que se recibió.
    res.send(req.body);
});

app.post('/insertar', async(req, res) => {
    // Esto imprime en la consola los datos que se reciben en el cuerpo de la solicitud. req.body contiene los datos enviados por el cliente.
    console.log('Nombre: ', req.body.nombrei, '\nEdad: ', req.body.edadi);
    await insertarDocumento('nuevabase', 'coleccion1', {nombre: req.body.nombrei, edad: req.body.edadi});
    res.send(req.body);
});

// En este caso como pusimos en el metodo del formulario en nuestro html el metodo get en vez de app.post ponemos app.get. No es necesario meter una funcion asincrona porque solo va a ejecutar una orden por lo que podemos meter el await verTodos en una variable result que nos guardara el resultado de los datos y la llamamos con res.send(result) que nos mostrara los datos. Como nos va a solicitar que la declaremos asincrona le metemos el async antes del (req, res)
app.get('/mostrar', async(req, res) =>{
    // En el metodo get no se usa body sino query
    console.log('Base de Datos: ', req.query);
        let result = await verTodos(req.query.db, req.query.coleccion);
    res.send(result);
});

// Aquí estamos diciendo a nuestra aplicación Express que escuche en el puerto 3000 para recibir conexiones entrantes. Esto significa que nuestra aplicación estará disponible en http://localhost:3000.
app.listen(3000);