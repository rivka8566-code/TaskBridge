import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
constructor(private data: DataService) { }

loadTasks() {
  this.data.execute('GetByStatus', {"@StatusId": 2}).subscribe(res => {
    console.log(res);
  });
}
}
