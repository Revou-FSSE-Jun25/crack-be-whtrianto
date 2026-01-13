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

 Date: 15/11/2025 15:12:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of booking
-- ----------------------------
INSERT INTO `booking` VALUES (4, 2, 3, '2025-11-15 00:00:00.000', 'pending', '2025-11-13 16:05:01.495');
INSERT INTO `booking` VALUES (5, 2, 1, '2025-11-13 16:07:55.914', 'pending', '2025-11-13 16:07:55.923');
INSERT INTO `booking` VALUES (6, 2, 1, '2025-11-15 06:45:52.974', 'pending', '2025-11-15 06:45:53.044');
INSERT INTO `booking` VALUES (7, 2, 1, '2025-11-15 06:46:40.854', 'confirmed', '2025-11-15 06:46:40.866');

-- ----------------------------
-- Table structure for service
-- ----------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` double NOT NULL,
  `flightDate` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of service
-- ----------------------------
INSERT INTO `service` VALUES (1, 'Jakarta - Bali', 'Lion Air', 1000000, '2025-11-14');
INSERT INTO `service` VALUES (2, 'Jakarta - Tokyo', 'Garuda Indonesia', 5100000, '2025-11-14');
INSERT INTO `service` VALUES (3, 'Bali - Jakarta', 'Lion Air', 2400000, '2025-11-15');
INSERT INTO `service` VALUES (4, 'Singapore - Jakarta', 'Singapore Airline', 1200000, '2025-11-14');
INSERT INTO `service` VALUES (5, 'Bangkok - Bali', 'Lion Air', 2300000, '2025-11-15');
INSERT INTO `service` VALUES (6, 'Sydney - Bali', 'Garuda Indonesia', 1900000, '2025-11-12');

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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', 'admin@revou', '$2b$10$hGmSHi41isGKYhb2jOgUYeXYRvbRGChkiPMHa03chcyBPrJAIKYeW', 'admin', '2025-11-04 09:27:28.096');
INSERT INTO `user` VALUES (2, 'user', 'user@revou', '$2b$10$hGmSHi41isGKYhb2jOgUYeXYRvbRGChkiPMHa03chcyBPrJAIKYeW', 'user', '2025-11-13 15:05:14.787');

SET FOREIGN_KEY_CHECKS = 1;
