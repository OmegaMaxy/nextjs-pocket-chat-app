/*
  Warnings:

  - You are about to alter the column `balance` on the `BankAccount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(65,4)`.
  - You are about to alter the column `amount_transferred` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(65,4)`.

*/
-- AlterTable
ALTER TABLE `BankAccount` ADD COLUMN `canGoNegative` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `balance` DECIMAL(65, 4) NOT NULL,
    MODIFY `isBlocked` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `amount_transferred` DECIMAL(65, 4) NOT NULL;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Session_session_id_key`(`session_id`),
    UNIQUE INDEX `Session_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
