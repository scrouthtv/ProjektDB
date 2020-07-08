CREATE DATABASE IF NOT EXISTS `Projekt` DEFAULT CHARACTER
SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `Projekt`;

CREATE TABLE `Fehlermeldung` (
	`Fehlermeldung-ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`Datum` date NOT NULL,
	`Beschreibung` text COLLATE utf8mb4_unicode_ci NOT NULL,
	`Melder` int(11) UNSIGNED NOT NULL, --> `Lehrer`.`Lehrer-ID`
	PRIMARY KEY (`Fehlermeldung-ID`),
	KEY `Melder` (`Melder`)
) ENGINE=innodb DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Geräte` (
	`Geräte-ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Bezeichnung` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Geräteart` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Zustand` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Fehlermeldung` int(10) UNSIGNED NOT NULL, --> `Fehlermeldung`.`Fehlermeldung-ID`
 	`Raum` int(10) UNSIGNED NOT NULL, --> `Räume`.`Raum-ID`
 	PRIMARY KEY (`Geräte-ID`),
	KEY `Fehlermeldung` (`Fehlermeldung`),
  KEY `Raum` (`Raum`)
) ENGINE=innodb DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Lehrer` (
	`Lehrer-ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Kürzel` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=innodb DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Räume` (
	`Raum-ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Bezeichnung` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=innodb DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
