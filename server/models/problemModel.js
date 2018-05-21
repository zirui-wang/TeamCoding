const mongoose = require('mongoose');
const ProblemSchema = mongoose.Schema({
  id: Number,
  title: String,
  desc: String,
  difficulty: String
});
const probelmModel = mongoose.model('ProblemModel', ProblemSchema);
module.exports = probelmModel;
