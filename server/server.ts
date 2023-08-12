const app = require('./src/server.ts');
const http = require('http');

http.createServer(app).listen(process.env.PORT,console.log(`🚀 Server running on port ${process.env.PORT}!`));
