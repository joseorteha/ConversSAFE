import express, {Request, Response, NextFunction, json} from 'express';
import https from 'https';
import fs from 'fs';
import path, { resolve } from 'path';
import { initDatabase } from './db_handler';
import { authenticateUser } from './signin';

const app = express();
const port = 8080;

app.use(json());


app.route("/signin")
	.post(async (req, res) => {
		try {
			await authenticateUser(req.body.username, req.body.email, req.body.password);
		} catch (error) {
			if (error instanceof Error && error.message === "CREDENTIAL_CONFLICT") {
				res.status(401).send("Unauthorized. Username or email already exists");
				return;
			} 
			else if (error instanceof Error && error.message === "INTERNAL_DATABASE_ERROR") {
				res.status(505).send("Server Error");
				return;
			}
		}

		res.status(200).send("OK");
})
	.get((req, res) => {
		res.sendFile(resolve(__dirname, "..", "public") + "/signin.html")
});

app.get("/login", (req, res) => {
	res.send("This should be a signin form");
});

app.get('/', (_req, res) => {
  res.send('Hello from HTTPS Express server!');
});

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '../certificates/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../certificates/server.cert')),
};

initDatabase();

https.createServer(sslOptions, app).listen(port, () => {
  console.log(`HTTPS server running at https://localhost:${port}`);
});

