export interface Task {
    Id: number;
    Title: string;
    Description: string;
    StatusId: number;
    StatusName: string;
    CategoryId: number;
    CategoryName: string;
    CreatedAt: Date;
}