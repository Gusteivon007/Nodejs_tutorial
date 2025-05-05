const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3");
//const bodyparser = require("body-parser"); // Versão do express <= 4

const app = express();

const PORT = 8000;

//Conexão com o banco de dados
const db = new sqlite3.Database("user.db")

db.serialize(() => {
    db.run(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
    )
})


app.use('/static', express.static(__dirname + '/static'));

// Configuração do express para processar requisições POST com BODY PARAMETERS
//app.use(bodyparser.urlencoded({extended: true})); // Versão <= 4.x.x
app.use(express.urlencoded({ extended: true })); // Versão Express >= 5.x.x

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    console.log("GET /")
    //res.send("Neymar no Santos Futebol clube <br> <img src='./static/neymarsantos.webp' width='700px'/>");
    res.render("pages/index");
});

app.get("/sobre", (req, res) => {
    console.log("GET /sobre")
    // res.send("Você está na pagina SOBRE.")
    res.render("pages/sobre");
});

app.get("/dashboard", (req, res) => {
    console.log("GET /dashboard")
    res.render("pages/dashboard")
});

app.get("/login", (req, res) => {
    console.log("GET /login")
    res.render("pages/login")
});

// /login para processamento dos dados do formulário de LOGIN no cliente
app.post("/login", (req, res) => {
    console.log("POST /login")
    console.log(JSON.stringify(req.body));
    //res.render("pages/login")
    const { username, password } = req.body;

    // 1. Verificar se o usuário existe

    const query = "SELECT * FROM users WHERE username=? AND password=?"
    db.get(query, [username, password], (err, row) => {
        if (err) throw err;
        console.log(JSON.stringify(row))
        if (row) {
            res.redirect("/dashboard");
        } else {
            res.send("Usuário Inválido");
        }
    })

    // 2. Se o usuário existir e a senha é válida no BD, executar processo de login
    console.log(`Usuário: ${username} já cadastrado.`)
    res.send("Usuário já cadastrado")

    // 3. Se não, executar processo de negação de login

});

app.get("/cadastro", (req, res) => {
    console.log("GET /cadastro")
    res.render("pages/cadastro")
});

// CADASTRO
app.post("/cadastro", (req, res) => {
    console.log("POST /cadastro");
    console.log(JSON.stringify(req.body));
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username=?"

    db.get(query, [username], (err, row) => {
        if (err) throw err;

        // 1. Verificar se o usuário já existe
        console.log("Query SELECT do cadastro:", JSON.stringify(row));
        if (row) {
            // 2. Se o usuário existir avisa o usuário que não é possível realizar o cadastro
            console.log(`Usuário: ${username} já cadastrado.`);
            res.send("Usuário já cadastrado");
        } else {
            // 3. Se não existir, executar processo de cadastro de usuário
            const insert = "INSERT INTO users (username, password) VALUES (?,?)"
            db.get(insert, [username, password], (err, row) => {
                if (err) throw err;

                console.log(`Usuário: ${username} cadastrado com sucesso.`)
                res.redirect("/login"); // Redireciona para a página de login caso o registro tenha sucesso
            })
        }
    })
})


app.listen(PORT, () => {
    console.log(`Servidor sendo executado na porta ${PORT}`);
    console.log(__dirname + "\\static")
});