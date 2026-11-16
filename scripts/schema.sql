
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (
    role IN ('COORDINATOR', 'DEPOT_STAFF')
  ),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  total_quantity INTEGER NOT NULL CHECK (total_quantity >= 0),
  available_quantity INTEGER NOT NULL CHECK (available_quantity >= 0),
  image_url TEXT,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tracking_code TEXT NOT NULL UNIQUE,
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  department TEXT NOT NULL,
  purpose TEXT NOT NULL,
  equipment_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  coordinator_notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  approved_at TEXT,
  picked_up_at TEXT,
  returned_at TEXT,
  FOREIGN KEY (equipment_id) REFERENCES equipment(id)
);

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  api_enabled INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO settings (id, api_enabled)
VALUES (1, 0);
