import { Component, OnInit, input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails implements OnInit {

  constructor(private data: DataService) { }
  id = input<number>(1);
  task: Task | null = null;


  ngOnInit() {
    this.data.execute('GetTaskById', { "id": this.id() }).subscribe((result: any) => {
      if (result && result.length > 0) {
        this.task = result && result.length > 0 ? result[0] : null;
        console.log('הנתונים שהתקבלו:', this.task);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
