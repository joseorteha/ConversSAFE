import { compare } from "bcrypt";
import { db, sql } from "./db_handler";

const getUserPasswordQuery = sql("login.sql");

export async function authorizeUser(email: string, password: string) {
	const storedPass = await db.oneOrNone(getUserPasswordQuery, { email: email.toLowerCase() });

	if (!storedPass)
		throw new Error("EMAIL_DOES_NOT_EXISTS");

	const isCorrectPass = await compare(password, storedPass.password);

	if (!isCorrectPass)
		throw new Error("INCORRECT_PASSWORD");

}
