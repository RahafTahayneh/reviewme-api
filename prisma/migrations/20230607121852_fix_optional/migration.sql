-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_belongsToId_fkey";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "belongsToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_belongsToId_fkey" FOREIGN KEY ("belongsToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
