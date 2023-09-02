/*
  Warnings:

  - You are about to drop the column `orderBooks` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderBooks",
ADD COLUMN     "orderedBooks" JSONB;
