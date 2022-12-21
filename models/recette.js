const { model, models, Schema } = require('mongoose')

const recetteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  ingrediants: {
    type: Array,
    required: true,
  },
  lienVideo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    defalut: Date.now(),
  },
})

module.exports.recette = models.recette || model('recette', recetteSchema)
