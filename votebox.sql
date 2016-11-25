-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Client :  localhost:3306
-- Généré le :  Sam 05 Mars 2016 à 18:38
-- Version du serveur :  5.5.42
-- Version de PHP :  7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `votebox`
--

-- --------------------------------------------------------

--
-- Structure de la table `DB_Admins`
--

CREATE TABLE `DB_Admins` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `DB_Admins`
--

INSERT INTO `DB_Admins` (`id`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'contact@arthur-berman.com', '38r4Js1XTSjMjcE51GsRFrAztHHoy0FhRMRvYsD+ZLE=', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `DB_Users`
--

CREATE TABLE `DB_Users` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `voteid` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `DB_Users`
--

INSERT INTO `DB_Users` (`id`, `status`, `voteid`, `createdAt`, `updatedAt`) VALUES
(25, 1, 1, '2016-02-08 01:27:18', '2016-02-08 01:27:18'),
(26, 1, 1, '2016-02-08 01:37:51', '2016-02-08 01:37:51'),
(27, 1, 1, '2016-02-08 01:51:37', '2016-02-08 01:51:37'),
(28, 1, 1, '2016-02-08 01:52:10', '2016-02-08 01:52:10'),
(29, 1, 1, '2016-02-08 01:54:30', '2016-02-08 01:54:30'),
(30, 1, 1, '2016-02-08 01:55:36', '2016-02-08 01:55:36'),
(31, 1, 1, '2016-02-08 01:55:50', '2016-02-08 01:55:50'),
(32, 1, 1, '2016-02-08 01:57:20', '2016-02-08 01:57:20'),
(33, 1, 1, '2016-02-08 01:58:13', '2016-02-08 01:58:13'),
(34, 1, 1, '2016-02-08 02:00:51', '2016-02-08 02:00:51'),
(35, -1, 1, '2016-02-08 02:01:08', '2016-02-08 02:01:08'),
(36, -1, 1, '2016-02-08 02:03:01', '2016-02-08 02:03:01'),
(37, -1, 1, '2016-02-08 02:04:52', '2016-02-08 02:04:52'),
(38, 1, 1, '2016-02-08 02:14:41', '2016-02-08 02:14:41'),
(39, 1, 1, '2016-02-08 02:34:26', '2016-02-08 02:34:26'),
(40, 1, 1, '2016-02-08 02:57:44', '2016-02-08 02:57:44'),
(41, 1, 1, '2016-02-08 11:26:15', '2016-02-08 11:26:15'),
(42, 1, 1, '2016-02-08 11:36:59', '2016-02-08 11:36:59'),
(43, 1, 1, '2016-02-13 20:53:53', '2016-02-13 20:53:53'),
(44, 1, 2, '2016-02-13 20:55:52', '2016-02-13 20:55:52'),
(45, -1, 3, '2016-02-13 20:56:39', '2016-02-13 20:56:39'),
(46, -1, 2, '2016-02-13 23:14:47', '2016-02-13 23:14:47'),
(47, 1, 1, '2016-02-14 00:51:54', '2016-02-14 00:51:54'),
(48, -1, 4, '2016-02-17 20:20:14', '2016-02-17 20:20:14'),
(49, 1, 9, '2016-02-17 22:31:23', '2016-02-17 22:31:23'),
(50, 1, 11, '2016-02-17 22:35:16', '2016-02-17 22:35:16'),
(51, 1, 11, '2016-02-17 22:39:02', '2016-02-17 22:39:02'),
(52, -1, 12, '2016-02-17 22:39:31', '2016-02-17 22:39:31'),
(53, 1, 14, '2016-02-17 22:42:17', '2016-02-17 22:42:17'),
(54, -1, 15, '2016-02-17 22:42:39', '2016-02-17 22:42:39'),
(55, -1, 17, '2016-02-17 22:43:46', '2016-02-17 22:43:46');

-- --------------------------------------------------------

--
-- Structure de la table `DB_Votes`
--

CREATE TABLE `DB_Votes` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `endTime` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `DB_Votes`
--

INSERT INTO `DB_Votes` (`id`, `name`, `endTime`, `createdAt`, `updatedAt`) VALUES
(17, 'Hello', 1456441140, '2016-02-17 22:43:41', '2016-02-17 22:43:41');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `DB_Admins`
--
ALTER TABLE `DB_Admins`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `DB_Users`
--
ALTER TABLE `DB_Users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `DB_Votes`
--
ALTER TABLE `DB_Votes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `DB_Admins`
--
ALTER TABLE `DB_Admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `DB_Users`
--
ALTER TABLE `DB_Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=56;
--
-- AUTO_INCREMENT pour la table `DB_Votes`
--
ALTER TABLE `DB_Votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
