/*
  Warnings:

  - Added the required column `projectManager` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamRole` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamSize` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Group` ADD COLUMN `groupDescription` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `budget` DOUBLE NULL,
    ADD COLUMN `projectDescription` VARCHAR(191) NULL,
    ADD COLUMN `projectManager` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Team` ADD COLUMN `teamDescription` VARCHAR(191) NULL,
    ADD COLUMN `teamRole` ENUM('DEVELOPMENT', 'QA', 'DESIGN', 'MANAGER', 'SUPPORT') NOT NULL,
    ADD COLUMN `teamSize` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TeamMember` ADD COLUMN `role` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Ticket` (
    `ticketId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` ENUM('incident', 'problem', 'change', 'serviceRequest', 'task') NOT NULL,
    `priority` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    `status` ENUM('new', 'assigned', 'inProgress', 'resolved', 'closed', 'onHold', 'waitingForApproval', 'awaitingUser') NOT NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `resolvedAt` DATETIME(3) NULL,
    `closedAt` DATETIME(3) NULL,
    `dueDate` DATETIME(3) NULL,
    `assignedToEmail` VARCHAR(191) NULL,
    `createdByEmail` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NULL,
    `groupId` VARCHAR(191) NULL,
    `parentTicketId` VARCHAR(191) NULL,
    `attachmentIds` JSON NULL,
    `impact` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    `urgency` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    `serviceId` VARCHAR(191) NULL,
    `categoryId` VARCHAR(191) NULL,
    `subcategoryId` VARCHAR(191) NULL,
    `slaId` VARCHAR(191) NULL,
    `externalReference` VARCHAR(191) NULL,
    `customFields` JSON NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`ticketId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `authorEmail` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Incident` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `priority` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    `status` ENUM('new', 'assigned', 'inProgress', 'resolved', 'closed', 'onHold', 'waitingForApproval', 'awaitingUser') NOT NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `resolvedAt` DATETIME(3) NULL,
    `closedAt` DATETIME(3) NULL,
    `dueDate` DATETIME(3) NULL,
    `assignedToEmail` VARCHAR(191) NULL,
    `createdByEmail` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NULL,
    `impact` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    `urgency` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    `serviceId` VARCHAR(191) NULL,
    `categoryId` VARCHAR(191) NULL,
    `subcategoryId` VARCHAR(191) NULL,
    `slaId` VARCHAR(191) NULL,
    `externalReference` VARCHAR(191) NULL,
    `customFields` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogueItem` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `type` ENUM('product', 'service', 'request', 'software') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `price` DOUBLE NULL,
    `categoryId` VARCHAR(191) NULL,
    `availability` ENUM('available', 'unavailable', 'restricted', 'discontinued') NOT NULL DEFAULT 'available',
    `customFields` JSON NULL,
    `slaId` VARCHAR(191) NULL,
    `serviceId` VARCHAR(191) NULL,
    `externalReference` VARCHAR(191) NULL,
    `customAttributes` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogueCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CatalogueTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(191) NOT NULL,
    `catalogueItemId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Request` (
    `requestId` VARCHAR(191) NOT NULL,
    `catalogueItemId` VARCHAR(191) NULL,
    `requestedByEmail` VARCHAR(191) NOT NULL,
    `status` ENUM('new', 'pending', 'inProgress', 'fulfilled', 'cancelled') NOT NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `fulfilledAt` DATETIME(3) NULL,
    `dueDate` DATETIME(3) NULL,
    `customFields` JSON NULL,

    PRIMARY KEY (`requestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`ticketId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Incident` ADD CONSTRAINT `Incident_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`ticketId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatalogueItem` ADD CONSTRAINT `CatalogueItem_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CatalogueCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CatalogueTag` ADD CONSTRAINT `CatalogueTag_catalogueItemId_fkey` FOREIGN KEY (`catalogueItemId`) REFERENCES `CatalogueItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_catalogueItemId_fkey` FOREIGN KEY (`catalogueItemId`) REFERENCES `CatalogueItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
