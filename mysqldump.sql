-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: nh_smithground
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_accounts`
--

DROP TABLE IF EXISTS `tb_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_accounts` (
  `bankName` varchar(45) NOT NULL,
  `Bncd` varchar(45) NOT NULL,
  `Acno` varchar(100) NOT NULL,
  `balance` varchar(255) DEFAULT NULL,
  `accountType` varchar(45) DEFAULT NULL,
  `user_no` varchar(45) NOT NULL,
  `FinAcno` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Acno`),
  UNIQUE KEY `user_no_UNIQUE` (`user_no`),
  CONSTRAINT `user_no` FOREIGN KEY (`user_no`) REFERENCES `tb_users` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_accounts`
--

LOCK TABLES `tb_accounts` WRITE;
/*!40000 ALTER TABLE `tb_accounts` DISABLE KEYS */;
INSERT INTO `tb_accounts` VALUES ('농협은행','011','16065600','','모계좌','1','00820100005530000000000005173');
/*!40000 ALTER TABLE `tb_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_cards`
--

DROP TABLE IF EXISTS `tb_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_cards` (
  `card_no` varchar(16) NOT NULL,
  `user_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`card_no`),
  KEY `user_number_idx` (`user_no`),
  CONSTRAINT `user_number` FOREIGN KEY (`user_no`) REFERENCES `tb_users` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cards`
--

LOCK TABLES `tb_cards` WRITE;
/*!40000 ALTER TABLE `tb_cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_users`
--

DROP TABLE IF EXISTS `tb_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_users` (
  `user_name` varchar(30) NOT NULL,
  `BrdtBrno` date DEFAULT NULL,
  `Iscd` varchar(6) NOT NULL,
  `AccessToken` varchar(255) DEFAULT NULL,
  `user_email` varchar(60) DEFAULT NULL,
  `user_no` varchar(20) NOT NULL,
  `kakao_key` varchar(100) DEFAULT '1',
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_users`
--

LOCK TABLES `tb_users` WRITE;
/*!40000 ALTER TABLE `tb_users` DISABLE KEYS */;
INSERT INTO `tb_users` VALUES ('하늘','1992-09-27','000553','55bacf8f744b2e6ff6f01bb2acc0b25a50cf91475dea7c7950e11e02c8a169d4','haneul9209@kakao.com','1','b5737d511008458fba80a7fb12544a5352ec281fa691fb7800a2a3d2f0b6821396');
/*!40000 ALTER TABLE `tb_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-13  3:16:21
