/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : bookease

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 27/01/2026 09:16:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for aircraft
-- ----------------------------
DROP TABLE IF EXISTS `aircraft`;
CREATE TABLE `aircraft`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `Aircraft_name_key`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of aircraft
-- ----------------------------
INSERT INTO `aircraft` VALUES (1, 'Garuda Indonesia', 'Boeing 737', '2026-01-15 07:00:44.862');
INSERT INTO `aircraft` VALUES (2, 'Singapore Airlines', '', '2026-01-15 07:26:34.945');
INSERT INTO `aircraft` VALUES (3, 'Lion Air', '', '2026-01-19 01:29:48.177');
INSERT INTO `aircraft` VALUES (4, 'AirAsia', '', '2026-01-19 01:29:56.559');
INSERT INTO `aircraft` VALUES (5, 'Thai Airways', '', '2026-01-19 01:30:13.546');
INSERT INTO `aircraft` VALUES (6, 'Virgin Australia', '', '2026-01-19 01:30:29.893');
INSERT INTO `aircraft` VALUES (7, 'Batik Air', '', '2026-01-19 01:30:53.096');
INSERT INTO `aircraft` VALUES (8, 'Saudia Airlines', '', '2026-01-19 01:34:21.982');

-- ----------------------------
-- Table structure for booking
-- ----------------------------
DROP TABLE IF EXISTS `booking`;
CREATE TABLE `booking`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `serviceId` int NOT NULL,
  `date` datetime(3) NOT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Booking_userId_idx`(`userId` ASC) USING BTREE,
  INDEX `Booking_serviceId_idx`(`serviceId` ASC) USING BTREE,
  CONSTRAINT `Booking_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of booking
-- ----------------------------
INSERT INTO `booking` VALUES (11, 2, 10, '2026-01-19 01:47:36.981', 'completed', '2026-01-19 01:47:37.001');
INSERT INTO `booking` VALUES (12, 2, 9, '2026-01-19 01:48:06.395', 'confirmed', '2026-01-19 01:48:06.406');
INSERT INTO `booking` VALUES (13, 2, 1, '2026-01-19 01:48:35.277', 'cancelled', '2026-01-19 01:48:35.288');
INSERT INTO `booking` VALUES (14, 2, 13, '2026-01-19 01:48:54.270', 'confirmed', '2026-01-19 01:48:54.289');
INSERT INTO `booking` VALUES (16, 5, 13, '2026-01-19 13:21:44.450', 'pending', '2026-01-19 13:21:44.467');

-- ----------------------------
-- Table structure for destination
-- ----------------------------
DROP TABLE IF EXISTS `destination`;
CREATE TABLE `destination`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `Destination_name_key`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of destination
-- ----------------------------
INSERT INTO `destination` VALUES (1, 'Soekarno–Hatta International Airport (Jakarta) → Haneda International Airport (Tokyo)', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/TerminalsSoekarnoHatta.jpg/250px-TerminalsSoekarnoHatta.jpg', '2026-01-15 07:00:18.098');
INSERT INTO `destination` VALUES (5, 'Soekarno–Hatta (CGK), Jakarta → Ngurah Rai (DPS), Bali', '', '2026-01-15 07:26:16.879');
INSERT INTO `destination` VALUES (6, 'Ngurah Rai International Airport (Bali) → Soekarno–Hatta International Airport (Jakarta)', '', '2026-01-19 01:25:23.438');
INSERT INTO `destination` VALUES (7, 'Singapore Changi Airport (Singapore) → Soekarno–Hatta International Airport (Jakarta)', '', '2026-01-19 01:25:33.374');
INSERT INTO `destination` VALUES (8, 'Suvarnabhumi International Airport (Bangkok) → Ngurah Rai International Airport (Bali)', '', '2026-01-19 01:25:44.030');
INSERT INTO `destination` VALUES (9, 'Sydney Kingsford Smith International Airport (Sydney) → Ngurah Rai International Airport (Bali)', '', '2026-01-19 01:25:53.629');
INSERT INTO `destination` VALUES (10, 'Soekarno–Hatta International Airport (Jakarta) → King Abdulaziz International Airport (Jeddah – Makkah Route)', '', '2026-01-19 01:26:04.045');

-- ----------------------------
-- Table structure for service
-- ----------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` double NOT NULL,
  `flightDate` datetime(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of service
-- ----------------------------
INSERT INTO `service` VALUES (1, 'Soekarno–Hatta International Airport (Jakarta) → King Abdulaziz International Airport (Jeddah – Makkah Route)', 'Batik Air', 2000000, '2025-11-14 00:00:00.000');
INSERT INTO `service` VALUES (8, 'Sydney Kingsford Smith International Airport (Sydney) → Ngurah Rai International Airport (Bali)', 'Virgin Australia', 1200000, '2026-01-20 01:33:00.000');
INSERT INTO `service` VALUES (9, 'Suvarnabhumi International Airport (Bangkok) → Ngurah Rai International Airport (Bali)', 'Thai Airways', 1100000, '2026-01-20 02:35:00.000');
INSERT INTO `service` VALUES (10, 'Singapore Changi Airport (Singapore) → Soekarno–Hatta International Airport (Jakarta)', 'Lion Air', 700000, '2026-01-19 18:40:00.000');
INSERT INTO `service` VALUES (11, 'Ngurah Rai International Airport (Bali) → Soekarno–Hatta International Airport (Jakarta)', 'AirAsia', 1000000, '2026-01-22 01:40:00.000');
INSERT INTO `service` VALUES (12, 'Soekarno–Hatta (CGK), Jakarta → Ngurah Rai (DPS), Bali', 'Garuda Indonesia', 1100000, '2026-01-20 03:40:00.000');
INSERT INTO `service` VALUES (13, 'Soekarno–Hatta International Airport (Jakarta) → Haneda International Airport (Tokyo)', 'AirAsia', 2500000, '2026-01-19 17:40:00.000');
INSERT INTO `service` VALUES (14, 'Sydney Kingsford Smith International Airport (Sydney) → Ngurah Rai International Airport (Bali)', 'Batik Air', 1200000, '2026-01-20 15:24:00.000');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `User_email_key`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (2, 'user', 'user@revou', '$2b$10$hGmSHi41isGKYhb2jOgUYeXYRvbRGChkiPMHa03chcyBPrJAIKYeW', 'user', '2025-11-13 15:05:14.787');
INSERT INTO `user` VALUES (3, 'admin', 'admin@revou', '$2b$10$1izHGW6vQ7XMrwSF56Qmo.e9LYeRJ2bxtPoaMXNQY.UhawGkx0see', 'admin', '2026-01-14 13:14:38.853');
INSERT INTO `user` VALUES (4, 'user1', 'user1@revou', '$2b$10$AwH3FXvKBLZYkXQFV1XBcudvsEBDxw.9essoqA1nn71AQX590Baja', 'user', '2026-01-19 12:43:11.305');
INSERT INTO `user` VALUES (5, 'anto', 'anto@revou', '$2b$10$PUcN8phuxWsu9wkTbeWR9.DV78H6TNUpiyQNmYK.SDJX4LqrSx.XS', 'user', '2026-01-19 13:20:40.443');

SET FOREIGN_KEY_CHECKS = 1;
