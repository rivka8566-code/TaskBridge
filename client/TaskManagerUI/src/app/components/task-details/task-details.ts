import { Component, OnInit, inject, input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Task } from '../../models/task.model';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails implements OnInit {
  private data = inject(DataService);
  private router = inject(Router);

  id = input.required<number>();
  task: Task | null = null;
  deleteSuccess = false;

  ngOnInit() {
    this.loadTask();
  }

  loadTask() {
    this.data.execute('GetTaskById', { "id": this.id() }).subscribe((result: any) => {
      if (result && result.length > 0) {
        this.task = result[0];
      }
    });
  }

  editTask(id: number) {
    this.router.navigate([`/edit-task/${id}`]);
  }

  deleteTask(id: number) {
    this.data.execute('DeleteTask', { "@Id": id }).subscribe(() => {
      this.deleteSuccess = true;
      setTimeout(() => this.router.navigate(['/tasks']), 1500);
    });
  }

  goBack() { this.router.navigate(['/tasks']); }
}