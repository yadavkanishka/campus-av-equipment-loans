
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDirectory = path.join(process.cwd(), "data");

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const databasePath = path.join(dataDirectory, "campus-loans.db");

const globalForDb = globalThis as unknown as {
  db: Database.Database | undefined;
};

export const db =
  globalForDb.db ??
  new Database(databasePath);

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
