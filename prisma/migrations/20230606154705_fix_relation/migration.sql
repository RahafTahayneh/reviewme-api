/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_belongsToId_fkey";

-- DropIndex
DROP INDEX "Product_id_reviewId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
