/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3305
 Source Schema         : vuesocket

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 22/10/2019 18:23:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend`  (
  `UserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `OtherUserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Flag` int(255) DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of friend
-- ----------------------------
INSERT INTO `friend` VALUES ('a', 'c', 0);
INSERT INTO `friend` VALUES ('d', 'a', 1);
INSERT INTO `friend` VALUES ('a', 'f', 0);
INSERT INTO `friend` VALUES ('a', 'f', 0);
INSERT INTO `friend` VALUES ('a', 'f', 1);
INSERT INTO `friend` VALUES ('a', '1xx', 1);
INSERT INTO `friend` VALUES ('a', 'xx1', 1);
INSERT INTO `friend` VALUES ('a', 'x1x', 1);
INSERT INTO `friend` VALUES ('a', 'e', 1);
INSERT INTO `friend` VALUES ('www', 'a', 1);

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group`  (
  `GroupName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `UserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `OtherUserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `GroupName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` bigint(255) DEFAULT NULL,
  `Flag` int(255) DEFAULT NULL,
  `Message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO `message` VALUES ('a', 'b', NULL, 2, 1569936214994, 1, 'www');
INSERT INTO `message` VALUES ('a', 'b', NULL, 3, 1569936275682, 1, 'wwws');
INSERT INTO `message` VALUES ('a', 'b', NULL, 4, 1569936389226, 1, 'g');
INSERT INTO `message` VALUES ('f', 'a', NULL, 5, 1569979326777, 1, 'ss');
INSERT INTO `message` VALUES ('a', 'f', NULL, 27, 1569979272032, 1, 'z');
INSERT INTO `message` VALUES ('a', 'f', NULL, 35, 1569997888065, 1, 'd');
INSERT INTO `message` VALUES ('f', 'a', NULL, 36, 1569997893897, 1, 'aaa');
INSERT INTO `message` VALUES ('f', 'a', NULL, 37, 1569997903144, 1, 'aaaf');
INSERT INTO `message` VALUES ('b', 'a', NULL, 38, 1570675732523, 1, 'df');
INSERT INTO `message` VALUES ('a', 'b', NULL, 39, 1570675756285, 1, 'qwer');
INSERT INTO `message` VALUES ('b', 'a', NULL, 40, 1570675774195, 1, '你离线了吗');
INSERT INTO `message` VALUES ('a', 'b', NULL, 41, 1570689885105, 1, 'wewe');
INSERT INTO `message` VALUES ('b', 'a', NULL, 42, 1570690296266, 1, '数据库');
INSERT INTO `message` VALUES ('a', 'b', NULL, 43, 1570690881441, 1, '拿呀拿');
INSERT INTO `message` VALUES ('a', 'x1x', NULL, 44, 1570697178891, 1, '1w');
INSERT INTO `message` VALUES ('x1x', 'a', NULL, 45, 1570697364052, 1, 's');
INSERT INTO `message` VALUES ('a', '1xx', NULL, 46, 1570710392325, 0, 'wqeqwe');
INSERT INTO `message` VALUES ('a', '1xx', NULL, 47, 1570710524380, 0, 'fdfdf');
INSERT INTO `message` VALUES ('a', '1xx', NULL, 48, 1570710620893, 0, 'dw');
INSERT INTO `message` VALUES ('a', '1xx', NULL, 49, 1570710622100, 0, 'dw');
INSERT INTO `message` VALUES ('a', 'f', NULL, 50, 1570710707662, 1, 'fdf');
INSERT INTO `message` VALUES ('a', 'x1x', NULL, 51, 1570710735925, 1, 'qwereqwr');
INSERT INTO `message` VALUES ('x1x', 'a', NULL, 52, 1570711701394, 1, 'dfd');
INSERT INTO `message` VALUES ('x1x', 'a', NULL, 53, 1570711721922, 1, 'dfdqwe');
INSERT INTO `message` VALUES ('x1x', 'a', NULL, 54, 1570711728258, 1, 'dfdqweqwer');
INSERT INTO `message` VALUES ('a', 'a', NULL, 55, 1570711749803, 1, 'sd');
INSERT INTO `message` VALUES ('a', 'a', NULL, 56, 1570711751786, 1, 'sd');
INSERT INTO `message` VALUES ('a', 'a', NULL, 57, 1570711752721, 1, 'sd');
INSERT INTO `message` VALUES ('a', 'x1x', NULL, 58, 1570711786275, 1, 'wq');
INSERT INTO `message` VALUES ('x1x', 'a', NULL, 59, 1570711885978, 1, 'df');
INSERT INTO `message` VALUES ('x1x', 'a', NULL, 60, 1570711896323, 1, 'cd');
INSERT INTO `message` VALUES ('a', 'e', NULL, 61, 1570712024738, 1, 'e');
INSERT INTO `message` VALUES ('e', 'a', NULL, 62, 1570712045442, 1, 'dsd');
INSERT INTO `message` VALUES ('a', 'e', NULL, 63, 1570712159345, 1, 'dsd');
INSERT INTO `message` VALUES ('e', 'a', NULL, 64, 1570712172808, 1, 'x');
INSERT INTO `message` VALUES ('e', 'a', NULL, 65, 1570712183817, 1, 'xee');
INSERT INTO `message` VALUES ('a', 'f', NULL, 66, 1571464350645, 0, '沙发');
INSERT INTO `message` VALUES ('a', 'e', NULL, 67, 1571464545460, 1, '');
INSERT INTO `message` VALUES ('a', 'e', NULL, 68, 1571464547133, 1, 'w');
INSERT INTO `message` VALUES ('a', 'e', NULL, 69, 1571465572109, 1, 'fadsfsa');
INSERT INTO `message` VALUES ('e', 'a', NULL, 70, 1571465581181, 1, 'fff');
INSERT INTO `message` VALUES ('a', 'e', NULL, 71, 1571465598036, 1, '离线测试');
INSERT INTO `message` VALUES ('www', 'a', NULL, 72, 1571666550796, 1, '你好');
INSERT INTO `message` VALUES ('www', 'a', NULL, 73, 1571666576565, 1, '测试离线的接受情况');
INSERT INTO `message` VALUES ('a', 'www', NULL, 74, 1571666597494, 1, '好了');
INSERT INTO `message` VALUES ('a', 'www', NULL, 75, 1571671210675, 1, '呜呜呜');
INSERT INTO `message` VALUES ('a', 'www', NULL, 76, 1571673064099, 1, '离线接收成功');
INSERT INTO `message` VALUES ('www', 'a', NULL, 77, 1571673447515, 1, '???');
INSERT INTO `message` VALUES ('a', 'www', NULL, 78, 1571739560175, 1, 'hi');
INSERT INTO `message` VALUES ('www', 'a', NULL, 79, 1571739613463, 1, '？？');

-- ----------------------------
-- Table structure for token
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token`  (
  `UserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of token
-- ----------------------------
INSERT INTO `token` VALUES ('www', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzE3Mzk1MjgsImV4cCI6MTU3MTc0MDcyOH0.GGwwiyRAlf54KIxdNcrnJ4g1P5BLp_VuZl6trmK2PPM');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `UserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `NickUserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `HeadImage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('a', 'a', 'a', 'http://localhost:3000/images/1569595144048.jpg');
INSERT INTO `userinfo` VALUES ('b', 'b', 'b', 'http://localhost:3000/images/1569595165399.jpg');
INSERT INTO `userinfo` VALUES ('c', 'c', 'c', 'http://localhost:3000/images/1569595174598.jpg');
INSERT INTO `userinfo` VALUES ('d', 'd', 'd', 'http://localhost:3000/images/1569595189094.jpg');
INSERT INTO `userinfo` VALUES ('e', 'e', 'e', 'http://localhost:3000/images/1569595189094.jpg');
INSERT INTO `userinfo` VALUES ('f', 'f', 'f', 'http://localhost:3000/images/2.jpg');
INSERT INTO `userinfo` VALUES ('1xx', '1xx', '1xx', 'http://localhost:3000/images/2.jpg');
INSERT INTO `userinfo` VALUES ('xx1', 'xx1', 'xx1', 'http://localhost:3000/images/2.jpg');
INSERT INTO `userinfo` VALUES ('x1x', 'x1x', 'x1x', 'http://localhost:3000/images/2.jpg');
INSERT INTO `userinfo` VALUES ('www', 'www', 'www', 'http://localhost:3000/images/1571666165988.jpg');

SET FOREIGN_KEY_CHECKS = 1;
