-- Stored Procedures

CREATE PROCEDURE GetAllTasks
AS
BEGIN
    SELECT 
        T.Id,
        T.Title,
        T.Description,
        S.StatusName,   
        C.CategoryName, 
        T.CreatedAt
    FROM Tasks T
    JOIN Statuses S ON T.StatusId = S.Id
    JOIN Categories C ON T.CategoryId = C.Id;
END
GO


CREATE PROCEDURE GetTaskById
    @Id int
AS
BEGIN
    SELECT 
        T.Id,
        T.Title,
        T.Description,
        S.StatusName,
        C.CategoryName,
        T.StatusId,  
        T.CategoryId,
        T.CreatedAt
    FROM Tasks T
    JOIN Statuses S ON T.StatusId = S.Id
    JOIN Categories C ON T.CategoryId = C.Id
    WHERE T.Id = @Id;
END
GO

ALTER PROCEDURE UpdateTask
    @Id int,
    @Title nvarchar(100) = null,
    @Description nvarchar(max) = null,
    @StatusId int = null,
    @CategoryId int = null
AS
BEGIN
    UPDATE Tasks
    SET Title = isnull(@Title, Title),
        Description = isnull(@Description, Description),
        StatusId = isnull(@StatusId, StatusId),
        CategoryId = isnull(@CategoryId, CategoryId)
    WHERE Id = @Id;
END
GO


ALTER PROCEDURE CreateTask
    @Title nvarchar(100),
    @Description nvarchar(max),
    @StatusId int,
    @CategoryId int
AS
BEGIN
    INSERT INTO Tasks (Title, Description, StatusId, CategoryId)
    values (@Title,@Description,@StatusId,@CategoryId)
END
GO

CREATE PROCEDURE SearchTasks
    @SearchText nvarchar(100) = NULL
AS
BEGIN
    SELECT 
        T.Id,
        T.Title,
        T.Description,
        S.StatusName,
        C.CategoryName,
        T.CreatedAt
    FROM Tasks T
    JOIN Statuses S ON T.StatusId = S.Id
    JOIN Categories C ON T.CategoryId = C.Id
    WHERE (@SearchText IS NULL OR T.Title LIKE '%' + @SearchText + '%')
    ORDER BY T.CreatedAt DESC; 
END
GO

CREATE PROCEDURE DeleteTask
    @Id int
AS
BEGIN
    DELETE FROM Tasks
    WHERE Id = @Id;
END
GO

CREATE PROCEDURE ChangeStatus
    @Id int,
    @NewStatusId int
AS
BEGIN
    UPDATE Tasks
    SET StatusId = @NewStatusId
    WHERE Id = @Id;
END
GO


CREATE PROCEDURE GetByStatus
    @StatusId int
AS
BEGIN
    SELECT T.Id, T.Title, S.StatusName, C.CategoryName
    FROM Tasks T
    JOIN Statuses S ON T.StatusId = S.Id
    JOIN Categories C ON T.CategoryId = C.Id
    WHERE T.StatusId = @StatusId;
END
GO

ALTER PROCEDURE SearchWithCategory
	@CategoryId int = NULL,
    @SearchText nvarchar(100) = NULL
AS
BEGIN
    SELECT T.Id, T.Title, S.StatusName, C.CategoryName
    FROM Tasks T
    JOIN Statuses S ON T.StatusId = S.Id
    JOIN Categories C ON T.CategoryId = C.Id
    WHERE (@SearchText IS NULL OR T.Title LIKE '%' + @SearchText + '%')
      AND (@CategoryId IS NULL OR T.CategoryId = @CategoryId);
END
GO




select * from Tasks

select * from Categories


exec GetAllTasks

exec GetTaskById 4

exec UpdateTask @id = 4, @StatusId = 3

exec CreateTask 'להקים מסד נתונים', 'ליצור את הטבלאות ולהכניס נתונים ראשוניים', 1, 2

exec SearchTasks 

exec DeleteTask 16

exec ChangeStatus 4, 2

exec GetByStatus 2

exec SearchWithCategory 2