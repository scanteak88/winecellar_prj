
// node.js連接MySQL

var mysql = require('mysql');
//var db = {};
var connecction = {}


var db = function (sql, callback) {
    //connection.connect();
    connecction = mysql.createConnection({
        host: '172.17.0.2',
        user: 'sur',
        password: 'abcd1234',
        port: 3306,
        database: 'mysql_nodejs',
        dialectOptions: {
            socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        /* data1: {
             Hosts: '192.168.1.114:80',
             Device: 'scart1',
             key: 'S5M0RSWXO1N8DUVR',
         },
         data2: {
             Hosts: '192.168.1.114:80',
             Device: 'scart2',
             key: '7H3W0YBKSX4FUB9H',
         }*/
    });

    connecction.connect(function (err) {
        if (err) {
            console.log('連接失敗');
            console.log(err);

            //console.log(">>db link off!"); 
            //connecction.end();
            return;
        } else {
            console.log('連接成功');
            connecction.query(sql, function (error, results, fields) {
                if (error) {
                    throw error;
                } else {
                    //console.log(results);
                    //console.log('The solution is: ', results[0].solution);
                    var jj = results
                    callback(error, jj);
                }
                console.log(">>db link off!");
                connecction.end();
            });
        }
    });
}

// 將mysql的sur 存入 exports
exports.db = db;
