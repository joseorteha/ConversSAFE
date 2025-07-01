import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 8080;

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '../certificates/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../certificates/server.cert')),
};

app.get('/', (_req, res) => {
  res.send('Hello from HTTPS Express server!');
});

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`HTTPS server running at https://localhost:${port}`);
});

