const express = require('express');
const path = require('path');
const router = require('./routes/router');


const app = express();


// 服务器端连接public里面的静态资源
app.use(express.static(path.join(__dirname, 'public')))

// 当客户端请求路径为todolist开头时，使用该路由列表
app.use('/todolist', router);

app.listen(3000);
console.log('服务器启动成功');
