const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { recette: Recette } = require('../models/recette');

module.exports.addNewRecette = async (recetteParams) => {
    const { userId, ...rc } = recetteParams
    const recette = new Recette({
        userId: ObjectId(recetteParams.userId),
        ...rc,
        createdAt : new Date()
    });
    const recetteSaved = await recette.save();
    return { message: recetteSaved };
}
