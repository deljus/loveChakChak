-- CreateTable
CREATE TABLE "Order" (
    "orderID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productCount" INTEGER NOT NULL,
    "bookingTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "orderID"),
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderID_key" ON "Order"("orderID");
