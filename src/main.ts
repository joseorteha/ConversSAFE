import express, { json } from 'express';
import https from 'https';
import fs from 'fs';
import path, { resolve } from 'path';
import { initDatabase } from './db_handler';
import { authenticateUser } from './signin';
import { authorizeUser } from './login';

const app = express();
const PORT = 8080;

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
	.get((_req, res) => {
		res.sendFile(resolve(__dirname, "..", "public") + "/signin.html")
});

app.route("/login")
	.post(async(req, res) => {
		try {
			await authorizeUser(req.body.email, req.body.password);
		} catch (error) {
			if (error instanceof Error && error.message === "EMAIL_DOES_NOT_EXISTS") {
				res.status(401).send("Email does not exists");
				return;
			}
			else if (error instanceof Error && error.message === "INCORRECT_PASSWORD") {
				res.status(401).send("Incorrect password");
				return;
			} 
			else {
				res.status(500).send("Server error");
				return;
			}
		}
		res.status(200).send("OK");
})
	.get((_req, res) => {
		res.sendFile(resolve(__dirname, "..", "public") + "/login.html")
})


app.get('/', (_req, res) => {
  res.send('Hello from HTTPS Express server!');
});


const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '../certificates/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../certificates/server.cert')),
};


https.createServer(sslOptions, app).listen(PORT, () => {
	initDatabase();
	console.log(`HTTPS server running at https://localhost:${PORT}`);
});

