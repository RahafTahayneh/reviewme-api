/*
  Warnings:

  - You are about to drop the column `productId` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productId",
ADD COLUMN     "storeProductId" TEXT;
