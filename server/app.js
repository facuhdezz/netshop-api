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

app.get("/api/products", (req, res) => {
    res.send(products);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});


