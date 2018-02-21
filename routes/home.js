/*
 * GET home page.
 */
var data = require("../calendar.json");

exports.view = function (req, res) {
  res.render('home');
};

exports.parseJson = function (req, res) {
  console.log("ayyy");
};