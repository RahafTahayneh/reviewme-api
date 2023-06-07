/*
  Warnings:

  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
