-- CreateTable
CREATE TABLE `Flat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `area` VARCHAR(191) NOT NULL,
    `floor` INTEGER NOT NULL,
    `rooms` INTEGER NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `ownerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Owner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Flat` ADD CONSTRAINT `Flat_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Owner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
