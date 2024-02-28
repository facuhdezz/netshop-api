const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
const products = require('./products.json');

const cors = require('cors');
const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "*",
                    credentials: true
                }
            ]
        }
    }
}

app.use(cors(
    config.application.cors.server
  ));

app.use(express.static(path.join(__dirname, "../dist")))

app.get("/api", (req, res) => {
    res.send("<h1>Bienvenido al servidor</h1>");
});

/* OBTENER TODOS LOS PRODUCTOS O FILTRADOS POR CATEGORÍAS */

app.get("/api/products", (req, res) => { //  /productos?categoria={nombre_categoria}
    const category = req.query.category;

    if(category) {
        const productsCat = products.filter((item) => item.category == category);
        res.send(productsCat);
    } else {
        res.send(products)
    }
    
});

/* OBTENER UN PRODUCTO POR SU ID */

app.get("/api/products/:id", (req, res) => { //  /productos/{id}
    const productId = req.params.id;
    const product = products.filter((item) => item.id == productId);
    res.send(product);
});

/* OBTENER PRODUCTOS DESTACADOS */

app.get("/api/destacados", (req, res) => {
    const destacados = products.filter((item) => {return item.destacados === true});
    res.send(destacados);
});

/* OBTENER LAS CATEGORIAS */

app.get("/api/categorias", (req, res) => {
    const categorias = [...new Set(products.map(item => item.category))];
    res.send(categorias);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});


