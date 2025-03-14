// Esta línea importa el módulo 'MongoClient' desde la biblioteca 'mongodb'. Estamos utilizando require para importar el módulo MongoClient de la biblioteca mongodb. Este módulo nos permite interactuar con una base de datos MongoDB.
const { MongoClient } = require('mongodb');

// Aquí estamos definiendo una constante llamada 'mydb' que contiene el nombre de la base de datos.
const mydb = "Empresa";

// Esta constante 'url' contiene la dirección del servidor de MongoDB. La constante url contiene la dirección del servidor de MongoDB al que nos vamos a conectar. 127.0.0.1 es la dirección IP de localhost y 27017 es el puerto por defecto de MongoDB.
const url = "mongodb://127.0.0.1:27017/";

// Esta es una función asíncrona llamada 'connectToMongo' que se conecta al servidor de MongoDB. Esta función connectToMongo crea una nueva instancia del cliente de MongoDB usando la URL especificada. Luego se conecta al servidor y devuelve el cliente conectado. La palabra clave async indica que esta función es asíncrona, lo que significa que utiliza la palabra clave await para esperar la resolución de una promesa antes de continuar.
async function connectToMongo() {
    // Creamos un nuevo cliente de MongoDB usando la URL proporcionada.
    const client = new MongoClient(url);
    // Esperamos a que el cliente se conecte al servidor de MongoDB.
    await client.connect();
    // Devolvemos el cliente conectado.
    return client;
}

// Esta es una función asíncrona llamada 'crearBaseDeDatos' que crea o conecta una base de datos. La función crearBaseDeDatos se conecta al servidor de MongoDB, selecciona o crea la base de datos con el nombre proporcionado (en este caso, 'mydb'), y luego imprime un mensaje en la consola confirmando la creación o conexión. Finalmente, cierra la conexión al servidor.
async function crearBaseDeDatos(mydb) {
    // Nos conectamos al servidor de MongoDB.
    const client = await connectToMongo();
    // Seleccionamos la base de datos con el nombre 'mydb'.
    const db = client.db(mydb);
    // Imprimimos un mensaje en la consola indicando que la base de datos ha sido creada o conectada.
    console.log(`Base de datos '${mydb}' creada o conectada.`);
    // Cerramos la conexión con el servidor de MongoDB.
    await client.close();
}

// Esta es una función asíncrona llamada 'crearColeccion' que crea una colección dentro de una base de datos. La función crearColeccion se conecta al servidor de MongoDB, selecciona la base de datos, y luego crea una nueva colección con el nombre especificado (en este caso, 'coleccion'). Imprime un mensaje en la consola confirmando la creación de la colección y cierra la conexión al servidor.
async function crearColeccion(mydb, coleccion) {
    // Nos conectamos al servidor de MongoDB.
    const client = await connectToMongo();
    // Seleccionamos la base de datos con el nombre 'mydb'.
    const db = client.db(mydb);
    // Creamos una nueva colección con el nombre 'coleccion' dentro de la base de datos.
    await db.createCollection(coleccion);
    // Imprimimos un mensaje en la consola indicando que la colección ha sido creada.
    console.log(`Colección '${coleccion}' creada.`);
    // Cerramos la conexión con el servidor de MongoDB.
    await client.close();
}

// Esta es una función asíncrona llamada 'insertarDocumento' que inserta un documento en una colección dentro de una base de datos. La función insertarDocumento se conecta al servidor de MongoDB, selecciona la base de datos y la colección especificadas, e inserta el documento proporcionado en la colección. Luego imprime un mensaje en la consola con el ID del documento insertado y cierra la conexión al servidor.
async function insertarDocumento(mydb, coleccion, documento) {
    // Nos conectamos al servidor de MongoDB.
    const client = await connectToMongo();
    // Seleccionamos la base de datos con el nombre 'mydb'.
    const db = client.db(mydb);
    // Seleccionamos la colección con el nombre 'coleccion'.
    const collection = db.collection(coleccion);
    // Insertamos el documento en la colección y guardamos el resultado.
    const resultado = await collection.insertOne(documento);
    // Imprimimos un mensaje en la consola con el ID del documento insertado.
    console.log(`Documento insertado con ID: ${resultado.insertedId}`);
    // Cerramos la conexión con el servidor de MongoDB.
    await client.close();
}

//Actualizar
async function actualizarDocumento(mydb, coleccion, filtro, actualizacion) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);
    const resultado = await collection.updateOne(filtro, { $set: actualizacion });
    console.log(`${resultado.modifiedCount} documento(s) actualizado(s).`);
    await client.close();
}

//Borrar
async function borrarDocumento(mydb, coleccion, filtro) {
    const client = await connectToMongo();
    const db = client.db(mydb);
    const collection = db.collection(coleccion);
    const resultado = await collection.deleteOne(filtro);
    console.log(`${resultado.deletedCount} documento(s) borrado(s).`);
    await client.close();
}

// Ver todos los elementos
async function verTodos(mydb, coleccion) {
    const client = await connectToMongo();
    try {
        const db = client.db(mydb);
        const collection = db.collection(coleccion);
        const result = await collection.find({}).toArray();
        console.log(result);
        return result;
    } finally {
        await client.close();
    }
}

// Aquí estamos exportando las funciones para que puedan ser usadas en otros archivos.
module.exports = {
    crearBaseDeDatos,
    crearColeccion,
    insertarDocumento,
    actualizarDocumento,
    borrarDocumento,
    verTodos
};