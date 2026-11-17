
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { db } from "../lib/db";

const schemaPath = path.join(process.cwd(), "scripts", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

// Create database tables
db.exec(schema);

// Seed test accounts
const coordinatorPassword = bcrypt.hashSync("Coordinator@123", 10);
const depotPassword = bcrypt.hashSync("Depot@123", 10);

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, password_hash, role)
  VALUES (?, ?, ?, ?)
`);

insertUser.run(
  "Test Coordinator",
  "coordinator@campus.ca",
  coordinatorPassword,
  "COORDINATOR"
);

insertUser.run(
  "Test Depot Staff",
  "depot@campus.ca",
  depotPassword,
  "DEPOT_STAFF"
);

// Seed equipment
const equipment = [
  ["Projector", "Portable classroom projector", "AV Equipment", 5],
  ["Laptop", "Windows laptop for academic use", "Computers", 10],
  ["Microphone", "Wireless handheld microphone", "Audio", 8],
  ["Speaker", "Portable Bluetooth speaker", "Audio", 6],
  ["HDMI Cable", "High-speed HDMI cable", "Accessories", 15],
  ["Camera", "Digital video camera", "Video Equipment", 4],
];

const insertEquipment = db.prepare(`
  INSERT INTO equipment
  (name, description, category, total_quantity, available_quantity)
  VALUES (?, ?, ?, ?, ?)
`);

const seedEquipment = db.transaction(() => {
  for (const item of equipment) {
    const existing = db.prepare(
      "SELECT id FROM equipment WHERE name = ?"
    ).get(item[0]);

    if (!existing) {
      insertEquipment.run(
        item[0],
        item[1],
        item[2],
        item[3],
        item[3]
      );
    }
  }
});

seedEquipment();

console.log("Database setup completed!");
console.log("Coordinator: coordinator@campus.ca");
console.log("Depot Staff: depot@campus.ca");
console.log("Test accounts created successfully.");
console.log("Equipment seeded successfully.");

db.close();
