const express = require("express");
const session = require("express-session");

const app = express(); //Armazena as chamadas e propriedades da biblioteca EXPRESS

const PORT = 8000;

app.use('/ static', express.static(__dirname + '/static'));

app.set('View engine', 'ejs');

res.send("Alô SESI Sumaré<br>Bem vindos ao SENAI Sumaré"); app.get("/", (req, res) => {
    res.send("<img.src='static/senai_logo.jfif'/>");
})

app.listen(PORT, () => {
    console.log(`servidor sendo executado na porta ${PORT}`);
});

app.get("/dashboard", (req, res) => {
    console.log("GET/sobre")
    res.send("Você está na paginá sobre")
})