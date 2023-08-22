/*
  Warnings:

  - You are about to drop the column `canGoNegative` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `cardLimit` on the `BankAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BankAccount` DROP COLUMN `canGoNegative`,
    DROP COLUMN `cardLimit`,
    MODIFY `balance` DECIMAL(65, 4) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Card` MODIFY `state` ENUM('ENABLED', 'DISABLED', 'BLOCKED') NOT NULL DEFAULT 'ENABLED';
