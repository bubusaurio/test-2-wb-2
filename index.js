/* 
    Nombre: Pedro Yazael Mercado Ruano
    Registro: 22110125
 */

//Modulos Requeridos
const express = require('express');

//Creamos la aplicacion
const app = express();

//Parse JSON body
app.use(express.json());

//Array para guardar datos
let data = [];

//Metodo GET
app.get('/data', (req, res) => {
    res.json(data);
});

//Metodo POST
app.post('/data', (req, res) => {
    //Extraemos la data
    const newData = req.body;

    // Agregamos la nueva data
    data.push(newData);

    res.send('Data added successfully');
});

//Metodo PATCH
app.patch('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newData = req.body;

    //Buscamos el index
    const dataIndex = data.findIndex(item => item.id === id);

    if (dataIndex !== -1) {
        //Actualizamos los datos 
        data[dataIndex] = { ...data[dataIndex], ...newData };
        res.send('Data updated successfully!');
    } else {
        res.status(404).send('Data not found');
    }
});

//Metodo Delete
app.delete('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);

    //Buscamos el index
    const dataIndex = data.findIndex(item => item.id === id);

    if (dataIndex !== -1) {
        //Removemos los datos
        data.splice(dataIndex, 1);
        res.send('Data deleted successfully');
    } else {
        res.status(404).send('Data not found');
    }
});

//Metodo Get by id
app.get('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const foundData = data.find(item => item.id === id);

    if (foundData) {
        res.json(foundData);
    } else {
        res.status(404).send('Data not found');
    }
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});