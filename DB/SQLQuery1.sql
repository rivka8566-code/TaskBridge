--Create tables

CREATE TABLE Statuses (
    Id int PRIMARY KEY IDENTITY(1,1),
    StatusName nvarchar(50) NOT NULL
);

CREATE TABLE Categories (
    Id int PRIMARY KEY IDENTITY(1,1),
    CategoryName nvarchar(50) NOT NULL
);

CREATE TABLE Tasks (
    Id int PRIMARY KEY IDENTITY(1,1),            
    Title nvarchar(100) NOT NULL,               
    Description nvarchar(max),                 
    StatusId int FOREIGN KEY REFERENCES Statuses(Id), 
    CategoryId int FOREIGN KEY REFERENCES Categories(Id), 
    CreatedAt datetime DEFAULT GETDATE()            
);

