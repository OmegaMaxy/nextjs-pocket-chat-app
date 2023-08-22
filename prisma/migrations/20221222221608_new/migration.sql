/*
  Warnings:

  - You are about to drop the column `updated_at` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `email_adress` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires_at` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_adress_key` ON `User`;

-- AlterTable
ALTER TABLE `BankAccount` ADD COLUMN `type` ENUM('DEFAULT', 'SAVINGS_ACCOUNT') NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `updated_at`,
    ADD COLUMN `expires_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email_adress`,
    ADD COLUMN `email_address` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_address_key` ON `User`(`email_address`);
