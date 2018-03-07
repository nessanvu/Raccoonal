/*
 * GET home page.
 */
var data = require("../calendar.json");
var abTest = require("../ABtest.json");

exports.view = function (req, res) {
  console.log('Pass')
  abTest["viewAlt"] = false;  
  res.render('home', abTest);
};

exports.viewAlt = function (req, res) {
  console.log('Pass2')
  abTest["viewAlt"] = true;
  res.render('home', abTest);
};

exports.parseJson = function (req, res) {
  //console.log(req.body);
  res.status(200).end();
  var t = new Date();
  var m = t.getMonth();
  var d = t.getDate();
  for (var i = 0; i < data.dates.length; i++) {
    if (data.dates[i].month == m && data.dates[i].dateNumber == d) {
      data.dates[i].records.push(req.body);
    }
  }
};