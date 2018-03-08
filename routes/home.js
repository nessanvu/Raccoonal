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
            var me = "angry";
            var mv = req.body.emotion.anger;
            if (req.body.emotion.contempt > mv) {
                me = "contempt"
                mv = req.body.emotion.contempt
            }
            if (req.body.emotion.disgust > mv) {
                me = "disgust"
                mv = req.body.emotion.disgust
            }
            if (req.body.emotion.fear > mv) {
                me = "fear"
                mv = req.body.emotion.fear
            }
            if (req.body.emotion.joy > mv) {
                me = "joy"
                mv = req.body.emotion.joy
            }
            if (req.body.emotion.sadness > mv) {
                me = "sad"
                mv = req.body.emotion.sadness
            }
            if (req.body.emotion.surprise > mv) {
                me = "surprise"
                mv = req.body.emotion.contempt
            }
            data.dates[i].image = me+".png";

        }
    }
};