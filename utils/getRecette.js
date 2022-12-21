const { recette } = require('../models/recette')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')

module.exports.getRecette = async (id) => {
  if (id) {
    return {
        message: await recette.find(ObjectId(id)),
      };
  } else {
    return {
        message: await recette.find(),
      };
  }
}

