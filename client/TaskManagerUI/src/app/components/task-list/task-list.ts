import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TaskList implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);

  tasks: Task[] = [];
  statuses: any[] = [];
  categories: any[] = [];
  searchText: string = '';
  categoryId: number | null = null;
  statusId: number | null = null;
  pendingDeleteId: number | null = null;

  ngOnInit(): void {
    this.loadLookups();
    this.applyFilters();
  }

  loadLookups() {
    this.dataService.execute('GetAllStatuses', {}).subscribe(res => this.statuses = res);
    this.dataService.execute('GetAllCategories', {}).subscribe(res => this.categories = res);
  }

  applyFilters() {
    let procedure = 'GetAllTasks';
    let params: any = {};

    if (this.statusId) { procedure = 'GetByStatus'; params = { "@StatusId": this.statusId }; }
    else if (this.categoryId || this.searchText) { 
      procedure = 'SearchWithCategory'; 
      params = { "@SearchText": this.searchText || null, "@CategoryId": this.categoryId || null }; 
    }
    else if (this.searchText) { procedure = 'SearchTasks'; params = { "@SearchText": this.searchText }; }

    this.dataService.execute(procedure, params).subscribe(res => this.tasks = res || []);
  }

  resetFilters() { this.searchText = ''; this.categoryId = null; this.statusId = null; this.applyFilters(); }
  addTask() { this.router.navigate(['/new-task']); }
  viewTask(id: number) { this.router.navigate([`/task/${id}`]); }
  editTask(id: number) { this.router.navigate([`/edit-task/${id}`]); }

  confirmDelete(id: number) {
    this.dataService.execute('DeleteTask', { "@Id": id }).subscribe(() => {
      this.pendingDeleteId = null;
      this.applyFilters();
    });
  }
}