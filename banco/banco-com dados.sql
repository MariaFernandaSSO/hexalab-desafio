-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Ago-2022 às 00:13
-- Versão do servidor: 10.4.19-MariaDB
-- versão do PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `desafiohexaquadro`
--
DROP DATABASE IF EXISTS `desafiohexaquadro`;
CREATE DATABASE IF NOT EXISTS `desafiohexaquadro` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `desafiohexaquadro`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `quadros`
--

CREATE TABLE `quadros` (
  `idQuadros` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `quadros`
--

INSERT INTO `quadros` (`idQuadros`, `nome`) VALUES
(1, 'Quadro 1'),
(2, 'Quadro 2 atualizado');

-- --------------------------------------------------------

--
-- Estrutura da tabela `subtarefas`
--

CREATE TABLE `subtarefas` (
  `idSubtarefas` int(11) NOT NULL,
  `titulo_subtarefa` varchar(50) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `status` enum('EM DESENVOLVIMENTO','CONCLUÍDA','EM ATRASO','CANCELADA') DEFAULT NULL,
  `fk_subtarefas_tarefas` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `subtarefas`
--

INSERT INTO `subtarefas` (`idSubtarefas`, `titulo_subtarefa`, `descricao`, `status`, `fk_subtarefas_tarefas`) VALUES
(1, 'Desenhar um animal', 'Desenhar qualquer animalzinho', 'CONCLUÍDA', 3),
(2, 'Juntar dinheiro pro livro', 'Juntar 95 reais', 'EM DESENVOLVIMENTO', 2),
(3, 'Juntar dinheiro pra comprar a caneta', 'Juntar 2 reais', 'EM DESENVOLVIMENTO', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `idTarefas` int(11) NOT NULL,
  `titulo_tarefa` varchar(50) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `status` enum('EM DESENVOLVIMENTO','CONCLUÍDA','EM ATRASO','CANCELADA') DEFAULT NULL,
  `fk_tarefas_quadros` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tarefas`
--

INSERT INTO `tarefas` (`idTarefas`, `titulo_tarefa`, `descricao`, `status`, `fk_tarefas_quadros`) VALUES
(1, 'Tarefa 1', 'Comprar uma caneta', 'EM DESENVOLVIMENTO', 1),
(2, 'Tarefa 2', 'Comprar um livro', 'EM DESENVOLVIMENTO', 1),
(3, 'Tarefa 1', 'Desenhar alguma coisa', 'EM ATRASO', 2),
(4, 'Tarefa 2', 'Pintar um quadro', 'EM ATRASO', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `quadros`
--
ALTER TABLE `quadros`
  ADD PRIMARY KEY (`idQuadros`);

--
-- Índices para tabela `subtarefas`
--
ALTER TABLE `subtarefas`
  ADD PRIMARY KEY (`idSubtarefas`),
  ADD KEY `subtarefas_tarefas` (`fk_subtarefas_tarefas`);

--
-- Índices para tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`idTarefas`),
  ADD KEY `tarefas_quadros` (`fk_tarefas_quadros`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `quadros`
--
ALTER TABLE `quadros`
  MODIFY `idQuadros` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `subtarefas`
--
ALTER TABLE `subtarefas`
  MODIFY `idSubtarefas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `idTarefas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `subtarefas`
--
ALTER TABLE `subtarefas`
  ADD CONSTRAINT `subtarefas_ibfk_1` FOREIGN KEY (`fk_subtarefas_tarefas`) REFERENCES `tarefas` (`idTarefas`);

--
-- Limitadores para a tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD CONSTRAINT `tarefas_ibfk_1` FOREIGN KEY (`fk_tarefas_quadros`) REFERENCES `quadros` (`idQuadros`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
