
/*
 * GET book page.
 */
var data = require("../public/data/raccoons.json");

exports.view = function(req, res){
  res.render('book', data);
};