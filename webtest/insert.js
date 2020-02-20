// mysql 插入

var config = require('./db.js');

var mysql = require('mysql');

var db = {};
db.query = function (sql, callback) {
    var con = mysql.createConnection({
        host: '192.168.1.114',
        user: 'mysql',
        password: 'abcd1234',
        database: 'mysql_nodejs',
        port: 3306
    });

    var query = connection.query('SELECT * from sur', function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = 'INSERT INTO customers (id,temp, hum, date) VALUES(0,?,?,?)';
        var addSqlParams = ('22.5', '55', '2020-03-29');
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("插入了1條記錄");


            connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }
                console.log('--------------------------INSERT----------------------------');
                //console.log('INSERT ID:',result.insertId);        
                console.log('INSERT ID:', result);

            });
        });

    });
}