-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Point" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);
INSERT INTO "new_Point" ("city", "email", "id", "latitude", "longitude", "name", "uf", "whatsapp") SELECT "city", "email", "id", "latitude", "longitude", "name", "uf", "whatsapp" FROM "Point";
DROP TABLE "Point";
ALTER TABLE "new_Point" RENAME TO "Point";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
