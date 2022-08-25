-- CreateTable
CREATE TABLE `InventoryPolicy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `great` INTEGER NOT NULL,
    `critical` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Date` VARCHAR(191) NOT NULL,
    `Open` DOUBLE NOT NULL,
    `High` DOUBLE NOT NULL,
    `Low` DOUBLE NOT NULL,
    `Close` DOUBLE NOT NULL,
    `Volume` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
