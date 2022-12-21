const { getMongoDbConnection } = require('../../utils/getMongoDbConnection');
const { tokenVerification } = require('../../utils/tokenVerification');
const { getRecette } = require('../../utils/getRecette');
const { addNewRecette } = require('../../utils/addNewRecette');

module.exports.getRecette = async (req, res) => {
    const { token } = req.query
    const { id } = req.params
    try {
        const result = await Promise.all([
            await tokenVerification(token),
            await getMongoDbConnection(),
            await getRecette(id),
        ]);
        const data = await result[result.length - 1].message;
        await res.status(200).json({ message: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports.getAllRecette = async (req, res) => {
    const { token } = req.query
    try {
        const result = await Promise.all([
            await tokenVerification(token),
            await getMongoDbConnection(),
            await getRecette(),
        ]);
        const data = await result[result.length - 1].message;
        await res.status(200).json({ message: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.createRecette = async (req, res) => {

    const { id } = req.params
    const { token } = req.query
    const recetteData = req.body

    if (req.file) {
        var recette = { image: req.file.originalname, userId: id , ...recetteData } 
    } else {
        var recette = { userId: id , ...recetteData }
    }

    try {
        const result = await Promise.all([
            await tokenVerification(token),
            await getMongoDbConnection(),
            await addNewRecette(recette),
        ]);
        const data = await result[result.length - 1].message;
        await res.status(200).json({ message: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
