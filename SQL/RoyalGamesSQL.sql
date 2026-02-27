CREATE DATABASE RoyalGames
GO

USE RoyalGamesDB
GO

CREATE TABLE Usuario
(
UsuarioId INT IDENTITY PRIMARY KEY,
Nome NVARCHAR(60) NOT NULL,
Email VARCHAR(70) NOT NULL,
Senha VARBINARY(32) NOT NULL,
StatusUsuario BIT DEFAULT 1
);
GO

CREATE TABLE Plataforma
(
PlataformaId INT IDENTITY PRIMARY KEY,
Nome VARCHAR(50) NOT NULL,
Genero NVARCHAR(20) NOT NULL
);

GO

CREATE TABLE Promocao
(
	PromocaoId INT IDENTITY PRIMARY KEY,
	Nome VARCHAR(50) NOT NULL,
	DataExpiração DATETIME NOT NULL,
	StatusPromocao BIT NOT NULL
);

GO

CREATE TABLE Genero
(
GeneroId INT IDENTITY PRIMARY KEY,
Nome VARCHAR(50) NOT NULL
);

GO

CREATE TABLE ClassificacaoIndicativa
(
ClassificacaoIndicativaId INT IDENTITY PRIMARY KEY,
Classificacao VARCHAR(50) NOT NULL
);

GO


CREATE TABLE Jogo
(
JogoId INT IDENTITY PRIMARY KEY,
Nome VARCHAR(150),
Descrição NVARCHAR(255),
Preco DECIMAL(10,2),
StatusJogo BIT DEFAULT 1
--PlataformaIdFK INT NOT NULL,
--PromocaoIdFK INT NOT NULL,
--ClassificacaoIdFK INT NOT NULL,

--CONSTRAINT FK_Jogo_Classificacao FOREIGN KEY(ClassificacaoIdFK) REFERENCES ClassificacaoIndicativa(ClassificacaoIndicativaId) ON DELETE CASCADE,
--CONSTRAINT FK_Jogo_Plataforma FOREIGN KEY (PlataformaIdFK) REFERENCES Plataforma(PlataformaId) ON DELETE CASCADE,
--CONSTRAINT FK_Jogo_Promocao FOREIGN KEY (PromocaoIdFK) REFERENCES Promocao(PromocaoId) ON DELETE CASCADE

);

GO

CREATE TABLE Log_Alteracao_Jogo
(
	Log_Alteracao_Jogo_Id INT IDENTITY PRIMARY KEY,
	DataAlteracao DATETIME2(0) NOT NULL,
	NomeAnterior VARCHAR(100) NOT NULL,
	PrecoAnterior DECIMAL(10,2) NOT NULL,
	JogoId INT FOREIGN KEY REFERENCES Jogo(JogoId)
	--JogoIdFK INT NOT NULL,
	--CONSTRAINT FK_LogAlteracao_Jogo FOREIGN KEY (JogoIdFK) REFERENCES Jogo(JogoId)
	--ON DELETE CASCADE
);

GO

CREATE TABLE JogoPlataforma 
(
--JogoPlataforma INT IDENTITY PRIMARY KEY,
PlataformaIdFK INT NOT NULL,
JogoIdFK INT NOT NULL,
CONSTRAINT Jogo_Plataforma_Id_FK PRIMARY KEY(PlataformaIdFK, JogoIdFK),



CONSTRAINT FK_JogoPlataforma_Plataforma FOREIGN KEY (PlataformaIdFK) REFERENCES Plataforma(PlataformaId) ON DELETE CASCADE,
CONSTRAINT FK_JogoPlataforma_Jogo FOREIGN KEY (JogoIdFK) REFERENCES Jogo(JogoId) ON DELETE CASCADE
);

GO


CREATE TABLE JogoGenero
(
JogoIdFK INT NOT NULL,
GeneroIdFK INT NOT NULL,

CONSTRAINT Jogo_Genero_Id_FK PRIMARY KEY(JogoIdFK, GeneroIdFK),

CONSTRAINT FK_JogoGenero_Jogo FOREIGN KEY(JogoIdFK) REFERENCES Jogo(JogoId) ON DELETE CASCADE,
CONSTRAINT FK_JogoGenero_Genero FOREIGN KEY (GeneroIdFK) REFERENCES Genero(GeneroId) ON DELETE CASCADE
);


GO


CREATE TABLE JogoPromocao
(
	JogoIdFK INT NOT NULL,
	PromocaoIdFK INT NOT NULL,
	PrecoAtual DECIMAL(10,2) NOT NULL,
	CONSTRAINT Jogo_Promocao_Id_FK PRIMARY KEY(JogoIdFK, PromocaoIdFK),

	CONSTRAINT FK_JogoPromocao_Jogo FOREIGN KEY(JogoIdFK) REFERENCES Jogo(JogoId) ON DELETE CASCADE,
	CONSTRAINT FK_JogoPromocao_Promocao FOREIGN KEY(PromocaoIdFK) REFERENCES Promocao(PromocaoId) ON DELETE CASCADE
);
GO


create trigger trg_excluirJogo
ON Jogo
INSTEAD OF DELETE
AS BEGIN
UPDATE game SET	StatusJogo = 0
FROM Jogo game
INNER JOIN deleted d on d.JogoId = game.JogoId
END 
GO

create trigger trg_ExclusaoUsuario
ON Usuario 
INSTEAD OF DELETE 
AS BEGIN
		UPDATE usr SET StatusUsuario = 0
		FROM Usuario usr
		INNER JOIN deleted d ON d.Usuarioid = usr.UsuarioId
		END 
		GO


		create trigger trg_AlteracaoJogo
		ON Jogo
		AFTER UPDATE
		AS BEGIN
		INSERT INTO
		Log_Alteracao_Jogo(DataAlteracao, JogoId, NomeAnterior, PrecoAnterior)
		SELECT GETDATE(), JogoId, Nome, Preco FROM deleted
		END
		GO

		INSERT INTO Usuario (Nome, Email, Senha)
	VALUES 
	('Carlos Lima', 'carlos@vhburguer.com', HASHBYTES('SHA2_256', 'admin@123'));
GO

INSERT INTO Plataforma(Nome)
VALUES
('Nintendo'),
('PS4'),
('Xbox One')
GO

SELECT * FROM Usuario

INSERT INTO Jogo(Nome, Descrição, Preco, StatusJogo, Imagem)
VALUES
('Dying Light', 'Jogo de zumbi com parkour tmj', 155.99, 1, CONVERT(VARBINARY(MAX), 'imagem aleatoria'))

INSERT INTO Genero(Nome)
VALUES
('Terror'),
('Sandbox'),
('FPS'),
('Hack and Slash'),
('Soulslike')
SELECT * FROM JogoPromocao

INSERT INTO ClassificacaoIndicativa(Classificacao)
VALUES
('Livre'),
('Para maiores de 18')

INSERT INTO Promocao(Nome, DataExpiração, StatusPromocao)
VALUES
('Domingão do Royalzao', '2026-05-30' , 1)

INSERT INTO JogoPromocao(JogoIdFK, PromocaoIdFK, PrecoAtual)
VALUES
(1, 1, 100.99)

SELECT * FROM Jogo 
SELECT * FROM Promocao