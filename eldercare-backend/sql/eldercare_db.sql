/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80044 (8.0.44)
 Source Host           : localhost:3306
 Source Schema         : eldercare_db

 Target Server Type    : MySQL
 Target Server Version : 80044 (8.0.44)
 File Encoding         : 65001

 Date: 01/12/2025 16:17:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Admin ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Admin full name',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Admin email (unique)',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Encrypted admin password',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Admin account creation time',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'System administrator table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'Admin1', 'admin1@sys.com', 'admin', '2025-12-01 16:15:06');
INSERT INTO `admin` VALUES (2, 'Admin2', 'admin2@sys.com', 'admin', '2025-12-01 16:15:06');
INSERT INTO `admin` VALUES (3, 'Admin3', 'admin3@sys.com', 'admin', '2025-12-01 16:15:06');
INSERT INTO `admin` VALUES (4, 'Admin4', 'admin4@sys.com', 'admin', '2025-12-01 16:15:06');
INSERT INTO `admin` VALUES (5, 'Admin5', 'admin5@sys.com', 'admin', '2025-12-01 16:15:06');

-- ----------------------------
-- Table structure for business
-- ----------------------------
DROP TABLE IF EXISTS `business`;
CREATE TABLE `business`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID of the business',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Business or company name',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Business email (unique)',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Business contact phone number',
  `area` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Operating area or region',
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Business category/type',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Encrypted password (hashed)',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Registration time',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Business account information table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of business
-- ----------------------------
INSERT INTO `business` VALUES (1, 'GoldenCare Nursing', 'golden@gmail.com', '518-330-1111', 'Albany', 'Nursing', 'pass123', '2025-12-01 16:15:06');
INSERT INTO `business` VALUES (2, 'HomeHelper Services', 'homehelper@gmail.com', '518-330-2222', 'Albany', 'HomeCare', 'pass123', '2025-12-01 16:15:06');
INSERT INTO `business` VALUES (3, 'SilverAge Support', 'silver@gmail.com', '518-330-3333', 'Troy', 'Nursing', 'pass123', '2025-12-01 16:15:06');
INSERT INTO `business` VALUES (4, 'HealthBridge Agency', 'healthbridge@gmail.com', '518-330-4444', 'Schenectady', 'Hospital', 'pass123', '2025-12-01 16:15:06');
INSERT INTO `business` VALUES (5, 'ComfortLife HomeCare', 'comfort@gmail.com', '518-330-5555', 'Albany', 'HomeCare', 'pass123', '2025-12-01 16:15:06');

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Chat message ID',
  `customer_id` int NOT NULL COMMENT 'Customer involved in the chat',
  `business_id` int NOT NULL COMMENT 'Business involved in the chat',
  `detail` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Text content of the chat message',
  `time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Message sent time',
  `sender_type` int NOT NULL COMMENT 'Who sent the message: 0=customer, 1=business',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_chat_customer`(`customer_id` ASC) USING BTREE,
  INDEX `fk_chat_business`(`business_id` ASC) USING BTREE,
  CONSTRAINT `fk_chat_business` FOREIGN KEY (`business_id`) REFERENCES `business` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_chat_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Chat message history between customer and business' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (1, 1, 1, 'Hello, I need help with daily mobility care.', '2025-12-01 16:15:06', 0);
INSERT INTO `chat` VALUES (2, 1, 1, 'Hello! We can provide that service. What time do you prefer?', '2025-12-01 16:15:06', 1);
INSERT INTO `chat` VALUES (3, 2, 2, 'Do you offer grocery shopping help?', '2025-12-01 16:15:06', 0);
INSERT INTO `chat` VALUES (4, 2, 2, 'Yes, we do. What location are you in?', '2025-12-01 16:15:06', 1);
INSERT INTO `chat` VALUES (5, 3, 3, 'How often can you remind medication?', '2025-12-01 16:15:06', 0);
INSERT INTO `chat` VALUES (6, 3, 3, 'We can do reminders every 4 hours.', '2025-12-01 16:15:06', 1);
INSERT INTO `chat` VALUES (7, 4, 1, 'I need a night-shift caregiver tonight.', '2025-12-01 16:15:06', 0);
INSERT INTO `chat` VALUES (8, 4, 1, 'We can arrange someone by 10 PM.', '2025-12-01 16:15:06', 1);
INSERT INTO `chat` VALUES (9, 1, 5, 'Is companionship available tomorrow morning?', '2025-12-01 16:15:06', 0);
INSERT INTO `chat` VALUES (10, 1, 5, 'Yes, we have staff available at 9 AM.', '2025-12-01 16:15:06', 1);

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID of the customer',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Full name of the customer',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Customer email address (unique)',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Customer phone number',
  `age` int NULL DEFAULT NULL COMMENT 'Customer age',
  `sex` int NULL DEFAULT NULL COMMENT 'Gender of customer: 0=female, 1=male, 2=other',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Home address of the customer',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Encrypted password (hashed)',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Account creation time',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Customer basic information table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES (1, 'Alice Johnson', 'alice@gmail.com', '518-202-1111', 67, 0, '12 Lake Ave, Albany', 'pass123', '2025-12-01 16:15:06');
