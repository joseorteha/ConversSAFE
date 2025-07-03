import { db, sql } from "./db_handler";
import { genSalt, hash } from "bcrypt";

const insertNewUserQuery = sql("signin.sql");

// This is a bit limited, but it'll do for a while, I have to limit the size of
// the credentials sent by the form to avoid errors when introducing them to
// the database

export async function authenticateUser(username: string, email: string, password: string) { try {
		let salt = await genSalt(10);
		let hashedPass = await hash(password, salt);

		let result = await db.result(insertNewUserQuery, {
			username: username,
			email: email.toLowerCase(), // Lowercase because all the email services have it as a standard
			password: hashedPass,
			salt: salt
		});
		
		if (result.rowCount !== 1)
			throw new Error("CREDENTIAL_CONFLICT")

	} catch (error: any) {
		if (error.message === "CREDENTIAL_CONFLICT") 
			throw error;

		throw new Error("INTERNAL_DATABASE_ERROR") }
}
