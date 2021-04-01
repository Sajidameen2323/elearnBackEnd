-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: elrn
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `registration_no` int NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `industry` varchar(50) NOT NULL,
  `profilepic` varchar(100) NOT NULL,
  PRIMARY KEY (`registration_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (11,'lionel','azeez','yusriareef383@gmail.com','Network','nature_0040.jpg'),(222,'sajid','ameen','sajidameen063@gmail.com','kaka','dsds'),(223,'sajid','ameen','sajidameen063@gmail.com','kaka','dsds'),(224,'sajid','ameen','sajidameen063@gmail.com','kaka','dsds'),(226,'sajid','ameen','sajidameen063@gmail.com','kaka','dsds'),(345,'dfg','sdg','azharazeez78@gmail.com','fdsf','450ffae8b413836e68fa5c4de8293e3f.jpg'),(435,'qwerqwe','rqwe','yusriareef383@gmail.com','kaathu','4dfn97jf4jh51.jpg'),(3432,'weqrqwe','sdfas','azharazeez78@gmail.com','fdsf','1f01fb4d69b285a22376029ce7194d3e.jpg'),(3451,'lionel','azeez','azharazeez78@gmail.com','Engineering','16830779_180803025741406_6941898584453670641_n.jpg'),(13242,'lionel','azeez','umai.hussain276@gmail.com','Network','17155827_187724398382602_2996023664042851825_n.jpg'),(357523,'reagrae','cadhar','rockzyruzaik753@gmail.com','fdsf','batsy.jpg');
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `cand_reg_no` int NOT NULL,
  `knowledge_area` varchar(50) NOT NULL,
  `level` enum('1','2','3','4','5') NOT NULL,
  `score` int NOT NULL,
  `assessor` varchar(50) NOT NULL,
  `overall` enum('pass','fail') NOT NULL,
  `completed` date NOT NULL,
  KEY `cand_reg_no` (`cand_reg_no`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`cand_reg_no`) REFERENCES `candidates` (`registration_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (224,'lala','2',34,'sad','pass','2020-03-29'),(224,'lala','2',34,'sad','pass','2020-03-29');
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-01 19:00:42
