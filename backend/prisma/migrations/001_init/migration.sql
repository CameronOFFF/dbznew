-- Initial schema for Chrono Saiya RPG
CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `legacyMd5` boolean NOT NULL DEFAULT false,
  `role` enum('PLAYER','ADMIN') NOT NULL DEFAULT 'PLAYER',
  `isBanned` boolean NOT NULL DEFAULT false,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_username_key` (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `RefreshToken` (
  `id` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `revokedAt` datetime(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `RefreshToken_token_key` (`token`),
  KEY `RefreshToken_userId_idx` (`userId`),
  CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `UserPreference` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `language` varchar(191) NOT NULL DEFAULT 'pt-BR',
  `theme` varchar(191) NOT NULL DEFAULT 'dark',
  `notifications` boolean NOT NULL DEFAULT true,
  `twoFactorSecret` varchar(191),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserPreference_userId_key` (`userId`),
  CONSTRAINT `UserPreference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `RaceClass` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `baseStrength` int NOT NULL,
  `baseDefense` int NOT NULL,
  `baseResilience` int NOT NULL,
  `baseAgility` int NOT NULL,
  `baseSpeed` int NOT NULL,
  `baseEnergy` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `RaceClass_name_key` (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Player` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `avatarUrl` varchar(191),
  `raceClassId` varchar(191) NOT NULL,
  `level` int NOT NULL DEFAULT 1,
  `experience` int NOT NULL DEFAULT 0,
  `statPoints` int NOT NULL DEFAULT 0,
  `strength` int NOT NULL DEFAULT 5,
  `defense` int NOT NULL DEFAULT 5,
  `resilience` int NOT NULL DEFAULT 5,
  `agility` int NOT NULL DEFAULT 5,
  `speed` int NOT NULL DEFAULT 5,
  `energy` int NOT NULL DEFAULT 100,
  `critChance` double NOT NULL DEFAULT 0.05,
  `critDamage` double NOT NULL DEFAULT 1.5,
  `hp` int NOT NULL DEFAULT 100,
  `ki` int NOT NULL DEFAULT 50,
  `stamina` int NOT NULL DEFAULT 100,
  `title` varchar(191),
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Player_userId_key` (`userId`),
  CONSTRAINT `Player_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE,
  CONSTRAINT `Player_raceClassId_fkey` FOREIGN KEY (`raceClassId`) REFERENCES `RaceClass`(`id`) ON DELETE RESTRICT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `WalletTransaction` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `currency` enum('ZENI','GEMAS') NOT NULL,
  `amount` int NOT NULL,
  `balanceAfter` int NOT NULL,
  `reason` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `WalletTransaction_userId_idx` (`userId`),
  CONSTRAINT `WalletTransaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Item` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `category` enum('CONSUMABLE','EQUIPMENT','MATERIAL','COSMETIC') NOT NULL,
  `rarity` varchar(191) NOT NULL,
  `effectJson` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `InventoryItem` (
  `id` varchar(191) NOT NULL,
  `playerId` varchar(191) NOT NULL,
  `itemId` varchar(191) NOT NULL,
  `quantity` int NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `InventoryItem_playerId_idx` (`playerId`),
  CONSTRAINT `InventoryItem_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE CASCADE,
  CONSTRAINT `InventoryItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `EquipmentSlot` (
  `id` varchar(191) NOT NULL,
  `playerId` varchar(191) NOT NULL,
  `slot` varchar(191) NOT NULL,
  `itemId` varchar(191),
  PRIMARY KEY (`id`),
  KEY `EquipmentSlot_playerId_idx` (`playerId`),
  CONSTRAINT `EquipmentSlot_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE CASCADE,
  CONSTRAINT `EquipmentSlot_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Quest` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `questType` enum('DAILY','WEEKLY','REPEATABLE') NOT NULL,
  `objectives` json NOT NULL,
  `rewards` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `PlayerQuest` (
  `id` varchar(191) NOT NULL,
  `playerId` varchar(191) NOT NULL,
  `questId` varchar(191) NOT NULL,
  `progress` int NOT NULL DEFAULT 0,
  `completed` boolean NOT NULL DEFAULT false,
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PlayerQuest_playerId_idx` (`playerId`),
  CONSTRAINT `PlayerQuest_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE CASCADE,
  CONSTRAINT `PlayerQuest_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `Quest`(`id`) ON DELETE RESTRICT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `SagaChapter` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `synopsis` varchar(191) NOT NULL,
  `minLevel` int NOT NULL,
  `energyCost` int NOT NULL,
  `difficulty` enum('NORMAL','HARD') NOT NULL,
  `rewards` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `SagaProgress` (
  `id` varchar(191) NOT NULL,
  `playerId` varchar(191) NOT NULL,
  `chapterId` varchar(191) NOT NULL,
  `completed` boolean NOT NULL DEFAULT false,
  `completedAt` datetime(3),
  PRIMARY KEY (`id`),
  KEY `SagaProgress_playerId_idx` (`playerId`),
  CONSTRAINT `SagaProgress_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE CASCADE,
  CONSTRAINT `SagaProgress_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `SagaChapter`(`id`) ON DELETE RESTRICT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ArenaProfile` (
  `id` varchar(191) NOT NULL,
  `playerId` varchar(191) NOT NULL,
  `elo` int NOT NULL DEFAULT 1000,
  `wins` int NOT NULL DEFAULT 0,
  `losses` int NOT NULL DEFAULT 0,
  `season` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ArenaProfile_playerId_key` (`playerId`),
  CONSTRAINT `ArenaProfile_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Tournament` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `scheduledAt` datetime(3) NOT NULL,
  `entryCost` int NOT NULL,
  `rewardJson` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Challenge` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `week` int NOT NULL,
  `rewardJson` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Clan` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `motto` varchar(191),
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Clan_name_key` (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ClanMember` (
  `id` varchar(191) NOT NULL,
  `clanId` varchar(191) NOT NULL,
  `playerId` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'MEMBER',
  `joinedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ClanMember_playerId_key` (`playerId`),
  CONSTRAINT `ClanMember_clanId_fkey` FOREIGN KEY (`clanId`) REFERENCES `Clan`(`id`) ON DELETE CASCADE,
  CONSTRAINT `ClanMember_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `BattleLog` (
  `id` varchar(191) NOT NULL,
  `playerId` varchar(191) NOT NULL,
  `mode` varchar(191) NOT NULL,
  `summary` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `BattleLog_playerId_idx` (`playerId`),
  CONSTRAINT `BattleLog_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `AuditLog` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `action` enum('LOGIN','TRANSACTION','PVP','DROP','ADMIN') NOT NULL,
  `context` varchar(191) NOT NULL,
  `metadata` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `AuditLog_userId_idx` (`userId`),
  CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
