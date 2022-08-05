var mongoose = require("mongoose");

const gridSchema = mongoose.Schema({
  name: String,
  as: Number,
  deux: Number,
  trois: Number,
  quatre: Number,
  cinq: Number,
  six: Number,
  total: Number,
  bonus: Number,
  total1: Number,
  min: Number,
  max: Number,
  total2: Number,
  petite: Number,
  grande: Number,
  full: Number,
  carre: Number,
  yam: Number,
  total3: Number,
  total4: Number,
});

module.exports.gridSchema = gridSchema;
