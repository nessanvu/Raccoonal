/*
 * GET calendar page.
 */

var data = require("../calendar.json");
exports.view = function(req, res){
  res.render('calendar', data);
};