INSERT INTO `customer` VALUES (2, 'Bob Smith', 'bob@gmail.com', '518-202-2222', 72, 1, '45 Pine St, Albany', 'pass123', '2025-12-01 16:15:06');
INSERT INTO `customer` VALUES (3, 'Chris Lee', 'chris@gmail.com', '518-202-3333', 80, 1, '89 Main St, Albany', 'pass123', '2025-12-01 16:15:06');
INSERT INTO `customer` VALUES (4, 'Diana Evans', 'diana@gmail.com', '518-202-4444', 69, 0, '24 River Rd, Albany', 'pass123', '2025-12-01 16:15:06');
INSERT INTO `customer` VALUES (5, 'Edward Clark', 'edward@gmail.com', '518-202-5555', 75, 1, '300 Western Ave, Albany', 'pass123', '2025-12-01 16:15:06');

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Job or service request ID',
  `c_id` int NOT NULL COMMENT 'Customer ID (who created the request)',
  `b_id` int NOT NULL COMMENT 'Business ID (who receives the job)',
  `detail` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Detailed description of the job request',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT 'Service price for this job',
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Category of the job type',
  `is_buy` int NULL DEFAULT 0 COMMENT 'Whether customer purchased: 0=no, 1=yes',
  `owner_type` int NULL DEFAULT 0 COMMENT 'Who created the job: 0=customer, 1=business',
  `time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation time of the job',
  `is_deleted` int NULL DEFAULT 0 COMMENT 'Soft delete flag: 0=active, 1=deleted',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_job_customer`(`c_id` ASC) USING BTREE,
  INDEX `fk_job_business`(`b_id` ASC) USING BTREE,
  CONSTRAINT `fk_job_business` FOREIGN KEY (`b_id`) REFERENCES `business` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_job_customer` FOREIGN KEY (`c_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Job / service request table linking customers and businesses' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job
-- ----------------------------
INSERT INTO `job` VALUES (1, 1, 1, 'Need daily nursing care for mobility assistance.', 120.00, 'Nursing', 1, 0, '2025-12-01 16:15:06', 0);
INSERT INTO `job` VALUES (2, 2, 2, 'Help with house cleaning and grocery shopping.', 60.00, 'HomeCare', 0, 0, '2025-12-01 16:15:06', 0);
INSERT INTO `job` VALUES (3, 3, 3, 'Medication reminder service needed.', 90.00, 'Nursing', 1, 0, '2025-12-01 16:15:06', 0);
INSERT INTO `job` VALUES (4, 4, 1, 'Looking for night-shift caregiver.', 150.00, 'Nursing', 1, 0, '2025-12-01 16:15:06', 0);
INSERT INTO `job` VALUES (5, 5, 4, 'Need transportation to medical appointments.', 40.00, 'Transport', 0, 0, '2025-12-01 16:15:06', 0);
INSERT INTO `job` VALUES (6, 1, 5, 'Companionship service for light conversation.', 50.00, 'Companion', 1, 0, '2025-12-01 16:15:06', 0);
INSERT INTO `job` VALUES (7, 2, 3, 'Post-surgery care required for two weeks.', 200.00, 'Nursing', 1, 0, '2025-12-01 16:15:06', 0);
INSERT INTO `job` VALUES (8, 3, 2, 'Light meal preparation needed daily.', 70.00, 'HomeCare', 0, 0, '2025-12-01 16:15:06', 0);

-- ----------------------------
-- Table structure for review
-- ----------------------------
DROP TABLE IF EXISTS `review`;
CREATE TABLE `review`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Review ID',
  `job_id` int NOT NULL COMMENT 'Related job ID',
  `customer_id` int NOT NULL COMMENT 'Customer ID (who wrote the review)',
  `detail` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'Review content written by the customer',
  `is_deleted` int NULL DEFAULT 0 COMMENT 'Soft delete flag: 0=visible, 1=deleted',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Review creation time',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_review_job`(`job_id` ASC) USING BTREE,
  INDEX `fk_review_customer`(`customer_id` ASC) USING BTREE,
  CONSTRAINT `fk_review_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_review_job` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = 'Customer review for a completed job' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of review
-- ----------------------------
INSERT INTO `review` VALUES (1, 1, 1, 'Very patient and professional. Highly recommended!', 0, '2025-12-01 16:15:06');
INSERT INTO `review` VALUES (2, 3, 3, 'Helpful and on time every day. Great service.', 0, '2025-12-01 16:15:06');
INSERT INTO `review` VALUES (3, 4, 4, 'Night caregiver was excellent. Good attitude.', 0, '2025-12-01 16:15:06');
INSERT INTO `review` VALUES (4, 6, 1, 'Very friendly companion. My mother loved talking with her.', 0, '2025-12-01 16:15:06');
INSERT INTO `review` VALUES (5, 7, 2, 'Recovery care was very effective. Thank you!', 0, '2025-12-01 16:15:06');
INSERT INTO `review` VALUES (6, 1, 1, 'Good service but can improve communication.', 0, '2025-12-01 16:15:06');

SET FOREIGN_KEY_CHECKS = 1;
