const express = require("express");
const multer = require("multer");
const path = require("path");
const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
const { getRecette, getAllRecette, createRecette } = require("../controllers/recettes/handleRecette");


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

module.exports.Router = (() => {
    const Router = express.Router();

    Router.post('/login', login)
    Router.post('/register', register)
    Router.get('/recette/:id', getRecette)
    Router.get('/recettes', getAllRecette)

    Router.post('/createRecette', upload.single("image"), createRecette)
    // Router.put('/updateRecette/:id', updateRecette)
    // Router.delete('/deleteRecette', deleteRecette)


    // enregistrer une image de cuisine...
    // Router.post(
    //     "/user/updateMyprofilPicture",
    //     /*RoutesAuthentification,*/
    //     upload.single("image"),
    //     updateMyprofilPicture
    // );

    return Router;
})();
