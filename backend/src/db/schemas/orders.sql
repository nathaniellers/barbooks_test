DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  product TEXT    NOT NULL,
  qty     INTEGER NOT NULL CHECK (qty > 0),
  price   REAL    NOT NULL CHECK (price >= 0)
);
