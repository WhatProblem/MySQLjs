const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: '3306',
  database: 'comadmin'
});


// #查询语句用法：
/**
 * @description: 用法一
 * .query(sqlString, callback)
 */
// connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
// });


/**
 * @description：用法二
 * .query(sqlString, values, callback)
 */
// connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function (error, results, fields) {
// });


/**
 * @description：用法三
 * .query(options, callback)
 */
// connection.query({
//   sql: 'SELECT * FROM `books` WHERE `author` = ?',
//   timeout: 40000, // 40s
//   values: ['David']
// }, function (error, results, fields) {

// });

// connection.query({
//     sql: 'SELECT * FROM `books` WHERE `author` = ?',
//     timeout: 40000, // 40s
//   },
//   ['David'],
//   function (error, results, fields) {

//   }
// );


// #用法一：
// const sql = 'SELECT * FROM goods WHERE id=41';
// conn.query(sql, (err, result) => {
//   if (err) {
//     console.log('this is error: ' + err);
//     return;
//   }
//   console.log(result);
// });
// conn.end();


// #用法二：
// const sql = 'SELECT * FROM goods WHERE id = ?';
// conn.query(sql, ['41'], (err, results, fields) => {
//   if (err) {
//     console.log('this is error：' + err);
//     return;
//   } else {
//     console.log(results);
//     // console.log(fields);
//   }
// });
// conn.end();


// #用法三：<1>
const sql = 'SELECT * FROM goods WHERE id = ?';
let options = {
  sql: sql,
  timeout: 30000,
  values: ['41']
};
conn.query(options, (err, results, fields) => {
  if (err) {
    console.log('this is error:' + err);
    return;
  } else {
    console.log(results);
  }
});
conn.end();

// #<2>
// const sql = 'SELECT * FROM goods WHERE id = ?';
// const value = ['41'];
// const options = {
//   sql: sql,
//   timeout: 30000
// };
// conn.query(options, value, (err, results, fields) => {
//   if (err) {
//     console.log('this is err:'+err);
//     return;
//   } else {
//     console.log(results);
//   }
// });
// conn.end();






/**
 * @description:常用语法
 */

// #修改语句：update
// connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
//   if (error) throw error;
//   // ...
// });



// #增加语句：insert
// var post  = {id: 1, title: 'Hello MySQL'};
// var query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
//   if (error) throw error;
//   // Neat!
// });
// console.log(query.sql);



// #查询语句：select
// var userId = 1;
// var columns = ['username', 'email'];
// var query = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', userId], function (error, results, fields) {
//   if (error) throw error;
//   // ...
// });
// console.log(query.sql); // SELECT `username`, `email` FROM `users` WHERE id = 1
 


// #格式化查询语句
// var sql = "SELECT * FROM ?? WHERE ?? = ?";
// var inserts = ['users', 'id', userId];
// sql = mysql.format(sql, inserts); // SELECT * FROM `users` WHERE id = userId


// #删除语句
// connection.query('DELETE FROM posts WHERE title = "wrong"', function (error, results, fields) {
//   if (error) throw error;
//   console.log('deleted ' + results.affectedRows + ' rows');
// })


// #事件监听：多个用户连接获取数据
// var query = connection.query('SELECT * FROM posts');
// query
//   .on('error', function(err) {
//     // Handle error, an 'end' event will be emitted after this as well
//   })
//   .on('fields', function(fields) {
//     // the field packets for the rows to follow
//   })
//   .on('result', function(row) {
//     // Pausing the connnection is useful if your processing involves I/O
//     connection.pause();
 
//     processRow(row, function() {
//       connection.resume();
//     });
//   })
//   .on('end', function() {
//     // all rows have been received
//   });