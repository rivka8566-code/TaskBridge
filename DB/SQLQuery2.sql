CREATE PROCEDURE GetAllStatuses
AS
BEGIN
    SELECT Id, StatusName FROM Statuses
END

CREATE PROCEDURE GetAllCategories
AS
BEGIN
    SELECT Id, CategoryName FROM Categories
END




exec GetAllStatuses

exec GetAllCategories