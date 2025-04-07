const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index")
//  res.send("Alô SESI Sumaré!");
})

app.get("/sobre", (req, res) => {
    // res.send("Voçê chegou a página!");
    res.render("Sobre")
   })
   // res.send(Voçê chegou a página Sobre)

// Exercicio, criar uma rota para a página sobre 
app.listen(3000, () => {
    console.log(`Servidor Nodejs ativo na porta 3000`);
})