const mysql = require('mysql');
const pool = mysql.createPool({
  connecttionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comadmin'
});

/**
 * @description: 普通连接
 */

// const sql = 'SELECT * FROM goods WHERE id=41';
// pool.query(sql, (err, result, fields) => {
//   if (err) {
//     console.log('this is error: ' + err);
//     return;
//   }
//   console.log(result);
// });


/**
 * @description: 连接池
 */

const sql = 'SELECT * FROM goods WHERE id = 41';
pool.getConnection((err, connection) => {
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log('this is err: ' + err);
      return;
    } else {
      console.log(results);
    }
    // When you are done with a connection, just call connection.release() and the connection will return to the pool, ready to be used again by someone else.
    connection.release();

    // 关闭连接
    // connection.destroy();
  });

});





/**
 * @description: 数据池连接监听：
 * 
 * acquire，从数据池获得连接是发送此事件
 * connection，连接数据池时发送此事件
 * enqueue,回调函数返回数据执行队列
 * release，数据连接执行完毕，返回释放连接
 */

// pool.on('acquire', function (connection) {
//   console.log('Connection %d acquired', connection.threadId);
// });


// pool.on('connection', function (connection) {
//   // connection.query('SET SESSION auto_increment_increment=1')
//   console.log('123456789');
// });


// pool.on('enqueue', function () {
//   console.log('Waiting for available connection slot');
// });


// pool.on('release', function (connection) {
//   console.log('Connection %d released', connection.threadId);
// });