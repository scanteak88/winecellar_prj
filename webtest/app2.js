//引入先前的db.js
//var config = require("./db.js");
var express = require('express');
var app = express();
var fs = require('fs');
var dbtool = require("./Access_data");

//app.engine('jade', require('jade').__express);

// 設定靜態檔案所在目錄
app.use(express.static(__dirname + '/views'));

//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');

//=========================================================
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/show', function (req, res) {
    fs.readFile(__dirname + '/views/Group_picture1.html', 'utf8', function (err, text) {
        res.send(text);
    });
});

//設備1
app.get('/scart1', function (req, res) {
    console.log(req.query.key);//key =
    fs.readFile(__dirname + '/views/scart1.html', 'utf8', function (err, text) {
        res.send(text);
    });
});

//設備2
app.get('/scart2', function (req, res) {
    console.log(req.query.key);//key =
    fs.readFile(__dirname + '/views/scart2.html', 'utf8', function (err, text) {
        res.send(text);
    });
});

//save to mqsql 
app.get('/upload', function (req, res) {
    //console.log(req.query.api_key);//field1 =
    //console.log(req.query.field1);//field1 =
    //console.log(req.query.field2);//field2 =
    uptime = new Date();
    dbtool.writeData(req.query.api_key, req.query.field1, req.query.field2, uptime);
    res.end();
});

//get from mysql 讀
app.get('/getload', function (req, res) {
    //console.log(req.query.field1);//field1= inkey
    //console.log(req.query.field2);//field2= stday
    //console.log(req.query.field3);//field3= endday
    var inkey = req.query.field1
    var stday = req.query.field2
    var endday = req.query.field3
    //console.log(req.query.field4);//field4= 日期(確定按鈕)
    jdata = {}
    dbtool.readData(inkey, stday, endday, function (jdata) {
        //console.log(jdata); 
        res.json(jdata);
    });
    //res.send(jdata);
});

app.listen(80, function () {
    console.log('Example app listening on port 3000!');
});
