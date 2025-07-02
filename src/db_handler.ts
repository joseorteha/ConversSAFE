import pgPromise from "pg-promise";
const pgp = pgPromise();
import { resolve } from "path";
import { execSync } from "child_process";

const DATABASE_NAME = "converSAFE_db";
const SQL_FILES_FOLDER = resolve(__dirname, "..", "utils", "sql/") + "/";

export function sql(fileName: String) {
    const fullPath = SQL_FILES_FOLDER + fileName
    return new pgp.QueryFile(fullPath, {minify: true});
} 

const initCredentialTablesQuery = sql('schema.sql');
export const db = pgp({
	host: "localhost",
	port: 5432,
	database: DATABASE_NAME,
	password: undefined,
	max: 30
});


export async function initDatabase() {
	try {
		execSync(`createdb ${DATABASE_NAME}`, {stdio: "ignore"}); // Ignore the output of the command
	} catch (error) {
		console.log(`${DATABASE_NAME} already exists`);
	}

	try {
		await db.none(initCredentialTablesQuery);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}
