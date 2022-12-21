/*
|-----------------------------------------------------------------------------------------------------------|
|                                           Importations Des Modules                                        |
|-----------------------------------------------------------------------------------------------------------|
*/

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const multer = require("multer");
const session = require('express-session')
const cookieParser = require('cookie-parser')
const { Router } = require('./routes/router')
const {login } = require('./controllers/login')
const {register } = require('./controllers/register')
const { getRecette, getAllRecette, createRecette } = require('./controllers/recettes/handleRecette');

/*
|-----------------------------------------------------------------------------------------------------------|
|                                Configurations Et Initialisations Des Middlewares                          |
|-----------------------------------------------------------------------------------------------------------|
*/

//rendre les variables d'environents du fichier .env visible dans toute l'application
require('dotenv').config()

//instantiation de express
const app = express()

//authorisation des requettes Cors sur L'api
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin , X-Requested-With , Content-Type , Accept");
    next();
});

// configuration du repertoire racine des fichiers statiques
app.use('/', express.static('public'))

// configuration du bodyParser pour parser le corps des requetes
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//configuration du cookie parser
app.use(cookieParser())

// configuration du middleWare de session
app.use(session({
    secret: "Betterlidays",
    reSave: "false",
    saveUnitialized: true,
    Cookie: { secure: false },
}))

// creation du port d'écoute du serveur
const Port = process.env.PORT || 5000

app.get('/' , (req , res) => {
    res.status(200).json({message : 'welcome to my recetteApi'})
})

app.post('/login' , login)
app.post('/register' , register)
app.get('/recette/:id' , getRecette)
app.get('/recettes' , getAllRecette)


// configurations des options d'upload d'images
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "./public/images/");
    },
    filename: (req, file, callBack) => {
        callBack(
            null,
            `${file.fieldname}-${Date.now()} ${path.extname(file.originalname)}`
        );
    },
});
const upload = multer({ storage: storage });

app.post('/createRecette', upload.single("image"), createRecette)

// configuration du port d'écoute du seveur
app.listen(Port, () => {
    console.log(`serveur de L'api demarré sur le port ${Port}`);
})

// configuration des route racines de l'api
//app.use('/api', Router)
