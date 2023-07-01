-- CreateTable
CREATE TABLE "Point" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemsToPoint" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ItemsToPoint_A_fkey" FOREIGN KEY ("A") REFERENCES "Items" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ItemsToPoint_B_fkey" FOREIGN KEY ("B") REFERENCES "Point" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemsToPoint_AB_unique" ON "_ItemsToPoint"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemsToPoint_B_index" ON "_ItemsToPoint"("B");
