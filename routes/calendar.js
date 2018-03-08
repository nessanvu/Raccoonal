/*
 * GET calendar page.
 */

var data = require("../calendar.json");
exports.view = function(req, res){
  res.render('calendar', data);
};

exports.isToday = function(req, res) {
    var d = new Date;
    var todayId = d.getMonth().toString()+d.getDate().toString();
    res.json({id: todayId});
}