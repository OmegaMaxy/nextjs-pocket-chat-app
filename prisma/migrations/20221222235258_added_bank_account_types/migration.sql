/*
  Warnings:

  - You are about to drop the column `type` on the `BankAccount` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BankAccount` DROP COLUMN `type`,
    ADD COLUMN `cardLimit` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `type_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `BankAccountType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `canGoNegative` BOOLEAN NOT NULL DEFAULT false,
    `cardLimit` INTEGER NOT NULL DEFAULT 2,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BankAccount` ADD CONSTRAINT `BankAccount_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `BankAccountType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
